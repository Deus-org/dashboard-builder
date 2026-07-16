import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Button.module.scss'

export type ButtonVariant = 'primary' | 'ghost' | 'danger'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'ghost', className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(styles.button, styles[variant], className)}
      {...props}
    />
  ),
)

Button.displayName = 'Button'
