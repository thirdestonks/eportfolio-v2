export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'deploy' | 'version'

export interface Skill {
  name: string
  note: string
  category: SkillCategory
  icon: string
}

export interface SkillFilter {
  label: string
  value: SkillCategory | 'all'
}
