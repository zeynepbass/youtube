import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { StatusMessage } from '@/shared/ui/StatusMessage'

export function RouteError() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404

  return (
    <StatusMessage
      title={notFound ? 'Sayfa bulunamadı' : 'Bir şeyler ters gitti'}
      description={
        notFound
          ? 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.'
          : 'Sayfayı yenileyip tekrar deneyin.'
      }
      action={
        <Link to="/" className="rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg">
          Ana sayfaya dön
        </Link>
      }
    />
  )
}
