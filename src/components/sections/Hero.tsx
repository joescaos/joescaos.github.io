import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getPortfolioData } from '../../data/portfolio'

const TITLES = ['Backend Developer', 'Software Engineer', 'Cloud Enthusiast', 'API Architect']
const TITLES_ES = ['Desarrollador Backend', 'Ingeniero de Software', 'Entusiasta Cloud', 'Arquitecto de APIs']

export function Hero() {
  const { t, i18n } = useTranslation()
  const { contact } = getPortfolioData()
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  const titles = i18n.language === 'es' ? TITLES_ES : TITLES
  const currentTitle = titles[titleIndex]

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < currentTitle.length) {
      timeout = setTimeout(() => setDisplayed(currentTitle.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === currentTitle.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(currentTitle.slice(0, displayed.length - 1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, currentTitle, titles])

  useEffect(() => {
    setDisplayed('')
    setDeleting(false)
  }, [i18n.language])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8 text-center">
      {/* Photo */}
      <div className="relative mb-6">
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-2 ring-accent/50 ring-offset-2 ring-offset-surface-base shadow-xl shadow-accent/10">
          <img
            src="/portfolio_photo.jpeg"
            alt="Johan Esteban Cañas Ossa"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
        </div>
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-surface-base" title="Available" />
      </div>

      {/* Name */}
      <p className="text-ink-secondary text-sm font-mono mb-2">{t('hero.greeting')}</p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink-primary mb-3">
        Johan Cañas
      </h1>

      {/* Animated title */}
      <div className="h-8 flex items-center justify-center mb-4">
        <span className="text-lg sm:text-xl font-mono text-accent">
          {displayed}
          <span className="animate-blink">|</span>
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-ink-muted text-sm mb-8">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{t('hero.location')}</span>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={scrollToContact}
          className="px-6 py-2.5 bg-accent text-surface-base font-semibold text-sm rounded-lg hover:bg-accent-hover transition-colors duration-200 shadow-lg shadow-accent/20"
        >
          {t('hero.cta_contact')}
        </button>
        <a
          href={`mailto:${contact.email}`}
          className="px-6 py-2.5 border border-surface-border text-ink-secondary font-semibold text-sm rounded-lg hover:border-accent hover:text-accent transition-colors duration-200"
        >
          {contact.email}
        </a>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="flex flex-col items-center gap-1 text-ink-muted animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
