'use client'

import { useEffect, useState } from 'react'

/**
 * Возвращает true после монтирования на клиенте.
 * Нужен, чтобы не рендерить восстановленную из localStorage конфигурацию
 * на сервере и избежать рассинхрона гидратации.
 */
export const useDashboardHydrated = (): boolean => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}
