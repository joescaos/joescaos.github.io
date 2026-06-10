import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface Props {
  content: string
}

export function MarkdownContent({ content }: Props) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold text-ink-primary mt-10 mb-5 leading-tight" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-bold text-ink-primary mt-10 mb-4 pb-2 border-b border-surface-border" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-semibold text-ink-primary mt-7 mb-3" {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="text-ink-secondary leading-relaxed mb-4" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="space-y-1.5 mb-4 pl-5 text-ink-secondary" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="space-y-1.5 mb-4 pl-5 list-decimal text-ink-secondary" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-relaxed list-disc" {...props}>
              {children}
            </li>
          ),
          strong: ({ children, ...props }) => (
            <strong className="text-ink-primary font-semibold" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="text-ink-secondary italic" {...props}>
              {children}
            </em>
          ),
          hr: ({ ...props }) => (
            <hr className="border-surface-border my-10" {...props} />
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-accent pl-5 italic text-ink-secondary my-6 bg-surface-elevated/50 py-3 pr-4 rounded-r-lg"
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = /language-/.test(className || '')
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code
                className="bg-surface-elevated px-1.5 py-0.5 rounded text-accent font-mono text-[0.875em]"
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ children, ...props }) => (
            <pre
              className="bg-surface-elevated rounded-lg overflow-x-auto mb-6 border border-surface-border text-sm"
              {...props}
            >
              {children}
            </pre>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-surface-elevated" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="text-left px-4 py-2.5 border border-surface-border text-ink-primary font-semibold"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="px-4 py-2.5 border border-surface-border text-ink-secondary"
              {...props}
            >
              {children}
            </td>
          ),
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-xl my-8 max-w-full border border-surface-border"
              {...props}
            />
          ),
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
