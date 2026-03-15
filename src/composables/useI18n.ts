import { computed, ref } from 'vue'
import { en } from '@/locales/en'
import { de } from '@/locales/de'
import type { Messages } from '@/locales/en'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/constants'
import type { Locale } from '@/types'

const messages: Record<Locale, Messages> = { en, de }

function detectLocale(): Locale {
  return SUPPORTED_LOCALES.find((l) => navigator.language.startsWith(l)) ?? DEFAULT_LOCALE
}

const locale = ref<Locale>(detectLocale())

function setLocale(l: Locale): void {
  locale.value = l
}

export function useI18n() {
  const t = computed(() => messages[locale.value])
  return { locale, t, setLocale }
}
