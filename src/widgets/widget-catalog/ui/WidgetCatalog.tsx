'use client'

import { env } from '@/shared/config/env'
import { Card } from '@/shared/ui/card'
import { WIDGET_CATALOG } from '@/entities/widget'
import { AddWidgetButton } from '@/features/add-widget'
import styles from './WidgetCatalog.module.scss'

export const WidgetCatalog = () => {
  const availableWidgets = WIDGET_CATALOG.filter(
    (meta) => meta.type !== 'post-news' || env.featureNewsWidget,
  )

  return (
    <section aria-label="Каталог виджетов" className={styles.catalog}>
      <h2 className={styles.title}>Доступные виджеты</h2>
      <div className={styles.list}>
        {availableWidgets.map((meta) => (
          <Card key={meta.type} className={styles.item}>
            <div className={styles.itemBody}>
              <h3 className={styles.itemTitle}>{meta.title}</h3>
              <p className={styles.itemDescription}>{meta.description}</p>
            </div>
            <AddWidgetButton type={meta.type} />
          </Card>
        ))}
      </div>
    </section>
  )
}
