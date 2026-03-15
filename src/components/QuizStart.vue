<script setup lang="ts">
import { useI18n } from '@/composables/useI18n.ts'

const { t } = useI18n()
defineEmits<{ start: [] }>()
</script>

<template>
  <div
    class="rounded-card-lg bg-white/90 backdrop-blur-md shadow-card-lg p-8 flex flex-col items-center gap-6 border border-white/40"
  >
    <div
      class="w-20 h-20 rounded-icon flex items-center justify-center shadow-glow-blue bg-icon-gradient"
    >
      <span class="text-white font-black text-4xl leading-none select-none text-shadow-sm">B</span>
    </div>

    <div class="text-center">
      <h2 class="text-2xl font-black text-slate-800 tracking-tight">
        {{ t.start.headline }}
      </h2>
      <p class="mt-1.5 text-sm text-slate-500 font-semibold">
        {{ t.start.subtitle }}
      </p>
    </div>

    <button
      class="w-full py-4 rounded-2xl text-white text-lg font-bold tracking-wide shadow-3d-start active:shadow-3d-start-pressed active:translate-y-1 transition-[transform,box-shadow] duration-100 bg-icon-gradient"
      @click="$emit('start')"
    >
      {{ t.start.button }}
    </button>
  </div>
</template>
