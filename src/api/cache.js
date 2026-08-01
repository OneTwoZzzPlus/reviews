import { getStorage } from "./storage.js";

export const cache = {
    async get(key) {
        const storage = getStorage();
        const item = await storage.get(`cache:${key}`);
        if (!item || !item.etag) return null;
        return item;
    },

    async set(key, data, etag) {
        if (!key || !etag) return;
        const storage = getStorage();
        await storage.set(`cache:${key}`, { data, etag });
    },

    async remove(key) {
        const storage = getStorage();
        await storage.remove(`cache:${key}`);
    },
};
