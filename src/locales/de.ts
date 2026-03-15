import type { Messages } from './en'

export const de: Messages = {
  appTitle: 'B Math',
  start: {
    headline: 'Bereit zum Üben?',
    subtitle: '10 Aufgaben · + und −',
    button: 'Starten',
  },
  questionProgress: (n: number, total: number) => `Frage ${n} von ${total}`,
  feedback: {
    correct: '🎉 Richtig!',
    wrongPrefix: 'Die Antwort ist',
  },
  result: {
    title: 'Quiz abgeschlossen!',
    perfect: 'Perfekte Punktzahl!',
    excellent: 'Ausgezeichnet!',
    good: 'Gut gemacht!',
    keepPracticing: 'Weiter üben!',
    keepLearning: 'Weiter so!',
    score: (n: number, total: number) => `${n} von ${total} richtig`,
    newQuiz: 'Neues Quiz',
    timeLabel: 'Deine Zeit',
    bestTime: 'Persönliche Bestzeit',
    newRecord: 'Neuer Rekord!',
    history: 'Letzte Läufe',
    noHistory: 'Noch keine Läufe',
  },
}
