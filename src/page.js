'use strict';

import {createMainPage, resolveLogin, rejectLogin} from "./ui/main.js";
import {isAuth, loadTokensPage, resetTokensPage} from "./api/authp.js";
import {navigation} from "./ui/navigation.js";

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
        navigation.go('/');
    }).catch(() => {
        rejectLogin(isuBoxHTML);
        navigation.refresh();
    })
}

function logoutCallback() {
    if (!isAuth()) return;
    const confirmation = confirm(logoutConfirm);
    if (!confirmation) return;
    resetTokensPage();
    rejectLogin(isuBoxHTML);
}
