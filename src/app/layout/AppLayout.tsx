import { Suspense, useCallback, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

const DESKTOP_QUERY = '(min-width: 1024px)'

export function AppLayout() {
  const [compact, setCompact] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    if (window.matchMedia(DESKTOP_QUERY).matches) setCompact((value) => !value)
    else setDrawerOpen((value) => !value)
  }, [])

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-bg focus:px-3 focus:py-2"
      >
        İçeriğe geç
      </a>
      <Header onMenuClick={toggleMenu} />
      <div className="flex">
        <Sidebar compact={compact} drawerOpen={drawerOpen} onClose={closeDrawer} />
        <main id="main" className="min-w-0 flex-1 px-4 pt-2 pb-10 lg:px-6">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <ScrollRestoration />
    </>
  )
}
