export function parseJwt(token) {
    try {
        const base64 = token.split('.')[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        const json = new TextDecoder('utf-8').decode(bytes);

        return JSON.parse(json);
    } catch (e) {
        console.error('Ошибка парсинга JWT', e);
        return null;
    }
}

export function parseCommentDate(dateStr) {
    if (!dateStr) return -Infinity;
    // "HH:MM DD.MM.YYYY"
    const match = dateStr.match(
        /(\d{2}):(\d{2})\s+(\d{2})\.(\d{2})\.(\d{4})/
    );
    if (!match) return -Infinity;
    const [, hh, mm, dd, MM, yyyy] = match;
    return new Date(
        Number(yyyy),
        Number(MM) - 1,
        Number(dd),
        Number(hh),
        Number(mm)
    ).getTime();
}
