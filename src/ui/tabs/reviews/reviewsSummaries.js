export default function createSummaries(summariesData) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("summaries-wrap");
    wrapper.insertAdjacentHTML("beforeend", "<h3>Детали</h3>");

    const summariesHTML = summariesData
        .map(
            (item) => `
        <div class="summary">
            <span class="summary-title">${item.title ?? ""}</span>: 
            <span class="summary-value">${item.value ?? ""}</span>
        </div>
    `,
        )
        .join("");

    const summaries = document.createElement("div");
    summaries.classList.add("summaries");
    summaries.innerHTML = summariesHTML;

    wrapper.appendChild(summaries);

    return wrapper;
}
