import type { VideoSummary } from '@/shared/types/youtube'
import { VideoCard } from './VideoCard'

const GRID = 'grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
const PRIORITY_COUNT = 4

export function VideoGrid({ videos }: { videos: VideoSummary[] }) {
  return (
    <ul className={GRID}>
      {videos.map((video, index) => (
        <li key={video.id}>
          <VideoCard video={video} priority={index < PRIORITY_COUNT} />
        </li>
      ))}
    </ul>
  )
}

export function VideoGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <ul className={GRID} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="flex animate-pulse flex-col gap-3">
          <div className="aspect-video rounded-xl bg-surface" />
          <div className="space-y-2 px-1">
            <div className="h-4 w-11/12 rounded bg-surface" />
            <div className="h-3 w-1/2 rounded bg-surface" />
          </div>
        </li>
      ))}
    </ul>
  )
}
