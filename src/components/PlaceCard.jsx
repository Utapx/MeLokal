import React, { useState } from 'react'
import { Heart, Clock, Map, Quote } from 'lucide-react'
import { categoryMeta } from '../data/places.js'
import { useLanguage } from '../context/LanguageContext'
import foodImage from '../../Gambar/Gambar/Kuliner Legendaris.jpg'
import cultureImage from '../../Gambar/Gambar/Budaya dan Sejarah.jpg'
import cafeImage from '../../Gambar/Gambar/Kopi Nongkrong.jpg'
import shoppingImage from '../../Gambar/Gambar/Pasar Belanja.jpg'
import hiddenGemImage from '../../Gambar/Gambar/temuan lokal.jpg'

function ScoreBar({ label, value }) {
  return (
    <div className="mb-1.5">
      <div className="flex items-center justify-between text-[10px] text-ink-soft mb-0.5">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-sawah-light rounded-full overflow-hidden">
        <div className="h-full bg-sawah rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

const PLACE_IMAGES = {
  food: foodImage,
  cafe: cafeImage,
  culture: cultureImage,
  shopping: shoppingImage,
  'hidden-gem': hiddenGemImage,
  transport: hiddenGemImage,
  attraction: cultureImage,
}

export default function PlaceCard({ place, isFavorite, onToggleFavorite, onViewDetails, compact = false }) {
  const meta = categoryMeta[place.category] || categoryMeta['hidden-gem']
  const { t } = useLanguage()
  const [imageFailed, setImageFailed] = useState(false)
  const imageSrc = place.image || PLACE_IMAGES[place.category] || PLACE_IMAGES['hidden-gem']
  const localScore = Number(place.localScore)
  const score = Number.isFinite(localScore) ? localScore : 0
  const scores = place.scores || {
    localFavorite: 0,
    touristCrowd: 0,
    valueForMoney: 0,
    authenticity: 0,
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft w-full overflow-hidden flex flex-col">
      {/* Image Banner */}
      <div className="h-32 w-full bg-ink/5 relative overflow-hidden shrink-0">
        {!imageFailed ? (
          <img
            src={imageSrc}
            alt={place.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sawah-light via-paper to-turmeric-light flex items-center justify-center">
            <span className="font-display text-3xl text-sawah-dark/60" aria-hidden="true">MeLokal</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs text-turmeric-dark font-semibold uppercase tracking-wide">
            {t(meta.translationKey)}
          </span>
          <h4 className="font-display font-semibold text-ink leading-snug mt-0.5">{place.name || 'Local place'}</h4>
        </div>
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(place.id)}
            aria-label={t('place_save_favorite')}
            className={`shrink-0 rounded-full p-2 transition-colors ${
              isFavorite ? 'bg-clay-light text-clay' : 'bg-ink/5 text-ink-soft hover:bg-clay-light hover:text-clay'
            }`}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="mt-3 rounded-xl bg-sawah-light/60 border border-sawah/10 p-3">
        <p className="text-[10px] uppercase tracking-wide font-semibold text-sawah-dark flex items-center gap-1.5">
          <Quote size={12} /> {t('place_local_review')}
        </p>
        <p className="text-sm text-ink-soft italic mt-1">&ldquo;{place.quote || 'Community-submitted local place.'}&rdquo;</p>
      </div>

      <div className="flex flex-col gap-2 mt-4 text-sm bg-ink/5 p-3 rounded-xl border border-ink/5">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink flex items-center gap-1.5 min-w-[70px]">
            {t('place_local_score')} {score.toFixed(1)}
          </span>
          <span className="text-ink-soft">·</span>
          <span className="text-sawah-dark font-medium truncate">{place.priceRange || '—'}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-ink-soft flex items-center gap-1.5 min-w-[70px]">
            <Clock size={14} /> {t('place_hours_label')}
          </span>
          <span className="text-ink-soft">·</span>
          <span className="text-ink font-medium">{place.operationalHours || getOperationalHours(place.category, place.name || '', t)}</span>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center gap-2 w-full py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
        >
          <Map size={14} /> {t('place_open_google_maps')}
        </a>
      </div>

      {!compact && (
        <div className="mt-3 pt-3 border-t border-ink/10">
          <ScoreBar label={t('place_local_favorite')} value={scores.localFavorite} />
          <ScoreBar label={t('place_tourist_crowd')} value={scores.touristCrowd} />
          <ScoreBar label={t('place_value_for_money')} value={scores.valueForMoney} />
          <ScoreBar label={t('place_authenticity')} value={scores.authenticity} />
        </div>
      )}

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(place)}
            className="mt-3 w-full text-center text-sm font-semibold text-white bg-sawah hover:bg-sawah-dark rounded-full py-2 transition-colors"
          >
            {t('place_view_details')}
          </button>
        )}
      </div>
    </div>
  )
}

function getOperationalHours(category, name, t) {
  const n = name.toLowerCase()
  if (n.includes('malam') || n.includes('night') || n.includes('subuh')) return '17:00 - 02:00'
  if (n.includes('pagi') || n.includes('sarapan')) return '06:00 - 12:00'

  switch (category) {
    case 'food': return '10:00 - 21:00'
    case 'cafe': return '09:00 - 22:00'
    case 'shopping': return '08:00 - 17:00'
    case 'culture': return '08:00 - 16:00'
    case 'hidden-gem': return t('place_open_24h')
    default: return '09:00 - 17:00'
  }
}
