from typing import Literal

from pydantic import BaseModel, Field

SYSTEM_PROMPT = """
Ты анализируешь отзывы студентов о преподавателе.

Тебе будет передан список отзывов. Отзывы могут быть противоречивыми, эмоциональными, содержать шутки, сленг и субъективные мнения.

Пиши отзывы для студентов

Правила:
1. Делай выводы только на основании предоставленных отзывов.
2. Не выдумывай факты и характеристики, которых нет в отзывах.
3. Если данных недостаточно или отзывы слишком противоречивы, используй значение "UNKNOWN".
4. Оценивай только то, что действительно можно определить из отзывов.
5. Не используй Markdown.
6. Верни только корректный JSON без пояснений.
7. Summary должен быть объективным и нейтральным.
8. Для pros, cons и highlights выбирай только наиболее часто встречающиеся утверждения.
9. Если для pros, cons или highlights недостаточно данных — верни пустой массив.
10. Для каждого score обязательно укажи: value — одно из значений enum; reason — краткое объяснение (предложение на 10-20 слов), почему выбрана именно эта оценка (оставь пустыми, если данных недостаточно value=UNKNOWN).
11. Строгость (strictness), нагрузка (workload) и сложность курса (difficulty) сами по себе не являются достоинствами или недостатками.
12. Если отзывы относятся к разным предметам одного преподавателя, сделай общий вывод по преподавателю, а не по конкретной дисциплине.
13. Студенты любят халяву, можешь слегка (но не делай это основным фактором) повышать итоговый рейтинг, если можно списать и прочее.
14. Если большинство отзывов говорят о крутости препода, а некоторые выбиваются бери моду, не давай выбросам влиять на rating. И наоборот, если жалоб много и эти жалобы обоснованы, можешь занижать.
15. Не бойся ставить очень плохую или очень хорошую оценку, особенно если об этом говорят студенты.
"""


class TeachingScore(BaseModel):
    value: Literal["UNKNOWN", "VERY_LOW", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"]
    reason: str = Field(description="Краткое объяснение (предложение на 10-20 слов).")


class StudentAttitudeScore(BaseModel):
    value: Literal[
        "UNKNOWN", "VERY_NEGATIVE", "NEGATIVE", "NEUTRAL", "POSITIVE", "VERY_POSITIVE"
    ]
    reason: str = Field(description="Краткое объяснение (предложение на 10-20 слов).")


class OrganizationScore(BaseModel):
    value: Literal[
        "UNKNOWN", "CHAOTIC", "BELOW_AVERAGE", "AVERAGE", "GOOD", "EXCELLENT"
    ]
    reason: str = Field(description="Краткое объяснение (предложение на 10-20 слов).")


class GradingFairnessScore(BaseModel):
    value: Literal["UNKNOWN", "VERY_UNFAIR", "UNFAIR", "MIXED", "FAIR", "VERY_FAIR"]
    reason: str = Field(description="Краткое объяснение (предложение на 10-20 слов).")


class StrictnessScore(BaseModel):
    value: Literal[
        "UNKNOWN", "VERY_LENIENT", "LENIENT", "MODERATE", "STRICT", "VERY_STRICT"
    ]
    reason: str = Field(description="Краткое объяснение (предложение на 10-20 слов).")


class WorkloadScore(BaseModel):
    value: Literal["UNKNOWN", "VERY_LIGHT", "LIGHT", "MODERATE", "HEAVY", "VERY_HEAVY"]
    reason: str = Field(description="Краткое объяснение (предложение на 10-20 слов).")


class DifficultyScore(BaseModel):
    value: Literal["UNKNOWN", "VERY_EASY", "EASY", "MODERATE", "HARD", "VERY_HARD"]
    reason: str = Field(description="Краткое объяснение (предложение на 10-20 слов).")


class Scores(BaseModel):
    teaching: TeachingScore = Field(
        description="Насколько понятно и качественно преподаватель объясняет материал."
    )
    student_attitude: StudentAttitudeScore = Field(
        description="Отношение к студентам: уважительность, готовность помочь, открытость к вопросам."
    )
    organization: OrganizationScore = Field(
        description="Организация курса: своевременная проверка работ, понятные требования, соблюдение сроков."
    )
    grading_fairness: GradingFairnessScore = Field(
        description="Насколько справедливо и последовательно преподаватель оценивает знания студентов."
    )
    strictness: StrictnessScore = Field(
        description="Требовательность преподавателя. Не считай высокую строгость недостатком."
    )
    workload: WorkloadScore = Field(
        description="Объем домашних заданий, лабораторных работ и другой учебной нагрузки."
    )
    difficulty: DifficultyScore = Field(
        description="Насколько сложно успешно пройти курс и получить хорошую итоговую оценку."
    )


class RatingScore(BaseModel):
    value: Literal["UNKNOWN", "TERRIBLE", "NEGATIVE", "MIXED", "POSITIVE", "EXCELLENT"]
    reason: str = Field(description="Краткое объяснение (предложение на 10-20 слов).")


class ConfidenceScore(BaseModel):
    value: Literal["LOW", "MEDIUM", "HIGH"]
    reason: str = Field(description="Краткое объяснение (предложение на 10-20 слов).")


class Evaluation(BaseModel):
    summary: str = Field(
        description="Краткое объективное описание преподавателя (2-4 предложения). Укажи сильные стороны, слабые стороны и общий стиль преподавания. Не упоминай имя."
    )
    pros: list[str] = Field(
        description="Наиболее часто встречающиеся достоинства (по 1-3 слова). Если данных недостаточно — пустой массив."
    )
    cons: list[str] = Field(
        description="Наиболее часто встречающиеся недостатки (по 1-3 слова). Если данных недостаточно — пустой массив."
    )
    highlights: list[str] = Field(
        description="Особенности преподавателя (по 1-3 слова), которые важны, но их нельзя считать ни достоинствами, ни недостатками. Если данных недостаточно — пустой массив."
    )
    scores: Scores
    rating: RatingScore = Field(
        description="Общая оценка преподавателя. Учитывай качество преподавания, отношение к студентам, организацию курса, справедливость оценивания и общую удовлетворенность студентов. Не понижай оценку только из-за высокой строгости, большой нагрузки или сложности курса."
    )
    confidence: ConfidenceScore = Field(
        description="Насколько надежны выводы с учетом количества отзывов и степени их согласованности."
    )
