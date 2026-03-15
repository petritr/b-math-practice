<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import { SUPPORTED_LOCALES } from '@/constants'

const { locale, setLocale } = useI18n()
</script>

<template>
  <div
    class="flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm p-1 border border-white/10"
  >
    <button
      v-for="lang in SUPPORTED_LOCALES"
      :key="lang"
      class="rounded-full px-3 py-1 text-sm font-bold transition-all duration-150"
      :class="
        locale === lang ? 'bg-white text-blue-700 shadow-sm' : 'text-white/70 hover:text-white'
      "
      @click="setLocale(lang)"
    >
      {{ lang.toUpperCase() }}
    </button>
  </div>
</template>
