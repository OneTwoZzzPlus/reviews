import * as strings from "../strings.js";
import { router } from "./router.js";
import { createSearchEngine } from "./tabs/tabSearch.js";
import { createMainPage } from "./tabs/tabHome.js";
import { createTeacher } from "./tabs/tabTeacher.js";
import { createSubject } from "./tabs/tabSubject.js";
import { createSuggestionForm } from "./tabs/tabAddReview.js";
import { fetchTeacher, fetchSubject } from "../api/api.js";

let container, statusBox;

export function createRoot() {
    statusBox = document.querySelector("#reviews-status-box");
    container = document.querySelector("#reviews-container");
    const header = document.querySelector("#reviews-header");
    const overlay = createSearchEngine();

    router.init("/", strings.mainHeader, openMainPage);
    router.subscribe((params) => {
        statusBox.innerHTML = "";
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
    statusBox.innerHTML = strings.loadingText;
    switch (params.type) {
        case "teacher":
            fetchTeacher(params.id)
                .then((data) => {
                    const teacher = createTeacher(data);
                    if (teacher !== null) {
                        statusBox.innerHTML = "";
                        container.innerHTML = "";
                        container.appendChild(teacher);
                        return;
                    }
                    statusBox.innerHTML = strings.brokeReviewsText;
                })
                .catch((status) => {
                    statusBox.innerHTML = strings.statusReviewsText(status);
                });
            break;
        case "subject":
            fetchSubject(params.id)
                .then((data) => {
                    const subject = createSubject(data);
                    if (subject !== null) {
                        statusBox.innerHTML = "";
                        container.innerHTML = "";
                        container.appendChild(subject);
                        return;
                    }
                    statusBox.innerHTML = strings.brokeReviewsText;
                })
                .catch((status) => {
                    statusBox.innerHTML = strings.statusReviewsText(status);
                });
            break;
        default:
            console.error(`Неизвестный type ${params.type}`);
            statusBox.innerHTML = strings.unknownTypeText;
    }
}
