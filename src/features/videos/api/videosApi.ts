import { baseApi, PAGE_SIZE, REGION_CODE } from '@/shared/api/baseApi'
import type { ListResponse, Video, VideoSummary } from '@/shared/types/youtube'
import { fromVideo } from '../lib/mappers'

interface VideoPage {
  videos: VideoSummary[]
  nextPageToken?: string
}

export const videosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopularVideos: build.infiniteQuery<VideoPage, void, string>({
      infiniteQueryOptions: {
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextPageToken,
      },
      query: ({ pageParam }) => ({
        url: '/videos',
        params: {
          part: 'snippet,statistics,contentDetails',
          chart: 'mostPopular',
          regionCode: REGION_CODE,
          maxResults: PAGE_SIZE,
          fields:
            'nextPageToken,items(id,snippet(publishedAt,title,channelTitle,liveBroadcastContent),statistics(viewCount),contentDetails(duration))',
          ...(pageParam && { pageToken: pageParam }),
        },
      }),
      transformResponse: (response: ListResponse<Video>) => ({
        videos: response.items.map(fromVideo),
        nextPageToken: response.nextPageToken,
      }),
    }),
  }),
})

export const { useGetPopularVideosInfiniteQuery } = videosApi
