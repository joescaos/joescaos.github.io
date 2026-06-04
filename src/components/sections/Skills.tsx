import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SkillTag } from '../ui/SkillTag'
import { getPortfolioData } from '../../data/portfolio'

export function Skills() {
  const { t } = useTranslation()
  const { skillCategories } = getPortfolioData()

  return (
    <SectionWrapper id="skills">
      <h2 className="text-2xl font-bold text-ink-primary mb-10 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">04.</span>
        {t('skills.heading')}
      </h2>
      <div className="space-y-8">
        {skillCategories.map((category) => (
          <div key={category.categoryKey}>
            <h3 className="text-xs font-mono font-medium text-ink-muted uppercase tracking-widest mb-3">
              {t(category.categoryKey)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <SkillTag key={skill} skill={skill} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
