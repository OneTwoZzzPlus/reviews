'use strict';

import {clearMainPage, createMainPage, rejectLogin, resolveLogin} from "./ui/main.js";
import {isAuth, loadTokensExtension, resetTokensExtension} from "./api/authp.js";

const isuBoxHTML = `<a href="https://my.itmo.ru">Вход</a>`;

/** Добавляем переходы по ссылкам в другую вкладку **/
document.body.addEventListener('click', function (e) {
    if (e.target.matches('a[href]')) {
        chrome.tabs.create({url: e.target.href});
    }
});

document.addEventListener('DOMContentLoaded', main);

async function main() {
    createMainPage(logoutCallback)

    loadTokensExtension().then((payload) => {
        resolveLogin(payload);
    }).catch(() => {
        rejectLogin(isuBoxHTML)
    })
}

function logoutCallback() {
    if (!isAuth()) return;
    resetTokensExtension();
    rejectLogin(isuBoxHTML);
    clearMainPage();
}
