import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Operation, Locale } from '@/types'
import { LOCALE_LANG_MAP, FEMALE_VOICE_PATTERNS } from '@/constants'

let audioCtx: AudioContext | null = null
const muted: Ref<boolean> = ref(false)

let voices: SpeechSynthesisVoice[] = []
if ('speechSynthesis' in globalThis) {
  voices = globalThis.speechSynthesis.getVoices()
  globalThis.speechSynthesis.addEventListener('voiceschanged', () => {
    voices = globalThis.speechSynthesis.getVoices()
  })
}

function isFemaleVoice(v: SpeechSynthesisVoice): boolean {
  return FEMALE_VOICE_PATTERNS.test(v.name)
}

function pickVoice(lang: string): SpeechSynthesisVoice | null {
  const prefix = lang.slice(0, 2)
  const matchesLang = voices.filter((v) => v.lang === lang)
  const matchesPrefix = voices.filter((v) => v.lang.startsWith(prefix))

  return (
    matchesLang.find(isFemaleVoice) ??
    matchesPrefix.find(isFemaleVoice) ??
    matchesLang[0] ??
    matchesPrefix[0] ??
    null
  )
}

function getCtx(): AudioContext | null {
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext()
    } catch {
      return null
    }
  }
  return audioCtx
}

function playTone(
  freq: number,
  type: OscillatorType,
  durationMs: number,
  gainVal: number,
  startOffsetSec: number = 0,
): void {
  const ctx = getCtx()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.value = freq
  gain.gain.value = gainVal

  osc.connect(gain)
  gain.connect(ctx.destination)

  const start = ctx.currentTime + startOffsetSec
  const end = start + durationMs / 1000

  osc.start(start)
  gain.gain.setValueAtTime(gainVal, start)
  gain.gain.exponentialRampToValueAtTime(0.0001, end)
  osc.stop(end)
  osc.onended = () => {
    osc.disconnect()
    gain.disconnect()
  }
}

function playDigit(): void {
  if (muted.value) return
  playTone(880, 'sine', 60, 0.15)
}

function playCorrect(): void {
  if (muted.value) return
  // C5=523, E5=659, G5=784
  playTone(523, 'sine', 120, 0.25, 0)
  playTone(659, 'sine', 120, 0.25, 0.12)
  playTone(784, 'sine', 120, 0.25, 0.24)
}

function playWrong(): void {
  if (muted.value) return
  playTone(220, 'square', 220, 0.15)
}

function playComplete(): void {
  if (muted.value) return
  // C5→E5→G5→C6 arpeggio
  playTone(523, 'sine', 130, 0.3, 0)
  playTone(659, 'sine', 130, 0.3, 0.13)
  playTone(784, 'sine', 130, 0.3, 0.26)
  playTone(1047, 'sine', 350, 0.3, 0.39)
}

function toggleMute(): void {
  muted.value = !muted.value
  if (muted.value) globalThis.speechSynthesis?.cancel()
}

function speakQuestion(a: number, operation: Operation, b: number, locale: Locale): void {
  if (muted.value) return
  if (!('speechSynthesis' in globalThis)) return
  globalThis.speechSynthesis.cancel()
  const lang = LOCALE_LANG_MAP[locale]
  const opWords: Record<Locale, { plus: string; minus: string }> = {
    en: { plus: 'plus', minus: 'minus' },
    de: { plus: 'plus', minus: 'minus' },
  }
  const word = operation === '+' ? opWords[locale].plus : opWords[locale].minus
  const text = `${a} ${word} ${b}`
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  const voice = pickVoice(lang)
  if (voice) utterance.voice = voice
  globalThis.speechSynthesis.speak(utterance)
}

export function useSound() {
  return {
    muted,
    toggleMute,
    playDigit,
    playCorrect,
    playWrong,
    playComplete,
    speakQuestion,
  }
}
