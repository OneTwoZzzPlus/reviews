import * as strings from "../strings.js";
import {createMainPageFilling} from "./tabs/tabMenu.js";
import {createSearch} from "./tabs/tabSearch.js";
import {createTeacher} from "./tabs/tabTeacher.js";
import {createSubject} from "./tabs/tabSubject.js";
import {createLoginForm} from "./tabs/tabLogin.js";
import {createAddReviewForm} from "./tabs/tabAddReview.js";
import {
    fetchSearch,
    fetchTeacher,
    fetchSubject,
    fetchIsModerator,
    fetchGetSuggestionList,
    fetchGetSuggestion, fetchGSParser
} from "../api/api.js";
import {createListReviewsForm} from "./tabs/tabListReviews.js";
import {createUpdateForm} from "./tabs/tabModUpdate.js";
import {router} from "./router.js";

let header;
let isuBox, container, statusBox;
let input, inputReset, menuBtn, overlay;
let loginCallback = undefined;
let logoutCallback = undefined;
let isAuth = false;
let isUserModerator = false;
let timeoutId;
let abortController;


/** Контроллер страницы */
export function createMainPage(logoutCallbackLocal, loginCallbackLocal=undefined) {
    loginCallback = loginCallbackLocal;
    logoutCallback = logoutCallbackLocal;
    statusBox = document.querySelector('#reviews-status-box');
    isuBox = document.querySelector('#reviews-isu-box');
    container = document.querySelector('#reviews-container');
    input = document.querySelector('#reviews-input');
    inputReset = document.querySelector('#reviews-input-reset');
    menuBtn = document.querySelector('#reviews-menu');
    header = document.querySelector('#reviews-header');
    overlay = document.querySelector('#reviews-search-overlay');

    menuBtn.addEventListener('click', () => {router.go('/')});
    input.addEventListener('input', inputEvent);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            inputEvent();
        }
    });
    inputReset.addEventListener('click', () => {
        overlay.innerHTML = "";
        input.value = '';
        input.focus();
    });

    router.init("/", strings.mainHeader, clearMainPage)
    router.subscribe((params) => {
        statusBox.innerHTML = '';
        container.innerHTML = '';
        overlay.innerHTML = "";
        header.innerHTML = params.header || strings.mainHeader;
    });
    router.route("/login", {header: strings.loginHeader}, openLoginForm)
    router.route("/suggestion", {header: strings.addHeader}, openAddReview)
    router.route("/moderation", {header: strings.moderationHeader}, openModeratorPanel)
    router.route("/moderation/suggestion", {header: strings.moderationHeader}, openExternalReview)
    router.route("/moderation/suggestion/{id}", {header: strings.moderationHeader}, openModerationReview)
    router.route("/{type}/{id}", {header: strings.mainHeader}, load)
    router.start();
}

/** Основная страница */
export function clearMainPage() {
    container.appendChild(createMainPageFilling(
        isAuth, isUserModerator,
        logoutCallback,
        (type, id) => router.go(`/${type}/${id}`),
        () => router.go('/suggestion'),
        () => router.go('/moderation')
    ));
}

/** Открыть login форму */
export function openLoginForm() {
    container.appendChild(createLoginForm(loginCallback));
}

/** В статус авторизованного */
export function resolveLogin(payload) {
    isAuth = true;
    isuBox.innerHTML = strings.authStatusText(payload?.isu, payload?.name);
    if (loginCallback !== undefined) isuBox.removeEventListener('click', () => router.go('/login'));
    router.notify();

    /** @param {ModeratorResponse} data */
    fetchIsModerator().then(data => {
        if (data?.access) {
            isUserModerator = true;
            console.log('You are moderator!');
            router.notify();
        }
    }).catch(() => {})
}

/** В статус не авторизованного */
export function rejectLogin(isuBoxHTML) {
    isAuth = false;
    isUserModerator = false;
    isuBox.innerHTML = isuBoxHTML;
    if (loginCallback !== undefined) {
        isuBox.removeEventListener('click', () => {router.go('/login')});
        isuBox.addEventListener('click', () => {router.go('/login')});
    }
    router.notify();
}

/** Обработка отправки - debouncer */
function inputEvent() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(search, 300);
}

/** Обрабатываем ввод в строку поиска **/
async function search() {
    const name = input.value.trim();
    if (!name) {
        overlay.innerHTML = "";
        return;
    }
    if (name.length < 2) {
        overlay.innerHTML = strings.fewCharactersText;
        return;
    }

    overlay.innerHTML = strings.loadingText;

    abortController?.abort();
    abortController = new AbortController();

    fetchSearch(name, abortController).then(data => {
        if (data.results.length === 0) {
            overlay.innerHTML = strings.statusSearchText(404);
            return;
        }

        const searchBox = createSearch(data,
            (id, type) => router.go(`/${type}/${id}`),
            isUserModerator
        );
        if (searchBox) {
            overlay.innerHTML = "";
            overlay.appendChild(searchBox);
        } else {
            overlay.innerHTML = strings.brokeSearchText;
        }
    }).catch(status => {
        overlay.innerHTML = strings.statusSearchText(status);
    })
}

/** Загрузка отзывов по преподу/предмету **/
async function load(params) {
    statusBox.innerHTML = strings.loadingText;
    switch (params.type) {
        case 'teacher':
            fetchTeacher(params.id).then(data => {
                const teacher = createTeacher(data, isAuth);
                if (teacher !== null) {
                    statusBox.innerHTML = "";
                    container.innerHTML = "";
                    container.appendChild(teacher);
                    return;
                }
                statusBox.innerHTML = strings.brokeReviewsText;
            }).catch(status => {
                statusBox.innerHTML = strings.statusReviewsText(status);
            })
            break;
        case 'subject':
            fetchSubject(params.id).then(data => {
                const subject = createSubject(data, isAuth);
                if (subject !== null) {
                    statusBox.innerHTML = "";
                    container.innerHTML = "";
                    container.appendChild(subject);
                    return;
                }
                statusBox.innerHTML = strings.brokeReviewsText;
            }).catch(status => {
                statusBox.innerHTML = strings.statusReviewsText(status);
            })
            break;
        default:
            console.error(`Неизвестный type ${params.type}`);
            statusBox.innerHTML = strings.unknownTypeText;
    }
}

function openAddReview() {
    container.appendChild(createAddReviewForm(() => {router.go('/')}));
}

function openModeratorPanel() {
    if (!isUserModerator) return;
    statusBox.innerHTML = 'Загрузка предложки...';
    container.appendChild(createUpdateForm());

    const btn_add = document.createElement('button');
    btn_add.classList.add('rev-button-s');
    btn_add.style.margin = '0 0 0.5rem 0';
    btn_add.innerHTML = "Добавить новый отзыв";
    btn_add.addEventListener('click', () => {router.go('/moderation/suggestion')});
    container.appendChild(btn_add);

    const btn_parse = document.createElement('button');
    btn_parse.classList.add('rev-button-s');
    btn_parse.style.margin = '0 0 0.5rem 0';
    btn_parse.innerHTML = "Запустить GSParser";
    btn_parse.addEventListener('click', () => {
        fetchGSParser().then(data => {
            const c = data['count'] ?? 0
            alert(c === 0 ? `Ничего нового` : `Найдено новых записей: ${c}`);
        }).catch(status => {
            statusBox.innerHTML = `Сервер ответил ${status}`;
        });
    });
    container.appendChild(btn_parse);

    /** @param {SuggestionListResponse} data */
    fetchGetSuggestionList().then(data => {
        statusBox.innerHTML = '';
        if (data.items.length === 0) {
            statusBox.innerHTML = 'Предложка пуста =)';
        }
        container.appendChild(createListReviewsForm(
            (id) => {router.go('/moderation/suggestion/' + id)},
            data
        ));
    }).catch(status => {
        statusBox.innerHTML = `Сервер ответил ${status}`;
    });
}

function openExternalReview() {
    if (!isUserModerator) return;
    container.appendChild(createUpdateForm());
    container.appendChild(createAddReviewForm(
        () => {router.go('/moderation')}, null, true, true
    ));
}

function openModerationReview(params) {
    if (!isUserModerator) return;
    statusBox.innerHTML = 'Загрузка отзыва...';

    fetchGetSuggestion(params.id).then(data => {
        statusBox.innerHTML = '';
        container.innerHTML = '';
        container.appendChild(createUpdateForm());
        container.appendChild(createAddReviewForm(
            () => {router.go('/moderation')}, data, true
        ));
    }).catch(status => {
        router.go('/moderation');
        if (status === 404) statusBox.innerHTML = 'Нет такого отзыва в предложке =(';
        statusBox.innerHTML = `Сервер ответил ${status}`;
    })
}