// Shared CRT navigation state. The side rail drives `activeSection`; index.vue
// renders the matching HUD panel. `booted` gates the boot intro (plays on load
// and whenever it is reset — e.g. switching filter).
export interface CrtSection {
  id: string
  label: string
}

export const CRT_SECTIONS: CrtSection[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
]

export function useCrt() {
  const activeSection = useState<string>('crt-section', () => 'home')
  const booted = useState<boolean>('crt-booted', () => false)
  // Bumped on every navigation to pulse the 3D core.
  const navPulse = useState<number>('crt-navpulse', () => 0)

  function pulse() {
    navPulse.value++
  }

  return { activeSection, booted, navPulse, pulse, sections: CRT_SECTIONS }
}
