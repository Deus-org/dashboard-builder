import { describe, expect, it } from 'vitest'
import { selectProductsByCategory, selectProductsStats } from './queries'
import type { ProductAnalyticsPoint } from '../model/types'

const products: ProductAnalyticsPoint[] = [
  { price: 10, rating: 4, category: 'beauty' },
  { price: 20, rating: 5, category: 'beauty' },
  { price: 30, rating: 3, category: 'laptops' },
]

describe('selectProductsStats', () => {
  it('считает агрегаты по каталогу', () => {
    expect(selectProductsStats(products)).toEqual({
      total: 3,
      categories: 2,
      averageRating: 4,
      averagePrice: 20,
    })
  })

  it('корректно обрабатывает пустой список', () => {
    expect(selectProductsStats([])).toEqual({
      total: 0,
      categories: 0,
      averageRating: 0,
      averagePrice: 0,
    })
  })
})

describe('selectProductsByCategory', () => {
  it('группирует по категориям и сортирует по убыванию', () => {
    expect(selectProductsByCategory(products)).toEqual([
      { category: 'beauty', products: 2 },
      { category: 'laptops', products: 1 },
    ])
  })
})
