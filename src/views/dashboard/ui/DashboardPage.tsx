'use client'

import { env } from '@/shared/config/env'
import { AppHeader } from '@/widgets/app-header'
import { DashboardGrid } from '@/widgets/dashboard-grid'
import { EnvBanner } from '@/widgets/env-banner'
import { WidgetCatalog } from '@/widgets/widget-catalog'
import { Skeleton } from '@/shared/ui/skeleton'
import { useDashboardHydrated, useDashboardStore, type DashboardItem } from '@/entities/dashboard'
import { isKnownWidgetType, WIDGET_COMPONENTS } from '../model/widget-registry'
import styles from './DashboardPage.module.scss'

const SKELETON_COUNT = 4

export const DashboardPage = () => {
  const items = useDashboardStore((state) => state.items)
  const hydrated = useDashboardHydrated()

  // Защита от устаревших данных в localStorage + feature flag действует
  // и на уже сохранённые виджеты, а не только на каталог.
  const visibleItems = items.filter(
    (item) =>
      isKnownWidgetType(item.type) && (item.type !== 'post-news' || env.featureNewsWidget),
  )

  const renderWidget = (item: DashboardItem) => {
    const WidgetComponent = WIDGET_COMPONENTS[item.type]
    return <WidgetComponent />
  }

  return (
    <>
      <EnvBanner />
      <div className={styles.page}>
        <AppHeader />
        <div className={styles.body}>
          <aside className={styles.sidebar}>
            <WidgetCatalog />
          </aside>
          <main className={styles.content}>
            {hydrated ? (
              <DashboardGrid items={visibleItems} renderWidget={renderWidget} />
            ) : (
              <div className={styles.skeletonGrid}>
                {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <Skeleton key={index} className={styles.skeletonCard} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
