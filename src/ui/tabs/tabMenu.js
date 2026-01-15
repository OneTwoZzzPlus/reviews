import * as strings from "../../strings.js";

/** Меню */
export function createMenu(logoutCallback) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("reviews-menu");

    const addReviewButton = document.createElement("button");
    addReviewButton.classList.add("reviews-menu-item");
    addReviewButton.innerHTML = strings.menuAddReviewBtnLabel;

    const logoutButton = document.createElement("button");
    logoutButton.classList.add("reviews-menu-item");
    logoutButton.innerHTML = strings.menuLogoutBtnLabel;
    logoutButton.addEventListener("click", logoutCallback)

    wrapper.appendChild(addReviewButton);
    wrapper.appendChild(logoutButton);

    return wrapper;
}
