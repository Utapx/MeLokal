import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { MapPin, Languages, UtensilsCrossed, Bus, Wallet, HeartHandshake, ShieldAlert, Lightbulb } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import LocalScoreStamp from '../components/LocalScoreStamp.jsx'
import PlaceCard from '../components/PlaceCard.jsx'
import LocalTipCard from '../components/LocalTipCard.jsx'
import { getDestinationBySlug } from '../data/destinations.js'
import { getPlacesByDestination } from '../data/places.js'
import { getTipsByDestination } from '../data/tips.js'
import { tipsEn, tipsFallbackEn } from '../data/tips.en.js'
import { fetchApprovedDestinations } from '../services/submissionsApi.js'
import { getFavoriteIds, toggleFavorite } from '../utils/storage.js'
import { useLanguage } from '../context/LanguageContext'

export default function Destination() {
  const { slug } = useParams()
  const destination = getDestinationBySlug(slug)
  const [approvedPlaces, setApprovedPlaces] = useState([])
  const places = [...getPlacesByDestination(slug), ...approvedPlaces.filter((place) => place.destinationSlug === slug)]
  const { lang, t: tr } = useLanguage()
  const t = lang === 'en' ? (tipsEn[slug] || tipsFallbackEn) : getTipsByDestination(slug)
  const [favoriteIds, setFavoriteIds] = useState([])
  useEffect(() => {
    setFavoriteIds(getFavoriteIds())
    fetchApprovedDestinations().then(setApprovedPlaces).catch(() => {})
  }, [])

  if (!destination) {
    return <Navigate to="/explore" replace />
  }

  function handleToggleFavorite(placeId) {
    setFavoriteIds(toggleFavorite(placeId))
  }

  return (
    <div>
      {/* HERO */}
      <div className="relative h-[46vh] min-h-[320px]">
        <img src={destination.heroImage} alt={destination.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="relative h-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-10 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="turmeric">{lang === 'en' ? (destination.badgeEn || destination.badge) : destination.badge}</Badge>
            <span className="text-sm text-white/80 flex items-center gap-1">
              <MapPin size={14} /> {lang === 'en' ? (destination.regionEn || destination.region) : destination.region}
            </span>
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold">{destination.name}</h1>
              <p className="text-white/85 mt-2 max-w-xl">
                {lang === 'en' ? (destination.taglineEn || destination.tagline) : destination.tagline}
              </p>
            </div>
            <LocalScoreStamp score={destination.localScore} size="lg" />
          </div>
        </div>
      </div>

      <Section eyebrow={tr('destination_guide_eyebrow')} title={tr('destination_guide_title')}>
        <p className="text-ink-soft max-w-2xl -mt-8 mb-10">
          {lang === 'en' ? (destination.descriptionEn || destination.description) : destination.description}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bahasa Lokal */}
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4 text-sawah-dark">
              <Languages size={20} />
              <h3 className="font-display font-semibold text-lg text-ink">{tr('destination_section_language')}</h3>
            </div>
            <ul className="space-y-2">
              {t.language.map((l) => (
                <li key={l.term} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                  <span className="font-semibold text-ink">{l.term}</span>
                  <span className="text-ink-soft">{l.meaning}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kuliner */}
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4 text-sawah-dark">
              <UtensilsCrossed size={20} />
              <h3 className="font-display font-semibold text-lg text-ink">{tr('destination_section_food')}</h3>
            </div>
            <ul className="space-y-3">
              {t.food.map((f) => (
                <li key={f.name} className="text-sm">
                  <span className="font-semibold text-ink">{f.name}</span>
                  <p className="text-ink-soft">{f.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Transportasi */}
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4 text-sawah-dark">
              <Bus size={20} />
              <h3 className="font-display font-semibold text-lg text-ink">{tr('destination_section_transport')}</h3>
            </div>
            <ul className="space-y-3">
              {t.transport.map((tr2) => (
                <li key={tr2.title} className="text-sm">
                  <span className="font-semibold text-ink">{tr2.title}</span>
                  <p className="text-ink-soft">{tr2.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Budget */}
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4 text-sawah-dark">
              <Wallet size={20} />
              <h3 className="font-display font-semibold text-lg text-ink">{tr('destination_section_budget')}</h3>
            </div>
            <p className="text-2xl font-display font-semibold text-ink">{t.budgetRange}</p>
            <p className="text-xs text-ink-soft mt-2">{tr('destination_budget_note')}</p>
          </div>
        </div>

        {/* Etika & Jangan Lakukan */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4 text-sawah-dark">
              <HeartHandshake size={20} />
              <h3 className="font-display font-semibold text-lg text-ink">{tr('destination_section_etiquette')}</h3>
            </div>
            <ul className="space-y-2 list-disc list-inside text-sm text-ink-soft">
              {t.etiquette.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </div>
          <div className="bg-clay-light rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 text-clay">
              <ShieldAlert size={20} />
              <h3 className="font-display font-semibold text-lg text-ink">{tr('destination_section_dontdo')}</h3>
            </div>
            <ul className="space-y-2 list-disc list-inside text-sm text-ink">
              {t.dontDo.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {/* LOCAL TIPS */}
      <Section eyebrow={tr('destination_tips_eyebrow')} title={tr('destination_tips_title')}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.localTips.map((tip, i) => (
            <LocalTipCard key={i} icon="💡">{tip}</LocalTipCard>
          ))}
        </div>
      </Section>

      {/* PLACES */}
      <Section eyebrow={tr('destination_places_eyebrow')} title={tr('destination_places_title')}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {places.map((p) => (
            <PlaceCard
              key={p.id}
              place={p}
              isFavorite={favoriteIds.includes(p.id)}
              onToggleFavorite={handleToggleFavorite}
              compact
            />
          ))}
        </div>
      </Section>

      {/* CTA ROW */}
      <Section className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to={`/map/${destination.slug}`} variant="secondary">{tr('destination_view_on_map')}</Button>
          <Button to={`/plan?destination=${destination.slug}`} variant="primary" icon={Lightbulb}>
            {tr('destination_build_itinerary_for')} {destination.name}
          </Button>
        </div>
      </Section>
    </div>
  )
}
