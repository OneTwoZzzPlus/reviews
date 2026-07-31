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
    router.route("/{type}/{id}", { header: strings.mainHeader }, load);
    router.start();
}

function openMainPage() {
    container.appendChild(createMainPage());
}

function openAddReview() {
    container.appendChild(createSuggestionForm());
}

async function load(params) {
    container.innerHTML = strings.loadingText;
    switch (params.type) {
        case "teacher":
            fetchTeacher(params.id)
                .then((data) => {
                    if (router.getPath() !== `/teacher/${data.id}`) return;
                    const teacher = createTeacher(data);
                    if (teacher !== null) {
                        container.innerHTML = "";
                        container.appendChild(teacher);
                        return;
                    }
                    container.innerHTML = strings.brokeReviewsText;
                })
                .catch((status) => {
                    container.innerHTML = strings.statusReviewsText(status);
                });
            break;
        case "subject":
            fetchSubject(params.id)
                .then((data) => {
                    if (router.getPath() !== `/subject/${data.id}`) return;
                    const subject = createSubject(data);
                    if (subject !== null) {
                        container.innerHTML = "";
                        container.appendChild(subject);
                        return;
                    }
                    container.innerHTML = strings.brokeReviewsText;
                })
                .catch((status) => {
                    container.innerHTML = strings.statusReviewsText(status);
                });
            break;
        default:
            console.error(`Unknown search item type ${params.type}`);
            container.innerHTML = strings.unknownTypeText;
    }
}
