import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string {
  if (!error) return 'Beklenmeyen bir hata oluştu.'
  if ('status' in error) {
    if (error.status === 401 || error.status === 403) return 'API anahtarı geçersiz ya da eksik.'
    if (error.status === 429) return 'API istek limiti doldu. Biraz sonra tekrar deneyin.'
    if (error.status === 'FETCH_ERROR') return 'Sunucuya ulaşılamadı. Bağlantınızı kontrol edin.'
  }
  return 'Videolar yüklenirken bir sorun oluştu.'
}
