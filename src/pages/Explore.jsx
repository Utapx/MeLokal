import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import Section from '../components/Section.jsx'
import DestinationCard from '../components/DestinationCard.jsx'
import PlaceCard from '../components/PlaceCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { destinations } from '../data/destinations.js'
import { places, categoryMeta } from '../data/places.js'
import { useLanguage } from '../context/LanguageContext'
import { fetchApprovedDestinations } from '../services/submissionsApi.js'

function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export default function Explore() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [approvedPlaces, setApprovedPlaces] = useState([])
  const { lang, t } = useLanguage()

  useEffect(() => {
    fetchApprovedDestinations().then(setApprovedPlaces).catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    const q = normalizeSearchText(query)
    if (!q) return destinations

    return destinations.filter((destination) => {
      const destinationMatches = [
        destination.name,
        destination.region,
        destination.regionEn,
        destination.tagline,
        destination.taglineEn,
        destination.badge,
        destination.badgeEn,
      ].some((value) => normalizeSearchText(value).includes(q))
      const placeMatches = places.some(
        (place) =>
          place.destinationSlug === destination.slug &&
          [
            place.name,
            place.searchTerms,
            place.quote,
            categoryMeta[place.category]?.label,
            categoryMeta[place.category]?.shortLabel,
          ].some((value) => normalizeSearchText(value).includes(q))
      )

      return destinationMatches || placeMatches
    })
  }, [lang, query])

  const matchingPlaces = useMemo(() => {
    const q = normalizeSearchText(query)
    if (!q) return []

    return [...places, ...approvedPlaces].filter((place) => [
      place.name,
      place.searchTerms,
      place.quote,
      categoryMeta[place.category]?.label,
      categoryMeta[place.category]?.shortLabel,
    ].some((value) => normalizeSearchText(value).includes(q)))
  }, [approvedPlaces, lang, query])

  return (
    <div>
      <div className="bg-sawah-light px-6 py-20 text-center md:px-12 md:py-24">
        <h1 className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">{t('explore_title')}</h1>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-soft">
          {t('explore_subtitle')}
        </p>
        <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full bg-white p-2 shadow-soft">
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

      <Section className="pt-20 md:pt-24">
        {filtered.length === 0 && matchingPlaces.length === 0 ? (
          <EmptyState
            title={t('explore_empty_title')}
            description={t('explore_empty_desc')}
          />
        ) : (
          <div className="space-y-10">
            {matchingPlaces.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink mb-5">
                  {t('explore_place_results')}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {matchingPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} compact />
                  ))}
                </div>
              </div>
            )}

            {filtered.length > 0 && (
              <div>
                {query.trim() && (
                  <h2 className="font-display text-2xl font-semibold text-ink mb-5">
                    {t('explore_destination_results')}
                  </h2>
                )}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filtered.map((d) => (
                    <DestinationCard key={d.slug} destination={d} />
                  ))}
                </div>
              </div>
            )}

            {!query.trim() && approvedPlaces.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink mb-5">
                  {t('explore_submitted_places')}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {approvedPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Section>
    </div>
  )
}
