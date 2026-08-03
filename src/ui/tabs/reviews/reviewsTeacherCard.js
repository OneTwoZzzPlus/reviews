import { router } from "../../router.js";

/**
 * @param {Teacher} data
 */
export default function createTeacherCard(data) {
    if (!data) return null;

    const wrapper = document.createElement("div");
    wrapper.onclick = () => router.go(`/teacher/${data.id}`);
    wrapper.style = "cursor: pointer;";
    wrapper.classList.add("comment");
    wrapper.innerHTML = `
        <h3>${data.name}</h3>
        ${
            data.insights
                ? `
            <p>
                <i>Краткая выжимка: </i>
            </p>
            <p>
            ${data.insights.summary}
            </p>
            <p>
                <i>Общая оценка:</i> ${data.insights.rating.value}
            </p>
            <p>
                <i>Надежность оценок:</i> ${data.insights.confidence.value}
            </p>
            <p>
                <strong>К отзывам</strong>
            </p>
            `
                : data.alt
                  ? `
            ${data.alt}
            <p>
                <strong>Больше отзывов</strong>
            </p>
            `
                  : "У преподавателя нет отзывов"
        }
    `;

    return wrapper;
}
