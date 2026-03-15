<script setup lang="ts">
import { ClockIcon } from '@heroicons/vue/24/outline'
import { useI18n } from '@/composables/useI18n'
import { formatTime } from '@/helpers/formatTime'

const props = defineProps<{
  current: number
  total: number
  elapsedMs: number
}>()

const { t } = useI18n()
</script>

<template>
  <div>
    <div
      class="w-full h-2.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
      role="progressbar"
      :aria-valuemin="1"
      :aria-valuenow="current"
      :aria-valuemax="total"
    >
      <div
        class="h-full rounded-full transition-[width] duration-400 bg-progress-gradient"
        :style="{ width: `${(props.current / props.total) * 100}%` }"
      />
    </div>
    <div
      class="flex items-center justify-between w-full text-sm font-bold text-white/85 tracking-wide mt-5"
    >
      <span>{{ t.questionProgress(current, total) }}</span>
      <span class="flex items-center gap-1">
        <ClockIcon class="w-4 h-4 shrink-0" />
        {{ formatTime(elapsedMs) }}
      </span>
    </div>
  </div>
</template>
