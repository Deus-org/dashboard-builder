import { env } from '@/shared/config/env'
import { createLogger } from '@/shared/lib/logger'

const logger = createLogger('http')

export class HttpError extends Error {
  public readonly status: number
  public readonly url: string

  constructor(status: number, message: string, url: string) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.url = url
  }
}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const url = `${env.apiBaseUrl}${path}`
  const method = init?.method ?? 'GET'
  logger.debug(`${method} ${url}`)

  let response: Response
  try {
    response = await fetch(url, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    })
  } catch (cause) {
    logger.error(`network failure: ${method} ${url}`, cause)
    throw new HttpError(0, 'Сетевая ошибка при обращении к API', url)
  }

  if (!response.ok) {
    logger.error(`http ${response.status}: ${method} ${url}`)
    throw new HttpError(response.status, `Запрос завершился со статусом ${response.status}`, url)
  }

  return response.json() as Promise<T>
}

/** Тонкая обёртка над fetch: base URL из env, нормализация ошибок, логирование. */
export const http = {
  get: <T>(path: string): Promise<T> => request<T>(path),
  post: <T>(path: string, body: unknown): Promise<T> =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
}
