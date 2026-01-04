export const noteText = "Происхождение отзывов не имеет отношения к ИТМО."

export const loadingText = "Загружаем...";

export const fewCharactersText = "Введите хотя бы 3 символа =]";
export const unknownTypeText = `<span class="error">Не понятно, что это такое :|</span>`;

export const brokeReviewsText = "Отзывы пришли сломанные =(";
export const brokeSearchText = "Результаты пришли сломанные =(";

/** Ошибки при загрузке отзывов **/
export function statusReviewsText(status) {
    switch (status) {
        case 0: return `<span class="error">Сервер с отзывами недоступен =(</span>`;
        case 401: return "Сначала войдите, это быстро =)"
        case 404: return "Отзывы отсутствуют \\(O_o)/";
        default: return `Сервер прислал "${status}" вместо отзывов =(`
    }
}

/** Ошибки при загрузке поиска **/
export function statusSearchText(status) {
    switch (status) {
        case 0: return `<span class="error">Сервер с отзывами недоступен =(</span>`;
        case 401: return "Сначала войдите, это быстро =)"
        case 404: return "Ничего не найдено \\(O_o)/";
        default: return `Сервер прислал "${status}" вместо результатов поиска =(`
    }
}

export function authText(isu, name) {
    return name ? `${name} (${isu})` : `${isu}`;
}