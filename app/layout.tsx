import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { AppProviders } from '@/app/providers'
import '@/app/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Dashboard Builder',
  description: 'Конструктор дашбордов на открытых данных',
}

// suppressHydrationWarning нужен: next-themes выставляет data-theme на <html> на клиенте.
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
