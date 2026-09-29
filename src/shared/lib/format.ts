const compact = new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 })
const full = new Intl.NumberFormat('tr-TR')
const relative = new Intl.RelativeTimeFormat('tr-TR', { numeric: 'auto' })

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
]

export function formatCompact(value?: string | number): string {
  const n = Number(value)
  return Number.isFinite(n) && value !== undefined ? compact.format(n) : ''
}

export function formatNumber(value?: string | number): string {
  const n = Number(value)
  return Number.isFinite(n) && value !== undefined ? full.format(n) : ''
}

export function timeAgo(iso: string, now: number = Date.now()): string {
  const seconds = (new Date(iso).getTime() - now) / 1000
  if (!Number.isFinite(seconds)) return ''
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return relative.format(Math.round(seconds / size), unit)
  }
  return relative.format(0, 'second')
}

export function formatDuration(iso?: string): string {
  const match = iso?.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/)
  if (!match) return ''
  const [, d = '0', h = '0', m = '0', s = '0'] = match
  const hours = Number(d) * 24 + Number(h)
  const mm = hours ? m.padStart(2, '0') : m
  const ss = s.padStart(2, '0')
  return hours ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}

export function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}
