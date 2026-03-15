<script setup lang="ts">
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/vue/24/outline'
import { useSound } from '@/composables/useSound'

const { muted, toggleMute } = useSound()
</script>

<template>
  <button
    class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white text-sm font-bold transition-colors duration-150 select-none border border-white/10"
    :aria-label="muted ? 'Unmute sounds' : 'Mute sounds'"
    :aria-pressed="muted"
    @click="toggleMute"
  >
    <SpeakerXMarkIcon
      v-if="muted"
      class="w-5 h-5"
    />
    <SpeakerWaveIcon
      v-else
      class="w-5 h-5"
    />
  </button>
</template>
