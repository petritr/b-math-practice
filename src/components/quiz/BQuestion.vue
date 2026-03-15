<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import MathChallenge from './MathChallenge.vue'
import NumberPad from './NumberPad.vue'
import type { Question } from '@/types'
import { QuizPhase } from '@/enums'

defineProps<{
  question: Question
  questionNumber: number
  totalQuestions: number
  inputValue: string
  phase: QuizPhase
  lastAnswerCorrect: boolean | null
  elapsedMs: number
}>()

const emit = defineEmits<{
  appendDigit: [digit: string]
  backspace: []
  submit: []
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-5 w-full">
    <ProgressBar
      :current="questionNumber"
      :total="totalQuestions"
      :elapsed-ms="elapsedMs"
    />

    <MathChallenge
      :question="question"
      :input-value="inputValue"
      :phase="phase"
      :last-answer-correct="lastAnswerCorrect"
    />

    <NumberPad
      v-if="phase === QuizPhase.Playing"
      :submit-disabled="!inputValue"
      @digit="emit('appendDigit', $event)"
      @backspace="emit('backspace')"
      @submit="emit('submit')"
    />
  </div>
</template>
