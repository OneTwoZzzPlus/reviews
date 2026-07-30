export class LocalStorageAdapter {
    async get(key) {
        try {
            const val = localStorage.getItem(key);
            return val ? JSON.parse(val) : null;
        } catch {
            return null;
        }
    }
    async set(key, value) {
        console.log(`[storage] ${key}: ${value}`);
        localStorage.setItem(key, JSON.stringify(value));
    }
    async remove(key) {
        localStorage.removeItem(key);
    }
}

export class ChromeStorageAdapter {
    async get(key) {
        return new Promise((resolve) => {
            if (!chrome.runtime?.id) return resolve(null);
            chrome.storage.local.get([key], (result) => {
                resolve(result[key] ?? null);
            });
        });
    }
    async set(key, value) {
        return new Promise((resolve) => {
            if (!chrome.runtime?.id) return resolve();
            chrome.storage.local.set({ [key]: value }, resolve);
        });
    }
    async remove(key) {
        return new Promise((resolve) => {
            if (!chrome.runtime?.id) return resolve();
            chrome.storage.local.remove([key], resolve);
        });
    }
}

let activeStorage = new LocalStorageAdapter();

export function useStorage(adapter) {
    activeStorage = adapter;
}

export function getStorage() {
    return activeStorage;
}
