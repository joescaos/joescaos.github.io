import { useTranslation } from 'react-i18next'
import { SkillTag } from './SkillTag'
import type { Project } from '../../types/portfolio.types'

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col p-5 rounded-lg border border-surface-border bg-surface-elevated hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5 transition-all duration-200 h-full">
      <div className="flex items-start gap-2 mb-3">
        <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <h3 className="text-sm font-semibold text-ink-primary">{t(project.nameKey)}</h3>
      </div>
      <p className="text-sm text-ink-secondary leading-relaxed flex-1 mb-4">{t(project.descriptionKey)}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.technologies.map((tech, i) => (
          <SkillTag key={tech} skill={tech} index={i} />
        ))}
      </div>
    </div>
  )
}
