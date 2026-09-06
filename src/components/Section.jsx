import React from 'react'

export default function Section({ eyebrow, title, subtitle, children, className = '', id, dark = false }) {
  const titleColor = dark ? 'text-white' : 'text-ink'
  const subtitleColor = dark ? 'text-white/70' : 'text-ink-soft'
  const eyebrowColor = dark ? 'text-turmeric' : 'text-turmeric-dark'

  return (
    <section id={id} className={`surface-section ${dark ? 'surface-section-dark' : ''} py-16 md:py-24 px-6 md:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {(eyebrow || title) && (
          <div className="mb-10 md:mb-14 animate-slideUp">
            {eyebrow && (
              <p className={`${eyebrowColor} font-semibold tracking-wide uppercase text-xs mb-3`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className={`text-3xl md:text-4xl font-semibold ${titleColor} max-w-2xl`}>{title}</h2>
            )}
            {subtitle && <p className={`${subtitleColor} mt-3 max-w-xl`}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
