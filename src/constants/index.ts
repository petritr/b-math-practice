import type { Locale, ScoreThreshold } from '@/types'
import { MedalKey } from '@/enums'

// ── Quiz
export const TOTAL_QUESTIONS = 10
export const FEEDBACK_DELAY_MS = 1400
export const MAX_RESULT = 20
export const ADDITION_MAX_A = 10
export const MAX_INPUT_DIGITS = 2
export const TIMER_INTERVAL_MS = 100

// ── Records / Storage
export const STORAGE_KEY = 'math-practice-records'
export const MAX_RECORDS = 10

// ── i18n
export const SUPPORTED_LOCALES = ['en', 'de'] as const
export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_LANG_MAP: Record<Locale, string> = {
  en: 'en-US',
  de: 'de-DE',
}

// ── Score Thresholds
export const SCORE_THRESHOLDS: ScoreThreshold[] = [
  { min: 100, key: MedalKey.Perfect, emoji: '🏆', color: '#f59e0b' },
  { min: 80, key: MedalKey.Excellent, emoji: '🥇', color: '#3b82f6' },
  { min: 60, key: MedalKey.Good, emoji: '🥈', color: '#22c55e' },
  { min: 40, key: MedalKey.KeepPracticing, emoji: '🥉', color: '#f97316' },
  { min: 0, key: MedalKey.KeepLearning, emoji: '📚', color: '#60a5fa' },
]

// ── Sound
export const FEMALE_VOICE_PATTERNS =
  /female|samantha|karen|victoria|fiona|moira|tessa|anna|petra|marlene|helena|zira|hazel|susan|jenny|aria/i

// ── UI
export const SCORE_RING_RADIUS = 52
export const TOUCH_DEBOUNCE_MS = 500
export const NUMPAD_ROWS = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['⌫', '0', '→'],
]
