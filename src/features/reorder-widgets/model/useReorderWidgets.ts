'use client'

import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useDashboardStore } from '@/entities/dashboard'

/**
 * Сенсоры и обработчик завершения перетаскивания.
 * Порядок виджетов меняется через стор дашборда — стор единственный
 * источник правды, DnD-слой ничего не дублирует.
 */
export const useReorderWidgets = () => {
  const moveWidget = useDashboardStore((state) => state.moveWidget)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      moveWidget(String(active.id), String(over.id))
    }
  }

  return { sensors, handleDragEnd }
}
