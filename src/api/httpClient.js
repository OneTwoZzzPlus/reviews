/* global API_HOST */
import { getStorage } from "./storage.js";
import { cache } from "./cache.js";

let refreshPromise = null;

export async function request(
    method,
    path,
    options = {},
    headers = {},
    signal = null,
) {
    const url = new URL(path, API_HOST);
    const uppercaseMethod = method.toUpperCase();

    const fetchOptions = {
        method: uppercaseMethod,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        signal,
    };

    if (uppercaseMethod === "GET") {
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

export async function cachedRequest(
    cacheConfig,
    method,
    path,
    options = {},
    headers = {},
    signal = null,
) {
    const { key, type = "eternal", ttlMs = 60000 } = cacheConfig;

    const cachedData = await cache.get(key);
    if (cachedData !== null && cachedData !== undefined) {
        return cachedData;
    }

    const data = await request(method, path, options, headers, signal);

    if (type === "eternal") {
        await cache.setEternal(key, data);
    } else if (type === "ttl") {
        await cache.setWithTTL(key, data, ttlMs);
    }

    return data;
}
