import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { arrayMove } from '@dnd-kit/sortable'
import { env } from '@/shared/config/env'
import { createId } from '@/shared/lib/id'
import type { WidgetType } from '@/entities/widget'
import type { DashboardItem } from './types'

interface DashboardState {
  items: DashboardItem[]
  addWidget: (type: WidgetType) => void
  removeWidget: (id: string) => void
  moveWidget: (activeId: string, overId: string) => void
  resetDashboard: () => void
}

const createDefaultItems = (): DashboardItem[] => [
  { id: 'default-stats', type: 'products-stats' },
  { id: 'default-chart', type: 'products-chart' },
  { id: 'default-table', type: 'products-table' },
  { id: 'default-news', type: 'post-news' },
]

/**
 * Единственное клиентское состояние приложения — конфигурация дашборда.
 * Серверные данные здесь не хранятся: за них отвечает React Query.
 * Конфигурация персистится в localStorage (namespace зависит от окружения).
 */
export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      items: createDefaultItems(),

      addWidget: (type) =>
        set((state) => ({
          items: [...state.items, { id: createId(), type }],
        })),

      removeWidget: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      moveWidget: (activeId, overId) =>
        set((state) => {
          const from = state.items.findIndex((item) => item.id === activeId)
          const to = state.items.findIndex((item) => item.id === overId)
          if (from === -1 || to === -1 || from === to) {
            return state
          }
          return { items: arrayMove(state.items, from, to) }
        }),

      resetDashboard: () => set({ items: createDefaultItems() }),
    }),
    {
      name: `dashboard-builder:layout:${env.appEnv}`,
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
