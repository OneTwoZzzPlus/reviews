export const loadingText = "Загружаем...";

const tip = "<br/>(обновите расширение/сайт)";
const tipConnection = "<br/>Попробуйте ещё раз (проверьте подключение к сети Интернет, VPN, анти-DPI, ограничения провайдера)";

export const fewCharactersText = "Введите хотя бы 2 символа =]";
export const unknownTypeText = `<span class="error">Не понятно, что это такое :|</span>` + tip;

export const brokeReviewsText = "Отзывы пришли сломанные =(" + tip;
export const brokeSearchText = "Результаты пришли сломанные =(" + tip;

export const emptyCommentsList = "Отзывы отсутствуют \\(O_o)/";

/** Ошибки при загрузке отзывов **/
export function statusReviewsText(status) {
    switch (status) {
        case 0: return `<span class="error">Сервер с отзывами недоступен =(</span>` + tipConnection;
        case 401: return "Сначала войдите, это быстро =)";
        case 404: return "Отзывы отсутствуют \\(O_o)/";
        default: return `Сервер прислал "${status}" вместо отзывов =(`;
    }
}

/** Ошибки при загрузке поиска **/
export function statusSearchText(status) {
    switch (status) {
        case 0: return `<span class="error">Сервер с отзывами недоступен =(</span>` + tipConnection;
        case 401: return "Сначала войдите, это быстро =)";
        case 404: return "Ничего не найдено \\(O_o)/";
        default: return `Сервер прислал "${status}" вместо результатов поиска =(`;
    }
}

/** Надпись о наличии токена */
export function authStatusText(isu, name) {
    return name ? `${name} (${isu})` : `${isu}`;
}

/** Иконки */
export const symbols = {"teacher": "👨‍🏫", "subject": "📚", "add": "➕"};

/** AuthP */
export const authpLabel = `Это авторизация по <b>ID.ITMO</b> через прокси.<br/>
Нажимая кнопку "Вход" вы даёте согласие на <b>обработку персональных данных</b>:<br/>
<i>Сайт обрабатывает уникальный идентификатор пользователя (ISU) для предотвращения накруток и обеспечения работы сервиса. <br/>
Данные не передаются третьим лицам. Пользователь может запросить удаление своих данных.</i>
`;

export const authpCredentials = "Неверные логин или пароль!"
export const authpError = "Проверьте логин и пароль! Процесс авторизации был нарушен"

export const loginBtnLabel = "Вход";
export const loginLoadingBtnLabel = "Вход ⌛";

/** Меню */
export const menuLogoutBtnLabel = `<span class="error">💔 Выйти из аккаунта</span>`;
export const menuAddReviewBtnLabel = "📝 Написать отзыв";
export const menuMyReviewBtnLabel = "📋 Модерация";

/** Заголовки */
export const mainHeader = "Поиск отзывов";
export const loginHeader = "Вход";
export const addHeader = "Новый отзыв";
export const moderationHeader = "Модерация";

/** Статусы предложки */
export const suggestionStatus = {"delayed": "на рассмотрении", "accepted": "опубликован", "rejected": "отклонён"}
export const suggestionSource = {0: "n/a", 1: "reviews", 2: "gs-parser"}
