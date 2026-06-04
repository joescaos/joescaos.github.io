import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '../ui/SectionWrapper'

export function About() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="about">
      <h2 className="text-2xl font-bold text-ink-primary mb-8 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">01.</span>
        {t('about.heading')}
      </h2>
      <div className="max-w-2xl">
        <p className="text-ink-secondary leading-relaxed text-base">
          {t('about.summary')}
        </p>
      </div>
    </SectionWrapper>
  )
}
