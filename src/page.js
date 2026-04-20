'use strict';

import {createMainPage, resolveLogin, rejectLogin} from "./ui/main.js";
import {isAuth, loadTokensPage, resetTokensPage} from "./api/authp.js";
import {router} from "./ui/router.js";

const isuBoxHTML = `<a>Вход</a>`;
const logoutConfirm = "Вы точно хотите выйти из аккаунта?";

document.addEventListener('DOMContentLoaded', main);

async function main() {
    createMainPage(logoutCallback, loginCallback);
    loadTokensPage().then((payload) => {
        resolveLogin(payload);
    }).catch(() => {
        rejectLogin(isuBoxHTML);
    })
}

function loginCallback() {
    loadTokensPage().then((payload) => {
        resolveLogin(payload);
        router.go('/');
    }).catch(() => {
        rejectLogin(isuBoxHTML);
        router.notify();
    })
}

function logoutCallback() {
    if (!isAuth()) return;
    const confirmation = confirm(logoutConfirm);
    if (!confirmation) return;
    resetTokensPage();
    rejectLogin(isuBoxHTML);
}
