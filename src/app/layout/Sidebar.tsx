import { Link, useLocation, useSearchParams } from 'react-router'
import { Icon } from '@/shared/ui/Icon'
import { exploreNav, primaryNav, type NavItem } from './navigation'

interface SidebarProps {
  compact: boolean
  drawerOpen: boolean
  onClose: () => void
}

function useIsActive() {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  return (item: NavItem) =>
    item.query ? pathname === '/search' && params.get('q') === item.query : pathname === item.to
}

interface NavLinkItemProps {
  item: NavItem
  active: boolean
  compact: boolean
  onNavigate?: () => void
}

function NavLinkItem({ item, active, compact, onNavigate }: NavLinkItemProps) {
  return (
    <li>
      <Link
        to={item.to}
        onClick={onNavigate}
        aria-current={active ? 'page' : undefined}
        className={`flex items-center rounded-lg text-sm transition hover:bg-surface-hover ${
          active ? 'bg-surface font-medium' : ''
        } ${compact ? 'flex-col gap-1 px-1 py-4 text-[10px]' : 'gap-6 px-3 py-2.5'}`}
      >
        <Icon name={item.icon} />
        <span className={compact ? 'truncate' : ''}>{item.label}</span>
      </Link>
    </li>
  )
}

function NavContent({ compact, onNavigate }: { compact: boolean; onNavigate?: () => void }) {
  const isActive = useIsActive()

  return (
    <nav aria-label="Ana menü" className="flex flex-col gap-3 p-3">
      <ul>
        {primaryNav.map((item) => (
          <NavLinkItem
            key={item.to}
            item={item}
            active={isActive(item)}
            compact={compact}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
      {!compact && <hr className="border-line" />}
      <div>
        {!compact && <h2 className="px-3 pb-1 font-medium">Keşfet</h2>}
        <ul>
          {exploreNav.map((item) => (
            <NavLinkItem
              key={item.to}
              item={item}
              active={isActive(item)}
              compact={compact}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </div>
    </nav>
  )
}

export function Sidebar({ compact, drawerOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside
        className={`sticky top-14 hidden h-[calc(100dvh-3.5rem)] shrink-0 overflow-y-auto lg:block ${
          compact ? 'w-18' : 'w-60'
        }`}
      >
        <NavContent compact={compact} />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute inset-y-0 left-0 w-60 overflow-y-auto bg-bg">
            <div className="flex h-14 items-center px-4">
              <button
                type="button"
                onClick={onClose}
                aria-label="Menüyü kapat"
                className="grid size-10 place-items-center rounded-full hover:bg-surface-hover"
              >
                <Icon name="close" />
              </button>
            </div>
            <NavContent compact={false} onNavigate={onClose} />
          </div>
        </div>
      )}
    </>
  )
}
