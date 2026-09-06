import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function DestinationCard({ destination }) {
  const { lang, t } = useLanguage()

  return (
    <Link
      to={`/destination/${destination.slug}`}
      className="card-hover group relative block rounded-3xl overflow-hidden bg-white shadow-soft"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-xs uppercase tracking-wide opacity-80">
            {lang === 'en' ? (destination.regionEn || destination.region) : destination.region}
          </p>
          <h3 className="text-2xl font-display font-semibold">{destination.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-ink-soft line-clamp-2">
          {lang === 'en' ? (destination.taglineEn || destination.tagline) : destination.tagline}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-ink-soft">
            {destination.recommendationCount} {t('destination_card_local_recs')}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-sawah-dark group-hover:gap-2 transition-all">
            {t('destination_card_explore')} <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  )
}
