<script setup lang="ts">
import { BackspaceIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useSound } from '@/composables/useSound'
import { TOUCH_DEBOUNCE_MS, NUMPAD_ROWS } from '@/constants'

defineProps<{
  submitDisabled?: boolean
}>()

const emit = defineEmits<{
  digit: [digit: string]
  backspace: []
  submit: []
}>()

const { playDigit } = useSound()

let lastTouchTime = 0
function handleKey(key: string, fromTouch = false): void {
  if (fromTouch) lastTouchTime = Date.now()
  else if (Date.now() - lastTouchTime < TOUCH_DEBOUNCE_MS) return
  if (key === '⌫') emit('backspace')
  else if (key === '→') emit('submit')
  else {
    playDigit()
    emit('digit', key)
  }
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2.5 w-full max-w-numpad mx-auto">
    <template
      v-for="row in NUMPAD_ROWS"
      :key="row.join('')"
    >
      <button
        v-for="key in row"
        :key="key"
        class="aspect-square rounded-numpad text-numkey font-bold flex items-center justify-center touch-manipulation select-none transition-[transform,box-shadow] duration-100 active:translate-y-[3px] disabled:opacity-40 disabled:cursor-not-allowed"
        :class="{
          'bg-white/90 backdrop-blur-sm text-blue-950 shadow-3d active:shadow-3d-pressed border border-white/50':
            key !== '⌫' && key !== '→',
          'bg-blue-200/60 backdrop-blur-sm text-blue-800 shadow-3d-soft active:shadow-3d-soft-pressed border border-blue-200/40':
            key === '⌫',
          'bg-blue-500 text-white shadow-3d-blue active:shadow-3d-blue-pressed border border-blue-400/50':
            key === '→',
        }"
        :disabled="key === '→' && submitDisabled"
        :aria-label="key === '⌫' ? 'Backspace' : key === '→' ? 'Submit answer' : key"
        @touchend.prevent="handleKey(key, true)"
        @click="handleKey(key)"
      >
        <BackspaceIcon
          v-if="key === '⌫'"
          class="w-6 h-6"
        />
        <ArrowRightIcon
          v-else-if="key === '→'"
          class="w-6 h-6"
        />
        <template v-else>{{ key }}</template>
      </button>
    </template>
  </div>
</template>
