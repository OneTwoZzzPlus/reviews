import createReviewsContentBox from "./reviews/reviewsContentBox.js";

/** Блок отзывов по предмету для popup
 * @param {Subject} data
 * */
export function createSubject(data) {
    if (!data || !Array.isArray(data.teachers)) return null;

    data.teachers.sort((a, b) => {
        const rating = b.rating - a.rating
        if (rating === 0) return b.id - a.id;
        return rating
    });

    const reviewBoxes = data.teachers.map(teacher => createReviewsContentBox(teacher));
    if (reviewBoxes.some(box => box === null)) return null;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<h2>${data.title}</h2>`;
    data.teachers.forEach((teacher, i) => {
        const box = document.createElement("details");
        box.innerHTML = `<summary class="reviews-title">${teacher.name}</summary>`;
        box.appendChild(reviewBoxes[i]);
        wrapper.appendChild(box);
    })
    return wrapper;
}