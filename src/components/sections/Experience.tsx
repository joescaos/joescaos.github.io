import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '../ui/SectionWrapper'
import { ExperienceCard } from '../ui/ExperienceCard'
import { getPortfolioData } from '../../data/portfolio'

export function Experience() {
  const { t } = useTranslation()
  const { experiences } = getPortfolioData()

  return (
    <SectionWrapper id="experience">
      <h2 className="text-2xl font-bold text-ink-primary mb-10 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">02.</span>
        {t('experience.heading')}
      </h2>
      <div className="space-y-10">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} variant="experience" item={exp} />
        ))}
      </div>
    </SectionWrapper>
  )
}
