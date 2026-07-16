
import { queryOptions, useQuery } from '@tanstack/react-query'
import { postsApi } from './posts'

export const postKeys = {
  all: ['posts'] as const,
  latest: () => [...postKeys.all, 'latest'] as const,
} as const

const STALE_TIME = 5 * 60 * 1000

export const latestPostQueryOptions = () =>
  queryOptions({
    queryKey: postKeys.latest(),
    queryFn: async () => (await postsApi.getLatest()).posts,
    staleTime: STALE_TIME,
  })

export const useLatestPostQuery = () =>
  useQuery({ ...latestPostQueryOptions(), select: (posts) => posts[0] })
