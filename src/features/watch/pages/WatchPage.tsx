import { useParams } from 'react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { getErrorMessage } from '@/shared/api/errors'
import { RetryButton, StatusMessage } from '@/shared/ui/StatusMessage'
import { useGetVideoQuery } from '../api/watchApi'
import { VideoPlayer } from '../components/VideoPlayer'
import { VideoDetails, VideoDetailsSkeleton } from '../components/VideoDetails'
import { RelatedVideos } from '../components/RelatedVideos'

export default function WatchPage() {
  const { id = '' } = useParams()
  const { data: video, error, isLoading, isError, refetch } = useGetVideoQuery(id || skipToken)
  useDocumentTitle(video?.title)

  return (
    <div className="-mx-4 grid gap-6 sm:mx-0 xl:grid-cols-[minmax(0,1fr)_400px]">
      <div className="min-w-0">
        <VideoPlayer key={id} id={id} title={video?.title} />
        {isLoading && <VideoDetailsSkeleton />}
        {isError && (
          <StatusMessage
            title="Video bilgileri yüklenemedi"
            description={getErrorMessage(error)}
            action={<RetryButton onClick={refetch} />}
          />
        )}
        {video && <VideoDetails video={video} />}
      </div>
      <aside className="px-4 sm:px-0">
        <RelatedVideos videoId={id} />
      </aside>
    </div>
  )
}
