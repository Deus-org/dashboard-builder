'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { QueryBoundary } from '@/shared/ui/query-boundary'
import { useProductsByCategoryQuery } from '@/entities/product'
import styles from './ProductsChartWidget.module.scss'

export const ProductsChartWidget = () => {
  const { data, isPending, isError, refetch } = useProductsByCategoryQuery()

  return (
    <QueryBoundary isPending={isPending} isError={isError} onRetry={refetch}>
      {data && (
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <Tooltip
                cursor={{ fill: 'var(--surface-hover)' }}
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: 'var(--text)' }}
                formatter={(value) => [value, 'Товары']}
              />
              <Bar dataKey="products" name="Товары" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </QueryBoundary>
  )
}
