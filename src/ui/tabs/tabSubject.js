import createTeacherCard from "./reviews/reviewsTeacherCard.js";
import { getNonNegativeInt, parseCommentDate } from "../../utils.js";
import * as strings from "../../strings.js";

let currentSorting = "date_desc";

const getRating = (teacher) => {
    if (!teacher?.insights) return 0;
    const rate = {
        EXCELLENT: 5,
        POSITIVE: 4,
        MIXED: 3,
        UNKNOWN: 3,
        NEGATIVE: 2,
        TERRIBLE: 1,
    };
    return rate[teacher.insights.rating.value];
};

/**
 * @param {Subject} data
 */
export function createSubject(data) {
    if (!data || !Array.isArray(data.teachers)) return null;

    const wrapper = document.createElement("div");

    let teachersList = createTeachersList(data.teachers);

    if (data.teachers.length > 1) {
        wrapper.insertAdjacentHTML(
            "beforeend",
            `<div class="comments-header">
                <h2>${data.title}</h2>

                <div class="sort-buttons">
                    <button type="button" class="sort-btn active" data-model="0" title="Лучший рейтинг">
                        ${strings.sortings.rating_desc}
                    </button>
                    <button type="button" class="sort-btn" data-model="1" title="Худший рейтинг">
                        ${strings.sortings.rating_asc}
                    </button>
                    <button type="button" class="sort-btn" data-model="2" title="А–Я">
                        ${strings.sortings.name_asc}
                    </button>
                    <button type="button" class="sort-btn" data-model="3" title="Я–А">
                        ${strings.sortings.name_desc}
                    </button>
                </div>
            </div>`,
        );

        const sortContainer = wrapper.querySelector(".sort-buttons");

        sortContainer.addEventListener("click", (event) => {
            const btn = event.target.closest(".sort-btn");
            if (!btn) return;

            const model = parseInt(btn.dataset.model, 10);

            const newCL = createTeachersList(data.teachers, model);
            wrapper.replaceChild(newCL, teachersList);
            teachersList = newCL;

            sortContainer
                .querySelectorAll(".sort-btn")
                .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
        });
    } else {
        wrapper.insertAdjacentHTML("beforeend", `<h2>${data.title}</h2>`);
    }

    wrapper.appendChild(teachersList);

    return wrapper;
}

function createTeachersList(teachers, model = 0) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("tcards");

    sortTeachers(teachers, model)
        .map(createTeacherCard)
        .forEach((card) => card && wrapper.append(card));

    return wrapper;
}

function sortTeachers(teachers, model = 0) {
    return [...teachers].sort((a, b) => {
        switch (model) {
            case 0:
                return getRating(b) - getRating(a);
            case 1:
                return getRating(a) - getRating(b);
            case 2:
                return a.name.localeCompare(b.name, "ru");
            case 3:
                return b.name.localeCompare(a.name, "ru");
            default:
                return 0;
        }
    });
}
