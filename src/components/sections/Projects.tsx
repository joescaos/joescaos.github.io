import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '../ui/SectionWrapper'
import { ProjectCard } from '../ui/ProjectCard'
import { getPortfolioData } from '../../data/portfolio'

export function Projects() {
  const { t } = useTranslation()
  const { projects } = getPortfolioData()

  return (
    <SectionWrapper id="projects">
      <h2 className="text-2xl font-bold text-ink-primary mb-10 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">06.</span>
        {t('projects.heading')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  )
}
