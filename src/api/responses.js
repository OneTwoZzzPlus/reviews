/** JSON responses
 * @typedef {{
 *   id: int,
 *   date: string,
 *   text: string,
 *   karma: int,
 *   user_karma?: int,
 *   subject?: { title: string },
 *   source?: { title: string, link: string },
 * }} Comment
 *
 * @typedef {{
 *   id: number,
 *   name: string,
 *   rating: float,
 *   user_rating?: int,
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
 *
 * @typedef {{
 *     isu: string|number?
 * }} JWTPayload
 *
 * @typedef {{
 *     access: string
 * }} ModeratorResponse
 *
 * @typedef {{
 *     access: string
 * }} SuggestionCancelResponse
 */