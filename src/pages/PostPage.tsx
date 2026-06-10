import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContentLang } from '../hooks/useContentLang'
import { getBlogPostBySlug } from '../data/blog'
import { MarkdownContent } from '../components/blog/MarkdownContent'

export function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = useContentLang()
  const post = getBlogPostBySlug(slug ?? '')

  if (!post) return <Navigate to="/posts" replace />

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    i18n.language.startsWith('es') ? 'es-CO' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      {/* Back link */}
      <Link
        to="/posts"
        className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors mb-8 group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('blog.back')}
      </Link>

      {/* Cover image */}
      {post.coverImage && (
        <div className="rounded-xl overflow-hidden mb-8 border border-surface-border">
          <img
            src={post.coverImage}
            alt={post.title[lang]}
            className="w-full max-h-72 object-cover"
          />
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-ink-primary leading-tight mb-6">
        {post.title[lang]}
      </h1>

      {/* Author + meta */}
      <div className="flex items-center gap-4 pb-8 mb-8 border-b border-surface-border">
        <img
          src={post.author.avatarUrl}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover border border-surface-border"
        />
        <div>
          <p className="text-sm font-medium text-ink-primary">{post.author.name}</p>
          <p className="text-xs text-ink-muted font-mono">
            {post.author.role[lang]} · {formattedDate} · {post.readingTimeMinutes} {t('blog.min_read')}
          </p>
        </div>
      </div>

      {/* Markdown body — switches language with the toggle */}
      <MarkdownContent content={post.content[lang]} />
    </div>
  )
}
