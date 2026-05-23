import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { lessons } from '../data/lessons'
import DayGrid from './DayGrid'
import LessonView from './LessonView'

const STORAGE_KEY = 'harmonica-completed-days'

function loadCompleted(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as number[])
  } catch {
    return new Set()
  }
}

function saveCompleted(days: Set<number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...days]))
}

export default function App() {
  const [completedDays, setCompletedDays] = useState<Set<number>>(loadCompleted)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    saveCompleted(completedDays)
  }, [completedDays])

  const currentDay = useMemo(() => {
    for (let d = 1; d <= 90; d++) {
      if (!completedDays.has(d)) return d
    }
    return 90
  }, [completedDays])

  const toggleComplete = useCallback((day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) next.delete(day)
      else next.add(day)
      return next
    })
  }, [])

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const lesson = selectedDay ? lessons.find((l) => l.day === selectedDay) ?? null : null

  if (lesson) {
    return (
      <>
        <div className="bg-fixed" aria-hidden="true" />
        <LessonView
          lesson={lesson}
          onBack={() => setSelectedDay(null)}
          completed={completedDays.has(lesson.day)}
          onToggleComplete={() => toggleComplete(lesson.day)}
        />
      </>
    )
  }

  return (
    <>
      <div className="bg-fixed" aria-hidden="true" />
      <div className="relative z-10">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      {/* Full viewport: painting visible, player front and center          */}
      <section
        className="relative flex flex-col items-center justify-end"
        style={{ height: '100svh' }}
      >
        {/* Bottom title block — gradient fade so text is legible */}
        <div
          className="w-full px-6 pt-16 pb-8 text-center"
          style={{
            background: 'linear-gradient(to top, rgba(14,7,2,0.82) 0%, rgba(14,7,2,0.45) 60%, transparent 100%)',
          }}
        >
          <p className="font-cinzel text-xs text-fresco-gold uppercase tracking-[0.35em] mb-2">
            A 90-Day Course
          </p>
          <h1 className="font-cinzel text-3xl font-bold text-fresco-parchment leading-tight mb-1"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
            90 Days of Harmonica
          </h1>
          <p className="font-garamond text-base text-fresco-parchment/70 mb-6">
            From your first breath to advanced blues
          </p>

          {/* Scroll-to-lessons button */}
          <button
            onClick={scrollToGrid}
            className="inline-flex flex-col items-center gap-1.5 group focus:outline-none"
            aria-label="Scroll to lessons"
          >
            <span className="font-cinzel text-xs text-fresco-gold uppercase tracking-widest
                             group-hover:text-fresco-gold-light transition-colors">
              Begin your journey
            </span>
            <span className="bounce-cue text-fresco-gold text-xl leading-none">↓</span>
          </button>
        </div>
      </section>

      {/* ── GRID SECTION ─────────────────────────────────────────────────── */}
      <div ref={gridRef}>
        {/* Sticky progress header */}
        <header
          className="sticky top-0 z-20 px-4 py-3 flex items-center justify-between border-b border-fresco-gold/30"
          style={{ background: 'rgba(14, 7, 2, 0.75)', backdropFilter: 'blur(8px)' }}
        >
          <div>
            <p className="font-cinzel text-xs text-fresco-gold uppercase tracking-widest leading-none mb-0.5">
              90 Days of Harmonica
            </p>
            <p className="font-garamond text-xs text-fresco-parchment/60">
              {completedDays.size} of 90 complete
            </p>
          </div>

          {/* Compact progress bar */}
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden border border-fresco-gold/20">
            <div
              className="h-full bg-fresco-gold rounded-full transition-all duration-500"
              style={{ width: `${(completedDays.size / 90) * 100}%` }}
            />
          </div>
        </header>

        <main className="px-4 py-6 max-w-lg mx-auto w-full">
          <DayGrid
            lessons={lessons}
            completedDays={completedDays}
            currentDay={currentDay}
            onSelectDay={setSelectedDay}
          />
        </main>

        <footer
          className="text-center py-3 font-garamond text-xs text-fresco-parchment/35"
          style={{ background: 'rgba(14, 7, 2, 0.40)' }}
        >
          10-hole diatonic C harmonica · Tap a day to begin
        </footer>
      </div>

    </div>
    </>
  )
}
