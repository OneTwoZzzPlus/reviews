export const noteText = "Происхождение отзывов не имеет отношения к ИТМО."

export const loadingText = "Загружаем...";

export const fewCharactersText = "Введите хотя бы 3 символа =]";
export const unknownTypeText = `<span class="error">Не понятно, что это такое :|</span>`;

export const brokeReviewsText = "Отзывы пришли сломанные =(";
export const brokeSearchText = "Результаты пришли сломанные =(";

/** Ошибки при загрузке отзывов **/
export function statusReviewsText(status) {
    let answer;
    switch (status) {
        case 0:
            answer = `<span class="error">Сервер с отзывами недоступен =(</span>`;
            break;
        case 404:
            answer = "Отзывы отсутствуют";
            break;
        default:
            answer = `Сервер прислал "${status}" вместо отзывов =(`
    }
    return answer;
}

/** Ошибки при загрузке поиска **/
export function statusSearchText(status) {
    let answer;
    switch (status) {
        case 0:
            answer = `<span class="error">Сервер с отзывами недоступен =(</span>`;
            break;
        case 400:
            answer = "Сервер говорит, что ему мало буков для поиска";
            break;
        case 404:
            answer = "Ничего не найдено";
            break;
        default:
            answer = `Сервер прислал "${status}" вместо отзывов =(`
    }
    return answer;
}

export function authText(isu, name) {
    return name ? `${name} (${isu})` : `${isu}`;
}