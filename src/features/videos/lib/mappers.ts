import type { SearchResult, Snippet, Video, VideoSummary } from '@/shared/types/youtube'
import { decodeEntities } from '@/shared/lib/format'
import { thumbnailSources } from '@/shared/lib/thumbnails'

const YOUTUBE_LAUNCH = Date.UTC(2005, 0, 1)

function validDate(iso: string): string {
  return Date.parse(iso) >= YOUTUBE_LAUNCH ? iso : ''
}

function thumbnail(id: string, snippet: Snippet) {
  const { src, srcSet } = thumbnailSources(id, snippet.liveBroadcastContent === 'live')
  return { thumbnail: src, thumbnailSrcSet: srcSet }
}

export function fromVideo(video: Video): VideoSummary {
  return {
    id: video.id,
    title: decodeEntities(video.snippet.title),
    channelTitle: video.snippet.channelTitle,
    publishedAt: video.snippet.publishedAt,
    ...thumbnail(video.id, video.snippet),
    viewCount: video.statistics?.viewCount,
    duration: video.contentDetails?.duration,
    description: video.snippet.description && decodeEntities(video.snippet.description),
  }
}

export function fromSearchResult(result: SearchResult): VideoSummary | null {
  const id = result.id.videoId
  if (!id) return null
  return {
    id,
    title: decodeEntities(result.snippet.title),
    channelTitle: result.snippet.channelTitle,
    publishedAt: validDate(result.snippet.publishedAt),
    ...thumbnail(id, result.snippet),
    description: result.snippet.description && decodeEntities(result.snippet.description),
  }
}

export function fromSearchResults(results: SearchResult[]): VideoSummary[] {
  const seen = new Set<string>()
  return results.flatMap((result) => {
    const video = fromSearchResult(result)
    if (!video || seen.has(video.id)) return []
    seen.add(video.id)
    return [video]
  })
}
