import * as strings from "../strings.js";
import {createMenu} from "./tabs/tabMenu.js";
import {createSearch} from "./tabs/tabSearch.js";
import {createTeacher} from "./tabs/tabTeacher.js";
import {createSubject} from "./tabs/tabSubject.js";
import {createLoginForm} from "./tabs/tabLogin.js";
import {fetchSearch, fetchTeacher, fetchSubject} from "../api/api.js";

let isuBox, container, statusBox;
let input, inputReset, menuBtn;
let loginCallback = undefined;
let content = 'empty';
let isAuth = false;
let timeoutId;
let abortController;


/** Контроллер страницы */
export function createMainPage(logoutCallback, loginCallbackLocal=undefined) {
    loginCallback = loginCallbackLocal;
    statusBox = document.querySelector('#reviews-status-box');
    isuBox = document.querySelector('#reviews-isu-box');
    container = document.querySelector('#reviews-container');
    input = document.querySelector('#reviews-input');
    inputReset = document.querySelector('#reviews-input-reset');
    menuBtn = document.querySelector('#reviews-menu');

    inputReset.addEventListener('click', () => {
        input.value = '';
        input.focus();
        clearMainPage();
    });
    menuBtn.addEventListener('click', () => {
        if (!isAuth) return;
        content = 'menu';
        statusBox.innerHTML = '';
        container.innerHTML = '';
        container.appendChild(createMenu(logoutCallback));
    })
    input.addEventListener('input', () => {
        content = 'reviews';
        // debouncer
        clearTimeout(timeoutId);
        timeoutId = setTimeout(search, 300);
    });
}

/** Чистим страницу */
export function clearMainPage() {
    content = 'empty';
    statusBox.innerHTML = '';
    container.innerHTML = '';
}

/** Открыть login форму */
export function openLoginForm() {
    container.innerHTML = "";
    container.appendChild(createLoginForm(loginCallback));
}

/** В статус авторизованного */
export function resolveLogin(payload) {
    isAuth = true;
    isuBox.innerHTML = strings.authStatusText(payload?.isu, payload?.name);
    if (loginCallback !== undefined) isuBox.removeEventListener('click', openLoginForm);
}

/** В статус не авторизованного */
export function rejectLogin(isuBoxHTML) {
    isAuth = false;
    isuBox.innerHTML = isuBoxHTML;
    if (loginCallback !== undefined) {
        isuBox.removeEventListener('click', openLoginForm);
        isuBox.addEventListener('click', openLoginForm);
    }
}

/** Обрабатываем ввод в строку поиска **/
async function search() {
    const name = input.value.trim();
    if (!name) {
        statusBox.innerHTML = "";
        return;
    } else if (name.length < 3) {
        statusBox.innerHTML = strings.fewCharactersText;
        return;
    }

    statusBox.innerHTML = strings.loadingText;

    abortController?.abort();
    abortController = new AbortController();

    fetchSearch(name, abortController).then(data => {
        const searchBox = createSearch(data, load);
        if (content !== 'reviews') return;
        if (searchBox) {
            statusBox.innerHTML = "";
            container.innerHTML = "";
            container.appendChild(searchBox);
        } else {
            container.innerHTML = "";
            statusBox.innerHTML = strings.brokeSearchText;
        }
    }).catch(status => {
        if (content !== 'reviews') return;
        container.innerHTML = "";
        statusBox.innerHTML = strings.statusSearchText(status);
    })
}

/** Загрузка отзывов по преподу/предмету **/
async function load(id, type) {
    switch (type) {
        case 'teacher':
            fetchTeacher(id).then(data => {
                const teacher = createTeacher(data);
                if (content !== 'reviews') return;
                if (teacher !== null) {
                    container.innerHTML = "";
                    container.appendChild(teacher);
                }
                else statusBox.innerHTML = strings.brokeReviewsText;
            }).catch(status => {
                statusBox.innerHTML = strings.statusReviewsText(status);
            })
            break;
        case 'subject':
            fetchSubject(id).then(data => {
                const subject = createSubject(data);
                if (content !== 'reviews') return;
                if (subject !== null) {
                    container.innerHTML = "";
                    container.appendChild(subject);
                }
                else statusBox.innerHTML = strings.brokeReviewsText;
            }).catch(status => {
                statusBox.innerHTML = strings.statusReviewsText(status);
            })
            break;
        default:
            console.error(`Неизвестный type ${type}`);
            statusBox.innerHTML = strings.unknownTypeText;
    }
}
