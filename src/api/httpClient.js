/* global API_HOST */
import { getStorage } from "./storage.js";
import { cache } from "./cache.js";
import { parseJwt } from "../utils/utils.js";

let refreshPromise = null;

/** Стандартный базовый запрос */
export async function request(method, path, options = {}, headers = {}, signal = null) {
    const url = new URL(path, API_HOST);
    const uppercaseMethod = method.toUpperCase();

    const fetchOptions = {
        method: uppercaseMethod,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        signal
    };

    if (uppercaseMethod === 'GET') {
        Object.entries(options).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                url.searchParams.set(key, value.toString());
            }
        });
    } else {
        fetchOptions.body = JSON.stringify(options);
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({}));
        const error = new Error(`HTTP Error ${response.status}`);
        error.status = response.status;
        error.detail = errorDetail;
        throw error;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

/** Получение access-токена */
async function getValidAccessToken(required = false) {
    const storage = getStorage();
    const refreshToken = await storage.get('refresh_token');
    const accessToken = await storage.get('access_token');

    if (!refreshToken) {
        if (required) throw { status: 401, message: 'Unauthorized' };
        return null;
    }

    // Проверяем срок годности текущего access токена
    if (accessToken) {
        const payload = parseJwt(accessToken);
        const isExpired = payload?.exp ? Date.now() >= (payload.exp * 1000 - 300 * 1000) : true;
        if (!isExpired) return accessToken;
    }

    // Если рефреш уже выполняется другим параллельным запросом, ждем его
    if (refreshPromise) {
        const token = await refreshPromise;
        if (!token && required) throw { status: 401, message: 'Unauthorized' };
        return token;
    }

    // Запускаем единственный запрос на обновление токена
    refreshPromise = (async () => {
        try {
            console.log('[Auth] Refreshing access token...');
            const data = await request('POST', '/authp/refresh', { refresh_token: refreshToken });
            const newAccessToken = data?.access_token;

            if (newAccessToken) {
                await storage.set('access_token', newAccessToken);
                return newAccessToken;
            }

            throw new Error('Invalid token response');
        } catch (err) {
            console.error('[Auth] Refresh failed, clearing tokens:', err);
            await storage.remove('refresh_token');
            await storage.remove('access_token');
            return null;
        } finally {
            refreshPromise = null; // Освобождаем mutex
        }
    })();

    const token = await refreshPromise;
    if (!token && required) {
        throw { status: 401, message: 'Unauthorized' };
    }
    return token;
}

/** Запрос с авторизацией (обязательной или опциональной) */
export async function authRequest(method, path, options = {}, signal = null, required = true) {
    const token = await getValidAccessToken(required);
    const headers = {};

    if (token) {
        headers['token'] = token;
    }

    try {
        return await request(method, path, options, headers, signal);
    } catch (err) {
        // Если авторизация была обязательной и получили 401, сбрасываем и пробуем ещё раз
        if (err.status === 401 && required) {
            const storage = getStorage();
            await storage.remove('access_token');
            const newToken = await getValidAccessToken(true);

            if (newToken) {
                headers['token'] = newToken;
                return await request(method, path, options, headers, signal);
            }
        }
        throw err;
    }
}

/** Кешируемый запрос (authMode: 'none' | 'optional' | 'required') */
export async function cachedRequest(cacheConfig, method, path, options = {}, authMode = 'optional') {
    const { key, type = 'eternal', ttlMs = 60000 } = cacheConfig;

    // Проверяем локальный кэш
    const cachedData = await cache.get(key);
    if (cachedData !== null && cachedData !== undefined) {
        return cachedData;
    }

    // Выполняем запрос с выбранным режимом авторизации
    let data;
    if (authMode === 'none') {
        data = await request(method, path, options);
    } else {
        const required = authMode === 'required' || authMode === true;
        data = await authRequest(method, path, options, null, required);
    }

    // Записываем в кэш
    if (type === 'eternal') {
        await cache.setEternal(key, data);
    } else if (type === 'ttl') {
        await cache.setWithTTL(key, data, ttlMs);
    }

    return data;
}