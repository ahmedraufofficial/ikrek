import type { AlignedSegment } from '../lib/types'

// Distinguishable on the dark background; pairId indexes into this palette,
// so matching Hungarian/English chunks share a colour.
const COLORS = ['#34d399', '#60a5fa', '#fbbf24', '#f472b6', '#a78bfa', '#22d3ee']

export default function AlignedLine({ segments }: { segments: AlignedSegment[] }) {
  return (
    <>
      {segments.map(([text, pairId], i) => (
        <span key={i}>
          <span
            className="pb-px"
            style={{ borderBottom: `2px solid ${COLORS[pairId % COLORS.length]}` }}
          >
            {text}
          </span>
          {i < segments.length - 1 && ' '}
        </span>
      ))}
    </>
  )
}
