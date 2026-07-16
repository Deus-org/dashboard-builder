'use client'

import { QueryBoundary } from '@/shared/ui/query-boundary'
import { formatPrice } from '@/shared/lib/format/price'
import { useProductsTableQuery } from '@/entities/product'
import styles from './ProductsTableWidget.module.scss'

const LOW_STOCK_THRESHOLD = 10

export const ProductsTableWidget = () => {
  const { data, isPending, isError, refetch } = useProductsTableQuery()

  return (
    <QueryBoundary isPending={isPending} isError={isError} onRetry={refetch}>
      {data && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Товар</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Рейтинг</th>
              <th>Остаток</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td className={styles.category}>{product.category}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.rating.toFixed(1)}</td>
                <td>
                  <span className={styles.badge} data-low={product.stock < LOW_STOCK_THRESHOLD}>
                    {product.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </QueryBoundary>
  )
}
