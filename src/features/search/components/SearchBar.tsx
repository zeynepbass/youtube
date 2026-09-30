import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Icon } from '@/shared/ui/Icon'

export function SearchBar() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const current = params.get('q') ?? ''
  const [value, setValue] = useState(current)
  const [syncedQuery, setSyncedQuery] = useState(current)

  if (syncedQuery !== current) {
    setSyncedQuery(current)
    setValue(current)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = value.trim()
    if (query) navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex w-full max-w-xl">
      <label htmlFor="search" className="sr-only">
        Ara
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ara"
        autoComplete="off"
        enterKeyHint="search"
        className="h-10 min-w-0 flex-1 rounded-l-full border border-line bg-bg px-4 placeholder:text-muted focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Ara"
        className="grid h-10 w-16 place-items-center rounded-r-full border border-l-0 border-line bg-surface transition hover:bg-surface-hover"
      >
        <Icon name="search" />
      </button>
    </form>
  )
}
