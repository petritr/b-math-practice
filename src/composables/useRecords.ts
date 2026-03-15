import { ref, computed } from 'vue'
import type { QuizRecord } from '@/types'
import { STORAGE_KEY, MAX_RECORDS } from '@/constants'

function loadFromStorage(): QuizRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

const records = ref<QuizRecord[]>(loadFromStorage())

export function useRecords() {
  const bestPerfectTime = computed(() => {
    const perfects = records.value.filter((r) => r.percentage === 100)
    return perfects.length ? Math.min(...perfects.map((r) => r.timeMs)) : null
  })

  function saveRecord(r: QuizRecord): void {
    records.value = [r, ...records.value]
      .sort((a, b) => b.percentage - a.percentage || a.timeMs - b.timeMs)
      .slice(0, MAX_RECORDS)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records.value))
    } catch {
      /* quota exceeded — data still in memory */
    }
  }

  return { records, bestPerfectTime, saveRecord }
}
