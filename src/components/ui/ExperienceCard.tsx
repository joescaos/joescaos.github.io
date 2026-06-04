import { useTranslation } from 'react-i18next'
import { SkillTag } from './SkillTag'
import type { Experience, Education } from '../../types/portfolio.types'

interface ExperienceProps {
  variant: 'experience'
  item: Experience
}

interface EducationProps {
  variant: 'education'
  item: Education
}

type Props = ExperienceProps | EducationProps

export function ExperienceCard({ variant, item }: Props) {
  const { t } = useTranslation()

  const period =
    'current' in item && item.current
      ? `${item.period.replace('– ', '')}${t('experience.present')}`
      : item.period

  return (
    <div className="relative pl-6 border-l-2 border-surface-border hover:border-accent transition-colors duration-300 group">
      {/* Timeline dot */}
      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-surface-border group-hover:bg-accent transition-colors duration-300" />

      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-ink-primary">
          {variant === 'experience'
            ? t((item as Experience).roleKey)
            : t((item as Education).degreeKey)}
        </h3>
        {'current' in item && item.current && (
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            {t('experience.present')}
          </span>
        )}
      </div>

      <p className="text-sm font-medium text-accent mb-1">
        {variant === 'experience' ? (item as Experience).company : (item as Education).institution}
      </p>

      <p className="text-xs text-ink-muted font-mono mb-3">
        {period} · {item.location}
      </p>

      {variant === 'experience' && (
        <>
          <ul className="space-y-1.5 mb-4">
            {(item as Experience).bulletKeys.map((key) => (
              <li key={key} className="text-sm text-ink-secondary leading-relaxed flex gap-2">
                <span className="text-accent mt-1 shrink-0">▸</span>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
          {(item as Experience).technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(item as Experience).technologies.map((tech, i) => (
                <SkillTag key={tech} skill={tech} index={i} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
