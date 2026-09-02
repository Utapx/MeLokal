import React from 'react'
import { Compass } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-ink text-white/80 mt-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white font-display text-xl font-semibold">
            <Compass size={22} className="text-turmeric" />
            MeLokal
          </div>
          <p className="text-sm mt-3 max-w-xs">{t('footer_tagline')}</p>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-3">{t('footer_explore_heading')}</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/explore" className="hover:text-turmeric transition-colors">{t('footer_explore_destination')}</a></li>
            <li><a href="/plan" className="hover:text-turmeric transition-colors">{t('footer_trip_planner')}</a></li>
            <li><a href="/favorites" className="hover:text-turmeric transition-colors">{t('footer_favorites')}</a></li>
            <li><a href="/about" className="hover:text-turmeric transition-colors">{t('footer_about_melokal')}</a></li>
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
