import { request, cachedRequest } from "./httpClient.js";

export async function fetchSearch(query, controller, strainer = null) {
    const options = strainer === null ? { query } : { query, strainer };

    return await cachedRequest(
        {
            key: `search_${JSON.stringify(options)}`,
            type: "ttl",
            ttlMs: 60 * 1000,
        },
        "GET",
        "/search",
        options,
        "optional",
    );
}

export async function fetchTeacher(id) {
    return await cachedRequest(
        { key: `teacher_${id}`, type: "eternal" },
        "GET",
        `/teacher/${id}`,
        {},
        "optional",
    );
}

export async function fetchSubject(id) {
    return await cachedRequest(
        { key: `subject_${id}`, type: "eternal" },
        "GET",
        `/subject/${id}`,
        {},
        "optional",
    );
}

export async function fetchSendSuggestion(body) {
    return await request("POST", `/suggestion`, body);
}
