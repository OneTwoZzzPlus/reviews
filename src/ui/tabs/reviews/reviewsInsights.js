import * as strings from "../../../strings.js";

export default function createInsights(data, header) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("insights-wrap");

    const safeData = data || {};
    const rating = safeData.rating || {};
    const confidence = safeData.confidence || {};
    const scores = safeData.scores || {};
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
        ${header || `<h3>Коротко по отзывам (ИИ)</h3>`}

        <div class="insights">
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
                <span class="insights-summary-value">${safeData.summary ? safeData.summary : "Нет данных"}</span>
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

            <div class="insights-row insights-row--scores">
                <div class="insights-scores-grid">
                    ${strings.scoreFields
                        .map((field) =>
                            !scores[field.key]?.value ||
                            scores[field.key]?.value === "UNKNOWN"
                                ? ""
                                : `
                                <div class="insights-score-item">
                                    <span class="insights-label">${field.name}:</span>
                                    ${createBadgeHTML(field.key, scores[field.key])}
                                </div>
                            `,
                        )
                        .join("")}
                </div>
            </div>
        </div>
    `;

    wrapper.addEventListener("click", (e) => {
        const badge = e.target.closest(".insights-badge");
        if (badge) {
            const isExpanded = badge.classList.contains(
                "insights-badge--expanded",
            );
            wrapper
                .querySelectorAll(".insights-badge--expanded")
                .forEach((b) => {
                    if (b !== badge)
                        b.classList.remove("insights-badge--expanded");
                });
            badge.classList.toggle("insights-badge--expanded", !isExpanded);
            e.stopPropagation();
        } else {
            wrapper
                .querySelectorAll(".insights-badge--expanded")
                .forEach((b) => {
                    b.classList.remove("insights-badge--expanded");
                });
        }
    });

    return wrapper;
}
