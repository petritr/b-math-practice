<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import BQuestion from './components/quiz/BQuestion.vue'
import BResult from './components/result/BResult.vue'
import QuizStart from './components/QuizStart.vue'
import LanguageToggle from './components/LanguageToggle.vue'
import SoundToggle from './components/SoundToggle.vue'
import { useQuiz } from './composables/useQuiz'
import { useI18n } from './composables/useI18n'
import { QuizPhase } from './enums'
import { TOTAL_QUESTIONS } from './constants'

const {
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
} = useQuiz()

const { t } = useI18n()

function onKeydown(e: KeyboardEvent): void {
  if (phase.value !== QuizPhase.Playing) return

  if (e.key >= '0' && e.key <= '9') {
    appendDigit(e.key)
  } else if (e.key === 'Backspace') {
    backspace()
  } else if (e.key === 'Enter' || e.key === '=') {
    submitAnswer()
  }
}

onMounted(() => globalThis.addEventListener('keydown', onKeydown))
onUnmounted(() => globalThis.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div
    class="min-h-dvh flex items-center justify-center bg-app-gradient p-4 relative overflow-hidden"
  >
    <!-- Decorative background orbs -->
    <div
      class="bg-orb bg-orb--1"
      aria-hidden="true"
    />
    <div
      class="bg-orb bg-orb--2"
      aria-hidden="true"
    />
    <div
      class="bg-orb bg-orb--3"
      aria-hidden="true"
    />
    <div
      class="bg-orb bg-orb--4"
      aria-hidden="true"
    />

    <div class="fixed top-4 right-4 z-10 flex gap-2 items-center">
      <SoundToggle />
      <LanguageToggle />
    </div>
    <main class="w-full max-w-quiz flex flex-col gap-6 relative z-[1]">
      <header class="flex items-center justify-center gap-3">
        <span
          class="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white font-black text-lg"
          aria-hidden="true"
          >B</span
        >
        <h1 class="text-2xl font-black text-white tracking-tight text-shadow-md">
          {{ t.appTitle }}
        </h1>
      </header>

      <Transition
        name="fade"
        mode="out-in"
      >
        <QuizStart
          v-if="phase === QuizPhase.Idle"
          @start="start"
        />

        <BQuestion
          v-else-if="phase !== QuizPhase.Finished && currentQuestion"
          :question="currentQuestion"
          :question-number="currentIndex + 1"
          :total-questions="TOTAL_QUESTIONS"
          :input-value="inputValue"
          :phase="phase"
          :last-answer-correct="lastAnswerCorrect"
          :elapsed-ms="elapsedMs"
          @append-digit="appendDigit"
          @backspace="backspace"
          @submit="submitAnswer"
        />

        <BResult
          v-else
          :results="results"
          :correct-count="correctCount"
          :total-questions="TOTAL_QUESTIONS"
          :percentage="percentage"
          :time-ms="elapsedMs"
          @reset="reset"
        />
      </Transition>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}
</style>
