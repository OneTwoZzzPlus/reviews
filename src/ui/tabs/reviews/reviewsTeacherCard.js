import { router } from "../../router.js";
import * as strings from "../../../strings.js";

/**
 * @param {Teacher} data
 */
export default function createTeacherCard(data) {
    if (!data) return null;

    const wrapper = document.createElement("div");
    wrapper.classList.add("tcard");

    if (!data?.insights && !data?.alt) {
        wrapper.innerHTML = `
            <h3>${data.name}</h3>
            <i>У преподавателя нет отзывов</i>
        `;
        return wrapper;
    }

    wrapper.onclick = () => router.go(`/teacher/${data.id}`);
    wrapper.style = "cursor: pointer;";

    if (!data?.insights) {
        wrapper.innerHTML = `
            <h3>${data.name}</h3>
            ${data.alt}
            <div class="tcard-end">
                Подробнее
            </div>
        `;
        return wrapper;
    }

    const safeData = data?.insights || {};
    const rating = safeData.rating || {};
    const confidence = safeData.confidence || {};
    const summary = safeData.summary
        ? safeData.summary
        : data?.alt
          ? data?.alt
          : "Нет описания";
    const pros = Array.isArray(safeData.pros) ? safeData.pros : [];
    const cons = Array.isArray(safeData.cons) ? safeData.cons : [];
    const highlights = Array.isArray(safeData.highlights)
        ? safeData.highlights
        : [];

    function createBadgeHTML(metricName, scoreObj) {
        const val = scoreObj?.value;
        const reason = scoreObj?.reason ? String(scoreObj.reason).trim() : "";
        const meta = strings.getBadgeMeta(metricName, val);

        const reasonTooltipHTML = reason
            ? `<span class="insights-tooltip">${reason}</span>`
            : `<span class="insights-tooltip">Нет дополнительного описания</span>`;

        return `
            <span class="insights-badge ${meta.colorClass}" tabindex="0" role="button" aria-label="${meta.label}">
                ${meta.label}
                ${reasonTooltipHTML}
            </span>
        `.trim();
    }

    const prosHTML = pros
        .filter((item) => item && item.trim())
        .map(
            (item) =>
                `<span class="insights-tag insights-tag--pro">+ ${item.trim()}</span>`,
        )
        .join("");

    const highlightsHTML = highlights
        .filter((item) => item && item.trim())
        .map(
            (item) =>
                `<span class="insights-tag insights-tag--highlight">${item.trim()}</span>`,
        )
        .join("");

    const consHTML = cons
        .filter((item) => item && item.trim())
        .map(
            (item) =>
                `<span class="insights-tag insights-tag--con">- ${item.trim()}</span>`,
        )
        .join("");

    const hasTags = prosHTML || highlightsHTML || consHTML;

    wrapper.innerHTML = `
        <h3>${data.name}</h3>
        <div class="insights-row insights-row--overview">
            <div class="insights-item-inline">
                <span class="insights-label">Общая оценка:</span>
                ${createBadgeHTML("rating", rating)}
            </div>
            <div class="insights-item-inline">
                <span class="insights-label">Надежность оценок:</span>
                ${createBadgeHTML("confidence", confidence)}
            </div>
        </div>
        <div class="insights-row insights-row--summary">
                <span class="insights-summary-value">${summary}</span>
            </div>
        ${
            hasTags
                ? `
            <div class="insights-row insights-row--tags">
                <div class="insights-tags-list">
                    ${prosHTML}
                    ${highlightsHTML}
                    ${consHTML}
                </div>
            </div>
            `
                : ""
        }
        <div class="tcard-end">
            Подробнее
        </div>
    `;

    return wrapper;
}
