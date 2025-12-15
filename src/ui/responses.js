/** JSON responses
 * @typedef {{
 *   id: number,
 *   name: string,
 *   summaries: Array<any>,
 *   comments: Array<{
 *     date: string,
 *     text: string,
 *     subject?: { title: string },
 *     source?: { title: string, link: string },
 *   }>
 * }} TeacherResponse
 *
 * @typedef {{
 *   title: string,
 *   teachers: Array<TeacherResponse>
 * }} SubjectResponse
 *
 * @typedef {{
 *   results: Array<{
 *     id: number,
 *     name: string,
 *     type: string
 *   }>
 * }} SearchResponse
 */