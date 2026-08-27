import React from 'react'
import { Heart, Clock, Map } from 'lucide-react'
import { categoryMeta } from '../data/places.js'

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

export default function PlaceCard({ place, isFavorite, onToggleFavorite, onViewDetails, compact = false }) {
  const meta = categoryMeta[place.category]

  return (
    <div className="bg-white rounded-2xl shadow-soft w-full overflow-hidden flex flex-col">
      {/* Image Banner */}
      <div className="h-32 w-full bg-ink/5 relative overflow-hidden shrink-0">
        <img
          src={place.image || `https://loremflickr.com/600/400/${encodeURIComponent(place.name)},${place.destinationSlug},indonesia/all?lock=${place.id.replace(/\D/g, '') || 1}`}
          alt={place.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs text-turmeric-dark font-semibold uppercase tracking-wide">
            {meta.label}
          </span>
          <h4 className="font-display font-semibold text-ink leading-snug mt-0.5">{place.name}</h4>
        </div>
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(place.id)}
            aria-label="Simpan ke favorit"
            className={`shrink-0 rounded-full p-2 transition-colors ${
              isFavorite ? 'bg-clay-light text-clay' : 'bg-ink/5 text-ink-soft hover:bg-clay-light hover:text-clay'
            }`}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <p className="text-sm text-ink-soft italic mt-2">&ldquo;{place.quote}&rdquo;</p>

      <div className="flex flex-col gap-2 mt-4 text-sm bg-ink/5 p-3 rounded-xl border border-ink/5">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink flex items-center gap-1.5 min-w-[70px]">
            Skor lokal {place.localScore.toFixed(1)}
          </span>
          <span className="text-ink-soft">·</span>
          <span className="text-sawah-dark font-medium truncate">{place.priceRange}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-ink-soft flex items-center gap-1.5 min-w-[70px]">
            <Clock size={14} /> Jam
          </span>
          <span className="text-ink-soft">·</span>
          <span className="text-ink font-medium">{place.operationalHours || getOperationalHours(place.category, place.name)}</span>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center gap-2 w-full py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
        >
          <Map size={14} /> Buka di Google Maps
        </a>
      </div>

      {!compact && (
        <div className="mt-3 pt-3 border-t border-ink/10">
          <ScoreBar label="Local Favorite" value={place.scores.localFavorite} />
          <ScoreBar label="Tourist Crowd" value={place.scores.touristCrowd} />
          <ScoreBar label="Value for Money" value={place.scores.valueForMoney} />
          <ScoreBar label="Authenticity" value={place.scores.authenticity} />
        </div>
      )}

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(place)}
            className="mt-3 w-full text-center text-sm font-semibold text-white bg-sawah hover:bg-sawah-dark rounded-full py-2 transition-colors"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  )
}

function getOperationalHours(category, name) {
  const n = name.toLowerCase()
  if (n.includes('malam') || n.includes('night') || n.includes('subuh')) return '17:00 - 02:00'
  if (n.includes('pagi') || n.includes('sarapan')) return '06:00 - 12:00'

  switch (category) {
    case 'food': return '10:00 - 21:00'
    case 'cafe': return '09:00 - 22:00'
    case 'shopping': return '08:00 - 17:00'
    case 'culture': return '08:00 - 16:00'
    case 'hidden-gem': return 'Buka 24 Jam'
    default: return '09:00 - 17:00'
  }
}
