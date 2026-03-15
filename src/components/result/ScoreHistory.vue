<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/20/solid'
import type { QuizRecord } from '@/types'
import { formatTime } from '@/helpers/formatTime'
import { useI18n } from '@/composables/useI18n'

defineProps<{
  records: QuizRecord[]
  bestPerfectTime: number | null
}>()

const { t, locale } = useI18n()

function formatDate(ts: number): string {
  return new Intl.DateTimeFormat(locale.value, {
    month: 'short',
    day: 'numeric',
  }).format(new Date(ts))
}
</script>

<template>
  <div class="w-full">
    <p class="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
      {{ t.result.history }}
    </p>
    <p
      v-if="!records.length"
      class="text-white/40 text-sm text-center font-semibold"
    >
      {{ t.result.noHistory }}
    </p>
    <div
      v-else
      class="flex flex-col gap-1 max-h-48 overflow-y-auto"
    >
      <div
        v-for="(rec, i) in records"
        :key="`${rec.date}-${i}`"
        class="flex items-center gap-2 py-1.5 px-3 rounded-xl text-sm font-semibold backdrop-blur-sm"
        :class="rec.percentage === 100 ? 'bg-white/15 text-white' : 'bg-white/8 text-white/70'"
      >
        <span class="text-white/40 w-5 shrink-0 text-xs">{{ i + 1 }}.</span>
        <span class="flex-1">{{ rec.correctCount }}/{{ rec.totalQuestions }}</span>
        <span class="tabular-nums">{{ formatTime(rec.timeMs) }}</span>
        <span class="text-white/40 text-xs">{{ formatDate(rec.date) }}</span>
        <StarIcon
          v-if="rec.percentage === 100 && rec.timeMs === bestPerfectTime"
          class="w-3.5 h-3.5 text-amber-300 shrink-0"
        />
      </div>
    </div>
  </div>
</template>
