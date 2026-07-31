import { request, cachedRequest } from "./httpClient.js";

export async function fetchSearch(query, controller, strainer = null) {
    const options = strainer === null ? { query } : { query, strainer };

    return await cachedRequest(
        `search_${JSON.stringify(options)}`,
        "GET",
        "/search",
        options,
        {},
        controller?.signal,
    );
}

export async function fetchTeacher(id) {
    return await cachedRequest(`teacher_${id}`, "GET", `/teacher/${id}`);
}

export async function fetchSubject(id) {
    return await cachedRequest(`subject_${id}`, "GET", `/subject/${id}`);
}

export async function fetchSendSuggestion(body) {
    return await request("POST", `/suggestion`, body);
}
