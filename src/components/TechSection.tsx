import type { Lesson } from '../types'

export default function TechSection({ lesson }: { lesson: Lesson }) {
  const { technique } = lesson
  return (
    <div className="fresco-card p-6">
      <h2 className="font-cinzel text-lg font-semibold text-fresco-brown mb-1">
        {technique.heading}
      </h2>
      <div className="ornament-divider"><span>♪</span></div>
      <p className="font-garamond text-base leading-relaxed text-fresco-dark mb-4">
        {technique.body}
      </p>
      {technique.tab && (
        <pre className="tab-block mb-4">{technique.tab}</pre>
      )}
      {technique.tips.length > 0 && (
        <ul className="space-y-1.5">
          {technique.tips.map((tip, i) => (
            <li key={i} className="flex gap-2 font-garamond text-sm text-fresco-dark">
              <span className="text-fresco-gold mt-0.5 shrink-0">◆</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
