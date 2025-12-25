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
