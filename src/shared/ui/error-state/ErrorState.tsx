import { Button } from '@/shared/ui/button'
import styles from './ErrorState.module.scss'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export const ErrorState = ({
  title = 'Не удалось загрузить данные',
  message = 'Проверьте соединение и попробуйте ещё раз.',
  onRetry,
}: ErrorStateProps) => (
  <div className={styles.wrapper} role="alert">
    <p className={styles.title}>{title}</p>
    <p className={styles.message}>{message}</p>
    {onRetry && (
      <Button variant="ghost" onClick={onRetry}>
        Повторить
      </Button>
    )}
  </div>
)
