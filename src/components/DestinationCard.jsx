import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import LocalScoreStamp from './LocalScoreStamp.jsx'

export default function DestinationCard({ destination }) {
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
        <div className="absolute top-3 right-3">
          <LocalScoreStamp score={destination.localScore} size="sm" />
        </div>
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-xs uppercase tracking-wide opacity-80">{destination.region}</p>
          <h3 className="text-2xl font-display font-semibold">{destination.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-ink-soft line-clamp-2">{destination.tagline}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-ink-soft">
            {destination.recommendationCount} rekomendasi lokal
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-sawah-dark group-hover:gap-2 transition-all">
            Explore <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  )
}
