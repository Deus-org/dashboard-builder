import type { ReactNode } from 'react'
import { ErrorState } from '@/shared/ui/error-state'
import { Spinner } from '@/shared/ui/spinner'

interface QueryBoundaryProps {
  isPending: boolean
  isError: boolean
  onRetry: () => void
  children: ReactNode
}

/** Единый паттерн loading/error для всех виджетов с данными React Query. */
export const QueryBoundary = ({ isPending, isError, onRetry, children }: QueryBoundaryProps) => {
  if (isPending) {
    return <Spinner />
  }
  if (isError) {
    return <ErrorState onRetry={onRetry} />
  }
  return <>{children}</>
}
