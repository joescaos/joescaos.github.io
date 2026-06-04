import { useTranslation } from 'react-i18next'

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'

  const toggle = () => {
    i18n.changeLanguage(isEN ? 'es' : 'en')
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 text-xs font-mono font-medium px-3 py-1.5 rounded-full border border-surface-border text-ink-secondary hover:border-accent hover:text-accent transition-colors duration-200"
      aria-label="Toggle language"
    >
      <span className={isEN ? 'text-accent' : 'text-ink-muted'}>EN</span>
      <span className="text-ink-muted">|</span>
      <span className={!isEN ? 'text-accent' : 'text-ink-muted'}>ES</span>
    </button>
  )
}
