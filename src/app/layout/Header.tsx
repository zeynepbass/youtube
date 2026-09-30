import { Link } from 'react-router'
import { Icon, PlayBadge } from '@/shared/ui/Icon'
import { SearchBar } from '@/features/search'

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-bg px-4">
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Menüyü aç/kapat"
          className="grid size-10 place-items-center rounded-full hover:bg-surface-hover"
        >
          <Icon name="menu" />
        </button>
        <Link to="/" aria-label="Ana sayfa" className="flex items-center gap-1 px-2">
          <PlayBadge />
          <span className="hidden text-xl font-semibold tracking-tighter sm:inline">YouTube</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-center">
        <SearchBar />
      </div>
      <div className="hidden w-32 shrink-0 md:block" />
    </header>
  )
}
