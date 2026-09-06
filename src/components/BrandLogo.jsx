import React from 'react'

export default function BrandLogo({ className = '', showIcon = true, iconClassName = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-semibold text-ink ${className}`}>
      {showIcon && (
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          className={`h-[1.35em] w-[1.35em] object-contain ${iconClassName}`}
        />
      )}
      <span>MeLokal</span>
    </span>
  )
}