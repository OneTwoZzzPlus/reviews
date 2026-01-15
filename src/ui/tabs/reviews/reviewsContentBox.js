import createComments from "./reviewsComments.js";
import createRating from "./reviewsRating.js";
import createSummaries from "./reviewsSummaries.js";


/** Создаём контент по преподавателю: рейтинг, отзывы и остальное
 * @param {Teacher} data
 */
export default function createReviewsContentBox(data) {
    if (!data ||
        !Array.isArray(data.summaries) ||
        !Array.isArray(data.comments) ||
        (data.summaries.length === 0 && data.comments.length === 0)
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

    return wrapper;
}
