'use strict';

import {createMainPage, isuBox} from "./main.js";
import * as strings from "./ui/strings.js";
import {loadTokensExtension} from "./api/authp.js";

/** Добавляем переходы по ссылкам в другую вкладку **/
document.body.addEventListener('click', function (e) {
    if (e.target.matches('a[href]')) {
        chrome.tabs.create({url: e.target.href});
    }
});

document.addEventListener('DOMContentLoaded', main);

async function main() {
    createMainPage()

    loadTokensExtension().then((payload) => {
        if (payload?.isu) {
            isuBox.innerHTML = strings.authStatusText(payload?.isu, payload?.name);
        }
    }).catch(() => {})
}