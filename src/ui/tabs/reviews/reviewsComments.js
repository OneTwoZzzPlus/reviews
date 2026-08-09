import { parseCommentDate } from "../../../utils.js";
import * as strings from "../../../strings.js";

/**
 * @param {Array<Comment>} data
 * @returns {HTMLDivElement}
 */
export default function createComments(data, header) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comments-wrap");

    let commentsList = createCommentsList(data);

    if (data.length > 1) {
        wrapper.insertAdjacentHTML(
            "beforeend",
            `<div class="comments-header">
                ${header || `<h3>Отзывы</h3>`}
                <div class="sort-buttons">
                    <button type="button" class="sort-btn active" data-model="0" title="Сначала новые">
                        ${strings.sortings.date_desc}
                    </button>
                    <button type="button" class="sort-btn" data-model="1" title="Сначала старые">
                        ${strings.sortings.date_asc}
                    </button>
                    <button type="button" class="sort-btn" data-model="2" title="Сначала длинные">
                        ${strings.sortings.size_desc}
                    </button>
                    <button type="button" class="sort-btn" data-model="3" title="Сначала короткие">
                        ${strings.sortings.size_asc}
                    </button>
                </div>
            </div>`,
        );

        const sortContainer = wrapper.querySelector(".sort-buttons");

        sortContainer.addEventListener("click", (event) => {
            const btn = event.target.closest(".sort-btn");
            if (!btn) return;

            const model = parseInt(btn.dataset.model, 10);

            const newCL = createCommentsList(data, model);
            wrapper.replaceChild(newCL, commentsList);
            commentsList = newCL;

            sortContainer
                .querySelectorAll(".sort-btn")
                .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
        });
    } else {
        wrapper.insertAdjacentHTML(
            "beforeend",
            `<div class="comments-header" style="margin: 7px 0;">
                ${header || `<h3>Отзыв</h3>`}
            </div>`,
        );
    }

    wrapper.appendChild(commentsList);

    return wrapper;
}

/**
 * @param {Array<Comment>} commentsData
 * @param {number} model
 */
function createCommentsList(commentsData, model = 0) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comments");
    const sortedCommentsData = sortComments(commentsData, model);
    sortedCommentsData.map((cData) => wrapper.append(createComment(cData)));
    return wrapper;
}

/**
 * @param {Comment} comment
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

function sortComments(comments, model = 0) {
    return [...comments].sort((a, b) => {
        const timeA = parseCommentDate(a.date);
        const timeB = parseCommentDate(b.date);

        switch (model) {
            case 0:
                if (Number.isNaN(timeA) || Number.isNaN(timeB)) return 0;
                return timeB - timeA;
            case 1:
                if (Number.isNaN(timeA) || Number.isNaN(timeB)) return 0;
                return timeA - timeB;
            case 2:
                return (b.text?.length || 0) - (a.text?.length || 0);
            case 3:
                return (a.text?.length || 0) - (b.text?.length || 0);
            default:
                return 0;
        }
    });
}
