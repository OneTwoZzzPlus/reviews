export function getISU(token) {
    const payload = parseJwt(token);
    if (!payload?.isu) return null;
    return payload.isu
}

export function parseJwt(token) {
    try {
        const base64 = token.split('.')[1];
        const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(json);
    } catch (e) {
        console.error('Ошибка парсинга JWT', e);
        return null;
    }
}