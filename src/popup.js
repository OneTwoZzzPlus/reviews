'use strict';

import {createMainPage, isuBox} from "./main.js";
import * as strings from "./ui/strings.js";
import {setJwtToken, jwtToken} from "./api/api.js";
import {parseJwt} from "./utils/utils.js";

document.addEventListener('DOMContentLoaded', main);

async function main() {
    createMainPage()

    chrome.storage.local.get((data) => {
        setJwtToken(data.jwtToken)
        const payload = parseJwt(jwtToken);
        if (payload?.isu) {
            isuBox.innerHTML = strings.authStatusText(payload?.isu, payload?.name);
        }
    })
}

/** Добавляем переходы по ссылкам в другую вкладку **/
document.body.addEventListener('click', function (e) {
    if (e.target.matches('a[href]')) {
        chrome.tabs.create({url: e.target.href});
    }
});