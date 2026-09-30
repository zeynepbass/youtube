import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { getErrorMessage } from '@/shared/api/errors'
import { RetryButton, StatusMessage } from '@/shared/ui/StatusMessage'
import { useGetPopularVideosInfiniteQuery } from '../api/videosApi'
import { VideoGrid, VideoGridSkeleton } from '../components/VideoGrid'
import { InfiniteList } from '../components/InfiniteList'

export default function HomePage() {
  useDocumentTitle()
  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetPopularVideosInfiniteQuery()

  if (isLoading) return <VideoGridSkeleton />

  if (isError) {
    return (
      <StatusMessage
        title="Videolar yüklenemedi"
        description={getErrorMessage(error)}
        action={<RetryButton onClick={refetch} />}
      />
    )
  }

  const videos = data?.pages.flatMap((page) => page.videos) ?? []

  return (
    <section aria-labelledby="home-title">
      <h1 id="home-title" className="sr-only">
        Popüler videolar
      </h1>
      <InfiniteList
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={fetchNextPage}
        fallback={<VideoGridSkeleton count={4} />}
      >
        <VideoGrid videos={videos} />
      </InfiniteList>
    </section>
  )
}
