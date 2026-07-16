import { env } from '@/shared/config/env'
import { ResetDashboardButton } from '@/features/reset-dashboard'
import { ThemeToggle } from '@/features/toggle-theme'
import styles from './AppHeader.module.scss'

export const AppHeader = () => (
  <header className={styles.header}>
    <div>
      <h1 className={styles.title}>Dashboard Builder</h1>
      <p className={styles.subtitle}>Конструктор дашбордов на открытых данных</p>
    </div>
    <div className={styles.actions}>
      <span className={styles.envBadge} data-env={env.appEnv}>
        {env.appEnv}
      </span>
      <ThemeToggle />
      <ResetDashboardButton />
    </div>
  </header>
)
