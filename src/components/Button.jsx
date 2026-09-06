import React from 'react'
import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-turmeric text-ink hover:bg-turmeric-dark shadow-soft',
  secondary: 'bg-sawah text-white hover:bg-sawah-dark shadow-soft',
  ghost: 'bg-transparent text-ink border border-ink/20 hover:border-ink/50',
  soft: 'bg-sawah-light text-sawah-dark border border-sawah/20 hover:bg-sawah/15 hover:border-sawah/40',
  outline: 'bg-transparent text-white border border-white/70 hover:bg-white/10',
}

export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  icon: Icon,
  disabled = false,
}) {
  const classes = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`

  const content = (
    <>
      {children}
      {Icon && <Icon size={16} />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  )
}
