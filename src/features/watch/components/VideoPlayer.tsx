import { useState } from 'react'
import { PlayBadge } from '@/shared/ui/Icon'
import { posterUrl } from '@/shared/lib/thumbnails'

interface VideoPlayerProps {
  id: string
  title?: string
}

export function VideoPlayer({ id, title = 'Video' }: VideoPlayerProps) {
  const [active, setActive] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden bg-black sm:rounded-xl">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Oynat: ${title}`}
          className="group absolute inset-0 grid place-items-center"
        >
          <img
            src={posterUrl(id)}
            alt=""
            width={480}
            height={360}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover"
          />
          <PlayBadge className="relative h-12 w-17 opacity-90 transition group-hover:scale-110 group-hover:opacity-100" />
        </button>
      )}
    </div>
  )
}
