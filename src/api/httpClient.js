/* global API_HOST */
import { cache } from "./cache.js";

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

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw response.status;
        }

        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (err) {
        if (err.name === "AbortError") throw -1;
        throw typeof err === "number" ? err : 0;
    }
}

export async function cachedRequest(
    key,
    method,
    path,
    options = {},
    headers = {},
    signal = null,
) {
    const cached = key ? await cache.get(key) : null;

    const requestHeaders = { ...headers };
    if (cached?.etag) {
        requestHeaders["If-None-Match"] = cached.etag;
    }

    const url = new URL(path, API_HOST);
    const uppercaseMethod = method.toUpperCase();

    if (uppercaseMethod === "GET") {
        Object.entries(options).forEach(([k, v]) => {
            if (v !== null && v !== undefined) {
                url.searchParams.set(k, v.toString());
            }
        });
    }

    try {
        const response = await fetch(url, {
            method: uppercaseMethod,
            headers: {
                "Content-Type": "application/json",
                ...requestHeaders,
            },
            signal,
        });

        if (response.status === 304 && cached) {
            return cached.data;
        }

        if (!response.ok) {
            if (cached) {
                console.warn(
                    `[Cache] Server error ${response.status}. Using cached data.`,
                );
                return cached.data;
            }

            throw response.status;
        }

        const newEtag = response.headers.get("ETag");
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (newEtag && key) {
            await cache.set(key, data, newEtag);
        }

        return data;
    } catch (err) {
        if (err?.name === "AbortError" || err === -1) throw -1;

        if (cached && typeof err !== "number") {
            console.warn("[Cache] Network failed. Using cached data.");
            return cached.data;
        }

        throw typeof err === "number" ? err : 0;
    }
}
