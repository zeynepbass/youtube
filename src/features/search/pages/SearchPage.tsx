import { useSearchParams } from 'react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { getErrorMessage } from '@/shared/api/errors'
import { RetryButton, StatusMessage } from '@/shared/ui/StatusMessage'
import { InfiniteList } from '@/features/videos'
import { useSearchVideosInfiniteQuery } from '../api/searchApi'
import { SearchResultCard, SearchResultsSkeleton } from '../components/SearchResultCard'

export default function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q')?.trim() ?? ''
  useDocumentTitle(query || 'Ara')

  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useSearchVideosInfiniteQuery(query || skipToken)

  if (!query) {
    return (
      <StatusMessage title="Aramaya başlayın" description="Aramak istediğiniz videoyu yazın." />
    )
  }

  if (isLoading) return <SearchResultsSkeleton />

  if (isError) {
    return (
      <StatusMessage
        title="Arama yapılamadı"
        description={getErrorMessage(error)}
        action={<RetryButton onClick={refetch} />}
      />
    )
  }

  const videos = data?.pages.flatMap((page) => page.videos) ?? []

  if (videos.length === 0) {
    return (
      <StatusMessage
        title="Sonuç bulunamadı"
        description={`"${query}" için eşleşen video yok. Farklı bir arama deneyin.`}
      />
    )
  }

  return (
    <section aria-labelledby="search-title" className="mx-auto max-w-5xl">
      <h1 id="search-title" className="sr-only">
        {query} için arama sonuçları
      </h1>
      <InfiniteList
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={fetchNextPage}
        fallback={<SearchResultsSkeleton count={2} />}
      >
        <ul className="flex flex-col gap-4">
          {videos.map((video, index) => (
            <li key={video.id}>
              <SearchResultCard video={video} priority={index < 2} />
            </li>
          ))}
        </ul>
      </InfiniteList>
    </section>
  )
}
