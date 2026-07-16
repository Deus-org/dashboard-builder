'use client'

import type { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/shared/lib/cn'
import { ErrorBoundary } from '@/shared/ui/error-boundary'
import { Icon } from '@/shared/ui/icon'
import type { WidgetType } from '@/entities/widget'
import { RemoveWidgetButton } from '@/features/remove-widget'
import { RefreshWidgetDataButton } from '@/features/refresh-widget-data'
import styles from './SortableWidgetCard.module.scss'

interface SortableWidgetCardProps {
  id: string
  type: WidgetType
  title: string
  children: ReactNode
}

export const SortableWidgetCard = ({ id, type, title, children }: SortableWidgetCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  return (
    <article
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(styles.card, isDragging && styles.dragging)}
    >
      <header className={styles.header}>
        <button
          type="button"
          className={styles.dragHandle}
          aria-label={`Перетащить виджет «${title}»`}
          {...attributes}
          {...listeners}
        >
          <Icon name="drag" size={14} />
        </button>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.actions}>
          <RefreshWidgetDataButton type={type} />
          <RemoveWidgetButton id={id} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Падение одного виджета не роняет весь дашборд. */}
        <ErrorBoundary resetKeys={[id]}>{children}</ErrorBoundary>
      </div>
    </article>
  )
}
