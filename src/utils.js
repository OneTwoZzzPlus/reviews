export function parseCommentDate(dateStr) {
    if (!dateStr) return -Infinity;

    // "до YYYY"
    const untilMatch = dateStr.toLowerCase().match(/^до\s+(\d{4})$/);
    if (untilMatch) {
        const [, year] = untilMatch;
        // Return "00:00 01.01.YYYY"
        return new Date(Number(year), 0, 1, 0, 0).getTime();
    }

    // "HH:MM DD.MM.YYYY"
    const match = dateStr.match(/(\d{2}):(\d{2})\s+(\d{2})\.(\d{2})\.(\d{4})/);
    if (!match) {
        return -Infinity;
    }

    const [, hh, mm, dd, MM, yyyy] = match;
    return new Date(
        Number(yyyy),
        Number(MM) - 1,
        Number(dd),
        Number(hh),
        Number(mm),
    ).getTime();
}

export function normalizeString(str) {
    if (typeof str !== "string") return "";

    return str
        .normalize("NFKC") // нормализация Unicode (объединяет диакритики)
        .replace(/[\s\uFEFF\xA0]+/g, " ") // все пробельные символы в 1 пробел
        .trim(); // удаляем пробелы с концов
}

export function getNonNegativeInt(str) {
    if (/^\d+$/.test(str)) {
        return parseInt(str, 10);
    }

    return null;
}
