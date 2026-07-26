export type ProjectRole = 'FULL-STACK ENGINEER' | 'MOBILE ENGINEER'

export type ProjectStatus
  = | 'IN DEVELOPMENT'
    | 'PRODUCTION READY'
    | 'DEPLOYED'

export interface ProjectDetailColumn {
  label: string
  lines: string[]
}

export interface ProjectFeature {
  icon: string
  title: string
  description: string
}

export interface ProjectScreen {
  image: string
  alt: string
  caption: string
}

export interface Project {
  slug: string
  index: string
  role: ProjectRole
  note: string
  title: string
  description: string
  image: string
  alt: string
  /** External link for projects without a dossier page (e.g. company-use only). */
  externalLink?: string
  portrait?: boolean
  dossier?: ProjectDossier
}

export interface ProjectDossier {
  subtitle: string
  status: ProjectStatus | string
  stack: string
  type: string
  extraMeta: { label: string, value: string }
  timeline: string
  disciplines: string[]
  tools: string[]
  techStack: string[]
  background: string[]
  features: ProjectFeature[]
  screens?: ProjectScreen[]
}
