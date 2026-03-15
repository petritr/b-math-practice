<script setup lang="ts">
import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import type { QuizResult } from '@/types'

defineProps<{
  results: QuizResult[]
}>()
</script>

<template>
  <div
    class="w-full flex flex-col gap-1 max-h-44 overflow-y-auto"
    role="list"
  >
    <div
      v-for="(result, i) in results"
      :key="result.question.id"
      class="flex items-center gap-2 py-2 px-3 rounded-xl text-base font-semibold backdrop-blur-sm"
      :class="result.isCorrect ? 'bg-white/15 text-white' : 'bg-red-500/20 text-red-200'"
      role="listitem"
    >
      <span class="text-white/50 text-xs min-w-6">{{ i + 1 }}.</span>
      <span class="flex-1">
        {{ result.question.a }} {{ result.question.operation }} {{ result.question.b }} =
      </span>
      <span class="font-extrabold whitespace-nowrap">
        <template v-if="result.isCorrect">
          {{ result.question.answer }}
          <CheckIcon class="w-4 h-4 inline text-emerald-300" />
        </template>
        <template v-else>
          <s>{{ result.userAnswer ?? '—' }}</s>
          &nbsp;{{ result.question.answer }}
          <XMarkIcon class="w-4 h-4 inline text-red-300" />
        </template>
      </span>
    </div>
  </div>
</template>
