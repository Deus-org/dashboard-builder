import type { WidgetMeta, WidgetType } from './types'

/** Каталог доступных виджетов. */
export const WIDGET_CATALOG: readonly WidgetMeta[] = [
  {
    type: 'products-stats',
    title: 'Статистика',
    description: 'Ключевые показатели каталога: товары, категории, рейтинг, средняя цена.',
  },
  {
    type: 'products-table',
    title: 'Таблица',
    description: 'Список товаров: название, категория, цена, рейтинг и остаток.',
  },
  {
    type: 'products-chart',
    title: 'График',
    description: 'Количество товаров по категориям.',
  },
  {
    type: 'post-news',
    title: 'Новостная карточка',
    description: 'Свежая публикация с тегами, просмотрами и реакциями.',
  },
] as const

export const getWidgetMeta = (type: WidgetType): WidgetMeta => {
  const meta = WIDGET_CATALOG.find((item) => item.type === type)
  if (!meta) {
    throw new Error(`Unknown widget type: ${type}`)
  }
  return meta
}
