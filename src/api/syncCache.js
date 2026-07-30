/* global API_HOST */
import { getStorage } from "./storage.js";
import { cache } from "./cache.js";
import { request } from "./httpClient.js";

export async function syncCache() {
    const storage = getStorage();
    const lastSync = await storage.get('last_cache_sync');

    if (!lastSync) {
        console.log(`[Cache Sync] Cache is empty`);
        return;
    }

    try {
        const data = await request('GET', `/cache/sync`, { since: lastSync });
        const { invalid_teachers = [], invalid_subjects = [], timestamp } = data;

        const keysToRemove = [
            ...invalid_teachers.map(id => `teacher_${id}`),
            ...invalid_subjects.map(id => `subject_${id}`)
        ];

        if (keysToRemove.length > 0) {
            await cache.remove(keysToRemove);
            console.log(`[Cache Sync] Disabled entries successfully: ${keysToRemove.length}`);
        }

        if (timestamp) {
            await storage.set('last_cache_sync', timestamp);
        }
    } catch (err) {
        console.warn(`[Cache Sync] Sync error: ${err}`);
    }
}