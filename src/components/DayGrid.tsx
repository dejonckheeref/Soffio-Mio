import { useMemo } from 'react'
import type { Lesson } from '../types'
import { PHASE_NAMES, PHASE_RANGES } from '../types'

interface Props {
  lessons: Lesson[]
  completedDays: Set<number>
  currentDay: number
  onSelectDay: (day: number) => void
}

// Solid parchment tiles with a colored left-border accent per phase
const PHASE_BORDER: Record<number, string> = {
  1: 'border-l-fresco-green',
  2: 'border-l-fresco-blue',
  3: 'border-l-fresco-rust',
  4: 'border-l-fresco-gold',
}

const PHASE_NUM_COLOR: Record<number, string> = {
  1: 'text-fresco-green',
  2: 'text-fresco-blue',
  3: 'text-fresco-rust',
  4: 'text-fresco-gold',
}

const PHASE_HEADER_COLORS: Record<number, string> = {
  1: 'text-fresco-green',
  2: 'text-fresco-blue',
  3: 'text-fresco-rust',
  4: 'text-fresco-gold',
}

export default function DayGrid({ lessons, completedDays, currentDay, onSelectDay }: Props) {
  const phases = useMemo(() => {
    return [1, 2, 3, 4].map((phase) => ({
      phase,
      range: PHASE_RANGES[phase],
      name: PHASE_NAMES[phase],
      lessons: lessons.filter((l) => l.phase === phase),
    }))
  }, [lessons])

  return (
    <div className="space-y-7">
      {phases.map(({ phase, name, range, lessons: phaseLessons }) => (
        <section key={phase}>
          {/* Phase header — frosted panel */}
          <div
            className="flex items-center gap-3 mb-2.5 px-3 py-1.5 rounded-md"
            style={{ background: 'rgba(20, 10, 3, 0.62)', backdropFilter: 'blur(4px)' }}
          >
            <h2 className={`font-cinzel text-sm font-semibold uppercase tracking-widest ${PHASE_HEADER_COLORS[phase]}`}>
              {name}
            </h2>
            <span className="font-garamond text-xs text-fresco-parchment/60">
              Days {range[0]}–{range[1]}
            </span>
          </div>

          {/* Tile grid */}
          <div className="grid grid-cols-5 gap-2">
            {phaseLessons.map((lesson) => {
              const done = completedDays.has(lesson.day)
              const isCurrent = lesson.day === currentDay
              return (
                <button
                  key={lesson.day}
                  onClick={() => onSelectDay(lesson.day)}
                  aria-label={`Day ${lesson.day}: ${lesson.title}`}
                  className={[
                    'day-tile relative border border-fresco-gold/40 border-l-4 rounded-md p-2 text-left',
                    'transition-all duration-150 hover:scale-105 active:scale-95',
                    PHASE_BORDER[phase],
                    isCurrent ? 'ring-2 ring-fresco-gold' : '',
                    done ? 'brightness-75' : '',
                  ].join(' ')}
                >
                  <span className={`block font-cinzel text-xs font-bold leading-none mb-0.5 ${PHASE_NUM_COLOR[phase]}`}>
                    {lesson.day}
                  </span>
                  <span className="block font-garamond text-[10px] leading-tight line-clamp-2 text-fresco-dark">
                    {lesson.title}
                  </span>
                  {done && (
                    <span className="absolute top-1 right-1 text-[9px] text-fresco-gold font-bold">✓</span>
                  )}
                  {isCurrent && !done && (
                    <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-fresco-gold" />
                  )}
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
