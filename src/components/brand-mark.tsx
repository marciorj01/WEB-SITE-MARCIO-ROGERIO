import Link from 'next/link'

export function BrandMark({
  name = 'Vértice',
  tagline = 'Consultoria imobiliária',
  light = false,
  compact = false,
}: {
  name?: string | null
  tagline?: string | null
  light?: boolean
  compact?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label={`${name || 'Vértice'} — início`}
      className={`inline-flex shrink-0 items-center gap-3.5 ${light ? 'text-ivory' : 'text-navy'}`}
    >
      <svg width="35" height="43" viewBox="0 0 35 43" fill="none" aria-hidden="true">
        <path d="M2 5 17.5 37 33 5M7.5 5l10 21 10-21" stroke="currentColor" strokeWidth="1.2" />
        <path d="M17.5 26v12" stroke="#B8A181" strokeWidth="1.3" />
      </svg>
      <span>
        <span className="block text-[23px] leading-none font-medium uppercase tracking-[.22em]">
          {name || 'Vértice'}
        </span>
        {!compact && (
          <span
            className={`mt-2 block text-[6.5px] uppercase tracking-[.27em] ${light ? 'text-champagne-light' : 'text-muted'}`}
          >
            {tagline || 'Consultoria imobiliária'}
          </span>
        )}
      </span>
    </Link>
  )
}
