import { SUPPORTED_LOCALES } from '@/constants'
import type { MedalKey } from '@/enums'

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export type Operation = '+' | '-'

export interface Question {
  id: number
  a: number
  b: number
  operation: Operation
  answer: number
}

export interface QuizResult {
  question: Question
  userAnswer: number | null
  isCorrect: boolean
}

export interface QuizRecord {
  date: number
  correctCount: number
  totalQuestions: number
  percentage: number
  timeMs: number
}

export interface ScoreThreshold {
  min: number
  key: MedalKey
  emoji: string
  color: string
}
