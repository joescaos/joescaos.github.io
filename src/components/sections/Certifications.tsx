import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '../ui/SectionWrapper'
import { CertBadge } from '../ui/CertBadge'
import { getPortfolioData } from '../../data/portfolio'

export function Certifications() {
  const { t } = useTranslation()
  const { certifications } = getPortfolioData()

  return (
    <SectionWrapper id="certifications">
      <h2 className="text-2xl font-bold text-ink-primary mb-10 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">05.</span>
        {t('certifications.heading')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {certifications.map((cert) => (
          <CertBadge key={cert.id} cert={cert} />
        ))}
      </div>
    </SectionWrapper>
  )
}
