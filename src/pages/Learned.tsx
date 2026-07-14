import { useEffect, useState } from 'react'
import { sb } from '../lib/supabase'
import type { Question } from '../lib/types'
import AlignedLine from '../components/AlignedLine'

interface LearnedItem {
  introduced_on: string
  stage: string
  question: Question
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

export default function Learned() {
  const [items, setItems] = useState<LearnedItem[]>([])
  const [openId, setOpenId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data, error } = await sb()
        .from('user_question_progress')
        .select(
          'introduced_on, stage, question:questions(id, position, prompt_en, prompt_hu, responses(*))'
        )
        .order('introduced_on', { ascending: false })
      if (error) {
        setError(error.message)
      } else {
        const rows = (data ?? []) as unknown as LearnedItem[]
        rows.forEach((r) => r.question.responses.sort((a, b) => a.position - b.position))
        rows.sort(
          (a, b) =>
            b.introduced_on.localeCompare(a.introduced_on) ||
            a.question.position - b.question.position
        )
        setItems(rows)
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return <p className="text-center text-zinc-400 py-16">Loading…</p>
  }
  if (error) {
    return <p className="text-center text-red-400 py-16 text-sm">{error}</p>
  }
  if (items.length === 0) {
    return (
      <div className="text-center py-16 space-y-2">
        <p className="text-3xl">📖</p>
        <p className="text-zinc-300 font-medium">Nothing learned yet</p>
        <p className="text-sm text-zinc-500">Cards you complete in Today will show up here.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      <p className="text-sm text-zinc-500">
        {items.length} card{items.length === 1 ? '' : 's'} learned
      </p>
      {items.map(({ question: q, introduced_on }) => {
        const open = openId === q.id
        return (
          <div key={q.id} className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <button
              onClick={() => setOpenId(open ? null : q.id)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors"
            >
              <span>
                <span className="block font-medium">{q.prompt_hu}</span>
                <span className="block text-sm text-zinc-400">{q.prompt_en}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0 text-xs text-zinc-500">
                {formatDate(introduced_on)}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${open ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
            {open && (
              <ul className="border-t border-zinc-800 px-4 py-3 space-y-2">
                {q.responses.map((r) => (
                  <li key={r.id} className="rounded-lg bg-zinc-800/60 px-3 py-2">
                    <p className="text-sm font-medium leading-relaxed">
                      {r.alignment ? <AlignedLine segments={r.alignment.hu} /> : r.text_hu}
                    </p>
                    {r.alignment ? (
                      <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
                        <AlignedLine segments={r.alignment.en} />
                      </p>
                    ) : (
                      r.text_en && <p className="text-xs text-zinc-400">{r.text_en}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
