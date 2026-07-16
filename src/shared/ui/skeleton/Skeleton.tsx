import { cn } from '@/shared/lib/cn'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn(styles.skeleton, className)} aria-hidden="true" />
)
