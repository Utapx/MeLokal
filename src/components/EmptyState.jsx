import React from 'react'

export default function EmptyState({ icon = '🧭', title, description, action }) {
  return (
    <div className="text-center py-16 px-6 rounded-3xl bg-white/60 border border-dashed border-ink/20">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-display text-xl font-semibold text-ink mb-1">{title}</h3>
      {description && <p className="text-ink-soft text-sm max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
