'use client'

import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { useDashboardStore } from '@/entities/dashboard'

interface RemoveWidgetButtonProps {
  id: string
}

export const RemoveWidgetButton = ({ id }: RemoveWidgetButtonProps) => {
  const removeWidget = useDashboardStore((state) => state.removeWidget)

  return (
    <Button
      variant="danger"
      aria-label="Удалить виджет"
      title="Удалить виджет"
      onClick={() => removeWidget(id)}
    >
      <Icon name="close" size={14} />
    </Button>
  )
}
