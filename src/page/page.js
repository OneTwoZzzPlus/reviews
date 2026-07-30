"use strict";

import { createRoot } from "../ui/main.js";
import { syncCache } from "../api/cache.js";
import { useStorage, LocalStorageAdapter } from "../api/storage.js";

useStorage(new LocalStorageAdapter());

document.addEventListener("DOMContentLoaded", main);

async function main() {
    syncCache();
    createRoot();
}
