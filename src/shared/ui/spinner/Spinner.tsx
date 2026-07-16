import styles from './Spinner.module.scss'

interface SpinnerProps {
  label?: string
}

export const Spinner = ({ label = 'Загрузка данных…' }: SpinnerProps) => (
  <div className={styles.wrapper} role="status" aria-live="polite">
    <span className={styles.spinner} />
    <span className={styles.label}>{label}</span>
  </div>
)
