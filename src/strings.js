export const loadingText = "Загружаем...";

const tip = "<br/>(обновите расширение/сайт)";
const tipConnection =
    "<br/>Попробуйте ещё раз (проверьте подключение к сети Интернет, VPN, анти-DPI, ограничения провайдера)";

export const fewCharactersText = "Введите хотя бы 2 символа =]";
export const unknownTypeText =
    `<span class="error">Не понятно, что это такое :|</span>` + tip;

export const brokeReviewsText = "Отзывы пришли сломанные =(" + tip;
export const brokeSearchText = "Результаты пришли сломанные =(" + tip;

export const emptyCommentsList = "Отзывы отсутствуют \\(O_o)/";

export function statusReviewsText(status) {
    switch (status) {
        case 0:
            return (
                `<span class="error">Сервер с отзывами недоступен =(</span>` +
                tipConnection
            );
        case 404:
            return "Отзывы отсутствуют \\(O_o)/";
        default:
            return `Сервер прислал "${status}" вместо отзывов =(`;
    }
}

export function statusSearchText(status) {
    switch (status) {
        case 0:
            return (
                `<span class="error">Сервер с отзывами недоступен =(</span>` +
                tipConnection
            );
        case 404:
            return "Ничего не найдено \\(O_o)/";
        default:
            return `Сервер прислал "${status}" вместо результатов поиска =(`;
    }
}

/** Иконки */
export const symbols = {
    teacher: `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M224 248a120 120 0 1 1 0-240 120 120 0 1 1 0 240zm-30.5 56l61 0c9.7 0 17.5 7.8 17.5 17.5 0 4.2-1.5 8.2-4.2 11.4l-27.4 32 31 115.1 .6 0 34.6-138.5c2.2-8.7 11.1-14 19.5-10.8 61.9 23.6 105.9 83.6 105.9 153.8 0 15.1-12.3 27.4-27.4 27.4L43.4 512c-15.1 0-27.4-12.3-27.4-27.4 0-70.2 44-130.2 105.9-153.8 8.4-3.2 17.3 2.1 19.5 10.8l34.6 138.5 .6 0 31-115.1-27.4-32c-2.7-3.2-4.2-7.2-4.2-11.4 0-9.7 7.8-17.5 17.5-17.5z"/></svg>`,
    subject: `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M384 512L96 512c-53 0-96-43-96-96L0 96C0 43 43 0 96 0L400 0c26.5 0 48 21.5 48 48l0 288c0 20.9-13.4 38.7-32 45.3l0 66.7c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0zM96 384c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0 0-64-256 0zm32-232c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24zm24 72c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0z"/></svg>`,
    add: `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg>`,
};

export const menuAddReviewBtnLabel = "Написать отзыв";
export const mainHeader = "Поиск отзывов";
export const addHeader = "Новый отзыв";
