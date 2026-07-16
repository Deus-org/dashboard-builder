'use client'

import type { ReactNode } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import type { DashboardItem } from '@/entities/dashboard'
import { getWidgetMeta } from '@/entities/widget'
import { useReorderWidgets } from '@/features/reorder-widgets'
import { SortableWidgetCard } from './SortableWidgetCard'
import styles from './DashboardGrid.module.scss'

interface DashboardGridProps {
  items: DashboardItem[]
  renderWidget: (item: DashboardItem) => ReactNode
}

/**
 * Сортировка и каркас карточек виджетов.
 * Контент виджета приходит снаружи через renderWidget — грид
 * не знает о конкретных виджетах и остаётся переиспользуемым.
 */
export const DashboardGrid = ({ items, renderWidget }: DashboardGridProps) => {
  const { sensors, handleDragEnd } = useReorderWidgets()

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        Дашборд пуст. Добавьте виджеты из каталога слева.
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
        <div className={styles.grid}>
          {items.map((item) => (
            <SortableWidgetCard
              key={item.id}
              id={item.id}
              type={item.type}
              title={getWidgetMeta(item.type).title}
            >
              {renderWidget(item)}
            </SortableWidgetCard>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
