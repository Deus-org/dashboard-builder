import type { QueryKey } from '@tanstack/react-query'
import { productKeys } from '@/entities/product'
import { postKeys } from '@/entities/post'
import type { WidgetType } from '@/entities/widget'

/** Связь виджета с query key его данных — нужна для точечной инвалидации. */
export const WIDGET_QUERY_KEYS: Record<WidgetType, QueryKey> = {
  'products-table': productKeys.table(),
  // Статистика и график делят один запрос аналитики — инвалидируется общий ключ.
  'products-stats': productKeys.analytics(),
  'products-chart': productKeys.analytics(),
  'post-news': postKeys.latest(),
}
