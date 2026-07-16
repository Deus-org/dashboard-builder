import { http } from '@/shared/api/http'
import type { Product, ProductAnalyticsPoint, ProductsResponse } from '../model/types'

/** limit=0 — по контракту DummyJSON вернуть все записи (их немного, ~194). */
const FULL_LIST_LIMIT = 0

export const productsApi = {
  getTable: () =>
    http.get<ProductsResponse<Product>>(
      '/products?limit=8&select=title,category,price,rating,stock',
    ),

  getForAnalytics: () =>
    http.get<ProductsResponse<ProductAnalyticsPoint>>(
      `/products?limit=${FULL_LIST_LIMIT}&select=price,rating,category`,
    ),
}
