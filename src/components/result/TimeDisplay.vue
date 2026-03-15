<script setup lang="ts">
import { TrophyIcon } from '@heroicons/vue/20/solid'
import { formatTime } from '@/helpers/formatTime'
import { useI18n } from '@/composables/useI18n'

defineProps<{
  timeMs: number
  isNewRecord: boolean
  bestPerfectTime: number | null
}>()

const { t } = useI18n()
</script>

<template>
  <p class="text-white/90 font-bold text-center">
    {{ t.result.timeLabel }}: <strong>{{ formatTime(timeMs) }}</strong>
    <span
      v-if="isNewRecord"
      class="ml-2 text-amber-300 text-sm inline-flex items-center gap-0.5"
    >
      <TrophyIcon class="w-4 h-4 inline mr-0.5 text-amber-300" />{{ t.result.newRecord }}
    </span>
  </p>
  <p
    v-if="bestPerfectTime && !isNewRecord"
    class="text-white/60 text-sm text-center font-semibold"
  >
    {{ t.result.bestTime }}: {{ formatTime(bestPerfectTime) }}
  </p>
</template>
