import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Compass, Menu, X } from 'lucide-react'
import Button from './Button.jsx'

const links = [
  { to: '/explore', label: 'Explore' },
  { to: '/map', label: 'Map' },
  { to: '/plan', label: 'Plan Trip' },
  { to: '/favorites', label: 'Favorites' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <Compass size={22} className="text-sawah" />
          Jadi Lokal
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

        <div className="hidden md:block">
          <Button to="/explore" variant="primary">Start Exploring</Button>
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
            <Button to="/explore" variant="primary" className="w-full mt-2" onClick={() => setOpen(false)}>
              Start Exploring
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
