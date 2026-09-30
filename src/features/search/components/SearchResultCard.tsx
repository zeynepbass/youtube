import { memo } from 'react'
import { Link } from 'react-router'
import type { VideoSummary } from '@/shared/types/youtube'
import { timeAgo } from '@/shared/lib/format'
import { VideoThumbnail } from '@/features/videos'

interface SearchResultCardProps {
  video: VideoSummary
  priority?: boolean
}

export const SearchResultCard = memo(function SearchResultCard({
  video,
  priority,
}: SearchResultCardProps) {
  return (
    <Link to={`/watch/${video.id}`} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
      <VideoThumbnail
        src={video.thumbnail}
        srcSet={video.thumbnailSrcSet}
        sizes="(min-width: 640px) 360px, 100vw"
        priority={priority}
        className="shrink-0 sm:w-90"
      />
      <div className="min-w-0 px-1 sm:px-0">
        <h2 className="line-clamp-2 text-lg leading-snug">{video.title}</h2>
        <p className="mt-1 text-xs text-muted">{timeAgo(video.publishedAt)}</p>
        <p className="mt-2 text-sm text-muted">{video.channelTitle}</p>
        {video.description && (
          <p className="mt-2 line-clamp-2 hidden text-xs text-muted sm:block">
            {video.description}
          </p>
        )}
      </div>
    </Link>
  )
})

export function SearchResultsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="flex flex-col gap-4" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="flex animate-pulse flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="aspect-video shrink-0 rounded-xl bg-surface sm:w-90" />
          <div className="flex-1 space-y-3 px-1 sm:px-0">
            <div className="h-5 w-4/5 rounded bg-surface" />
            <div className="h-3 w-1/4 rounded bg-surface" />
            <div className="h-3 w-1/3 rounded bg-surface" />
          </div>
        </li>
      ))}
    </ul>
  )
}
