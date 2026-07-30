"use strict";

import { createRoot } from "../ui/main.js";
import { syncCache } from "../api/cache.js";
import { useStorage, ChromeStorageAdapter } from "../api/storage.js";
useStorage(new ChromeStorageAdapter());

document.body.addEventListener("click", function (e) {
    if (e.target.matches("a[href]")) {
        chrome.tabs.create({ url: e.target.href });
    }
});

document.addEventListener("DOMContentLoaded", main);

async function main() {
    syncCache();
    createRoot();
}
