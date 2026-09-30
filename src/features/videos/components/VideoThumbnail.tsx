import { formatDuration } from '@/shared/lib/format'

interface VideoThumbnailProps {
  src: string
  srcSet?: string
  sizes?: string
  duration?: string
  priority?: boolean
  className?: string
}

export function VideoThumbnail({
  src,
  srcSet,
  sizes,
  duration,
  priority,
  className = '',
}: VideoThumbnailProps) {
  const time = formatDuration(duration)

  return (
    <div className={`relative aspect-video overflow-hidden rounded-xl bg-surface ${className}`}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt=""
        width={320}
        height={180}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="size-full object-cover"
      />
      {time && (
        <span className="absolute right-1.5 bottom-1.5 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
          {time}
        </span>
      )}
    </div>
  )
}
