import * as strings from "../../strings.js";
import {fetchAuthPLogin} from "../../api/api.js";
import {validateTokenISU, saveTokensPage} from "../../api/authp.js";

export function createLoginForm(loginCallback) {
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

            loginCallback()
        }).catch(status => {
            if (status === 401) {alert(strings.authpCredentials)}
            else alert(strings.authpError + ` (статус ${status})`);
            loginButton.disabled = false;
            loginButton.innerHTML = strings.loginBtnLabel;
        });
    });
    return form;
}