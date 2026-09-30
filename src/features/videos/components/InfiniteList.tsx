import type { ReactNode } from 'react'
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll'

interface InfiniteListProps {
  children: ReactNode
  hasMore: boolean
  isLoadingMore: boolean
  onLoadMore: () => void
  fallback: ReactNode
}

export function InfiniteList({
  children,
  hasMore,
  isLoadingMore,
  onLoadMore,
  fallback,
}: InfiniteListProps) {
  const sentinel = useInfiniteScroll(onLoadMore, hasMore && !isLoadingMore)

  return (
    <>
      {children}
      {isLoadingMore && <div className="mt-8">{fallback}</div>}
      {hasMore && <div ref={sentinel} className="h-px" />}
    </>
  )
}
