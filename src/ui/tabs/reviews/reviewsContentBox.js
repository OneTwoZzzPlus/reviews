import createComments from "./reviewsComments.js";
import createSummaries from "./reviewsSummaries.js";
import reviewsInsights from "./reviewsInsights.js";
import * as strings from "../../../strings.js";

/**
 * @param {Teacher} data
 */
export default function createReviewsContentBox(
    data,
    insightsHeader,
    summariesHeader,
    commentsHeader,
) {
    if (
        !data ||
        !Array.isArray(data.summaries) ||
        !Array.isArray(data.comments)
    )
        return null;

    const wrapper = document.createElement("div");
    wrapper.classList.add("reviews-content-box");
    if (data.insights) {
        wrapper.appendChild(reviewsInsights(data.insights, insightsHeader));
    }
    if (data.summaries.length !== 0) {
        wrapper.appendChild(createSummaries(data.summaries, summariesHeader));
    }
    if (data.comments.length !== 0) {
        wrapper.appendChild(createComments(data.comments, commentsHeader));
    }
    if (data.summaries.length === 0 && data.comments.length === 0) {
        const comment = document.createElement("p");
        comment.classList.add("comment");
        comment.innerHTML = strings.emptyCommentsList;
        wrapper.appendChild(comment);
    }

    return wrapper;
}
