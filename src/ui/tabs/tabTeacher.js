import createReviewsContentBox from "./reviews/reviewsContentBox.js";

/** Блок отзывов по учителю для popup
 * @param {Teacher} data
 * */
export function createTeacher(data, isAuth) {
    const reviewBox = createReviewsContentBox(data, isAuth);
    if (reviewBox === null) return null;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<h2>${data.name}</h2>`
    wrapper.appendChild(reviewBox);

    return wrapper;
}