import { parseCommentDate } from "../../../utils.js";

/** Создаём блок отзывов
 * @param {Array<Comment>} commentsData - Данные списка отзывов
 * @returns {HTMLDivElement}
 */
export default function createComments(commentsData) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comments-wrap");

    let commentsList = createCommentsList(commentsData);

    if (commentsData.length > 1) {
        const dropdown = createDropdown(commentsData);
        dropdown.addEventListener("change", (event) => {
            const model = parseInt(event.target.value);
            // console.log(`[UI] sorting model ${model}`);
            const newCL = createCommentsList(commentsData, model);
            wrapper.replaceChild(newCL, commentsList);
            commentsList = newCL;
        });
        wrapper.appendChild(dropdown);
    }
    wrapper.appendChild(commentsList);

    return wrapper;
}

/** Создаём отсортированный список отзывов
 * @param {Array<Comment>} commentsData - Данные списка отзывов
 * @param {number} model - Режим сортировки
 */
function createCommentsList(commentsData, model = 0) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comments");
    const sortedCommentsData = sortComments(commentsData, model);
    sortedCommentsData.map((cData) => wrapper.append(createComment(cData)));
    return wrapper;
}

/** Создание отзыва
 * @param {Comment} comment - Данные отзыва
 */
function createComment(comment) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comment");
    wrapper.innerHTML = `
        <div class="comment-head">
            Отзыв ${comment.date}
            ${comment?.subject ? ` по предмету "${comment.subject.title}"` : " "}
            ${comment?.source ? ` источник "<a href="${comment.source.link ?? ""}">${comment.source.title}</a>"` : ""}
        </div>
        <div>${comment.text}</div>
    `;
    return wrapper;
}

/** Выпадающий список моделей сортировки */
function createDropdown() {
    const wrapper = document.createElement("select");
    wrapper.name = "sort";
    wrapper.classList.add("comments-dropdown");
    wrapper.innerHTML = `
        <option value="0">Сначала новые</option>
        <option value="1">Сначала старые</option>`;
    return wrapper;
}

/** Сортировка массива комментариев согласно модели */
function sortComments(comments, model = 0) {
    return [...comments].sort((a, b) => {
        const timeA = parseCommentDate(a.date);
        const timeB = parseCommentDate(b.date);
        let diff;
        switch (model) {
            case 0:
                if (Number.isNaN(timeA) || Number.isNaN(timeB)) return 0;
                else return timeB - timeA;
            case 1:
                if (Number.isNaN(timeA) || Number.isNaN(timeB)) return 0;
                else return timeA - timeB;
            default:
                return 0;
        }
    });
}
