// CRT "filters" — each is a whole world: colour scheme + boot screen + (soon)
// its own layout. Blade Runner and Cyberpunk get bespoke layouts next; for now
// they share the HUD layout, recoloured, with their own boot flavour.
export interface CrtFilter {
  id: string
  label: string
  color: string
  boot: { title: string, sub: string, log: string[] }
}

export const CRT_FILTERS: CrtFilter[] = [
  {
    id: 'terminal',
    label: 'TERMINAL',
    color: '#7cff5b',
    boot: {
      title: 'THIRDE-OS',
      sub: 'BUILDING BETTER SOFTWARE',
      log: [
        'WEYLAND-STYLE BIOS v3.0',
        'MEM CHECK ......... 640K OK',
        'MU-TH-UR 6000 LINK ..... [OK]',
        'MOUNT profile skills projects [OK]',
        '> SYSTEM READY',
      ],
    },
  },
  {
    id: 'blade',
    label: 'BLADE RUNNER',
    color: '#6fd3e8',
    boot: {
      title: 'ESPER',
      sub: 'LAPD · DETECTION UNIT',
      log: [
        'ESPER TERMINAL — SIGNAL LOW',
        'ENHANCE ......... CALIBRATED',
        'VOIGHT-KAMPFF LINK ..... [OK]',
        'LOADING SUBJECT: T. AGUILERA',
        '> ACCESS GRANTED',
      ],
    },
  },
  {
    id: 'cyber',
    label: 'CYBERPUNK',
    color: '#ff4d6d',
    boot: {
      title: 'T.A NETWATCH',
      sub: 'BREACH PROTOCOL · V.201',
      log: [
        'T.A NETWATCH · SCANNING',
        'ICE ......... BYPASSED',
        'DAEMON UPLOAD ..... [OK]',
        'DATASHARD: T. AGUILERA',
        '> BREACH COMPLETE',
      ],
    },
  },
]

export function useCrtFilter() {
  const id = useState<string>('crt-filter', () => 'terminal')
  const current = computed(
    () => CRT_FILTERS.find(f => f.id === id.value) ?? CRT_FILTERS[0],
  )

  function apply() {
    if (import.meta.client) document.documentElement.dataset.filter = id.value
  }

  function setFilter(next: string) {
    if (!CRT_FILTERS.some(f => f.id === next)) return
    id.value = next
    if (import.meta.client) {
      localStorage.setItem('crt-filter', next)
      apply()
    }
  }

  function init() {
    if (!import.meta.client) return
    const saved = localStorage.getItem('crt-filter')
    if (saved && CRT_FILTERS.some(f => f.id === saved)) id.value = saved
    apply()
  }

  return { id, current, filters: CRT_FILTERS, setFilter, init }
}
