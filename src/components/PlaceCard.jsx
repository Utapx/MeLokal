import React from 'react'
import { Heart } from 'lucide-react'
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
    <div className="bg-white rounded-2xl shadow-soft p-4 w-full">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs text-turmeric-dark font-semibold uppercase tracking-wide">
            {meta.emoji} {meta.label}
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

      <div className="flex items-center gap-2 mt-3 text-sm">
        <span className="font-semibold text-ink">⭐ {place.localScore.toFixed(1)}</span>
        <span className="text-ink-soft">·</span>
        <span className="text-sawah-dark font-medium">💰 {place.priceRange}</span>
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
  )
}
