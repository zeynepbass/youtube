import type { IconName } from '@/shared/ui/Icon'

export interface NavItem {
  label: string
  icon: IconName
  to: string
  query?: string
}

export const primaryNav: NavItem[] = [{ label: 'Ana sayfa', icon: 'home', to: '/' }]

export const exploreNav: NavItem[] = [
  { label: 'Müzik', icon: 'music', query: 'müzik' },
  { label: 'Oyun', icon: 'gaming', query: 'oyun' },
  { label: 'Haberler', icon: 'news', query: 'haberler' },
  { label: 'Spor', icon: 'sports', query: 'spor' },
  { label: 'Filmler', icon: 'movies', query: 'film fragmanı' },
  { label: 'Podcast', icon: 'podcast', query: 'podcast' },
  { label: 'Yazılım', icon: 'code', query: 'yazılım' },
].map((item) => ({ ...item, to: `/search?q=${encodeURIComponent(item.query)}` }) as NavItem)
