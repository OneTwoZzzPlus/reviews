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
