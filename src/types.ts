export interface Lesson {
  day: number
  title: string
  phase: 1 | 2 | 3 | 4
  history: {
    heading: string
    body: string
  }
  technique: {
    heading: string
    body: string
    tab?: string
    tips: string[]
  }
  song: {
    title: string
    difficulty: 1 | 2 | 3 | 4 | 5
    intro: string
    tab: string
    notes: string
  }
}

export const PHASE_NAMES: Record<number, string> = {
  1: 'Foundations',
  2: 'Blues Roots',
  3: 'Intermediate Expression',
  4: 'Advanced Techniques',
}

export const PHASE_RANGES: Record<number, [number, number]> = {
  1: [1, 20],
  2: [21, 45],
  3: [46, 70],
  4: [71, 90],
}
