import * as strings from "../strings.js";
import { router } from "./router.js";
import { createSearchEngine } from "./tabs/tabSearch.js";
import { createMainPage } from "./tabs/tabHome.js";
import { createTeacher } from "./tabs/tabTeacher.js";
import { createSubject } from "./tabs/tabSubject.js";
import { createSuggestionForm } from "./tabs/tabAddReview.js";
import { fetchTeacher, fetchSubject } from "../api/api.js";

let container;

export function createRoot() {
    container = document.querySelector("#reviews-container");
    const header = document.querySelector("#reviews-header");
    const overlay = createSearchEngine();

    router.init("/", strings.mainHeader, openMainPage);
    router.subscribe((params) => {
        container.innerHTML = "";
        overlay.innerHTML = "";
        header.innerHTML = params.header || strings.mainHeader;
    });
    router.route("/suggestion", { header: strings.addHeader }, openAddReview);
    router.route("/teacher/{id}", { header: strings.mainHeader }, openTeacher);
    router.route("/subject/{id}", { header: strings.mainHeader }, openSubject);
    router.start();
}

function openMainPage() {
    container.appendChild(createMainPage());
}

function openAddReview() {
    container.appendChild(createSuggestionForm());
}

async function openTeacher(params) {
    container.innerHTML = strings.loadingText;

    try {
        const data = await fetchTeacher(params.id);
        if (router.getPath() !== `/teacher/${params.id}`) return;
        const teacher = createTeacher(data);
        if (teacher === null || teacher === undefined) {
            container.innerHTML = strings.brokeReviewsText;
            return;
        }
        container.innerHTML = "";
        container.appendChild(teacher);
    } catch (status) {
        if (router.getPath() !== `/teacher/${params.id}`) return;
        container.innerHTML = strings.statusReviewsText(status);
    }
}

async function openSubject(params) {
    container.innerHTML = strings.loadingText;

    try {
        const data = await fetchSubject(params.id);
        if (router.getPath() !== `/subject/${params.id}`) return;
        const subject = createSubject(data);
        if (subject === null || subject === undefined) {
            container.innerHTML = strings.brokeReviewsText;
            return;
        }
        container.innerHTML = "";
        container.appendChild(subject);
    } catch (status) {
        if (router.getPath() !== `/subject/${params.id}`) return;
        container.innerHTML = strings.statusReviewsText(status);
    }
}
