import { parseJwt } from "../utils/utils.js";
import { getStorage } from "./storage.js";

export let refreshToken = null;
export let accessToken = null;
let accessTokenExpiration = 0;
const TIMEOUT = 300;

export function isAuth() {
    return refreshToken !== null;
}

export function isAccessTokenExpired() {
    return Date.now() >= (accessTokenExpiration * 1000 - TIMEOUT * 1000);
}

export function validateTokenISU(aToken) {
    /** @type {JWTPayload} */
    const payload = parseJwt(aToken);
    if (!payload?.isu) {
        console.error('[AUTHP] isu not found');
        return false;
    }
    return true;
}

/** Внутренняя установка токенов в оперативной памяти */
function setTokensInMemory(rToken, aToken) {
    refreshToken = rToken;
    accessToken = aToken;

    /** @type {JWTPayload} */
    const payload = parseJwt(accessToken);
    if (payload?.exp) {
        accessTokenExpiration = payload.exp;
    }
}

/** Сохранение токенов */
export async function saveTokens(rToken, aToken) {
    setTokensInMemory(rToken, aToken);

    const storage = getStorage();
    await storage.set('refresh_token', rToken);
    await storage.set('access_token', aToken);
}

/** Загрузка токенов */
export async function loadTokens() {
    const storage = getStorage();
    const rToken = await storage.get('refresh_token');
    const aToken = await storage.get('access_token');

    if (rToken && aToken) {
        setTokensInMemory(rToken, aToken);
        const payloadAT = parseJwt(aToken);
        if (payloadAT) return payloadAT;
    }
    
    throw new Error('[AUTHP] Tokens not found');
}

/** Сброс токенов */
export async function resetTokens() {
    refreshToken = null;
    accessToken = null;
    accessTokenExpiration = 0;

    const storage = getStorage();
    await storage.remove('refresh_token');
    await storage.remove('access_token');
}

export const saveTokensAuto = saveTokens;
export const loadTokensAuto = loadTokens;
export const resetTokensAuto = resetTokens;