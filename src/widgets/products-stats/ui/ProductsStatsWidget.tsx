'use client'

import { Card } from '@/shared/ui/card'
import { QueryBoundary } from '@/shared/ui/query-boundary'
import { formatPrice } from '@/shared/lib/format/price'
import { useProductsStatsQuery } from '@/entities/product'
import styles from './ProductsStatsWidget.module.scss'

export const ProductsStatsWidget = () => {
  const { data, isPending, isError, refetch } = useProductsStatsQuery()

  return (
    <QueryBoundary isPending={isPending} isError={isError} onRetry={refetch}>
      {data && (
        <div className={styles.grid}>
          {[
            { label: 'Всего товаров', value: String(data.total), tone: 'neutral' },
            { label: 'Категорий', value: String(data.categories), tone: 'accent' },
            { label: 'Средний рейтинг', value: data.averageRating.toFixed(1), tone: 'success' },
            { label: 'Средняя цена', value: formatPrice(data.averagePrice), tone: 'neutral' },
          ].map((stat) => (
            <Card key={stat.label} className={styles.tile} data-tone={stat.tone}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </Card>
          ))}
        </div>
      )}
    </QueryBoundary>
  )
}
