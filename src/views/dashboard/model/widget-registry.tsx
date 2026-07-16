import type { ComponentType } from 'react'
import type { WidgetType } from '@/entities/widget'
import { PostNewsWidget } from '@/widgets/post-news'
import { ProductsChartWidget } from '@/widgets/products-chart'
import { ProductsStatsWidget } from '@/widgets/products-stats'
import { ProductsTableWidget } from '@/widgets/products-table'

/**
 * Реестр «тип виджета → компонент».
 * Живёт на уровне pages: это композиция виджетов, а не знание самих виджетов
 * друг о друге — так не нарушается правило слоёв FSD.
 */
export const WIDGET_COMPONENTS: Record<WidgetType, ComponentType> = {
  'products-table': ProductsTableWidget,
  'products-stats': ProductsStatsWidget,
  'products-chart': ProductsChartWidget,
  'post-news': PostNewsWidget,
}

export const isKnownWidgetType = (type: string): type is WidgetType =>
  type in WIDGET_COMPONENTS
