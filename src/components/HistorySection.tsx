import type { Lesson } from '../types'

export default function HistorySection({ lesson }: { lesson: Lesson }) {
  return (
    <div className="fresco-card p-6">
      <h2 className="font-cinzel text-lg font-semibold text-fresco-brown mb-1">
        {lesson.history.heading}
      </h2>
      <div className="ornament-divider"><span>✦</span></div>
      <p className="font-garamond text-base leading-relaxed text-fresco-dark">
        {lesson.history.body}
      </p>
    </div>
  )
}
