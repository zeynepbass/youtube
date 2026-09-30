const BASE = 'https://i.ytimg.com'

export interface ThumbnailSources {
  src: string
  srcSet?: string
}

export function thumbnailSources(id: string, live = false): ThumbnailSources {
  if (live) return { src: `${BASE}/vi/${id}/mqdefault_live.jpg` }
  const url = (name: string) => `${BASE}/vi_webp/${id}/${name}.webp`
  return {
    src: url('mqdefault'),
    srcSet: `${url('mqdefault')} 320w, ${url('hqdefault')} 480w, ${url('sddefault')} 640w`,
  }
}

export function posterUrl(id: string): string {
  return `${BASE}/vi_webp/${id}/hqdefault.webp`
}
