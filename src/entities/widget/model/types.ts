export type WidgetType =
  | 'products-table'
  | 'products-stats'
  | 'products-chart'
  | 'post-news'

export interface WidgetMeta {
  type: WidgetType
  title: string
  description: string
}
