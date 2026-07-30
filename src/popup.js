'use strict';

import {clearMainPage, createMainPage, rejectLogin, resolveLogin} from "./ui/main.js";
import {isAuth, loadTokens, resetTokens} from "./api/authp.js";
import {router} from "./ui/router.js";

import { syncCache } from "./api/syncCache.js";
import { useStorage, ChromeStorageAdapter } from "./api/storage.js";
useStorage(new ChromeStorageAdapter());

const isuBoxHTML = `<a href="https://my.itmo.ru">Вход</a>`;

/** Добавляем переходы по ссылкам в другую вкладку **/
document.body.addEventListener('click', function (e) {
    if (e.target.matches('a[href]')) {
        chrome.tabs.create({url: e.target.href});
    }
});

document.addEventListener('DOMContentLoaded', main);

async function main() {
    syncCache();
    createMainPage(logoutCallback)

    loadTokens().then((payload) => {
        resolveLogin(payload);
    }).catch(() => {
        rejectLogin(isuBoxHTML)
    })
}

function logoutCallback() {
    if (!isAuth()) return;
    resetTokens();
    rejectLogin(isuBoxHTML);
    router.notify();
}
