/** JSON responses
 * @typedef {{
 *   id: int,
 *   date: string,
 *   text: string,
 *   subject?: { title: string },
 *   source?: { title: string, link: string },
 * }} Comment
 *
 * @typedef {{
 *   id: number,
 *   name: string,
 *   summaries: Array<any>,
 *   comments: Array<Comment>
 * }} Teacher
 *
 * @typedef {{
 *   title: string,
 *   teachers: Array<Teacher>
 * }} Subject
 *
 * @typedef {{
 *   results: Array<{
 *     id: number,
 *     name: string,
 *     type: string
 *   }>
 * }} SearchResponse
 */
