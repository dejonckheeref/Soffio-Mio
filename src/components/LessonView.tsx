import type { Lesson } from '../types'
import { PHASE_NAMES } from '../types'
import HistorySection from './HistorySection'
import TechSection from './TechSection'
import SongSection from './SongSection'

interface Props {
  lesson: Lesson
  onBack: () => void
  completed: boolean
  onToggleComplete: () => void
}

export default function LessonView({ lesson, onBack, completed, onToggleComplete }: Props) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-fresco-gold/40 px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(14, 7, 2, 0.72)', backdropFilter: 'blur(8px)' }}>
        <button
          onClick={onBack}
          className="text-fresco-parchment/80 hover:text-fresco-gold transition-colors font-cinzel text-sm shrink-0"
          aria-label="Back to calendar"
        >
          ← Back
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-cinzel text-xs text-fresco-gold uppercase tracking-widest truncate">
            Day {lesson.day} · {PHASE_NAMES[lesson.phase]}
          </p>
          <h1 className="font-cinzel text-base font-semibold text-fresco-parchment leading-tight truncate">
            {lesson.title}
          </h1>
        </div>
        <button
          onClick={onToggleComplete}
          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
          className={[
            'shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            completed
              ? 'bg-fresco-gold border-fresco-gold text-fresco-bg'
              : 'bg-transparent border-fresco-gold/50 text-fresco-gold/50 hover:border-fresco-gold hover:text-fresco-gold',
          ].join(' ')}
        >
          ✓
        </button>
      </header>

      {/* Body */}
      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full space-y-5">
        <HistorySection lesson={lesson} />
        <TechSection lesson={lesson} />
        <SongSection lesson={lesson} />

        {/* Bottom complete button */}
        <div className="pt-2 pb-6 text-center">
          <button
            onClick={onToggleComplete}
            className={[
              'font-cinzel text-sm px-6 py-2.5 rounded border-2 transition-all duration-200',
              completed
                ? 'bg-fresco-gold border-fresco-gold text-fresco-bg hover:bg-fresco-gold/80'
                : 'bg-transparent border-fresco-gold text-fresco-gold hover:bg-fresco-gold/10',
            ].join(' ')}
          >
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
      </main>
    </div>
  )
}
