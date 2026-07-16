'use client'

import type { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ErrorState } from '@/shared/ui/error-state'

interface ErrorBoundaryProps {
  children: ReactNode
  /** При смене значений boundary сбрасывается и пробует отрендерить заново. */
  resetKeys?: unknown[]
}

/** Изолирует падение рендера: ломается один виджет, а не вся страница. */
export const ErrorBoundary = ({ children, resetKeys }: ErrorBoundaryProps) => (
  <ReactErrorBoundary
    resetKeys={resetKeys}
    fallbackRender={({ resetErrorBoundary }) => (
      <ErrorState
        title="Виджет сломался"
        message="Произошла ошибка при отрисовке."
        onRetry={resetErrorBoundary}
      />
    )}
  >
    {children}
  </ReactErrorBoundary>
)
