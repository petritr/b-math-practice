<script setup lang="ts">
import { computed } from 'vue'
import { SCORE_RING_RADIUS } from '@/constants'

const props = defineProps<{
  percentage: number
  trackStroke?: string
  fillStroke?: string
  strokeWidth?: number
}>()

const CIRCUMFERENCE = 2 * Math.PI * SCORE_RING_RADIUS
const dashOffset = computed(() => CIRCUMFERENCE - (props.percentage / 100) * CIRCUMFERENCE)
</script>

<template>
  <div class="relative inline-flex items-center justify-center">
    <svg
      width="140"
      height="140"
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <circle
        cx="60"
        cy="60"
        :r="SCORE_RING_RADIUS"
        fill="none"
        :stroke="trackStroke ?? 'rgba(255,255,255,0.2)'"
        :stroke-width="strokeWidth ?? 10"
      />
      <circle
        cx="60"
        cy="60"
        :r="SCORE_RING_RADIUS"
        fill="none"
        :stroke="fillStroke ?? 'white'"
        :stroke-width="strokeWidth ?? 10"
        stroke-linecap="round"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 60 60)"
        class="transition-dash"
      />
    </svg>
    <div class="absolute flex flex-col items-center leading-tight">
      <slot />
    </div>
  </div>
</template>
