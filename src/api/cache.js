import { getStorage } from "./storage.js";
import { request } from "./httpClient.js";

export const cache = {
    async get(key) {
        const storage = getStorage();
        const item = await storage.get(`cache:${key}`);
        if (!item) return null;

        if (!item || item.data === undefined) {
            await storage.remove(`cache:${key}`);
            return null;
        }

        // Expired TTL
        if (item.expiry && Date.now() > item.expiry) {
            await storage.remove(`cache:${key}`);
            return null;
        }

        return item.data;
    },

    async setEternal(key, data) {
        const storage = getStorage();
        await storage.set(`cache:${key}`, { data });
    },

    async setWithTTL(key, data, ttlMs) {
        const storage = getStorage();
        await storage.set(`cache:${key}`, {
            data,
            expiry: Date.now() + ttlMs,
        });
    },

    async remove(keys) {
        const storage = getStorage();
        for (const key of keys) {
            await storage.remove(`cache:${key}`);
        }
    },
};

export async function syncCache() {
    const storage = getStorage();
    const lastSync = await storage.get("last_cache_sync");

    if (!lastSync) {
        console.log(`[Cache Sync] Cache is empty`);
        return;
    }

    try {
        const data = await request("GET", `/cache/sync`, { since: lastSync });
        const {
            invalid_teachers = [],
            invalid_subjects = [],
            timestamp,
        } = data;

        const keysToRemove = [
            ...invalid_teachers.map((id) => `teacher_${id}`),
            ...invalid_subjects.map((id) => `subject_${id}`),
        ];

        if (keysToRemove.length > 0) {
            await cache.remove(keysToRemove);
            console.log(
                `[Cache Sync] Disabled entries successfully: ${keysToRemove.length}`,
            );
        }

        if (timestamp) {
            await storage.set("last_cache_sync", timestamp);
        }
    } catch (err) {
        console.warn(`[Cache Sync] Sync error: ${err}`);
    }
}
