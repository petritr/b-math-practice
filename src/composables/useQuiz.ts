import { ref, computed, onUnmounted } from 'vue'
import type { Question, Operation, QuizResult } from '@/types'
import { QuizPhase } from '@/enums'
import { useRecords } from './useRecords'
import { useSound } from './useSound'
import { useI18n } from './useI18n'
import {
  TOTAL_QUESTIONS,
  FEEDBACK_DELAY_MS,
  MAX_RESULT,
  ADDITION_MAX_A,
  MAX_INPUT_DIGITS,
  TIMER_INTERVAL_MS,
} from '@/constants'

function generateQuestion(id: number): Question {
  const operation: Operation = Math.random() > 0.5 ? '+' : '-'

  let a: number, b: number, answer: number

  if (operation === '+') {
    a = Math.floor(Math.random() * (ADDITION_MAX_A + 1))
    b = Math.floor(Math.random() * (MAX_RESULT + 1 - a))
    answer = a + b
  } else {
    a = Math.floor(Math.random() * (MAX_RESULT + 1))
    b = Math.floor(Math.random() * (a + 1))
    answer = a - b
  }

  return { id, a, b, operation, answer }
}

function generateQuestions(): Question[] {
  return Array.from({ length: TOTAL_QUESTIONS }, (_, i) => generateQuestion(i + 1))
}

export function useQuiz() {
  const { saveRecord } = useRecords()
  const { playCorrect, playWrong, playComplete, speakQuestion } = useSound()
  const { locale } = useI18n()

  const questions = ref<Question[]>(generateQuestions())
  const currentIndex = ref(0)
  const userAnswers = ref<(number | null)[]>(
    Array.from<number | null>({ length: TOTAL_QUESTIONS }).fill(null),
  )
  const phase = ref<QuizPhase>(QuizPhase.Idle)
  const inputValue = ref('')
  const lastAnswerCorrect = ref<boolean | null>(null)

  let startTime: number | null = null
  const elapsedMs = ref(0)
  let timerInterval: ReturnType<typeof setInterval> | null = null
  let feedbackTimeout: ReturnType<typeof setTimeout> | null = null

  function startTimer(): void {
    if (timerInterval !== null) clearInterval(timerInterval)
    startTime = Date.now()
    elapsedMs.value = 0
    timerInterval = setInterval(() => {
      if (startTime !== null) elapsedMs.value = Date.now() - startTime
    }, TIMER_INTERVAL_MS)
  }

  function stopTimer(): void {
    if (timerInterval !== null) {
      clearInterval(timerInterval)
      timerInterval = null
    }
    if (startTime !== null) elapsedMs.value = Date.now() - startTime
  }

  function clearFeedbackTimeout(): void {
    if (feedbackTimeout !== null) {
      clearTimeout(feedbackTimeout)
      feedbackTimeout = null
    }
  }

  onUnmounted(() => {
    stopTimer()
    clearFeedbackTimeout()
  })

  const currentQuestion = computed(() => questions.value[currentIndex.value] as Question)

  const results = computed<QuizResult[]>(() =>
    questions.value.map((q, i) => ({
      question: q,
      userAnswer: userAnswers.value[i] ?? null,
      isCorrect: userAnswers.value[i] === q.answer,
    })),
  )

  const correctCount = computed(() => results.value.filter((r) => r.isCorrect).length)

  const percentage = computed(() => Math.round((correctCount.value / TOTAL_QUESTIONS) * 100))

  function speakCurrentQuestion(): void {
    const q = questions.value[currentIndex.value]!
    speakQuestion(q.a, q.operation, q.b, locale.value)
  }

  function submitAnswer(): void {
    if (phase.value !== QuizPhase.Playing || inputValue.value === '') return

    const userAnswer = Number.parseInt(inputValue.value, 10)
    if (Number.isNaN(userAnswer)) return

    userAnswers.value[currentIndex.value] = userAnswer
    lastAnswerCorrect.value = userAnswer === currentQuestion.value?.answer

    if (lastAnswerCorrect.value) {
      playCorrect()
    } else {
      playWrong()
    }

    phase.value = QuizPhase.Feedback

    feedbackTimeout = setTimeout(() => {
      if (currentIndex.value < TOTAL_QUESTIONS - 1) {
        currentIndex.value++
        inputValue.value = ''
        phase.value = QuizPhase.Playing
        speakCurrentQuestion()
      } else {
        stopTimer()
        playComplete()
        saveRecord({
          date: Date.now(),
          correctCount: correctCount.value,
          totalQuestions: TOTAL_QUESTIONS,
          percentage: percentage.value,
          timeMs: elapsedMs.value,
        })
        phase.value = QuizPhase.Finished
      }
    }, FEEDBACK_DELAY_MS)
  }

  function appendDigit(digit: string): void {
    if (phase.value !== QuizPhase.Playing) return

    if (inputValue.value === '0') {
      inputValue.value = digit
      return
    }
    if (inputValue.value.length >= MAX_INPUT_DIGITS) return

    inputValue.value += digit
  }

  function backspace(): void {
    if (phase.value !== QuizPhase.Playing) return
    inputValue.value = inputValue.value.slice(0, -1)
  }

  function beginPlaying(): void {
    phase.value = QuizPhase.Playing
    startTimer()
    speakCurrentQuestion()
  }

  function start(): void {
    beginPlaying()
  }

  function reset(): void {
    clearFeedbackTimeout()
    questions.value = generateQuestions()
    currentIndex.value = 0
    userAnswers.value = Array.from<number | null>({
      length: TOTAL_QUESTIONS,
    }).fill(null)
    inputValue.value = ''
    lastAnswerCorrect.value = null
    beginPlaying()
  }

  return {
    currentQuestion,
    currentIndex,
    phase,
    inputValue,
    lastAnswerCorrect,
    results,
    correctCount,
    percentage,
    elapsedMs,
    start,
    submitAnswer,
    appendDigit,
    backspace,
    reset,
  }
}
