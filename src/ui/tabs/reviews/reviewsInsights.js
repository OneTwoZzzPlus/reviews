export default function createInsights(data) {
    const insights = document.createElement("div");
    insights.innerHTML = `
        <p>
            <span class="summary-title">Выжимка:</span> 
            <span class="summary-value">${data.summary ?? ""}</span>
        </p>
        <p>
            <span class="summary-title">Положительные моменты: </span>
            <span class="summary-value">
                ${data.pros.map((item) => `${item ?? ""}`).join(", ")}
            </span>
        </p>
        <p>
            <span class="summary-title">Отрицательные моменты: </span>
            <span class="summary-value">
                ${data.cons.map((item) => `${item ?? ""}`).join(", ")}
            </span>
        </p>
        <p>
            <span class="summary-title">Особенности: </span>
            <span class="summary-value">
                ${data.highlights.map((item) => `${item ?? ""}`).join(", ")}
            </span>
        </p>
        <p>
            <span class="summary-title">Общая оценка <strong>${data.rating.value}</strong>: </span>
            <span class="summary-value">${data.rating.reason}</span>
        </p>
        <p>
            <span class="summary-title">Надежность оценок <strong>${data.confidence.value}</strong>: </span>
            <span class="summary-value">${data.confidence.reason}</span>
        </p>
        <p>
            <span class="summary-title">teaching <strong>${data.scores.teaching.value}</strong>: </span>
            <span class="summary-value">${data.scores.teaching.reason}</span>
        </p>
        <p>
            <span class="summary-title">student_attitude <strong>${data.scores.student_attitude.value}</strong>: </span>
            <span class="summary-value">${data.scores.student_attitude.reason}</span>
        </p>
        <p>
            <span class="summary-title">organization <strong>${data.scores.organization.value}</strong>: </span>
            <span class="summary-value">${data.scores.organization.reason}</span>
        </p>
        <p>
            <span class="summary-title">grading_fairness <strong>${data.scores.grading_fairness.value}</strong>: </span>
            <span class="summary-value">${data.scores.grading_fairness.reason}</span>
        </p>
        <p>
            <span class="summary-title">strictness <strong>${data.scores.strictness.value}</strong>: </span>
            <span class="summary-value">${data.scores.strictness.reason}</span>
        </p>
        <p>
            <span class="summary-title">workload <strong>${data.scores.workload.value}</strong>: </span>
            <span class="summary-value">${data.scores.workload.reason}</span>
        </p>
        <p>
            <span class="summary-title">difficulty <strong>${data.scores.difficulty.value}</strong>: </span>
            <span class="summary-value">${data.scores.difficulty.reason}</span>
        </p>
    `;
    return insights;
}
