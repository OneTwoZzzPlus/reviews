import * as strings from "../../strings.js";
import { router } from "../router.js";

import infoHtml from "./main/info.html";
import subjectsHtml from "./main/subjects.html";
import feedbackHtml from "./main/feedback.html";

export function createMainPage() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("home-wrapper");

    const targetSpecificHtml = IS_EXTENSION
        ? subjectsHtml + feedbackHtml
        : infoHtml + subjectsHtml + feedbackHtml;
    wrapper.innerHTML = targetSpecificHtml;

    wrapper.addEventListener("click", (e) => {
        const target = e.target.closest("[data-id], [data-action]");
        if (!target) return;

        const subjectId = target.getAttribute("data-id");
        if (subjectId) {
            router.go(`/subject/${subjectId}`);
            return;
        }

        const action = target.getAttribute("data-action");
        if (action) {
            console.log(target, action);
        }
    });

    return wrapper;
}
