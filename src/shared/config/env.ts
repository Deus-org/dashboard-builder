export type AppEnv = 'development' | 'production'
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface EnvConfig {
  appEnv: AppEnv
  isDevelopment: boolean
  isProduction: boolean
  apiBaseUrl: string
  showEnvBanner: boolean
  logLevel: LogLevel
  featureNewsWidget: boolean
}

const LOG_LEVELS: readonly LogLevel[] = ['debug', 'info', 'warn', 'error']

const parseAppEnv = (value: string | undefined): AppEnv =>
  value === 'production' ? 'production' : 'development'

const parseLogLevel = (value: string | undefined): LogLevel =>
  LOG_LEVELS.includes(value as LogLevel) ? (value as LogLevel) : 'error'

const parseBoolean = (value: string | undefined, fallback: boolean): boolean =>
  value === undefined ? fallback : value === 'true'

const appEnv = parseAppEnv(process.env.NEXT_PUBLIC_APP_ENV)

/**
 * Единая точка доступа к публичным env-переменным.
 * Все NEXT_PUBLIC_* читаются только здесь — остальной код импортирует `env`.
 */
export const env: EnvConfig = {
  appEnv,
  isDevelopment: appEnv === 'development',
  isProduction: appEnv === 'production',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://dummyjson.com',
  showEnvBanner: parseBoolean(process.env.NEXT_PUBLIC_SHOW_ENV_BANNER, false),
  logLevel: parseLogLevel(process.env.NEXT_PUBLIC_LOG_LEVEL),
  featureNewsWidget: parseBoolean(process.env.NEXT_PUBLIC_FEATURE_NEWS_WIDGET, true),
}
