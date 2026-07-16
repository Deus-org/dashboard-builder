import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Card.module.scss'

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.card, className)} {...props} />
)
