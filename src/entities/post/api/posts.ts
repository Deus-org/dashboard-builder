import { http } from '@/shared/api/http'
import type { PostsResponse } from '../model/types'

export const postsApi = {
  getLatest: () => http.get<PostsResponse>('/posts?limit=1'),
}
