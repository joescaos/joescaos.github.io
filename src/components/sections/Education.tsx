import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '../ui/SectionWrapper'
import { ExperienceCard } from '../ui/ExperienceCard'
import { getPortfolioData } from '../../data/portfolio'

export function Education() {
  const { t } = useTranslation()
  const { education } = getPortfolioData()

  return (
    <SectionWrapper id="education">
      <h2 className="text-2xl font-bold text-ink-primary mb-10 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">03.</span>
        {t('education.heading')}
      </h2>
      <div className="space-y-8">
        {education.map((edu) => (
          <ExperienceCard key={edu.id} variant="education" item={edu} />
        ))}
      </div>
    </SectionWrapper>
  )
}
