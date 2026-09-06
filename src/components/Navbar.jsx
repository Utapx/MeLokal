import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Languages } from 'lucide-react'
import BrandLogo from './BrandLogo.jsx'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { lang, toggleLanguage, t } = useLanguage()

  const links = [
    { to: '/', label: t('nav_home') },
    { to: '/explore', label: t('nav_explore') },
    { to: '/map', label: t('nav_map') },
    { to: '/plan', label: t('nav_plan') },
    { to: '/favorites', label: t('nav_favorites') },
    { to: '/about', label: t('nav_about') },
    { to: '/submit-destination', label: t('nav_submit_destination') },
  ]
  const desktopLinks = links.filter((link) => link.to !== '/')

  useEffect(() => setOpen(false), [location.pathname])

  // Kunci scroll body selagi sidebar mobile terbuka
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <NavLink to="/" aria-label="MeLokal home" title={t('nav_home')} className="shrink-0">
          <BrandLogo className="text-lg sm:text-xl" />
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {desktopLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  link.to === '/plan' ? 'bg-turmeric/15 text-ink hover:bg-turmeric/25' : 'hover:bg-sawah/10 hover:text-ink'
                } ${
                  isActive ? 'bg-sawah/10 text-sawah-dark' : 'text-ink-soft'
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

        <div className="flex shrink-0 items-center gap-1 md:hidden">
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

      {/* Sidebar navigasi mobile slide-in dari kanan */}
      <aside
        className={`md:hidden fixed top-3 right-3 z-50 h-[calc(100vh-1.5rem)] w-72 max-w-[80%] overflow-hidden rounded-2xl bg-paper shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-ink/10 shrink-0">
          <BrandLogo className="text-lg" />
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
                  link.to === '/plan' ? 'font-semibold bg-turmeric/10 rounded-lg px-3 text-ink' : ''
                } ${
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
