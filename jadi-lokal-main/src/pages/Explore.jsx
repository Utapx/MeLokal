import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import Section from '../components/Section.jsx'
import DestinationCard from '../components/DestinationCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { destinations } from '../data/destinations.js'
import { places } from '../data/places.js'
import { useLanguage } from '../context/LanguageContext'

export default function Explore() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const { t } = useLanguage()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return destinations

    return destinations.filter((destination) => {
      const destinationMatches = [destination.name, destination.region, destination.tagline]
        .some((value) => value.toLowerCase().includes(q))
      const placeMatches = places.some(
        (place) =>
          place.destinationSlug === destination.slug &&
          `${place.name} ${place.searchTerms || ''} ${place.quote}`.toLowerCase().includes(q)
      )

      return destinationMatches || placeMatches
    })
  }, [query])

  return (
    <div>
      <div className="bg-sawah-light py-14 px-6 md:px-12 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">{t('explore_title')}</h1>
        <p className="text-ink-soft mt-2 max-w-xl mx-auto">
          {t('explore_subtitle')}
        </p>
        <div className="mt-6 max-w-md mx-auto flex items-center gap-2 bg-white rounded-full p-2 shadow-soft">
          <Search size={18} className="text-ink-soft ml-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder={t('explore_search_placeholder')}
            className="flex-1 outline-none text-sm py-2 bg-transparent"
          />
        </div>
      </div>

      <Section>
        {filtered.length === 0 ? (
          <EmptyState
            title={t('explore_empty_title')}
            description={t('explore_empty_desc')}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}
