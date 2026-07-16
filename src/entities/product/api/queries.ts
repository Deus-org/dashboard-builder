
import { queryOptions, useQuery } from '@tanstack/react-query'
import { productsApi } from './products'
import type {
  ProductAnalyticsPoint,
  ProductsByCategoryPoint,
  ProductsStats,
} from '../model/types'

/** Фабрика query keys: единый неймспейс `products` для точечной инвалидации. */
export const productKeys = {
  all: ['products'] as const,
  table: () => [...productKeys.all, 'table'] as const,
  analytics: () => [...productKeys.all, 'analytics'] as const,
} as const

const STALE_TIME = 5 * 60 * 1000

export const productsTableQueryOptions = () =>
  queryOptions({
    queryKey: productKeys.table(),
    queryFn: async () => (await productsApi.getTable()).products,
    staleTime: STALE_TIME,
  })

/**
 * Один запрос аналитики — один HTTP-вызов и один кэш.
 * Статистика и график — разные `select` поверх этих же опций.
 */
export const productsAnalyticsQueryOptions = () =>
  queryOptions({
    queryKey: productKeys.analytics(),
    queryFn: async () => (await productsApi.getForAnalytics()).products,
    staleTime: STALE_TIME,
  })

export const selectProductsStats = (products: ProductAnalyticsPoint[]): ProductsStats => {
  const total = products.length
  if (total === 0) {
    return { total: 0, categories: 0, averageRating: 0, averagePrice: 0 }
  }
  const categories = new Set(products.map((product) => product.category)).size
  const ratingSum = products.reduce((sum, product) => sum + product.rating, 0)
  const priceSum = products.reduce((sum, product) => sum + product.price, 0)
  return {
    total,
    categories,
    averageRating: Math.round((ratingSum / total) * 10) / 10,
    averagePrice: Math.round(priceSum / total),
  }
}

export const selectProductsByCategory = (
  products: ProductAnalyticsPoint[],
): ProductsByCategoryPoint[] => {
  const counter = new Map<string, number>()
  for (const { category } of products) {
    counter.set(category, (counter.get(category) ?? 0) + 1)
  }
  return [...counter.entries()]
    .map(([category, count]) => ({ category, products: count }))
    .sort((a, b) => b.products - a.products)
}

export const useProductsTableQuery = () => useQuery(productsTableQueryOptions())

export const useProductsStatsQuery = () =>
  useQuery({ ...productsAnalyticsQueryOptions(), select: selectProductsStats })

export const useProductsByCategoryQuery = () =>
  useQuery({ ...productsAnalyticsQueryOptions(), select: selectProductsByCategory })
