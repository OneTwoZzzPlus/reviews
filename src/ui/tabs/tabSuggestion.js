import * as strings from "../../strings.js";
import { router } from "../router.js";
import { getNonNegativeInt, normalizeString } from "../../utils.js";
import { fetchSearch, fetchSendSuggestion } from "../../api/api.js";
import { createSearchOverlay } from "./tabSearch.js";

let isSent = false;
let clearFormCallback = undefined;
const emptyState = {
    id: null,
    teacher: {
        id: null,
        title: null,
    },
    subject: {
        id: null,
        title: null,
    },
    subs: new Map(),
    comment: "",
};
let state = structuredClone(emptyState);

export function createSuggestionForm() {
    clearFormCallback = () => router.go("/");

    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderAddReviewForm();

    const root = getElements(wrapper);

    bindEvents(wrapper, root);

    refreshForm(root);

    return wrapper;
}

const inputState = {
    teacher: {
        type: "teacher",
        controller: undefined,
        timeout: undefined,
        value: "",
    },
    subject: {
        type: "subject",
        controller: undefined,
        timeout: undefined,
        value: "",
    },
    subs: {
        type: "subject",
        controller: undefined,
        timeout: undefined,
        value: "",
    },
};

function bindEvents(wrapper, root) {
    wrapper.addEventListener("click", (e) => {
        if (e.target === root.teacher.reset) {
            root.teacher.input.value = "";
            root.teacher.container.innerHTML = "";
        }
        if (e.target === root.subject.reset) {
            root.subject.input.value = "";
            root.subject.container.innerHTML = "";
        }
        if (e.target === root.subs.reset) {
            root.subs.input.value = "";
            root.subs.container.innerHTML = "";
        }
        if (e.target.classList.contains("addrev-list-item-reset")) {
            const key = e.target.getAttribute("data-id");
            state.subs.delete(key);
            refreshList(root.subs, state.subs);
        }
        if (e.target === root.submit) {
            sendSuggestion();
        }
        if (e.target === root.cancel) {
            clearForm(root);
        }
    });
    function inputEvent(e) {
        if (e.target === root.comment.input) {
            state.comment = root.comment.input.value;

            const length = root.comment.input.value.length;
            root.comment.counter.textContent = length.toString();

            const exceeded = length >= MAX_TEXTAREA;
            root.comment.input.classList.toggle("limit-exceeded", exceeded);
            root.comment.counter.parentElement.classList.toggle(
                "limit-exceeded",
                exceeded,
            );

            const scrollY = window.scrollY;
            root.comment.input.style.height = "auto";
            root.comment.input.style.height =
                root.comment.input.scrollHeight + "px";
            window.scrollTo(window.scrollX, scrollY + 1000);
        }
        if (e.target === root.teacher.input) {
            inputState.teacher.value = root.teacher.input.value;
            clearTimeout(inputState.teacher.timeout);
            inputState.teacher.timeout = setTimeout(() => {
                search(
                    root.teacher,
                    inputState.teacher,
                    state.teacher,
                    loadSingle,
                );
            }, 300);
        }
        if (e.target === root.subject.input) {
            inputState.subject.value = root.subject.input.value;
            clearTimeout(inputState.subject.timeout);
            inputState.subject.timeout = setTimeout(() => {
                search(
                    root.subject,
                    inputState.subject,
                    state.subject,
                    loadSingle,
                );
            }, 300);
        }
        if (e.target === root.subs.input) {
            inputState.subs.value = root.subs.input.value;
            clearTimeout(inputState.subs.timeout);
            inputState.subs.timeout = setTimeout(() => {
                search(root.subs, inputState.subs, state.subs, loadList);
            }, 300);
        }
    }
    wrapper.addEventListener("input", inputEvent);
    wrapper.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            inputEvent(event);
        }
    });
}

function addComment(root) {
    const source_id = getNonNegativeInt(normalizeString(root.ext.source.value));
    if (source_id === null) {
        alert("Введите source_id");
        return;
    }
    const date = normalizeString(root.ext.date.value);
    if (date === "") {
        alert("Введите нормальную дату");
        return;
    }
    if (state.teacher.id === null) {
        alert("Выберите преподавателя");
        return;
    }
    if (state.subject.id === null) {
        alert("Выберите основной предмет");
        return;
    }
    if (normalizeString(state.comment).length === 0) {
        alert("Введите текст отзыва");
        return;
    }

    const requestBody = {
        source_id: source_id,
        date: date,
        teacher: state.teacher,
        subject: state.subject,
        subs: Array.from(state.subs.values()),
        text: state.comment,
    };

    if (isSent) return;
    isSent = true;

    fetchInsertComment(requestBody)
        .then((data) => {
            alert(`Добавлено c id: ${data.id}`);
            state = structuredClone(emptyState);
            root.ext.date.value = "";
            refreshForm(root);
            isSent = false;
        })
        .catch((status) => {
            alert(`Сервер ответил ${status}`);
            isSent = false;
        });
}

function sendSuggestion() {
    if (state.teacher.title === null) {
        alert("Пожалуйста, выберите преподавателя =]");
        return;
    }
    if (state.subject.title === null) {
        alert("Пожалуйста, выберите основной предмет =]");
        return;
    }
    if (normalizeString(state.comment).length === 0) {
        alert("Не слишком ли мало вы написали?)");
        return;
    }
    const requestBody = {
        teacher: state.teacher,
        subject: state.subject,
        subs: Array.from(state.subs.values()),
        text: state.comment,
    };

    if (isSent) return;
    isSent = true;
    fetchSendSuggestion(requestBody)
        .then((_) => {
            state = structuredClone(emptyState);
            alert(
                "Спасибо! Отзыв будет опубликован как только пройдёт модерацию =)",
            );
            isSent = false;
            clearFormCallback();
        })
        .catch((status) => {
            alert(`Сервер ответил ${status}`);
            isSent = false;
        });
}

function commitSuggestion() {
    if (state.id === null) alert("Suggestion id пустой!");

    if (state.teacher.id === null || state.teacher.id === undefined) {
        alert("Выберите существующего преподавателя");
        return;
    }
    if (state.subject.id === null || state.subject.id === undefined) {
        alert("Выберите существующий основной предмет");
        return;
    }
    for (let s in state.subs) {
        if (s.id === null || s.id === undefined) {
            alert("Выберите существующие предметы");
            return;
        }
    }
    if (normalizeString(state.comment).length === 0) {
        alert("Перепроверьте текст отзыва, он пустой");
        return;
    }
    const requestBody = {
        teacher: state.teacher,
        subject: state.subject,
        subs: Array.from(state.subs.values()),
        text: state.comment,
    };

    if (isSent) return;
    isSent = true;
    fetchCommitSuggestion(state.id, requestBody)
        .then((_) => {
            state = structuredClone(emptyState);
            clearFormCallback();
            isSent = false;
        })
        .catch((status) => {
            alert(`Сервер ответил ${status}`);
            isSent = false;
        });
}

function rejectSuggestion(status) {
    if (state.id === null) alert("Suggestion id пустой!");

    const confirmation = confirm(`Отклонить отзыв (${status})?`);
    if (!confirmation) return;

    /** @param {SuggestionCancelResponse} data */
    if (isSent) return;
    isSent = true;
    fetchCancelSuggestion(state.id, status)
        .then((data) => {
            if (data.status !== status) {
                alert("Статус не сохранён");
                return;
            }
            clearFormCallback();
            isSent = false;
        })
        .catch((status) => {
            alert(`Сервер ответил ${status}`);
            isSent = false;
        });
}

function search(rootEl, is, s, load) {
    if (!is.value || is.value.length < 2) return;

    is.controller?.abort();
    is.controller = new AbortController();

    fetchSearch(normalizeString(is.value), is.controller?.signal, is.type)
        .then((data) => {
            rootEl.container.innerHTML = "";
            data.results.push({
                id: null,
                title: "Добавить новый",
                type: "add",
            });
            const searchBox = createSearchOverlay(data, (id, type, title) => {
                load(rootEl, is, s, id, type, title);
            });
            if (searchBox) rootEl.container.appendChild(searchBox);
            else rootEl.container.innerHTML = strings.brokeSearchText;
        })
        .catch((status) => {
            rootEl.container.innerHTML = strings.statusSearchText(status);
            if (status === 404) {
                const dt = {
                    results: [
                        {
                            id: null,
                            title: "Добавить новый",
                            type: "add",
                        },
                    ],
                };
                const searchBox = createSearchOverlay(dt, (id, type, title) => {
                    load(rootEl, is, s, id, type, title);
                });
                if (searchBox) rootEl.container.appendChild(searchBox);
            }
        });
}

function loadSingle(rootEl, is, s, id, type, title) {
    rootEl.container.innerHTML = "";
    if (type !== is.type && type !== "add") return;

    if (type === "add") {
        const newTitle = normalizeString(is.value);
        if (newTitle.length === 0) return;
        s.id = null;
        s.title = newTitle;
    } else {
        s.id = id;
        s.title = title;
    }

    refreshSingle(rootEl, s);
}

function refreshSingle(rootEl, s) {
    if (s.title === null) {
        rootEl.status.innerHTML = `Ничего не выбрано`;
        return;
    }
    if (s.id === null) {
        rootEl.status.innerHTML = `Добавлен новый: <span class="addrev-normal-text">${s.title}</span>`;
    } else {
        rootEl.status.innerHTML = `
            Выбран: <span class="addrev-normal-text">${s.title} <b>(${s.id})</b></span>`;
    }
    rootEl.input.value = "";
    rootEl.input.placeholder = s.title;
}

function loadList(rootEl, is, s, id, type, title) {
    rootEl.container.innerHTML = "";
    if (type !== is.type && type !== "add") return;

    if (type === "add") {
        id = null;
        title = is.value;
    }

    s.set(title, {
        id: id,
        title: title,
    });
    refreshList(rootEl, s);
}

function refreshList(rootEl, s) {
    if (s.size === 0) {
        rootEl.status.innerHTML = `<p class="addrev-status">Ничего не выбрано</p>`;
        return;
    }

    const revList = document.createElement("div");
    revList.classList.add("addrev-list");

    revList.innerHTML = `
        <div class="addrev-list">
            <p class="addrev-list-title">Выбрано: </p>
            ${Array.from(
                s,
                ([title, item]) => `
                <div class="addrev-list-item">
                    ${item.id === null ? `<span class="addrev-muted-text">(новый)</span>` : ""}
                    ${item.title}
                    (<b>${item.id}</b>)
                    <button class="addrev-list-item-reset" data-id="${title}">&times;</button>
                </div>
            `,
            ).join("")}
        </div>
    `;

    rootEl.status.innerHTML = "";
    rootEl.status.appendChild(revList);
}

function refreshComment(rootEl, s) {
    rootEl.input.value = s;
}

function clearForm(root) {
    state = structuredClone(emptyState);
    refreshForm(root);
}

function refreshForm(root) {
    refreshSingle(root.teacher, state.teacher);
    refreshSingle(root.subject, state.subject);
    refreshList(root.subs, state.subs);
    refreshComment(root.comment, state.comment);
}

const MAX_INPUT = 64;
const MAX_TEXTAREA = 10000;

function getElements(root) {
    return {
        teacher: {
            input: root.querySelector("#addrev-teacher-input"),
            reset: root.querySelector("#addrev-teacher-input-reset"),
            container: root.querySelector("#addrev-teacher-container"),
            status: root.querySelector("#addrev-teacher-status"),
        },
        subject: {
            input: root.querySelector("#addrev-subject-input"),
            reset: root.querySelector("#addrev-subject-input-reset"),
            container: root.querySelector("#addrev-subject-container"),
            status: root.querySelector("#addrev-subject-status"),
        },
        subs: {
            input: root.querySelector("#addrev-sub-input"),
            reset: root.querySelector("#addrev-sub-input-reset"),
            container: root.querySelector("#addrev-sub-container"),
            status: root.querySelector("#addrev-sub-status"),
        },
        comment: {
            input: root.querySelector("#addrev-addrev-input"),
            counter: root.querySelector("#addrev-comment-char-count"),
        },
        submit: root.querySelector("#addrev-submit"),
        cancel: root.querySelector("#addrev-cancel"),
    };
}

function renderAddReviewForm() {
    return `        
        <p class="addrev-label">* Добавление нового отзыва, для преподавателя...</p>
        <div id="addrev-teacher-input-wrapper" class="search-input-wrapper">
            <label for="addrev-teacher-input">ФИО преподавателя</label>
            <input type="text" id="addrev-teacher-input" class="search-input" 
                placeholder="Иванов Иван Иванович" 
                maxlength="${MAX_INPUT}"/>
            <button type="reset" id="addrev-teacher-input-reset" class="search-input-reset">&times;</button>
        </div>
        <div id="addrev-teacher-container"></div>
        <p id="addrev-teacher-status" class="addrev-status">Никого не выбрано</p>
        
        <p class="addrev-label">* По какому предмету вы его знаете? <i>(Выберите основной)</i></p>
        <div id="addrev-subject-input-wrapper" class="search-input-wrapper">
            <label for="addrev-subject-input">Название предмета</label>
            <input type="text" id="addrev-subject-input" class="search-input" 
            placeholder="Математический анализ" 
            maxlength="${MAX_INPUT}"/>
            <button type="reset" id="addrev-subject-input-reset" class="search-input-reset">&times;</button>
        </div>
        <div id="addrev-subject-container"></div>
        <p id="addrev-subject-status" class="addrev-status">Ничего не выбрано</p>
        
        <p class="addrev-label">Какие еще предметы ведет? <i>(Отметьте, если знаете)</i></p>
        <div id="addrev-sub-input-wrapper" class="search-input-wrapper">
            <label for="addrev-sub-input">Название предмета</label>
            <input type="text" id="addrev-sub-input" class="search-input" 
                placeholder="Алгебра" 
                maxlength="${MAX_INPUT}"/>
            <button type="reset" id="addrev-sub-input-reset" class="search-input-reset">&times;</button>
        </div>
        <div id="addrev-sub-container"></div>
        <div id="addrev-sub-status">
            <p class="addrev-status">Ничего не выбрано</p>
        </div>
                
        <p class="addrev-label">
            * Что можете о нём сказать? <br/>
            <i>Как относиться к студентам? Как преподаёт? Трудно ли закрыться? Укажите уровень, если это английский.</i>
        </p>
        <div class="addrev-textarea-wrapper">
            <label for="addrev-addrev-input">Комментарий</label>
            <textarea
                    id="addrev-addrev-input"
                    class="addrev-input"
                    placeholder="Можно писать кратко (обычно пишут 3–5 предложений)..."
                    maxlength="${MAX_TEXTAREA}"
            ></textarea>
            <div class="addrev-char-counter">
                <span id="addrev-comment-char-count">0</span>/${MAX_TEXTAREA}
            </div>
        </div>
        
        <button id="addrev-submit" class="addrev-button">
            Отправить анонимный отзыв
        </button>
        <button id="addrev-cancel" class="addrev-button-s">
            Очистить
        </button>
    `;
}
