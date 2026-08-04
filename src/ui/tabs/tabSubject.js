import createTeacherCard from "./reviews/reviewsTeacherCard.js";
import { getNonNegativeInt, parseCommentDate } from "../../utils.js";

/**
 * @param {Subject} data
 * */
export function createSubject(data) {
    if (!data || !Array.isArray(data.teachers)) return null;

    data.teachers.sort((a, b) => {
        const getLatestTime = (item) => {
            if (!item.comments || item.comments.length === 0) return 0;
            return item.comments.reduce((max, c) => {
                const current = getNonNegativeInt(parseCommentDate(c.date));
                return current > max ? current : max;
            }, 0);
        };

        const timeA = getLatestTime(a);
        const timeB = getLatestTime(b);

        if (timeB !== timeA) {
            return timeB - timeA;
        }

        return b.id - a.id;
    });

    const reviewBoxes = data.teachers.map((teacher) =>
        createTeacherCard(teacher),
    );
    if (reviewBoxes.some((box) => box === null)) return null;

    const wrapper = document.createElement("div");
    wrapper.classList.add("tcards");
    wrapper.innerHTML = `<h2>${data.title}</h2>`;
    data.teachers.forEach((teacher, i) => {
        wrapper.appendChild(reviewBoxes[i]);
    });
    return wrapper;
}
