import React from 'react'

const VARIANTS = {
  sawah: 'bg-sawah-light text-sawah-dark',
  turmeric: 'bg-turmeric-light text-turmeric-dark',
  clay: 'bg-clay-light text-clay',
  ink: 'bg-ink/10 text-ink',
}

export default function Badge({ children, variant = 'sawah', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
