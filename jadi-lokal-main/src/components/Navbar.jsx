import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Languages } from 'lucide-react'
import BrandLogo from './BrandLogo.jsx'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { lang, toggleLanguage, t } = useLanguage()

  const links = [
    { to: '/explore', label: t('nav_explore') },
    { to: '/map', label: t('nav_map') },
    { to: '/plan', label: t('nav_plan') },
    { to: '/favorites', label: t('nav_favorites') },
    { to: '/about', label: t('nav_about') },
    { to: '/submit-destination', label: t('nav_submit_destination') },
  ]

  // Kunci scroll body selagi sidebar mobile terbuka
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <NavLink to="/" aria-label="MeLokal home">
          <BrandLogo className="text-xl" />
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-sawah-dark' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitch lang={lang} onToggle={toggleLanguage} compact />
          <button
            className="p-2 -mr-2 text-ink"
            onClick={() => setOpen(true)}
            aria-label={t('nav_menu_open')}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar navigasi mobile — slide-in dari kanan */}
      <aside
        className={`md:hidden fixed inset-y-0 right-0 z-50 h-screen w-full bg-[#FAF6EC] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col overflow-hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-ink/10 shrink-0">
          <BrandLogo />
          <button
            className="p-2 -mr-2 text-ink"
            onClick={() => setOpen(false)}
            aria-label={t('nav_menu_close')}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col px-6 py-6 gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 text-base font-medium border-b border-ink/5 ${
                  isActive ? 'text-sawah-dark' : 'text-ink-soft'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="h-6 shrink-0" />
      </aside>
    </header>
  )
}

function LanguageSwitch({ lang, onToggle, compact = false }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Switch language"
      title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
      className={`flex items-center gap-1.5 rounded-full border border-ink/15 font-semibold transition-colors hover:border-sawah ${
        compact ? 'px-2.5 py-1.5 text-[11px]' : 'px-3 py-1.5 text-xs'
      }`}
    >
      <Languages size={14} />
      <span className={lang === 'id' ? 'text-ink' : 'text-ink-soft/50'}>ID</span>
      <span className="text-ink-soft/40">/</span>
      <span className={lang === 'en' ? 'text-ink' : 'text-ink-soft/50'}>EN</span>
    </button>
  )
}
