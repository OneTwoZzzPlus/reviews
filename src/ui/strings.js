export const noteText = "Отзывы агрегированы из открытых источников"

export const loadingText = "Загружаем...";

const tip = "<br/>(обновите расширение)"

export const fewCharactersText = "Введите хотя бы 3 символа =]";
export const unknownTypeText = `<span class="error">Не понятно, что это такое :|</span>` + tip;

export const brokeReviewsText = "Отзывы пришли сломанные =(" + tip;
export const brokeSearchText = "Результаты пришли сломанные =(" + tip;

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

/** Надпись о наличии токена */
export function authStatusText(isu, name) {
    return name ? `${name} (${isu})` : `${isu}`;
}
