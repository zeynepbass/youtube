import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API_HOST = 'youtube-v31.p.rapidapi.com'

export const REGION_CODE = import.meta.env.VITE_REGION_CODE ?? 'TR'

export const PAGE_SIZE = 24

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${API_HOST}`,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_RAPIDAPI_KEY)
      headers.set('X-RapidAPI-Host', API_HOST)
      return headers
    },
  }),
  keepUnusedDataFor: 300,
  endpoints: () => ({}),
})
