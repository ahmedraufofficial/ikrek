/** A text chunk and the id linking it to its counterpart in the other language. */
export type AlignedSegment = [text: string, pairId: number]

export interface Alignment {
  hu: AlignedSegment[]
  en: AlignedSegment[]
}

export interface QuestionResponse {
  id: string
  question_id: string
  position: number
  text_hu: string
  text_en: string | null
  alignment: Alignment | null
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
