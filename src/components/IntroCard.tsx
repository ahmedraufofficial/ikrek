import { useState } from 'react'
import type { Question } from '../lib/types'
import AlignedLine from './AlignedLine'

interface Props {
  question: Question
  onDone: () => void
}

/**
 * Introduction stage: the same card is shown twice — first with the
 * question in English, then in Hungarian — with the Hungarian responses
 * visible both times.
 */
export default function IntroCard({ question, onDone }: Props) {
  const [side, setSide] = useState<'en' | 'hu'>('en')

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1">
            {side === 'en' ? 'Question · English' : 'Kérdés · Magyar'}
          </p>
          <h2 className="text-2xl font-semibold">
            {side === 'en' ? question.prompt_en : question.prompt_hu}
          </h2>
        </div>

        <ul className="space-y-2">
          {question.responses.map((r) => (
            <li
              key={r.id}
              className="rounded-lg bg-zinc-800/60 border border-zinc-800 px-4 py-2.5"
            >
              <p className="font-medium leading-relaxed">
                {r.alignment ? <AlignedLine segments={r.alignment.hu} /> : r.text_hu}
              </p>
              {r.alignment ? (
                <p className="text-sm text-zinc-400 leading-relaxed mt-0.5">
                  <AlignedLine segments={r.alignment.en} />
                </p>
              ) : (
                r.text_en && <p className="text-sm text-zinc-400">{r.text_en}</p>
              )}
            </li>
          ))}
        </ul>

        {side === 'en' ? (
          <button
            onClick={() => setSide('hu')}
            className="w-full rounded-lg bg-zinc-100 text-zinc-900 hover:bg-white py-3 text-sm font-semibold transition-colors"
          >
            Show in Hungarian →
          </button>
        ) : (
          <button
            onClick={onDone}
            className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 py-3 text-sm font-semibold transition-colors"
          >
            Got it ✓
          </button>
        )}
      </div>
    </div>
  )
}
