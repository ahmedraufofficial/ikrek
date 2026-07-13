interface Props {
  size?: number
  withWordmark?: boolean
  className?: string
}

/**
 * Ikrek ("twins") mark: two lowercase-i figures — the solid twin is the
 * Hungarian side, the faded twin the English one.
 */
export default function Logo({ size = 32, withWordmark = false, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="ikrek-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#34d399" />
            <stop offset="1" stopColor="#0d9488" />
          </linearGradient>
        </defs>
        <circle cx="21" cy="12" r="6.5" fill="url(#ikrek-g)" />
        <rect x="15" y="24" width="13" height="28" rx="6.5" fill="url(#ikrek-g)" />
        <circle cx="43" cy="12" r="6.5" fill="url(#ikrek-g)" opacity="0.45" />
        <rect x="37" y="24" width="13" height="28" rx="6.5" fill="url(#ikrek-g)" opacity="0.45" />
      </svg>
      {withWordmark && (
        <span
          className="font-bold tracking-tight bg-gradient-to-br from-emerald-300 to-teal-500 bg-clip-text text-transparent"
          style={{ fontSize: size * 0.72, lineHeight: 1 }}
        >
          ikrek
        </span>
      )}
    </span>
  )
}
