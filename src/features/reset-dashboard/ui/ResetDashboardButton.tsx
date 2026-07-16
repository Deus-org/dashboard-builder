'use client'

import { Button } from '@/shared/ui/button'
import { useDashboardStore } from '@/entities/dashboard'

export const ResetDashboardButton = () => {
  const resetDashboard = useDashboardStore((state) => state.resetDashboard)

  const handleClick = () => {
    if (window.confirm('Сбросить конфигурацию дашборда к виду по умолчанию?')) {
      resetDashboard()
    }
  }

  return (
    <Button variant="ghost" onClick={handleClick}>
      Сбросить дашборд
    </Button>
  )
}
