export interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description?: string
  liveBroadcastContent?: 'live' | 'upcoming' | 'none'
  channelTitle: string
}

export interface Statistics {
  viewCount?: string
  likeCount?: string
  commentCount?: string
}

export interface Video {
  id: string
  snippet: Snippet
  statistics?: Statistics
  contentDetails?: { duration?: string }
}

export interface SearchResult {
  id: { videoId?: string }
  snippet: Snippet
}

export interface ListResponse<T> {
  items: T[]
  nextPageToken?: string
}

export interface VideoSummary {
  id: string
  title: string
  channelTitle: string
  publishedAt: string
  thumbnail: string
  thumbnailSrcSet?: string
  viewCount?: string
  duration?: string
  description?: string
}
