export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface Thumbnails {
  default?: Thumbnail
  medium?: Thumbnail
  high?: Thumbnail
  standard?: Thumbnail
  maxres?: Thumbnail
}

export interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description?: string
  thumbnails: Thumbnails
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
  id: { kind: string; videoId?: string }
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
  viewCount?: string
  duration?: string
  description?: string
}
