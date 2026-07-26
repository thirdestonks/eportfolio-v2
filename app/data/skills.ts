import type { Skill, SkillFilter } from '~/types'

export const skillFilters: SkillFilter[] = [
  { label: '[ ALL ]', value: 'all' },
  { label: '[ FRONTEND ]', value: 'frontend' },
  { label: '[ BACKEND ]', value: 'backend' },
  { label: '[ TOOLS ]', value: 'tools' },
  { label: '[ DEPLOY ]', value: 'deploy' },
  { label: '[ VERSION ]', value: 'version' },
]

export const skills: Skill[] = [
  { name: 'HTML5', note: 'markup', category: 'frontend', icon: 'HTML5.svg' },
  { name: 'CSS3', note: 'styling', category: 'frontend', icon: 'CSS3.svg' },
  { name: 'JavaScript', note: 'runtime', category: 'frontend', icon: 'JavaScript.svg' },
  { name: 'TypeScript', note: 'typed js', category: 'frontend', icon: 'TypeScript.svg' },
  { name: 'Vue', note: 'frontend', category: 'frontend', icon: 'Vue.js.svg' },
  { name: 'Nuxt.js', note: 'framework', category: 'frontend', icon: 'Nuxt JS.svg' },
  { name: 'React', note: 'ui library', category: 'frontend', icon: 'React.svg' },

  { name: 'PHP', note: 'backend', category: 'backend', icon: 'PHP.svg' },
  { name: 'Laravel', note: 'main stack', category: 'backend', icon: 'Laravel.svg' },
  { name: 'Node.js', note: 'server runtime', category: 'backend', icon: 'Node.js.svg' },
  { name: 'Nest.js', note: 'backend framework', category: 'backend', icon: 'Nest.js.svg' },

  { name: 'Figma', note: 'design', category: 'tools', icon: 'Figma.svg' },
  { name: 'Jira', note: 'management', category: 'tools', icon: 'Jira.svg' },
  { name: 'Linux', note: 'environment', category: 'tools', icon: 'Linux.svg' },
  { name: 'Postman', note: 'api testing', category: 'tools', icon: 'Postman.svg' },
  { name: 'Insomnia', note: 'http client', category: 'tools', icon: 'Insomnia.svg' },
  { name: 'RabbitMQ', note: 'queue system', category: 'tools', icon: 'RabbitMQ.svg' },

  { name: 'Docker', note: 'containers', category: 'deploy', icon: 'Docker.svg' },

  { name: 'Git', note: 'versioning', category: 'version', icon: 'Git.svg' },
  { name: 'GitHub', note: 'repository', category: 'version', icon: 'GitHub.svg' },
]
