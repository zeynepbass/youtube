import type { ReactNode } from 'react'

interface StatusMessageProps {
  title: string
  description?: string
  action?: ReactNode
}

export function StatusMessage({ title, description, action }: StatusMessageProps) {
  return (
    <div
      role="status"
      className="mx-auto flex max-w-md flex-col items-center gap-3 py-24 text-center"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="text-sm text-muted">{description}</p>}
      {action}
    </div>
  )
}

export function RetryButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:opacity-85"
    >
      Tekrar dene
    </button>
  )
}
