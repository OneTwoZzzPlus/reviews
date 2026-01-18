import createComments from "./reviewsComments.js";
import createRating from "./reviewsRating.js";
import createSummaries from "./reviewsSummaries.js";
import * as strings from "../../../strings.js";


/** Создаём контент по преподавателю: рейтинг, отзывы и остальное
 * @param {Teacher} data
 */
export default function createReviewsContentBox(data) {
    if (!data ||
        !Array.isArray(data.summaries) ||
        !Array.isArray(data.comments)
    ) return null;

    const wrapper = document.createElement('div');
    wrapper.classList.add("reviews-content-box");

    wrapper.appendChild(createRating(data.id, data.rating, data?.user_rating));
    if (data.summaries.length !== 0) {
        wrapper.appendChild(createSummaries(data.summaries));
    }
    if (data.comments.length !== 0) {
        wrapper.appendChild(createComments(data.comments));
    }
    if (data.summaries.length === 0 && data.comments.length === 0) {
        const comment = document.createElement('p')
        comment.classList.add("comment");
        comment.innerHTML = strings.emptyCommentsList;
        wrapper.appendChild(comment)
    }

    return wrapper;
}
