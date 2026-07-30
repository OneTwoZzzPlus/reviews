import { getStorage } from "./storage.js";

export const cache = {
    /** Получить данные из кэша */
    async get(key) {
        const storage = getStorage();
        const item = await storage.get(`cache:${key}`);
        if (!item) return null;
        
        if (!item || item.data === undefined) {
            await storage.remove(`cache:${key}`);
            return null;
        }   

        // Если есть истекший TTL, удаляем запись
        if (item.expiry && Date.now() > item.expiry) {
            await storage.remove(`cache:${key}`);
            return null;
        }

        return item.data;
    },

    /** Сохранить навсегда */
    async setEternal(key, data) {
        const storage = getStorage();
        await storage.set(`cache:${key}`, { data });
    },

    /** Сохранить с TTL (мс) */
    async setWithTTL(key, data, ttlMs) {
        const storage = getStorage();
        await storage.set(`cache:${key}`, {
            data,
            expiry: Date.now() + ttlMs
        });
    },

    /** Удаление ключей */
    async remove(keys) {
        const storage = getStorage();
        for (const key of keys) {
            await storage.remove(`cache:${key}`);
        }
    }
};