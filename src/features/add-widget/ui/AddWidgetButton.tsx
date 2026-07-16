'use client'

import { Button } from '@/shared/ui/button'
import { useDashboardStore } from '@/entities/dashboard'
import type { WidgetType } from '@/entities/widget'

interface AddWidgetButtonProps {
  type: WidgetType
}

export const AddWidgetButton = ({ type }: AddWidgetButtonProps) => {
  const addWidget = useDashboardStore((state) => state.addWidget)

  return (
    <Button variant="primary" onClick={() => addWidget(type)}>
      Добавить
    </Button>
  )
}
