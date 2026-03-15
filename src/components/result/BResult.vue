<script setup lang="ts">
import { computed } from 'vue'
import {
  TrophyIcon,
  StarIcon,
  HandThumbUpIcon,
  BoltIcon,
  AcademicCapIcon,
} from '@heroicons/vue/24/solid'
import { ArrowPathIcon } from '@heroicons/vue/20/solid'
import ScoreRing from './ScoreRing.vue'
import TimeDisplay from './TimeDisplay.vue'
import AnswerReview from './AnswerReview.vue'
import ScoreHistory from './ScoreHistory.vue'
import type { QuizResult, MedalKey } from '@/types'
import { SCORE_THRESHOLDS } from '@/constants'
import { useI18n } from '@/composables/useI18n'
import { useRecords } from '@/composables/useRecords'

const props = defineProps<{
  results: QuizResult[]
  correctCount: number
  totalQuestions: number
  percentage: number
  timeMs: number
}>()

const emit = defineEmits<{
  reset: []
}>()

const { t } = useI18n()
const { records, bestPerfectTime } = useRecords()

const medal = computed((): { key: MedalKey; color: string } => {
  const threshold = SCORE_THRESHOLDS.find(({ min }) => props.percentage >= min)!
  return { key: threshold.key, color: threshold.color }
})

const medalIconMap = {
  perfect: TrophyIcon,
  excellent: StarIcon,
  good: HandThumbUpIcon,
  keepPracticing: BoltIcon,
  keepLearning: AcademicCapIcon,
}

const medalIcon = computed(() => medalIconMap[medal.value.key])

const isNewRecord = computed(
  () => props.percentage === 100 && bestPerfectTime.value === props.timeMs,
)
</script>

<template>
  <div class="flex flex-col items-center gap-4 w-full">
    <h2 class="text-result-title font-black text-white text-center tracking-tight text-shadow-md">
      {{ t.result.title }}
    </h2>

    <!-- Score ring -->
    <ScoreRing :percentage="percentage">
      <component
        :is="medalIcon"
        class="w-10 h-10"
        :style="{ color: medal.color }"
      />
      <span class="text-result-pct font-black text-white leading-none">{{ percentage }}%</span>
    </ScoreRing>

    <p class="text-result-medal font-bold text-white">
      {{ t.result[medal.key] }}
    </p>
    <p class="text-base text-white/80 font-semibold">
      {{ t.result.score(correctCount, totalQuestions) }}
    </p>

    <TimeDisplay
      :time-ms="timeMs"
      :is-new-record="isNewRecord"
      :best-perfect-time="bestPerfectTime"
    />

    <AnswerReview :results="results" />

    <ScoreHistory
      :records="records"
      :best-perfect-time="bestPerfectTime"
    />

    <button
      class="mt-2 py-3.5 px-10 bg-white text-blue-700 rounded-full text-lg font-black shadow-3d transition-[transform,box-shadow] duration-100 touch-manipulation active:translate-y-[3px] active:shadow-3d-pressed"
      @click="emit('reset')"
    >
      <ArrowPathIcon class="w-4 h-4 inline mr-1.5" />{{ t.result.newQuiz }}
    </button>
  </div>
</template>
