import React, { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations.js'

const STORAGE_KEY = 'melokal:lang'
const LanguageContext = createContext(null)

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'id'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'en' || stored === 'id' ? stored : 'id'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  function toggleLanguage() {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'))
  }

  function t(key) {
    const entry = translations[key]
    if (!entry) return key
    return entry[lang] ?? entry.id ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
