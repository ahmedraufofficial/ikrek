import { isSupabaseConfigured } from './lib/supabase'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Logo from './components/Logo'
import Login from './pages/Login'
import Shell from './components/Shell'

function Gate() {
  const { session, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-dvh bg-zinc-950 text-zinc-400 flex items-center justify-center">
        Loading…
      </div>
    )
  }
  return session ? <Shell /> : <Login />
}

function App() {
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-dvh bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-4 text-center">
          <h1 className="flex justify-center">
            <Logo size={40} withWordmark />
          </h1>
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-left text-sm text-amber-200">
            <p className="font-semibold mb-1">Supabase not configured</p>
            <p>
              Copy <code className="bg-zinc-800 px-1 rounded">.env.example</code> to{' '}
              <code className="bg-zinc-800 px-1 rounded">.env</code> and add your project URL and
              anon key, then restart the dev server.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  )
}

export default App
