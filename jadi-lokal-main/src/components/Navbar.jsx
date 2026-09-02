import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Compass, Menu, X, LogOut, Settings, Languages } from 'lucide-react'
import Button from './Button.jsx'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, isAdmin, logout } = useAuth()
  const { lang, toggleLanguage, t } = useLanguage()

  const links = [
    { to: '/explore', label: t('nav_explore') },
    { to: '/map', label: t('nav_map') },
    { to: '/plan', label: t('nav_plan') },
    { to: '/favorites', label: t('nav_favorites') },
    { to: '/about', label: t('nav_about') },
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
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <Compass size={22} className="text-sawah" />
          MeLokal
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

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch lang={lang} onToggle={toggleLanguage} />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-ink/5 transition-colors"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sawah text-white flex items-center justify-center text-sm font-semibold">
                    {user.email[0].toUpperCase()}
                  </div>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-ink-soft overflow-hidden z-50">
                  <div className="p-3 border-b border-ink-soft">
                    <p className="text-sm font-semibold text-ink">{user.displayName || 'Pengguna'}</p>
                    <p className="text-xs text-ink-soft">{user.email}</p>
                  </div>
                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-ink/5 transition-colors"
                  >
                    {t('nav_my_profile')}
                  </NavLink>
                  {isAdmin && (
                    <NavLink
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-ink/5 transition-colors"
                    >
                      <Settings size={16} />
                      {t('nav_admin_panel')}
                    </NavLink>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setProfileOpen(false)
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-ink-soft"
                  >
                    <LogOut size={16} />
                    {t('nav_logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button to="/login" variant="primary">
              {t('nav_login')}
            </Button>
          )}
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
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-72 max-w-[82%] bg-paper shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-ink/10 shrink-0">
          <span className="flex items-center gap-2 font-display font-semibold text-ink">
            <Compass size={20} className="text-sawah" />
            MeLokal
          </span>
          <button
            className="p-2 -mr-2 text-ink"
            onClick={() => setOpen(false)}
            aria-label={t('nav_menu_close')}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto flex flex-col px-6 py-6 gap-1">
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

          {user && (
            <>
              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-ink-soft border-b border-ink/5"
              >
                {t('nav_my_profile')}
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium text-ink-soft border-b border-ink/5"
                >
                  {t('nav_admin_panel')}
                </NavLink>
              )}
            </>
          )}
        </nav>

        <div className="p-6 pt-4 border-t border-ink/10 shrink-0">
          {user ? (
            <button
              onClick={() => {
                logout()
                setOpen(false)
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-full font-semibold"
            >
              <LogOut size={16} />
              {t('nav_logout')}
            </button>
          ) : (
            <Button to="/login" variant="primary" className="w-full" onClick={() => setOpen(false)}>
              {t('nav_login')}
            </Button>
          )}
        </div>
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
