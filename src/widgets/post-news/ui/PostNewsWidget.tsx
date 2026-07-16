'use client'

import { QueryBoundary } from '@/shared/ui/query-boundary'
import { useLatestPostQuery } from '@/entities/post'
import styles from './PostNewsWidget.module.scss'

export const PostNewsWidget = () => {
  const { data: post, isPending, isError, refetch } = useLatestPostQuery()

  return (
    <QueryBoundary isPending={isPending} isError={isError} onRetry={refetch}>
      {post && (
        <article className={styles.news}>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.body}>{post.body}</p>
          <footer className={styles.footer}>
            <span>Просмотры: {post.views}</span>
            <span>Лайки: {post.reactions.likes}</span>
          </footer>
        </article>
      )}
    </QueryBoundary>
  )
}
