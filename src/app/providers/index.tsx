'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { QueryProvider } from './QueryProvider'

/**
 * Композиция глобальных провайдеров.
 * Тема переключается через data-theme на <html>, выбор хранится в localStorage
 * (это делает next-themes), дефолт — системная тема пользователя.
 */
export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider
    attribute="data-theme"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <QueryProvider>{children}</QueryProvider>
  </ThemeProvider>
)
