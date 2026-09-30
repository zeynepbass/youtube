import { baseApi } from '@/shared/api/baseApi'
import type { ListResponse, SearchResult, Video, VideoSummary } from '@/shared/types/youtube'
import { fromSearchResults, fromVideo } from '@/features/videos'

export const watchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getVideo: build.query<VideoSummary & { likeCount?: string }, string>({
      query: (id) => ({
        url: '/videos',
        params: {
          part: 'snippet,statistics,contentDetails',
          id,
          fields:
            'items(id,snippet(publishedAt,title,channelTitle,description,liveBroadcastContent),statistics(viewCount,likeCount),contentDetails(duration))',
        },
      }),
      transformResponse: (response: ListResponse<Video>) => {
        const video = response.items[0]
        if (!video) throw new Error('not-found')
        return { ...fromVideo(video), likeCount: video.statistics?.likeCount }
      },
    }),
    getRelatedVideos: build.query<VideoSummary[], string>({
      query: (id) => ({
        url: '/search',
        params: {
          part: 'snippet',
          type: 'video',
          relatedToVideoId: id,
          maxResults: 20,
          fields: 'items(id(videoId),snippet(publishedAt,title,channelTitle,liveBroadcastContent))',
        },
      }),
      transformResponse: (response: ListResponse<SearchResult>) =>
        fromSearchResults(response.items),
    }),
  }),
})

export const { useGetVideoQuery, useGetRelatedVideosQuery } = watchApi
