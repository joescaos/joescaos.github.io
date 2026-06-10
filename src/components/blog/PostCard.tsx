import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContentLang } from '../../hooks/useContentLang'
import type { BlogPost } from '../../types/blog.types'

interface Props {
  post: BlogPost
}

export function PostCard({ post }: Props) {
  const { t, i18n } = useTranslation()
  const lang = useContentLang()

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    i18n.language.startsWith('es') ? 'es-CO' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <Link
      to={`/posts/${post.slug}`}
      className="group block bg-surface-elevated border border-surface-border rounded-xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
    >
      {post.coverImage && (
        <div className="h-48 overflow-hidden bg-surface-subtle">
          <img
            src={post.coverImage}
            alt={post.title[lang]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-ink-primary mb-2 leading-snug group-hover:text-accent transition-colors duration-200">
          {post.title[lang]}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-ink-secondary leading-relaxed mb-4 line-clamp-3">
          {post.excerpt[lang]}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-border">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover border border-surface-border"
            />
            <span className="text-xs text-ink-muted">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-muted font-mono">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.readingTimeMinutes} {t('blog.min_read')}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
