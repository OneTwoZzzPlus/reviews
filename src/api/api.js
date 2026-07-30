import { request, authRequest, cachedRequest } from "./httpClient.js";

export async function fetchSearch(query, controller, strainer = null) {
    const options = strainer === null ? { query } : { query, strainer };

    return await cachedRequest(
        { key: `search_${JSON.stringify(options)}`, type: 'ttl', ttlMs: 60 * 1000 },
        'GET',
        '/search',
        options,
        'optional'
    );
}

export async function fetchTeacher(id) {
    return await cachedRequest(
        { key: `teacher_${id}`, type: 'eternal' },
        'GET',
        `/teacher/${id}`,
        {},
        'optional'
    );
}

export async function fetchSubject(id) {
    return await cachedRequest(
        { key: `subject_${id}`, type: 'eternal' },
        'GET',
        `/subject/${id}`,
        {},
        'optional'
    );
}

export async function fetchTeacherRate(id, user_rating) {
    return await authRequest('POST', `/teacher/${id}/rate`, { user_rating });
}

export async function fetchCommentVote(id, user_karma) {
    return await authRequest('POST', `/comment/${id}/vote`, { user_karma });
}

export async function fetchSendSuggestion(body) {
    return await request('POST', `/suggestion`, body);
}

export async function fetchAuthPLogin(username, password) {
    return await request('POST', `/authp/login`, { username, password });
}

export async function fetchIsModerator() {
    return await authRequest('GET', `/mod`);
}

export async function fetchGetSuggestionList() {
    return await authRequest('GET', `/mod/suggestion`);
}

export async function fetchGetSuggestion(id) {
    return await authRequest('GET', `/mod/suggestion/${id}`);
}

export async function fetchCommitSuggestion(id, body) {
    return await authRequest('POST', `/mod/suggestion/${id}/commit`, body);
}

export async function fetchCancelSuggestion(id, status = 'rejected') {
    return await authRequest('POST', `/mod/suggestion/${id}/cancel`, { status });
}

export async function fetchUpsertTeacher(body) {
    return await authRequest('POST', `/mod/teacher`, body);
}

export async function fetchUpsertSubject(body) {
    return await authRequest('POST', `/mod/subject`, body);
}

export async function fetchInsertComment(body) {
    return await authRequest('POST', `/mod/comment`, body);
}

export async function fetchGSParser() {
    return await authRequest('GET', `/mod/gsparser`);
}
