'use client'

import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import type { WidgetType } from '@/entities/widget'
import { WIDGET_QUERY_KEYS } from '../model/widget-query-keys'

interface RefreshWidgetDataButtonProps {
  type: WidgetType
}

/** Инвалидирует кэш React Query конкретного виджета → данные перезапрашиваются. */
export const RefreshWidgetDataButton = ({ type }: RefreshWidgetDataButtonProps) => {
  const queryClient = useQueryClient()
  const queryKey = WIDGET_QUERY_KEYS[type]
  const fetchingCount = useIsFetching({ queryKey })

  return (
    <Button
      variant="ghost"
      aria-label="Обновить данные виджета"
      title="Обновить данные"
      disabled={fetchingCount > 0}
      onClick={() => queryClient.invalidateQueries({ queryKey })}
    >
      <Icon name="refresh" size={14} />
    </Button>
  )
}
