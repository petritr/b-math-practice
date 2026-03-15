export const en = {
  appTitle: 'B Math',
  start: {
    headline: 'Ready to practice?',
    subtitle: '10 questions · + and −',
    button: 'Start',
  },
  questionProgress: (n: number, total: number) => `Question ${n} of ${total}`,
  feedback: {
    correct: '🎉 Correct!',
    wrongPrefix: 'The answer is',
  },
  result: {
    title: 'Quiz Complete!',
    perfect: 'Perfect score!',
    excellent: 'Excellent work!',
    good: 'Good job!',
    keepPracticing: 'Keep practicing!',
    keepLearning: "Let's keep learning!",
    score: (n: number, total: number) => `${n} out of ${total} correct`,
    newQuiz: 'New Quiz',
    timeLabel: 'Your time',
    bestTime: 'Personal best',
    newRecord: 'New record!',
    history: 'Recent runs',
    noHistory: 'No previous runs yet',
  },
}

export type Messages = typeof en
