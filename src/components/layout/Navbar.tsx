import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'
import { useActiveSection } from '../../hooks/useActiveSection'
import { LanguageToggle } from '../ui/LanguageToggle'

const NAV_SECTIONS = ['about', 'experience', 'education', 'skills', 'certifications', 'projects', 'contact']

export function Navbar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isPortfolioPage = pathname === '/'
  const activeSection = useActiveSection(isPortfolioPage ? NAV_SECTIONS : [])
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface-elevated/95 backdrop-blur-md border-b border-surface-border shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-mono text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          {'<joescaos/>'}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {isPortfolioPage ? (
            <>
              {NAV_SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === id ? 'text-accent' : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  {t(`nav.${id}`)}
                </button>
              ))}
              <Link
                to="/posts"
                className="text-sm font-medium text-ink-secondary hover:text-accent transition-colors duration-200"
              >
                {t('nav.blog')}
              </Link>
            </>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('nav.back_portfolio')}
            </Link>
          )}
          <LanguageToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-ink-secondary hover:text-ink-primary p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-elevated border-b border-surface-border px-4 pb-4">
          {isPortfolioPage ? (
            <>
              {NAV_SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`block w-full text-left py-2.5 text-sm font-medium transition-colors ${
                    activeSection === id ? 'text-accent' : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  {t(`nav.${id}`)}
                </button>
              ))}
              <Link
                to="/posts"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left py-2.5 text-sm font-medium text-ink-secondary hover:text-accent transition-colors"
              >
                {t('nav.blog')}
              </Link>
            </>
          ) : (
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 py-2.5 text-sm text-ink-muted hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('nav.back_portfolio')}
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
