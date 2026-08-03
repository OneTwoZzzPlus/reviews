import * as strings from "../../strings.js";
import { router } from "../router.js";
import { fetchSearch } from "../../api/api.js";

let input, inputReset, overlay;
let timeoutId = null;
let abortController = null;

export function createSearchEngine() {
    input = document.querySelector("#reviews-input");
    inputReset = document.querySelector("#reviews-input-reset");
    overlay = document.querySelector("#reviews-search-overlay");

    input.addEventListener("input", handleInputEvent);

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            clearTimeout(timeoutId);
            search();
        }
    });

    inputReset.addEventListener("click", resetSearch);

    return overlay;
}

function handleInputEvent() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(search, 300);
}

function resetSearch() {
    clearTimeout(timeoutId);
    abortController?.abort();
    overlay.innerHTML = "";
    input.value = "";
    input.focus();
}

async function search() {
    abortController?.abort();

    const name = input.value.trim();

    if (!name) {
        overlay.innerHTML = "";
        return;
    }

    if (name.length < 2) {
        overlay.innerHTML = strings.fewCharactersText;
        return;
    }

    overlay.innerHTML = strings.loadingText;
    abortController = new AbortController();

    try {
        const data = await fetchSearch(name, abortController?.signal);

        if (!data?.results || data.results.length === 0) {
            overlay.innerHTML = strings.statusSearchText(404);
            return;
        }

        const searchBox = createSearchOverlay(data, (id, type) =>
            router.go(`/${type}/${id}`),
        );

        if (searchBox) {
            overlay.innerHTML = "";
            overlay.appendChild(searchBox);
        } else {
            overlay.innerHTML = strings.brokeSearchText;
        }
    } catch (status) {
        if (status === -1) return;

        overlay.innerHTML = strings.statusSearchText(status);
    }
}

/**
 * @param {SearchResponse} data
 * @param {function} callback
 */
export function createSearchOverlay(data, callback) {
    const wrapper = document.createElement("div");
    wrapper.className = "search-list";

    data.results.forEach((s) => {
        const item = document.createElement("button");
        item.className = "search-item";
        item.innerHTML = `
            ${strings.symbols[s.type] || ""}
            ${s.title}
        `;
        item.addEventListener("click", async () =>
            callback(s.id, s.type, s.title),
        );
        wrapper.appendChild(item);
    });

    return wrapper;
}
