/** JSON responses
 *
 * @typedef {'UNKNOWN' | 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'} TeachingScore
 * @typedef {'UNKNOWN' | 'VERY_NEGATIVE' | 'NEGATIVE' | 'NEUTRAL' | 'POSITIVE' | 'VERY_POSITIVE'} StudentAttitudeScore
 * @typedef {'UNKNOWN' | 'CHAOTIC' | 'BELOW_AVERAGE' | 'AVERAGE' | 'GOOD' | 'EXCELLENT'} OrganizationScore
 * @typedef {'UNKNOWN' | 'VERY_UNFAIR' | 'UNFAIR' | 'MIXED' | 'FAIR' | 'VERY_FAIR'} GradingFairnessScore
 * @typedef {'UNKNOWN' | 'VERY_LENIENT' | 'LENIENT' | 'MODERATE' | 'STRICT' | 'VERY_STRICT'} StrictnessScore
 * @typedef {'UNKNOWN' | 'VERY_LIGHT' | 'LIGHT' | 'MODERATE' | 'HEAVY' | 'VERY_HEAVY'} WorkloadScore
 * @typedef {'UNKNOWN' | 'VERY_EASY' | 'EASY' | 'MODERATE' | 'HARD' | 'VERY_HARD'} DifficultyScore
 * @typedef {'UNKNOWN' | 'TERRIBLE' | 'NEGATIVE' | 'MIXED' | 'POSITIVE' | 'EXCELLENT'} RatingScore
 * @typedef {'LOW' | 'MEDIUM' | 'HIGH'} ConfidenceScore
 * @typedef {'teacher' | 'subject'} SearchType
 *
 * @typedef {{
 *   value: RatingScore,
 *   reason: string
 * }} Rating
 *
 * @typedef {{
 *   value: ConfidenceScore,
 *   reason: string
 * }} Confidence
 *
 * @typedef {{
 *   teaching: { value: TeachingScore, reason: string },
 *   student_attitude: { value: StudentAttitudeScore, reason: string },
 *   organization: { value: OrganizationScore, reason: string },
 *   grading_fairness: { value: GradingFairnessScore, reason: string },
 *   strictness: { value: StrictnessScore, reason: string },
 *   workload: { value: WorkloadScore, reason: string },
 *   difficulty: { value: DifficultyScore, reason: string }
 * }} Scores
 *
 * @typedef {{
 *   summary: string,
 *   pros: Array<string>,
 *   cons: Array<string>,
 *   highlights: Array<string>,
 *   scores: Scores,
 *   rating: Rating,
 *   confidence: Confidence
 * }} Insights
 *
 * @typedef {{
 *   summary: string,
 *   pros: Array<string>,
 *   cons: Array<string>,
 *   highlights: Array<string>,
 *   rating: Rating,
 *   confidence: Confidence
 * }} InsightsShort
 *
 * @typedef {{
 *   rating_value: RatingScore,
 *   confidence_value: ConfidenceScore
 * }} InsightsEssential
 *
 * @typedef {{
 *   id?: number | null,
 *   title: string
 * }} SubjectSchema
 *
 * @typedef {{
 *   id?: number | null,
 *   title: string,
 *   link?: string | null
 * }} SourceSchema
 *
 * @typedef {{
 *   id: number,
 *   date: string,
 *   text: string,
 *   subject: SubjectSchema,
 *   source: SourceSchema
 * }} Comment
 *
 * @typedef {{
 *   id?: number | null,
 *   title: string,
 *   value: string
 * }} Summary
 *
 * @typedef {{
 *   id: number,
 *   name: string,
 *   insights: Insights | null,
 *   summaries: Array<Summary>,
 *   comments: Array<Comment>
 * }} TeacherResponse
 *
 * @typedef {{
 *   id: number,
 *   name: string,
 *   insights?: InsightsShort | null,
 *   alt?: string | null
 * }} TeacherShort
 *
 * @typedef {{
 *   id?: number | null,
 *   title: string,
 *   teachers: Array<TeacherShort>
 * }} SubjectResponse
 *
 * @typedef {{
 *   id: number,
 *   title: string,
 *   type: SearchType
 * }} SearchItem
 *
 * @typedef {{
 *   results: Array<SearchItem>
 * }} SearchResponse
 *
 * @typedef {{
 *   original: Object<string, number>,
 *   normalized: Object<string, number>,
 *   insights: Object<string, InsightsEssential>
 * }} RegistryResponse
 *
 * @typedef {{
 *   id: number
 * }} SuggestionResponse
 */
