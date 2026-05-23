import type { Lesson } from '../types'

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? 'star-filled' : 'star-empty'}>★</span>
      ))}
    </span>
  )
}

export default function SongSection({ lesson }: { lesson: Lesson }) {
  const { song } = lesson
  return (
    <div className="fresco-card p-6">
      <div className="flex items-start justify-between gap-4 mb-1">
        <h2 className="font-cinzel text-lg font-semibold text-fresco-brown">
          {song.title}
        </h2>
        <Stars n={song.difficulty} />
      </div>
      <div className="ornament-divider"><span>♬</span></div>
      <p className="font-garamond text-base leading-relaxed text-fresco-dark mb-4">
        {song.intro}
      </p>
      <pre className="tab-block mb-4">{song.tab}</pre>
      <p className="font-garamond text-sm italic text-fresco-rust leading-relaxed">
        {song.notes}
      </p>
    </div>
  )
}
