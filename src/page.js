'use strict';

import {createMainPage, clearMainPage, resolveLogin, rejectLogin} from "./ui/main.js";
import {isAuth, loadTokensPage, resetTokensPage} from "./api/authp.js";

const isuBoxHTML = `<a>Вход</a>`;

document.addEventListener('DOMContentLoaded', main);

async function main() {
    createMainPage(logoutCallback, loginCallback);
    loadTokensPage().then((payload) => {
        resolveLogin(payload);
    }).catch(() => {
        rejectLogin(isuBoxHTML)
    })
}

function loginCallback() {
    loadTokensPage().then((payload) => {
        resolveLogin(payload);
        clearMainPage();
    }).catch(() => {
        rejectLogin(isuBoxHTML)
    })
}

function logoutCallback() {
    if (!isAuth()) return;
    resetTokensPage();
    rejectLogin(isuBoxHTML);
    clearMainPage();
}
