/** Headers */
export const mainHeader = "Поиск отзывов";
export const addHeader = "Новый отзыв";

/** Icons */
export const symbols = {
    teacher: `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M224 248a120 120 0 1 1 0-240 120 120 0 1 1 0 240zm-30.5 56l61 0c9.7 0 17.5 7.8 17.5 17.5 0 4.2-1.5 8.2-4.2 11.4l-27.4 32 31 115.1 .6 0 34.6-138.5c2.2-8.7 11.1-14 19.5-10.8 61.9 23.6 105.9 83.6 105.9 153.8 0 15.1-12.3 27.4-27.4 27.4L43.4 512c-15.1 0-27.4-12.3-27.4-27.4 0-70.2 44-130.2 105.9-153.8 8.4-3.2 17.3 2.1 19.5 10.8l34.6 138.5 .6 0 31-115.1-27.4-32c-2.7-3.2-4.2-7.2-4.2-11.4 0-9.7 7.8-17.5 17.5-17.5z"/></svg>`,
    subject: `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M384 512L96 512c-53 0-96-43-96-96L0 96C0 43 43 0 96 0L400 0c26.5 0 48 21.5 48 48l0 288c0 20.9-13.4 38.7-32 45.3l0 66.7c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0zM96 384c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0 0-64-256 0zm32-232c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24zm24 72c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0z"/></svg>`,
    add: `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg>`,
};

export const sortings = {
    /*new*/ date_desc: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 512 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M418.7 38c8.3 6 13.3 15.7 13.3 26l0 96 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-51.6-5.9 2c-16.8 5.6-34.9-3.5-40.5-20.2s3.5-34.9 20.2-40.5l48-16c9.8-3.3 20.5-1.6 28.8 4.4zM365.1 430.6l11.7-18c-32.9-9.9-56.8-40.5-56.8-76.6 0-44.2 35.8-80 80-80s80 35.8 80 80c0 22.9-6.6 45.3-19.1 64.5l-42.1 64.9c-9.6 14.8-29.4 19.1-44.3 9.4s-19.1-29.4-9.4-44.3zM424 336a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM150.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L96 370.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 306.7 41.4-41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-96 96z"/></svg>`,
    /*old*/ date_asc: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 512 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M230.6 390.6l-80 80c-12.5 12.5-32.8 12.5-45.3 0l-80-80c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L96 370.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 306.7 25.4-25.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zm134.5-184l11.7-18c-32.9-9.9-56.8-40.5-56.8-76.6 0-44.2 35.8-80 80-80s80 35.8 80 80c0 22.9-6.6 45.3-19.1 64.5l-42.1 64.9c-9.6 14.8-29.4 19.1-44.3 9.4s-19.1-29.4-9.4-44.3zM424 112a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm-5.3 182c8.3 6 13.3 15.7 13.3 26l0 96 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-51.6-5.9 2c-16.8 5.6-34.9-3.5-40.5-20.2s3.5-34.9 20.2-40.5l48-16c9.8-3.3 20.5-1.6 28.8 4.4z"/></svg>`,
    /*max*/ size_desc: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 576 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M246.6 374.6l-96 96c-12.5 12.5-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L96 370.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 306.7 41.4-41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-160 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L320 96z"/></svg>`,
    /*min*/ size_asc: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 576 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M246.6 374.6l-96 96c-12.5 12.5-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L96 370.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 306.7 41.4-41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM320 32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-160 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>`,
    /*top*/ rating_desc: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 512 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M171.5 38.8C192.3 4 236.5-10 274 7.6l7.2 3.8C316 32.3 330 76.5 312.4 114l0 0-14.1 30 109.7 0 7.4 .4c36.3 3.7 64.6 34.4 64.6 71.6 0 13.2-3.6 25.4-9.8 36 6.1 10.6 9.7 22.8 9.8 36 0 18.3-6.9 34.8-18 47.5 1.3 5.3 2 10.8 2 16.5 0 25.1-12.9 47-32.2 59.9-1.9 35.5-29.4 64.2-64.4 67.7l-7.4 .4-104.1 0c-18 0-35.9-3.4-52.6-9.9l-7.1-3-.7-.3-6.6-3.2-.7-.3-12.2-6.5c-12.3-6.5-23.3-14.7-32.9-24.1-4.1 26.9-27.3 47.4-55.3 47.4l-32 0c-30.9 0-56-25.1-56-56L0 200c0-30.9 25.1-56 56-56l32 0c10.8 0 20.9 3.1 29.5 8.5l50.1-106.5 .6-1.2 2.7-5 .6-.9zM56 192c-4.4 0-8 3.6-8 8l0 224c0 4.4 3.6 8 8 8l32 0c4.4 0 8-3.6 8-8l0-224c0-4.4-3.6-8-8-8l-32 0zM253.6 51c-14.8-6.9-32.3-1.6-40.7 12l-2.2 4-56.8 120.9c-3.5 7.5-5.5 15.5-6 23.7l-.1 4.2 0 112.9 .2 7.9c2.4 32.7 21.4 62.1 50.7 77.7l11.5 6.1 6.3 3.1c12.4 5.6 25.8 8.5 39.4 8.5l104.1 0 2.4-.1c12.1-1.2 21.6-11.5 21.6-23.9l-.2-2.6c-.1-.9-.2-1.7-.4-2.6-2.7-12.1 4.3-24.2 16-28 9.7-3.1 16.6-12.2 16.6-22.8 0-4.3-1.1-8.2-3.1-11.8-6.3-11.1-2.8-25.2 8-32 6.8-4.3 11.2-11.8 11.2-20.2 0-7.1-3.1-13.5-8.2-18-5.2-4.6-8.2-11.1-8.2-18s3-13.4 8.2-18c5.1-4.5 8.2-10.9 8.2-18l-.1-2.4c-1.1-11.3-10.1-20.3-21.4-21.4l-2.4-.1-147.5 0c-8.2 0-15.8-4.2-20.2-11.1-4.4-6.9-5-15.7-1.5-23.1L269 93.6c7-15 1.4-32.7-12.5-41L253.6 51z"/></svg>`,
    /*bad*/ rating_asc: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 512 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M360 32l7.4 .4c35 3.6 62.5 32.2 64.4 67.7 17.8 11.8 30.1 31.4 32 53.9l.2 6c0 5.7-.7 11.2-2 16.5 10.2 11.5 16.8 26.3 17.8 42.7l.2 4.8c0 13.2-3.6 25.4-9.8 36 4.9 8.4 8.2 17.9 9.3 28l.4 8c0 37.3-28.3 67.9-64.6 71.6l-7.4 .4-109.7 0 14.1 30 3.1 7.6c12.5 35.7-1.8 75.5-34.2 95l-7.2 3.9c-37.5 17.6-81.7 3.6-102.6-31.2l-.6-.9-2.7-5-.6-1.2-30.1-64c-9.4 17.8-28 29.9-49.5 29.9l-32 0c-30.9 0-56-25.1-56-56L0 152c0-30.9 25.1-56 56-56l32 0c12.4 0 23.9 4.1 33.2 11 13.2-21.4 32-39.4 55-51.6l12.2-6.5 .7-.3 6.6-3.2 .7-.3 7.1-3c16.7-6.6 34.5-9.9 52.6-9.9L360 32zM255.9 80c-12 0-23.9 2.3-35.1 6.6l-4.7 2-5.3 2.6 0 0-12.2 6.5c-29.2 15.5-48.3 44.9-50.7 77.6l-.2 8 0 112.9 .1 4.1c.5 8.2 2.5 16.2 6 23.7l56.8 120.9 2.1 3.8c8.4 13.7 26 19.1 40.8 12.2l2.9-1.6c13-7.8 18.7-23.7 13.7-38l-1.2-3-30.2-64.2c-3.5-7.4-2.9-16.1 1.5-23.1s12-11.1 20.2-11.1l147.5 0 2.4-.1c11.3-1.1 20.3-10.1 21.4-21.4l.1-2.5c0-7.1-3.1-13.5-8.2-18-5.2-4.6-8.2-11.1-8.2-18s3-13.4 8.2-18c4.4-3.9 7.4-9.3 8-15.3l.2-2.7c0-8.4-4.4-15.9-11.2-20.2-10.7-6.9-14.2-20.9-8-32 1.5-2.6 2.5-5.6 2.9-8.6l.2-3.2c0-10.6-6.9-19.6-16.6-22.8-11.7-3.8-18.7-15.9-16-28 .2-.9 .3-1.8 .4-2.6l.2-2.6c0-12.4-9.5-22.6-21.6-23.8L360 80 255.9 80zM56 144c-4.4 0-8 3.6-8 8l0 224c0 4.4 3.6 8 8 8l32 0c4.4 0 8-3.6 8-8l0-224c0-4.4-3.6-8-8-8l-32 0z"/></svg>`,
    /*Z-A*/ name_desc: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 512 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M230.6 390.6l-80 80c-12.5 12.5-32.8 12.5-45.3 0l-80-80c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L96 370.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 306.7 25.4-25.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM288 64c0-17.7 14.3-32 32-32l128 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L397.3 160 448 160c17.7 0 32 14.3 32 32s-14.3 32-32 32l-128 0c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L370.8 96 320 96c-17.7 0-32-14.3-32-32zM412.6 273.7l80 160c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3l-7.2-14.3-88.4 0-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9l80-160c5.4-10.8 16.5-17.7 28.6-17.7s23.2 6.8 28.6 17.7zM384 359.6l-20.2 40.4 40.4 0-20.2-40.4z"/></svg>`,
    /*A-Z*/ name_asc: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 512 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M230.6 390.6l-80 80c-12.5 12.5-32.8 12.5-45.3 0l-80-80c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L96 370.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 306.7 25.4-25.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zm182-340.9c50.7 101.3 77.3 154.7 80 160 7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3l-7.2-14.3-88.4 0-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9c2.7-5.3 29.3-58.7 80-160 5.4-10.8 16.5-17.7 28.6-17.7s23.2 6.8 28.6 17.7zM384 135.6l-20.2 40.4 40.4 0-20.2-40.4zM288 320c0-17.7 14.3-32 32-32l128 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L397.3 416 448 416c17.7 0 32 14.3 32 32s-14.3 32-32 32l-128 0c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l73.4-73.4-50.7 0c-17.7 0-32-14.3-32-32z"/></svg>`,
};

/** Loading */
export const loadingText = `<div class="reviews-loading">
    <span class="reviews-loading-circle"></span>
    <span>Загружаем...</span>
</div>`;

/** Tips */
const tip = `<span class='reviews-hint'>Обновите страницу или расширение.</span>`;
const tipConnection = `<span class='reviews-hint'>Проверьте интернет, VPN, анти-DPI или ограничения провайдера и попробуйте ещё раз.</span>`;

/** Labels */
export const fewCharactersText = `Введите хотя бы 2 символа`;
export const emptyCommentsList = `Отзывы отсутствуют`;

/** Errors */
export const unknownTypeText =
    `<span class="reviews-error">Неизвестный тип объекта</span>` + tip;
export const brokeReviewsText =
    `<span class="reviews-error">Отзывы сломаны</span>` + tip;
export const brokeSearchText =
    `<span class="reviews-error">Результаты сломаны</span>` + tip;
const networkErrorText =
    `<span class="reviews-error">До сервера не достучаться</span>` +
    tipConnection;
const serverErrorText = (status) => {
    `<span class="reviews-error">Сервер неожиданно ответил ${status}</span>` +
        tip;
};

export function statusReviewsText(status) {
    switch (status) {
        case 0:
            return networkErrorText;
        case 404:
            return `Отзывы отсутствуют`;
        default:
            return serverErrorText(status);
    }
}

export function statusSearchText(status) {
    switch (status) {
        case 0:
            return networkErrorText;
        case 404:
            return `Ничего не найдено`;
        default:
            return serverErrorText(status);
    }
}

/** Insights */
export const scoreFields = [
    { key: "teaching", name: "Преподавание" },
    { key: "student_attitude", name: "Отношение к студентам" },
    { key: "organization", name: "Организация" },
    { key: "grading_fairness", name: "Справедливость оценок" },
    { key: "strictness", name: "Требовательность" },
    { key: "workload", name: "Нагрузка" },
    { key: "difficulty", name: "Сложность" },
];

export function getBadgeMeta(metric, val) {
    const value = (val || "UNKNOWN").toUpperCase();

    let label = value;
    let colorClass = "insights-badge--gray";

    switch (value) {
        // Rating
        case "EXCELLENT":
            label = "Отлично";
            colorClass = "insights-badge--green";
            break;
        case "POSITIVE":
            label = "Хорошо";
            colorClass = "insights-badge--green";
            break;
        case "MIXED":
            label = "Смешанно";
            colorClass = "insights-badge--yellow";
            break;
        case "NEGATIVE":
            label = "Плохо";
            colorClass = "insights-badge--orange";
            break;
        case "TERRIBLE":
            label = "Ужасно";
            colorClass = "insights-badge--red";
            break;

        // Confidence
        case "HIGH":
            label = "Высокая";
            colorClass = "insights-badge--green";
            break;
        case "MEDIUM":
            label = "Средняя";
            colorClass = "insights-badge--blue";
            break;
        case "LOW":
            label = "Низкая";
            colorClass = "insights-badge--yellow";
            break;

        // Scores: Teaching, Student Attitude, Organization, Grading Fairness, Strictness, Workload, Difficulty
        case "VERY_HIGH":
            label = "Очень высокое";
            colorClass = "insights-badge--green";
            break;
        case "VERY_POSITIVE":
            label = "Очень позитивное";
            colorClass = "insights-badge--green";
            break;
        case "GOOD":
            label = "Хорошая";
            colorClass = "insights-badge--green";
            break;
        case "FAIR":
            label = "Справедливо";
            colorClass = "insights-badge--green";
            break;
        case "VERY_FAIR":
            label = "Очень справедливо";
            colorClass = "insights-badge--green";
            break;

        case "AVERAGE":
            label = "Средняя";
            colorClass = "insights-badge--yellow";
            break;
        case "NEUTRAL":
            label = "Нейтральное";
            colorClass = "insights-badge--yellow";
            break;
        case "MODERATE":
            label = "Умеренная";
            colorClass = "insights-badge--yellow";
            break;

        case "BELOW_AVERAGE":
            label = "Ниже среднего";
            colorClass = "insights-badge--orange";
            break;
        case "UNFAIR":
            label = "Несправедливо";
            colorClass = "insights-badge--orange";
            break;
        case "STRICT":
            label = "Строгий";
            colorClass = "insights-badge--orange";
            break;
        case "HEAVY":
            label = "Высокая";
            colorClass = "insights-badge--orange";
            break;
        case "HARD":
            label = "Сложно";
            colorClass = "insights-badge--orange";
            break;

        case "VERY_LOW":
            label = "Очень низкое";
            colorClass = "insights-badge--red";
            break;
        case "VERY_NEGATIVE":
            label = "Очень негативное";
            colorClass = "insights-badge--red";
            break;
        case "CHAOTIC":
            label = "Хаотичная";
            colorClass = "insights-badge--red";
            break;
        case "VERY_UNFAIR":
            label = "Очень несправедливо";
            colorClass = "insights-badge--red";
            break;
        case "VERY_STRICT":
            label = "Очень строгий";
            colorClass = "insights-badge--red";
            break;
        case "VERY_HEAVY":
            label = "Очень высокая";
            colorClass = "insights-badge--red";
            break;
        case "VERY_HARD":
            label = "Очень сложно";
            colorClass = "insights-badge--red";
            break;

        case "VERY_LENIENT":
            label = "Очень лояльный";
            colorClass = "insights-badge--blue";
            break;
        case "LENIENT":
            label = "Лояльный";
            colorClass = "insights-badge--blue";
            break;
        case "VERY_LIGHT":
            label = "Очень легкая";
            colorClass = "insights-badge--blue";
            break;
        case "LIGHT":
            label = "Легкая";
            colorClass = "insights-badge--blue";
            break;
        case "VERY_EASY":
            label = "Очень легко";
            colorClass = "insights-badge--blue";
            break;
        case "EASY":
            label = "Легко";
            colorClass = "insights-badge--blue";
            break;

        case "UNKNOWN":
        default:
            label = "Неизвестно";
            colorClass = "insights-badge--gray";
            break;
    }

    return { label, colorClass };
}
