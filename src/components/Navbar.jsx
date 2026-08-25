import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Compass, Menu, X, LogOut, Settings } from 'lucide-react'
import Button from './Button.jsx'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/explore', label: 'Explore' },
  { to: '/map', label: 'Map' },
  { to: '/plan', label: 'Plan Trip' },
  { to: '/favorites', label: 'Favorites' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, isAdmin, logout } = useAuth()

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

        <div className="hidden md:flex items-center gap-4">
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
                    👤 Profil Saya
                  </NavLink>
                  {isAdmin && (
                    <NavLink
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-ink/5 transition-colors"
                    >
                      <Settings size={16} />
                      Admin Panel
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
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button to="/login" variant="primary">
              Masuk
            </Button>
          )}
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu navigasi"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-paper animate-slideUp">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium ${isActive ? 'text-sawah-dark' : 'text-ink-soft'}`
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
                  className="text-base font-medium text-ink-soft"
                >
                  👤 Profil Saya
                </NavLink>
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-ink-soft"
                  >
                    👨‍💼 Admin Panel
                  </NavLink>
                )}
              </>
            )}
            <div className="pt-2 border-t border-ink/10">
              {user ? (
                <button
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              ) : (
                <Button to="/login" variant="primary" className="w-full" onClick={() => setOpen(false)}>
                  Masuk
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
