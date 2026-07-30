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
export const symbols = { teacher: "👨‍🏫", subject: "📚", add: "➕" };

export const menuAddReviewBtnLabel = "Написать отзыв";
export const mainHeader = "Поиск отзывов";
export const addHeader = "Новый отзыв";
