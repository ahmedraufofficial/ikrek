import { useState, type FormEvent } from 'react'
import { sb } from '../lib/supabase'
import Logo from '../components/Logo'

export default function Login() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setBusy(true)
    try {
      if (mode === 'signin') {
        const { error } = await sb().auth.signInWithPassword({ email, password })
        if (error) setError(error.message)
      } else {
        const { data, error } = await sb().auth.signUp({ email, password })
        if (error) {
          setError(
            /rate limit/i.test(error.message)
              ? 'Too many confirmation emails sent — Supabase only sends a couple per hour. Try again later, or disable "Confirm email" in the Supabase dashboard.'
              : error.message
          )
        } else if (!data.session) {
          setNotice('Check your email to confirm your account, then sign in.')
        }
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="text-center mb-8">
          <h1 className="flex justify-center">
            <Logo size={44} withWordmark />
          </h1>
          <p className="text-zinc-400 text-sm mt-2">Learn Hungarian, 10 words a day</p>
        </div>

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}
        {notice && <p className="text-sm text-emerald-400">{notice}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-3 text-sm font-semibold transition-colors"
        >
          {busy ? '…' : mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="w-full text-sm text-zinc-400 hover:text-zinc-200"
        >
          {mode === 'signin' ? "No account? Sign up" : 'Have an account? Sign in'}
        </button>
      </form>
    </div>
  )
}
