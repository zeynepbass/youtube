import { useState } from 'react'
import type { VideoSummary } from '@/shared/types/youtube'
import { formatCompact, formatNumber, timeAgo } from '@/shared/lib/format'
import { Icon } from '@/shared/ui/Icon'

interface VideoDetailsProps {
  video: VideoSummary & { likeCount?: string }
}

export function VideoDetails({ video }: VideoDetailsProps) {
  const [expanded, setExpanded] = useState(false)
  const likes = formatCompact(video.likeCount)
  const views = formatNumber(video.viewCount)

  return (
    <div className="mt-3 px-4 sm:px-0">
      <h1 className="text-xl font-semibold">{video.title}</h1>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-surface font-medium uppercase">
            {video.channelTitle.charAt(0)}
          </span>
          <span className="font-medium">{video.channelTitle}</span>
        </div>
        {likes && (
          <span className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium">
            <Icon name="like" className="size-5" />
            {likes}
          </span>
        )}
      </div>

      <div className="mt-4 rounded-xl bg-surface p-3 text-sm">
        <p className="font-medium">
          {views && `${views} görüntüleme · `}
          {timeAgo(video.publishedAt)}
        </p>
        {video.description && (
          <>
            <p className={`mt-2 break-words whitespace-pre-line ${expanded ? '' : 'line-clamp-3'}`}>
              {video.description}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="mt-2 font-medium"
            >
              {expanded ? 'Daha az göster' : 'Daha fazla göster'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export function VideoDetailsSkeleton() {
  return (
    <div className="mt-3 animate-pulse space-y-3 px-4 sm:px-0" aria-hidden="true">
      <div className="h-6 w-3/4 rounded bg-surface" />
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-surface" />
        <div className="h-4 w-32 rounded bg-surface" />
      </div>
      <div className="h-24 rounded-xl bg-surface" />
    </div>
  )
}
