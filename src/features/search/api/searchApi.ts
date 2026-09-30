import { baseApi, PAGE_SIZE, REGION_CODE } from '@/shared/api/baseApi'
import type { ListResponse, SearchResult, VideoSummary } from '@/shared/types/youtube'
import { fromSearchResults } from '@/features/videos'

interface SearchPage {
  videos: VideoSummary[]
  nextPageToken?: string
}

export const searchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchVideos: build.infiniteQuery<SearchPage, string, string>({
      infiniteQueryOptions: {
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextPageToken,
      },
      query: ({ queryArg, pageParam }) => ({
        url: '/search',
        params: {
          part: 'snippet,id',
          type: 'video',
          q: queryArg,
          regionCode: REGION_CODE,
          maxResults: PAGE_SIZE,
          fields:
            'nextPageToken,items(id(videoId),snippet(publishedAt,title,channelTitle,description,liveBroadcastContent))',
          ...(pageParam && { pageToken: pageParam }),
        },
      }),
      transformResponse: (response: ListResponse<SearchResult>) => ({
        videos: fromSearchResults(response.items),
        nextPageToken: response.nextPageToken,
      }),
    }),
  }),
})

export const { useSearchVideosInfiniteQuery } = searchApi
