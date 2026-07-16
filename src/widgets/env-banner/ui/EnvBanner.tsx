import { env } from '@/shared/config/env'
import styles from './EnvBanner.module.scss'

/**
 * Баннер не-production окружения.
 * Управляется флагом NEXT_PUBLIC_SHOW_ENV_BANNER.
 */
export const EnvBanner = () => {
  if (!env.showEnvBanner) {
    return null
  }

  return (
    <div className={styles.banner} role="status">
      Окружение: <strong>{env.appEnv}</strong> · API: {env.apiBaseUrl}
    </div>
  )
}
