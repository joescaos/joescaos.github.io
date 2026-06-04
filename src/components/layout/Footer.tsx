import { useTranslation } from 'react-i18next'
import { getPortfolioData } from '../../data/portfolio'

export function Footer() {
  const { t } = useTranslation()
  const { contact } = getPortfolioData()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-border bg-surface-elevated py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted font-mono">
        <p>
          © {year} Johan Cañas · {t('footer.rights')}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="hover:text-accent transition-colors"
          >
            {contact.email}
          </a>
          <a
            href={`https://github.com/${contact.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
        <p>{t('footer.built_with')}</p>
      </div>
    </footer>
  )
}
