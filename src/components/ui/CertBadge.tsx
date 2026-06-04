import { useTranslation } from 'react-i18next'
import type { Certification, IssuerCategory } from '../../types/portfolio.types'

const categoryColors: Record<IssuerCategory, string> = {
  aws: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  oracle: 'text-red-400 bg-red-400/10 border-red-400/20',
  google: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  university: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
}

const categoryLabels: Record<IssuerCategory, string> = {
  aws: 'AWS',
  oracle: 'Oracle',
  google: 'Google',
  university: 'Univ.',
}

export function CertBadge({ cert }: { cert: Certification }) {
  const { t } = useTranslation()

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-surface-border bg-surface-elevated hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-200">
      <span
        className={`shrink-0 text-xs font-mono font-bold px-2 py-1 rounded border ${categoryColors[cert.issuerCategory]}`}
      >
        {categoryLabels[cert.issuerCategory]}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-primary leading-snug">{t(cert.nameKey)}</p>
        <p className="text-xs text-ink-muted mt-0.5">{cert.issuer}</p>
      </div>
    </div>
  )
}
