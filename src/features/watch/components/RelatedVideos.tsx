import { memo } from 'react'
import { Link } from 'react-router'
import type { VideoSummary } from '@/shared/types/youtube'
import { timeAgo } from '@/shared/lib/format'
import { VideoThumbnail } from '@/features/videos'
import { useGetRelatedVideosQuery } from '../api/watchApi'

const RelatedVideoItem = memo(function RelatedVideoItem({ video }: { video: VideoSummary }) {
  return (
    <Link to={`/watch/${video.id}`} className="flex gap-2">
      <VideoThumbnail src={video.thumbnail} className="w-42 shrink-0 rounded-lg" />
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm leading-snug font-medium">{video.title}</h3>
        <p className="mt-1 text-xs text-muted">{video.channelTitle}</p>
        <p className="text-xs text-muted">{timeAgo(video.publishedAt)}</p>
      </div>
    </Link>
  )
})

export function RelatedVideos({ videoId }: { videoId: string }) {
  const { data, isLoading } = useGetRelatedVideosQuery(videoId)

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-2" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="flex animate-pulse gap-2">
            <div className="aspect-video w-42 shrink-0 rounded-lg bg-surface" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-full rounded bg-surface" />
              <div className="h-3 w-2/3 rounded bg-surface" />
            </div>
          </li>
        ))}
      </ul>
    )
  }

  const videos = data?.filter((video) => video.id !== videoId) ?? []
  if (videos.length === 0) return null

  return (
    <section aria-labelledby="related-title">
      <h2 id="related-title" className="sr-only">
        İlgili videolar
      </h2>
      <ul className="flex flex-col gap-2">
        {videos.map((video) => (
          <li key={video.id}>
            <RelatedVideoItem video={video} />
          </li>
        ))}
      </ul>
    </section>
  )
}
