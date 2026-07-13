export interface QuestionResponse {
  id: string
  question_id: string
  position: number
  text_hu: string
  text_en: string | null
}

export interface Question {
  id: string
  position: number
  prompt_en: string
  prompt_hu: string
  responses: QuestionResponse[]
}

export interface QuestionProgress {
  user_id: string
  question_id: string
  stage: string
  introduced_on: string
}

/** Max new questions introduced per day. */
export const NEW_PER_DAY = 10
