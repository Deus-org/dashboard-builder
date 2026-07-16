import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { DashboardPage } from '@/views/dashboard'
import { latestPostQueryOptions } from '@/entities/post'
import {
  productsAnalyticsQueryOptions,
  productsTableQueryOptions,
} from '@/entities/product'

/**
 * Серверный prefetch: данные приезжают в HTML (dehydrate),
 * клиент подхватывает их из кэша без повторного запроса (HydrationBoundary).
 * prefetchQuery не бросает исключения наружу: при недоступности API страница
 * всё равно отрендерится, а виджеты покажут error-state и повторят запрос на клиенте.
 */
export default async function Page() {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery(productsTableQueryOptions()),
    queryClient.prefetchQuery(productsAnalyticsQueryOptions()),
    queryClient.prefetchQuery(latestPostQueryOptions()),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPage />
    </HydrationBoundary>
  )
}
