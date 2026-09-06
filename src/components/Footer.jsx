import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import BrandLogo from './BrandLogo.jsx'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-ink text-white/80 mt-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <BrandLogo className="text-xl text-white" iconClassName="text-turmeric" />
          <p className="text-sm mt-3 max-w-xs">{t('footer_tagline')}</p>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-3">{t('footer_explore_heading')}</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/explore" className="hover:text-turmeric transition-colors">{t('footer_explore_destination')}</Link></li>
            <li><Link to="/plan" className="hover:text-turmeric transition-colors">{t('footer_trip_planner')}</Link></li>
            <li><Link to="/favorites" className="hover:text-turmeric transition-colors">{t('footer_favorites')}</Link></li>
            <li><Link to="/about" className="hover:text-turmeric transition-colors">{t('footer_about_melokal')}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-3">{t('footer_prototype_note_heading')}</p>
          <p className="text-sm">{t('footer_prototype_note_body')}</p>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs py-4">
        {t('footer_bottom_line')} {new Date().getFullYear()}.
      </div>
    </footer>
  )
}
