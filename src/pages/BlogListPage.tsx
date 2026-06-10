import { useTranslation } from 'react-i18next'
import { PostCard } from '../components/blog/PostCard'
import { getBlogPosts } from '../data/blog'

export function BlogListPage() {
  const { t } = useTranslation()
  const posts = getBlogPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-ink-primary mb-3">
          <span className="text-accent font-mono text-2xl mr-3">//</span>
          {t('blog.heading')}
        </h1>
        <p className="text-ink-secondary">{t('blog.subheading')}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-ink-muted text-center py-20">{t('blog.empty')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
