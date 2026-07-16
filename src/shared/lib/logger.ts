import { env, type LogLevel } from '@/shared/config/env'

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

export interface Logger {
  debug: (...args: unknown[]) => void
  info: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
}

const shouldLog = (level: LogLevel): boolean =>
  LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[env.logLevel]

/**
 * Логгер с уровнями. В production (NEXT_PUBLIC_LOG_LEVEL=error)
 * debug/info/warn превращаются в no-op.
 */
export const createLogger = (scope: string): Logger => {
  const prefix = `[dashboard-builder:${scope}]`

  return {
    debug: (...args) => {
      if (shouldLog('debug')) console.debug(prefix, ...args)
    },
    info: (...args) => {
      if (shouldLog('info')) console.info(prefix, ...args)
    },
    warn: (...args) => {
      if (shouldLog('warn')) console.warn(prefix, ...args)
    },
    error: (...args) => {
      if (shouldLog('error')) console.error(prefix, ...args)
    },
  }
}

export const logger = createLogger('app')
