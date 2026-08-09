"use strict";

import * as strings from "../strings.js";
import createReviewsContentBox from "../ui/tabs/reviews/reviewsContentBox.js";
import { fetchTeacher, fetchRegistry } from "../api/api.js";
import { useStorage, ChromeStorageAdapter } from "../api/storage.js";
useStorage(new ChromeStorageAdapter());

const INJECTED_ELEMENT_SELECTOR = "reviews";
const TITLE_CLASS = "person-info-label mt-3 mt-xl-2";
const REVIEW_HTML = `
<div class="border-top mt-3"></div>
<div class="${TITLE_CLASS}" id="${INJECTED_ELEMENT_SELECTOR}">
    ${strings.loadingText}
</div>
`;
const INSIGHTS_TITLE_HTML = `
<div class="person-info-label mt-3 mt-xl-2"><div class="text-gray-60 mb-2">
    Коротко по отзывам (ИИ):
</div></div>
`;
const SUMMARY_TITLE_HTML = `
<div class="person-info-label mt-3 mt-xl-2"><div class="text-gray-60 mb-2">
    Детали:
</div></div>
`;
const COMMENTS_TITLE_HTML = `
<div class="person-info-label mt-3 mt-xl-2"><div class="text-gray-60 mb-2">
    Отзывы:
</div></div>
`;

// --- Highlighting Styles ---
function injectStyles() {
    if (document.getElementById("teacher-highlight-styles")) return;

    const style = document.createElement("style");
    style.id = "teacher-highlight-styles";
    style.textContent = `
        .teacher-highlight {
            border-radius: 3px;
            padding: 0;
            transition: background-color 0.2s, color 0.2s;
        }

        /* (EXCELLENT) */
        .teacher-highlight.rating-excellent {
            background-color: var(--secondary-green-light);
            color: var(--secondary-green);
        }

        /* (POSITIVE) */
        .teacher-highlight.rating-positive {
            background-color: var(--secondary-green-light);
            color: var(--teal);
        }

        /* (MIXED) */
        .teacher-highlight.rating-mixed {
            background-color: var(--gray-12);
            color: var(--gray-80);
        }

        /* (NEGATIVE) */
        .teacher-highlight.rating-negative {
            background-color: var(--secondary-orange-light);
            color: var(--secondary-orange);
        }

        /* (TERRIBLE) */
        .teacher-highlight.rating-terrible {
            background-color: var(--secondary-red-light);
            color: var(--secondary-red);
        }
    `;
    document.head.appendChild(style);
}

// --- Highlighting Logic ---
let nameToIdMap = {};
let registryInsights = {};
let highlightTimer = null;
let isHighlighting = false;

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildNameToIdMap(registryResponse) {
    const map = {};
    const original = registryResponse?.original || {};

    for (const [fullName, id] of Object.entries(original)) {
        if (!id || fullName.toLowerCase() === "none") continue;

        const cleanName = fullName.trim();
        if (!cleanName) continue;

        map[cleanName] = id;

        const parts = cleanName.split(/\s+/);
        if (parts.length >= 3) {
            const surname = parts[0];
            const nameInit = parts[1][0];
            const patronymicInit = parts[2][0];

            map[`${surname} ${nameInit}. ${patronymicInit}.`] = id;
            map[`${surname} ${nameInit}.${patronymicInit}.`] = id;
        } else if (parts.length === 2) {
            const surname = parts[0];
            const nameInit = parts[1][0];

            map[`${surname} ${nameInit}.`] = id;
        }
    }
    return map;
}

function createTeacherRegex(names) {
    if (!names.length) return null;

    const patterns = names.map((name) => {
        return name
            .split(/\s+/)
            .map((part) => escapeRegExp(part).replace(/[еёЕЁ]/g, "[еёЕЁ]"))
            .join("[\\s\\u00a0]+");
    });

    const joined = patterns.join("|");
    return new RegExp(
        `(?<![а-яА-ЯёЁa-zA-Z0-9_])(${joined})(?![а-яА-ЯёЁa-zA-Z0-9_])`,
        "gi",
    );
}

function highlightTeachers(rootNode, map) {
    const names = Object.keys(map);
    if (!names.length) return;

    names.sort((a, b) => b.length - a.length);

    const pattern = createTeacherRegex(names);
    if (!pattern) return;

    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;

            const tag = parent.tagName;

            if (
                [
                    "SCRIPT",
                    "STYLE",
                    "NOSCRIPT",
                    "TEXTAREA",
                    "INPUT",
                    "SVG",
                ].includes(tag) ||
                parent.isContentEditable ||
                parent.classList.contains("teacher-highlight")
            ) {
                return NodeFilter.FILTER_REJECT;
            }

            if (
                parent.closest(".personalities__photo, .avatar, .photo") ||
                parent.style.backgroundImage ||
                parent.getAttribute("style")?.includes("background-image")
            ) {
                return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
        },
    });

    const nodesToProcess = [];
    let currentNode;

    while ((currentNode = walker.nextNode())) {
        pattern.lastIndex = 0;
        if (pattern.test(currentNode.nodeValue)) {
            nodesToProcess.push(currentNode);
        }
    }

    if (nodesToProcess.length === 0) return;

    isHighlighting = true;
    try {
        for (const textNode of nodesToProcess) {
            wrapTextMatches(textNode, pattern, map);
        }
    } catch (err) {
        console.error("[INJECTOR:HIGHLIGHT] Error during text wrapping:", err);
    } finally {
        isHighlighting = false;
    }
}

function wrapTextMatches(textNode, pattern, map) {
    const parent = textNode.parentNode;
    if (!parent) return;

    const text = textNode.nodeValue;
    const fragment = document.createDocumentFragment();

    let lastIndex = 0;
    pattern.lastIndex = 0;

    let match;
    while ((match = pattern.exec(text)) !== null) {
        const matchText = match[0];
        const matchIndex = match.index;

        if (matchIndex > lastIndex) {
            fragment.appendChild(
                document.createTextNode(text.slice(lastIndex, matchIndex)),
            );
        }

        const span = document.createElement("span");
        span.className = "teacher-highlight";
        span.textContent = matchText;

        const normalizedMatch = matchText
            .replace(/[\s\u00a0]+/g, " ")
            .toLowerCase();
        const matchedKey = Object.keys(map).find(
            (k) =>
                k.replace(/[\s\u00a0]+/g, " ").toLowerCase() ===
                normalizedMatch,
        );

        if (matchedKey) {
            const teacherId = map[matchedKey];
            span.dataset.teacherId = teacherId;

            const ratingValue = registryInsights?.[teacherId]?.rating_value;
            if (ratingValue && ratingValue !== "UNKNOWN") {
                span.classList.add(`rating-${ratingValue.toLowerCase()}`);
            }
        }

        fragment.appendChild(span);
        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(fragment, textNode);
}

// --- Injection Logic ---

export function createInjector(data) {
    return createReviewsContentBox(
        data,
        INSIGHTS_TITLE_HTML,
        SUMMARY_TITLE_HTML,
        COMMENTS_TITLE_HTML,
    );
}

function createReviewBlock(id) {
    const box = document.createElement("div");
    box.innerHTML = REVIEW_HTML;
    fetchTeacher(id).then(resolveReviewBlock, rejectReviewBlock);
    return box;
}

async function resolveReviewBlock(data) {
    const injected = document.querySelector("#" + INJECTED_ELEMENT_SELECTOR);

    const content = createInjector(data);
    if (content !== null) {
        injected.innerHTML = "";
        injected.append(content);
    } else {
        injected.innerHTML = strings.brokeReviewsText;
    }
}

async function rejectReviewBlock(status) {
    const injected = document.querySelector("#" + INJECTED_ELEMENT_SELECTOR);
    injected.className = TITLE_CLASS;
    if (injected) {
        injected.innerHTML = strings.statusReviewsText(status);
    }
}

function tryInjectReviews() {
    const match = location.pathname.match(/^\/persons\/(\d+)/);
    if (!match) return;

    const injected = document.querySelector("#" + INJECTED_ELEMENT_SELECTOR);
    if (injected) return;

    const injectable = document
        .querySelector("div.flex-grow-1.w-100.col-lg.col-12")
        ?.querySelector("div.card-body.p-3");
    if (!injectable) return;

    injectable.appendChild(createReviewBlock(match[1]));
    console.log("[INJECTOR:REVIEWS] Element injected");
}

async function observeChangeDOM() {
    console.log("[INJECTOR] Reviews script started");
    injectStyles();

    try {
        const response = await fetchRegistry();
        nameToIdMap = buildNameToIdMap(response);
        registryInsights = response?.insights || {};
        console.log(
            `[INJECTOR] Loaded ${Object.keys(nameToIdMap).length} name patterns and ${Object.keys(registryInsights).length} insights`,
        );
    } catch (err) {
        console.error("[INJECTOR] Failed to load registry:", err);
    }

    const observer = new MutationObserver(() => {
        if (isHighlighting) return;

        tryInjectReviews();

        if (Object.keys(nameToIdMap).length > 0) {
            clearTimeout(highlightTimer);
            highlightTimer = setTimeout(() => {
                highlightTeachers(document.body, nameToIdMap);
            }, 300);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    tryInjectReviews();
    if (Object.keys(nameToIdMap).length > 0) {
        highlightTeachers(document.body, nameToIdMap);
    }
}

observeChangeDOM();
