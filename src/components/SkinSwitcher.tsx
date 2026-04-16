import { useState } from 'react'
import { clsx } from 'clsx'

interface Theme {
  label: string
  vars: Record<string, string>
}

const THEMES: Theme[] = [
  {
    label: 'AgVend Default',
    vars: {
      '--color-primary':        '#2d7a3a',
      '--color-link':           '#29abe2',
      '--color-dashboard-icon': '#006b77',
      '--color-success':        '#5cb85c',
      '--color-fail':           '#d9534f',
      '--color-footer-bg':      '#222222',
      '--color-cp-nav':         '#3d2b1f',
      '--color-cp-nav-menu':    '#4a3728',
      '--color-th-nav':         '#3d2b1f',
      '--color-tags':           '#4a90e2',
    },
  },
  {
    label: 'Ocean Blue',
    vars: {
      '--color-primary':        '#1a56db',
      '--color-link':           '#0891b2',
      '--color-dashboard-icon': '#0e7490',
      '--color-success':        '#059669',
      '--color-fail':           '#dc2626',
      '--color-footer-bg':      '#1e293b',
      '--color-cp-nav':         '#1e3a5f',
      '--color-cp-nav-menu':    '#1e40af',
      '--color-th-nav':         '#1e3a5f',
      '--color-tags':           '#6366f1',
    },
  },
  {
    label: 'Harvest Gold',
    vars: {
      '--color-primary':        '#b45309',
      '--color-link':           '#d97706',
      '--color-dashboard-icon': '#92400e',
      '--color-success':        '#16a34a',
      '--color-fail':           '#dc2626',
      '--color-footer-bg':      '#1c1917',
      '--color-cp-nav':         '#44403c',
      '--color-cp-nav-menu':    '#57534e',
      '--color-th-nav':         '#44403c',
      '--color-tags':           '#d97706',
    },
  },
]

export function SkinSwitcher() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  const apply = (index: number) => {
    const { vars } = THEMES[index]
    Object.entries(vars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(k, v),
    )
    setActive(index)
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-white rounded-xl shadow-xl border border-divider p-2 min-w-[190px]">
          <p className="text-[11px] font-semibold text-text-light uppercase tracking-wide px-2 py-1.5">
            Partner Skin
          </p>
          {THEMES.map((theme, i) => (
            <button
              key={theme.label}
              onClick={() => apply(i)}
              className={clsx(
                'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                i === active
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-text-base hover:bg-bg-base',
              )}
            >
              <span
                className="w-3.5 h-3.5 rounded-full flex-shrink-0 border border-black/10"
                style={{ background: theme.vars['--color-primary'] }}
              />
              {theme.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center text-xl hover:opacity-90 transition-opacity"
        title="Switch skin"
        aria-label="Switch partner skin"
      >
        🎨
      </button>
    </div>
  )
}
