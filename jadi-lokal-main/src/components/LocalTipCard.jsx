import React from 'react'

export default function LocalTipCard({ icon, title, children, variant = 'default' }) {
  const variantClasses =
    variant === 'warning'
      ? 'bg-clay-light border-clay/30 text-ink'
      : 'bg-sawah-light border-sawah/20 text-ink'

  return (
    <div className={`rounded-2xl border p-4 h-full ${variantClasses}`}>
      <div className="flex items-start gap-3">
        {icon && <span className="text-xl leading-none">{icon}</span>}
        <div>
          {title && <p className="font-semibold text-sm mb-1">{title}</p>}
          <p className="text-sm text-ink-soft">{children}</p>
        </div>
      </div>
    </div>
  )
}
