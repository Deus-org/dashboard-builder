import type { WidgetType } from '@/entities/widget'

/** Экземпляр виджета на дашборде пользователя. */
export interface DashboardItem {
  id: string
  type: WidgetType
}
