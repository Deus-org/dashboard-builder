export interface Product {
  id: number
  title: string
  category: string
  price: number
  rating: number
  stock: number
}

/** Поля, которые реально запрашиваются для аналитики (select=price,rating,category). */
export type ProductAnalyticsPoint = Pick<Product, 'price' | 'rating' | 'category'>

export interface ProductsResponse<T = Product> {
  products: T[]
  total: number
  skip: number
  limit: number
}

export interface ProductsStats {
  total: number
  categories: number
  averageRating: number
  averagePrice: number
}

export interface ProductsByCategoryPoint {
  category: string
  products: number
}
