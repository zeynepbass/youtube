import { memo } from 'react'
import { Link } from 'react-router'
import type { VideoSummary } from '@/shared/types/youtube'
import { formatCompact, timeAgo } from '@/shared/lib/format'
import { VideoThumbnail } from './VideoThumbnail'

interface VideoCardProps {
  video: VideoSummary
  priority?: boolean
}

export const VideoCard = memo(function VideoCard({ video, priority }: VideoCardProps) {
  const views = formatCompact(video.viewCount)

  return (
    <Link to={`/watch/${video.id}`} className="group flex flex-col gap-3 rounded-xl">
      <VideoThumbnail
        src={video.thumbnail}
        srcSet={video.thumbnailSrcSet}
        sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        duration={video.duration}
        priority={priority}
        className="transition group-hover:rounded-none"
      />
      <div className="px-1">
        <h2 className="line-clamp-2 leading-snug font-medium">{video.title}</h2>
        <p className="mt-1 text-sm text-muted">{video.channelTitle}</p>
        <p className="text-sm text-muted">
          {views && `${views} görüntüleme · `}
          {timeAgo(video.publishedAt)}
        </p>
      </div>
    </Link>
  )
})
