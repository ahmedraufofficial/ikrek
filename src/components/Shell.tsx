import { useState, type ReactNode } from 'react'
import { sb } from '../lib/supabase'
import Logo from './Logo'
import Today from '../pages/Today'
import Learned from '../pages/Learned'

type Tab = 'today' | 'learned'

const TABS: { id: Tab; label: string; render: () => ReactNode }[] = [
  { id: 'today', label: 'Today', render: () => <Today /> },
  { id: 'learned', label: 'Learned', render: () => <Learned /> },
]

export default function Shell() {
  const [tab, setTab] = useState<Tab>('today')

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-900">
        <h1>
          <Logo size={26} withWordmark />
        </h1>
        <div className="flex items-center gap-1 rounded-lg bg-zinc-900 p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                tab === t.id
                  ? 'bg-zinc-800 text-zinc-100 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => sb().auth.signOut()}
          className="text-sm text-zinc-400 hover:text-zinc-200"
        >
          Sign out
        </button>
      </header>

      <main className="flex-1 p-6">{TABS.find((t) => t.id === tab)!.render()}</main>
    </div>
  )
}
