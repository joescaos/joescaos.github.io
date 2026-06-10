export interface Experience {
  id: string
  company: string
  roleKey: string
  period: string
  location: string
  bulletKeys: string[]
  technologies: string[]
  current?: boolean
}

export interface Education {
  id: string
  institution: string
  degreeKey: string
  period: string
  location: string
  current?: boolean
}

export type IssuerCategory = 'aws' | 'oracle' | 'google' | 'university'

export interface Certification {
  id: string
  nameKey: string
  issuer: string
  issuerCategory: IssuerCategory
}

export interface Project {
  id: string
  nameKey: string
  descriptionKey: string
  technologies: string[]
}

export interface SkillCategory {
  categoryKey: string
  skills: string[]
}

export interface Language {
  nameKey: string
  levelKey: string
  proficiency: number
}

export interface ContactInfo {
  email: string
  location: string
  linkedinUrl: string
  githubUsername: string
}

export interface PortfolioData {
  contact: ContactInfo
  experiences: Experience[]
  education: Education[]
  certifications: Certification[]
  projects: Project[]
  skillCategories: SkillCategory[]
  languages: Language[]
}
