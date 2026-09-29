import { describe, expect, it } from 'vitest'
import { decodeEntities, formatCompact, formatDuration, formatNumber, timeAgo } from './format'

describe('formatDuration', () => {
  it.each([
    ['PT2M47S', '2:47'],
    ['PT45S', '0:45'],
    ['PT1H2M3S', '1:02:03'],
    ['PT10M', '10:00'],
    ['P1DT1H', '25:00:00'],
  ])('%s -> %s', (input, expected) => {
    expect(formatDuration(input)).toBe(expected)
  })

  it('returns empty string for invalid input', () => {
    expect(formatDuration(undefined)).toBe('')
    expect(formatDuration('abc')).toBe('')
  })
})

describe('number formatting', () => {
  it('formats compact values', () => {
    expect(formatCompact('1500').replace(/\s/g, ' ')).toBe('1,5 B')
    expect(formatCompact(undefined)).toBe('')
  })

  it('formats full values', () => {
    expect(formatNumber('1234567')).toBe('1.234.567')
  })
})

describe('timeAgo', () => {
  const now = Date.parse('2026-01-10T00:00:00Z')

  it('formats past dates relative to now', () => {
    expect(timeAgo('2026-01-09T00:00:00Z', now)).toBe('dün')
    expect(timeAgo('2025-01-10T00:00:00Z', now)).toBe('geçen yıl')
    expect(timeAgo('2026-01-07T00:00:00Z', now)).toBe('3 gün önce')
  })

  it('handles invalid dates', () => {
    expect(timeAgo('invalid', now)).toBe('')
  })
})

describe('decodeEntities', () => {
  it('decodes html entities from api titles', () => {
    expect(decodeEntities('Tom &amp; Jerry &#39;s &quot;best&quot;')).toBe(`Tom & Jerry 's "best"`)
  })
})
