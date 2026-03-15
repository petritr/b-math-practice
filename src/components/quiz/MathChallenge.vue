<script setup lang="ts">
import type { Question } from '@/types'
import { QuizPhase } from '@/enums'
import { useI18n } from '@/composables/useI18n'

defineProps<{
  question: Question
  inputValue: string
  phase: QuizPhase
  lastAnswerCorrect: boolean | null
}>()

const { t } = useI18n()
</script>

<template>
  <Transition
    name="pop"
    mode="out-in"
  >
    <div
      :key="question.id"
      class="flex items-center justify-center gap-2.5 bg-white/90 backdrop-blur-md rounded-card py-6 px-8 shadow-card text-problem font-black text-blue-950 w-full transition-[background,transform] duration-200 border border-white/50"
      :class="{
        '!bg-emerald-50/95 !border-emerald-200 scale-[1.03]':
          phase === QuizPhase.Feedback && lastAnswerCorrect,
        '!bg-red-50/95 !border-red-200 scale-[0.98]':
          phase === QuizPhase.Feedback && lastAnswerCorrect === false,
      }"
    >
      <span>{{ question.a }}</span>
      <span class="text-blue-500">{{ question.operation }}</span>
      <span>{{ question.b }}</span>
      <span class="text-slate-400">=</span>
      <span
        class="min-w-[2ch] text-center border-b-4 pb-0.5 transition-colors duration-150"
        :class="inputValue ? 'text-blue-600 border-blue-500' : 'text-slate-400 border-blue-200'"
      >
        {{ inputValue !== '' ? inputValue : '?' }}
      </span>
    </div>
  </Transition>

  <!-- Feedback banner -->
  <Transition name="slide-down">
    <div
      v-if="phase === QuizPhase.Feedback"
      class="w-full text-center py-3 px-4 rounded-2xl text-feedback font-bold"
      :class="
        lastAnswerCorrect
          ? 'bg-emerald-100/90 text-emerald-800 backdrop-blur-sm'
          : 'bg-red-100/90 text-red-800 backdrop-blur-sm'
      "
    >
      <span v-if="lastAnswerCorrect">{{ t.feedback.correct }}</span>
      <span v-else
        >{{ t.feedback.wrongPrefix }} <strong>{{ question.answer }}</strong></span
      >
    </div>
  </Transition>
</template>

<style>
.pop-enter-active,
.pop-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.pop-enter-from {
  opacity: 0;
  transform: scale(0.92);
}

.pop-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
