'use strict';

import {createMainPage, isuBox, container, statusBox} from "./main.js";
import * as strings from "./ui/strings.js";
import {fetchAuthPLogin} from "./api/api.js";
import {resetTokensPage} from "./api/authp.js";
import {validateTokenISU, saveTokensPage, loadTokensPage, refreshToken} from "./api/authp.js";

document.addEventListener('DOMContentLoaded', main);

async function main() {
    createMainPage(logoutCallback)
    authenticate()
}

function openForm (_) {
    container.innerHTML = "";
    container.appendChild(createLoginForm());
}

function authenticate() {
    loadTokensPage().then((payload) => {
        isuBox.innerHTML = strings.authStatusText(payload?.isu, payload?.name);
        isuBox.removeEventListener('click', openForm);
    }).catch(_ => {
        isuBox.removeEventListener('click', openForm);
        isuBox.addEventListener('click', openForm);
    })
}

function logoutCallback() {
    if (!refreshToken) return;
    resetTokensPage();

    statusBox.innerHTML = '';
    container.innerHTML = '';
    isuBox.innerHTML = `<a>Вход</a>`;
    isuBox.addEventListener('click', openForm);
}

function createLoginForm() {
    const form = document.createElement("form");
    form.classList.add("login-form");
    form.innerHTML = `
        <p>${strings.authpLabel}</p>
    
        <input type="email" name="email" placeholder="E-mail" required />
        <input type="password" name="password" placeholder="Пароль" required />
    
        <button id="authp-login" type="submit">Вход</button>
    `
    const loginButton = form.querySelector("#authp-login");
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        loginButton.disabled = true;
        loginButton.innerHTML = strings.loginLoadingBtnLabel;
        fetchAuthPLogin(form.email.value, form.password.value).then(resp => {
            const rToken = resp?.refresh_token;
            const aToken = resp?.access_token;
            if (!rToken || !aToken) {
                console.error("[AUTHP] Invalid response", resp);
                loginButton.disabled = false;
                loginButton.innerHTML = strings.loginBtnLabel;
                return;
            }
            if (!validateTokenISU(aToken)) return;
            saveTokensPage(rToken, aToken);

            container.innerHTML = "";
            authenticate()
        }).catch(status => {
            if (status === 401) {alert(strings.authpCredentials)}
            else alert(strings.authpError + ` (статус ${status})`);
            loginButton.disabled = false;
            loginButton.innerHTML = strings.loginBtnLabel;
        });
    });
    return form;
}
