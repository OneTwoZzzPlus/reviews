/** Создаём блок параметр-значение */
export default function createSummaries(summariesData) {
    const summariesHTML = summariesData.map(item => `
        <div class="summary">
            <span class="summary-title">${item.title ?? ''}</span>: 
            <span class="summary-value">${item.value ?? ''}</span>
        </div>
    `).join('');

    const summaries = document.createElement('div');
    summaries.classList.add('summaries');
    summaries.innerHTML = summariesHTML;
    return summaries;
}
