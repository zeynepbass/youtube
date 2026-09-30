import { createBrowserRouter } from 'react-router'
import HomePage from '@/features/videos/pages/HomePage'
import { AppLayout } from './layout/AppLayout'
import { RouteError } from './RouteError'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: 'search',
            lazy: async () => ({
              Component: (await import('@/features/search/pages/SearchPage')).default,
            }),
          },
          {
            path: 'watch/:id',
            lazy: async () => ({
              Component: (await import('@/features/watch/pages/WatchPage')).default,
            }),
          },
          {
            path: '*',
            loader: () => {
              throw new Response('Not Found', { status: 404 })
            },
          },
        ],
      },
    ],
  },
])
