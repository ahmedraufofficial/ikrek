import { useCallback, useEffect, useState } from 'react'
import { sb } from '../lib/supabase'
import { NEW_PER_DAY, type Question } from '../lib/types'
import { useAuth } from '../hooks/useAuth'
import IntroCard from '../components/IntroCard'

function localDate(): string {
  return new Date().toLocaleDateString('en-CA') // YYYY-MM-DD
}

export default function Today() {
  const { session } = useAuth()
  const [queue, setQueue] = useState<Question[]>([])
  const [introducedToday, setIntroducedToday] = useState(0)
  const [totalDone, setTotalDone] = useState(0)
  const [dayNumber, setDayNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [restarting, setRestarting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const today = localDate()
      const [{ data: progress, error: pErr }, { data: questions, error: qErr }] =
        await Promise.all([
          sb().from('user_question_progress').select('question_id, introduced_on'),
          sb()
            .from('questions')
            .select('id, position, prompt_en, prompt_hu, responses(*)')
            .order('position'),
        ])
      if (pErr) throw pErr
      if (qErr) throw qErr

      const doneIds = new Set((progress ?? []).map((p) => p.question_id))
      const doneToday = (progress ?? []).filter((p) => p.introduced_on === today).length
      const remaining = Math.max(0, NEW_PER_DAY - doneToday)

      // Day N = one past each earlier learning day; today counts as the next one.
      const pastDays = new Set(
        (progress ?? []).filter((p) => p.introduced_on !== today).map((p) => p.introduced_on)
      ).size

      const next = (questions ?? [])
        .filter((q) => !doneIds.has(q.id))
        .slice(0, remaining)
        .map((q) => ({
          ...q,
          responses: [...q.responses].sort((a, b) => a.position - b.position),
        }))

      setDayNumber(pastDays + 1)
      setIntroducedToday(doneToday)
      setTotalDone(doneIds.size)
      setQueue(next)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function completeCurrent() {
    const current = queue[0]
    if (!current || !session) return
    const { error } = await sb().from('user_question_progress').upsert({
      user_id: session.user.id,
      question_id: current.id,
      stage: 'introduced',
      introduced_on: localDate(),
    })
    if (error) {
      setError(error.message)
      return
    }
    setQueue((q) => q.slice(1))
    setIntroducedToday((n) => n + 1)
    setTotalDone((n) => n + 1)
  }

  async function restartDay() {
    if (!session) return
    if (!window.confirm(`Restart Day ${dayNumber}? Today's progress will be cleared.`)) return
    setRestarting(true)
    const { error } = await sb()
      .from('user_question_progress')
      .delete()
      .eq('user_id', session.user.id)
      .eq('introduced_on', localDate())
    setRestarting(false)
    if (error) {
      setError(error.message)
      return
    }
    await load()
  }

  if (loading) {
    return <p className="text-center text-zinc-400 py-16">Loading…</p>
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 text-sm text-zinc-400">
        <p>
          Day {dayNumber} ·{' '}
          <span className="text-zinc-200 font-medium">
            {introducedToday}/{NEW_PER_DAY}
          </span>{' '}
          new cards
        </p>
        {introducedToday > 0 && (
          <button
            onClick={restartDay}
            disabled={restarting}
            className="text-xs text-zinc-500 hover:text-zinc-300 underline underline-offset-2 disabled:opacity-50"
          >
            {restarting ? 'Restarting…' : 'Restart day'}
          </button>
        )}
      </div>

      <div className="w-full flex justify-center">
        {error ? (
          <div className="text-center space-y-3">
            <p className="text-red-400 text-sm">{error}</p>
            <button onClick={load} className="text-sm text-zinc-400 hover:text-zinc-200 underline">
              Retry
            </button>
          </div>
        ) : queue.length > 0 ? (
          <IntroCard key={queue[0].id} question={queue[0]} onDone={completeCurrent} />
        ) : (
          <div className="text-center space-y-2 max-w-sm">
            <p className="text-4xl">🎉</p>
            <h2 className="text-xl font-semibold">
              {introducedToday >= NEW_PER_DAY ? `Day ${dayNumber} complete!` : 'All caught up'}
            </h2>
            <p className="text-sm text-zinc-400">
              {introducedToday >= NEW_PER_DAY
                ? `You introduced ${NEW_PER_DAY} new cards today. Come back tomorrow for Day ${dayNumber + 1}.`
                : totalDone === 0
                  ? 'No content found. Run the seed SQL in Supabase to add questions.'
                  : `You've been introduced to all ${totalDone} available questions. Add more content in Supabase.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
