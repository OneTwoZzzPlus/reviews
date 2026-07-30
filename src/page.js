"use strict";

import { createMainPage, resolveLogin, rejectLogin } from "./ui/main.js";
import { isAuth, loadTokens, resetTokens } from "./api/authp.js";
import { router } from "./ui/router.js";

import { syncCache } from "./api/syncCache.js";
import { useStorage, LocalStorageAdapter } from "./api/storage.js";
useStorage(new LocalStorageAdapter());

const isuBoxHTML = `<a>Вход</a>`;
const logoutConfirm = "Вы точно хотите выйти из аккаунта?";

document.addEventListener("DOMContentLoaded", main);

async function main() {
    syncCache();
    createMainPage(logoutCallback, loginCallback);

    try {
        const payload = await loadTokens();
        resolveLogin(payload);
    } catch {
        rejectLogin(isuBoxHTML);
    }
}

async function loginCallback() {
    try {
        const payload = await loadTokens();
        resolveLogin(payload);
        router.go("/");
    } catch {
        rejectLogin(isuBoxHTML);
        router.notify();
    }
}

function logoutCallback() {
    if (!isAuth()) return;
    const confirmation = confirm(logoutConfirm);
    if (!confirmation) return;
    resetTokens();
    rejectLogin(isuBoxHTML);
}
