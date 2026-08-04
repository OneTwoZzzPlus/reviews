import { request, cachedRequest } from "./httpClient.js";

/**
 * @param {string} query
 * @param {AbortSignal} [signal]
 * @param {import('./responses.js').SearchType | null} [strainer]
 * @returns {Promise<import('./responses.js').SearchResponse>}
 */
export async function fetchSearch(query, signal, strainer = null) {
    const options = strainer === null ? { query } : { query, strainer };

    return await cachedRequest(
        `search_${JSON.stringify(options)}`,
        "GET",
        "/search",
        options,
        {},
        signal,
    );
}

/**
 * @param {number} id
 * @returns {Promise<import('./responses.js').TeacherResponse>}
 */
export async function fetchTeacher(id) {
    return await cachedRequest(`teacher_${id}`, "GET", `/teacher/${id}`);
}

/**
 * @param {number} id
 * @returns {Promise<import('./responses.js').SubjectResponse>}
 */
export async function fetchSubject(id) {
    return await cachedRequest(`subject_${id}`, "GET", `/subject/${id}`);
}

/**
 * @returns {Promise<import('./responses.js').RegistryResponse>}
 */
export async function fetchRegistry() {
    return await cachedRequest("registry", "GET", "/registry");
}

/**
 * @param {Object} body
 * @returns {Promise<import('./responses.js').SuggestionResponse>}
 */
export async function fetchSendSuggestion(body) {
    return await request("POST", `/suggestion`, body);
}
