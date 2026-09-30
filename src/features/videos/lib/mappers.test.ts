import { describe, expect, it } from 'vitest'
import type { SearchResult } from '@/shared/types/youtube'
import { fromSearchResults } from './mappers'

const result = (videoId?: string): SearchResult => ({
  id: { videoId },
  snippet: {
    publishedAt: '2026-01-01T00:00:00Z',
    channelId: 'c',
    channelTitle: 'Channel',
    title: 'A &amp; B',
  },
})

describe('fromSearchResults', () => {
  it('drops channels, playlists and duplicates', () => {
    const videos = fromSearchResults([result('a'), result(undefined), result('a'), result('b')])
    expect(videos.map((v) => v.id)).toEqual(['a', 'b'])
  })

  it('clears placeholder publish dates', () => {
    const placeholder = {
      ...result('a'),
      snippet: { ...result('a').snippet, publishedAt: '1969-12-31T00:00:00Z' },
    }
    expect(fromSearchResults([placeholder])[0]?.publishedAt).toBe('')
  })

  it('decodes titles and builds webp thumbnails', () => {
    const [video] = fromSearchResults([result('a')])
    expect(video?.title).toBe('A & B')
    expect(video?.thumbnail).toBe('https://i.ytimg.com/vi_webp/a/mqdefault.webp')
    expect(video?.thumbnailSrcSet).toContain('hqdefault.webp 480w')
  })

  it('uses live thumbnails for live streams', () => {
    const live = {
      ...result('a'),
      snippet: { ...result('a').snippet, liveBroadcastContent: 'live' as const },
    }
    const [video] = fromSearchResults([live])
    expect(video?.thumbnail).toBe('https://i.ytimg.com/vi/a/mqdefault_live.jpg')
    expect(video?.thumbnailSrcSet).toBeUndefined()
  })
})
