import React from 'react'
import { Compass } from 'lucide-react'

export default function BrandLogo({ className = '', iconClassName = 'text-sawah' }) {
  return (
    <span className={`flex items-center gap-2 font-display font-semibold text-ink ${className}`}>
      <img
        src="/logo.png"
        alt=""
        className="h-8 w-8 object-contain"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
          event.currentTarget.nextElementSibling.style.display = 'block'
        }}
      />
      <Compass size={22} className={`${iconClassName} hidden`} aria-hidden="true" />
      <span>MeLokal</span>
    </span>
  )
}