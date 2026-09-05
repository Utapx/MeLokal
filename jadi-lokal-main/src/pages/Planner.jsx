import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, Save, CheckCircle2, LocateFixed, Download } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import MapView from '../components/MapView.jsx'
import { destinations } from '../data/destinations.js'
import { categoryMeta, getPlacesByDestination } from '../data/places.js'
import { generateItinerary, recalculateRouteDistances } from '../utils/planner.js'
import { saveJourney, downloadJourney } from '../utils/storage.js'
import { fetchLivePlaces } from '../services/placesApi.js'
import { useLanguage } from '../context/LanguageContext'

export default function Planner() {
  const [params] = useSearchParams()
  const [destinationSlug, setDestinationSlug] = useState(params.get('destination') || destinations[0].slug)
  const [days, setDays] = useState(3)
  const [budget, setBudget] = useState('hemat')
  const [interests, setInterests] = useState(['kuliner'])
  const [startPointId, setStartPointId] = useState('center')
  const [currentLocation, setCurrentLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [itinerary, setItinerary] = useState(null)
  const [saved, setSaved] = useState(false)
  const [livePlaces, setLivePlaces] = useState(null)
  const [placesLoading, setPlacesLoading] = useState(false)
  const [placesError, setPlacesError] = useState('')
  const { t } = useLanguage()

  const INTERESTS = [
    { key: 'kuliner', labelKey: 'interest_kuliner' },
    { key: 'budaya', labelKey: 'interest_budaya' },
    { key: 'alam', labelKey: 'interest_alam' },
    { key: 'nongkrong', labelKey: 'interest_nongkrong' },
    { key: 'hidden-gem', labelKey: 'interest_hidden_gem' },
    { key: 'belanja', labelKey: 'interest_belanja' },
  ]

  const BUDGETS = [
    { key: 'hemat', labelKey: 'budget_hemat' },
    { key: 'medium', labelKey: 'budget_medium' },
    { key: 'premium', labelKey: 'budget_premium' },
  ]

  function toggleInterest(key) {
    setInterests((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  function handleGenerate() {
    const selectedStart = startPointId === 'current'
      ? currentLocation
      : startPointId === 'center'
        ? { ...destination.center, label: `${t('planner_city_center')} ${destination.name}` }
        : (livePlaces || getPlacesByDestination(destinationSlug)).find((place) => place.id === startPointId)
    const result = generateItinerary(destinationSlug, days, budget, interests, selectedStart, livePlaces)
    setItinerary(result)
    setSaved(false)
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError(t('planner_geolocation_unsupported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentLocation({ lat: coords.latitude, lng: coords.longitude, label: t('planner_my_location') })
        setStartPointId('current')
        setLocationError('')
      },
      () => setLocationError(t('planner_geolocation_denied')),
    )
  }

  function handleSave() {
    if (!itinerary) return
    saveJourney(itinerary)
    setSaved(true)
  }

  function handleReplacePlace(dayNumber, slotIndex, placeId) {
    setItinerary((current) => {
      if (!current) return current

      const day = current.dayPlans.find((item) => item.dayNumber === dayNumber)
      const slot = day?.slots[slotIndex]
      const replacement = slot?.alternatives.find((place) => place.id === placeId)
      if (!day || !slot || !replacement) return current

      const nextSlots = day.slots.map((item, index) => {
        if (index !== slotIndex) return item
        return {
          ...item,
          place: replacement,
          alternatives: [slot.place, ...slot.alternatives.filter((place) => place.id !== replacement.id)]
            .filter(Boolean)
            .slice(0, 3),
        }
      })

      const nextSlotsWithDistances = recalculateRouteDistances(nextSlots, day.startPoint)
      const totalDistanceKm = nextSlotsWithDistances.reduce(
        (total, item) => total + (item.distanceFromPrevious || 0),
        0,
      )

      return {
        ...current,
        dayPlans: current.dayPlans.map((item) =>
          item.dayNumber === dayNumber
            ? { ...item, slots: nextSlotsWithDistances, totalDistanceKm }
            : item,
        ),
      }
    })
    setSaved(false)
  }

  const destination = destinations.find((d) => d.slug === destinationSlug)

  useEffect(() => {
    let active = true
    setPlacesLoading(true)
    setPlacesError('')

    fetchLivePlaces(destination)
      .then((places) => {
        if (active) setLivePlaces(places)
      })
      .catch((error) => {
        if (!active) return
        setLivePlaces(null)
        setPlacesError(error.message)
      })
      .finally(() => {
        if (active) setPlacesLoading(false)
      })

    return () => {
      active = false
    }
  }, [destination])

  return (
    <div>
      <div className="bg-turmeric-light py-14 px-6 md:px-12 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">{t('planner_title')}</h1>
        <p className="text-ink-soft mt-2 max-w-xl mx-auto">
          {t('planner_subtitle')}
        </p>
      </div>

      <Section>
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* FORM */}
          <div className="bg-white rounded-3xl p-6 shadow-soft h-fit">
            <div className="mb-6">
              <p className="font-semibold text-ink mb-2 text-sm">{t('planner_where')}</p>
              <div className="grid grid-cols-2 gap-2">
                {destinations.map((d) => (
                  <button
                    key={d.slug}
                    onClick={() => setDestinationSlug(d.slug)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                      destinationSlug === d.slug
                        ? 'bg-sawah text-white border-sawah'
                        : 'bg-paper text-ink-soft border-ink/15 hover:border-sawah'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-ink mb-2 text-sm">{t('planner_start_point')}</p>
              <select
                value={startPointId}
                onChange={(event) => setStartPointId(event.target.value)}
                className="w-full bg-paper text-ink-soft border border-ink/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-sawah"
              >
                <option value="center">{t('planner_city_center')} {destination.name}</option>
                {(livePlaces || getPlacesByDestination(destinationSlug)).map((place) => (
                  <option key={place.id} value={place.id}>{place.name}</option>
                ))}
                {currentLocation && <option value="current">{t('planner_my_location')}</option>}
              </select>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-sawah-dark hover:text-sawah"
              >
                <LocateFixed size={14} /> {t('planner_use_my_location')}
              </button>
              {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
            </div>

            <div className="mb-6">
              <p className="font-semibold text-ink mb-2 text-sm">{t('planner_days')}</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setDays(n)}
                    className={`w-10 h-10 rounded-full text-sm font-semibold border transition-colors ${
                      days === n
                        ? 'bg-sawah text-white border-sawah'
                        : 'bg-paper text-ink-soft border-ink/15 hover:border-sawah'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-ink mb-2 text-sm">{t('planner_budget')}</p>
              <div className="flex gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setBudget(b.key)}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                      budget === b.key
                        ? 'bg-turmeric text-ink border-turmeric'
                        : 'bg-paper text-ink-soft border-ink/15 hover:border-turmeric'
                    }`}
                  >
                    {t(b.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-ink mb-2 text-sm">{t('planner_interests')}</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button
                    key={i.key}
                    onClick={() => toggleInterest(i.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      interests.includes(i.key)
                        ? 'bg-sawah text-white border-sawah'
                        : 'bg-paper text-ink-soft border-ink/15 hover:border-sawah'
                    }`}
                  >
                    {t(i.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} variant="primary" icon={Sparkles} className="w-full">
              {placesLoading ? t('planner_loading_places') : t('planner_generate')}
            </Button>
            {placesError && (
              <p className="text-xs text-ink-soft mt-3">
                {t('planner_live_data_unavailable')} ({placesError})
              </p>
            )}
          </div>

          {/* RESULT */}
          <div>
            {!itinerary ? (
              <EmptyState
                icon="🗺️"
                title={t('planner_empty_title')}
                description={t('planner_empty_desc')}
              />
            ) : (
              <div className="animate-slideUp">
                {(() => {
                  const itineraryPlaces = itinerary.dayPlans
                    .flatMap((day) => day.slots.map((slot) => slot.place))
                    .filter(Boolean)
                    .filter((place, index, places) => places.findIndex((item) => item.id === place.id) === index)

                  return (
                    <>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-turmeric-dark font-semibold">
                      {destination.name} · {itinerary.days} {t('favorites_days_unit')} · {budget}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                      {t('planner_your_journey')}
                    </h2>
                  </div>
                  <Button onClick={handleSave} variant="secondary" icon={saved ? CheckCircle2 : Save}>
                    {saved ? t('planner_saved') : t('planner_save')}
                  </Button>
                  <Button onClick={() => downloadJourney(itinerary, destination.name)} variant="ghost" icon={Download}>
                    {t('planner_download')}
                  </Button>
                </div>

                <div className="bg-turmeric-light border border-turmeric/30 rounded-xl px-4 py-3 mb-6 text-xs text-ink-soft">
                  {livePlaces
                    ? t('planner_live_note')
                    : t('planner_fallback_note')}
                </div>

                <div className="bg-white rounded-2xl shadow-soft p-3 mb-6">
                  <div className="h-[320px] md:h-[400px]">
                    <MapView center={destination.center} places={itineraryPlaces} />
                  </div>
                  <p className="text-xs text-ink-soft px-2 pt-3">
                    {t('planner_map_note')}
                  </p>
                </div>

                <div className="space-y-6">
                  {itinerary.dayPlans.map((day) => (
                    <div key={day.dayNumber} className="bg-white rounded-2xl shadow-soft p-6">
                      <div className="flex items-baseline justify-between gap-3 mb-4">
                        <h3 className="font-display font-semibold text-lg text-ink">{t('planner_day')} {day.dayNumber}</h3>
                        <p className="text-xs text-ink-soft">
                          {t('planner_day_start')}: {day.startPoint.label} · {day.totalDistanceKm.toFixed(1)} km
                        </p>
                      </div>
                      <ul className="space-y-3">
                        {day.slots.map((slot, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <span className="text-sm font-semibold text-sawah-dark w-14 shrink-0">
                              {slot.time}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-ink">
                                {slot.label}
                                {slot.place && (
                                  <span className="text-ink-soft font-normal">
                                    {' '}— {t(categoryMeta[slot.place.category].translationKey)}: {slot.place.name}
                                  </span>
                                )}
                              </p>
                              {slot.place && (
                                <p className="text-xs text-ink-soft">
                                  {slot.place.priceRange} · {slot.distanceFromPrevious.toFixed(1)} km {t('planner_from_prev')}
                                </p>
                              )}
                              {slot.alternatives.length > 0 && (
                                <label className="inline-flex items-center gap-2 text-xs text-sawah-dark mt-2">
                                  {t('planner_replace_place')}
                                  <select
                                    value=""
                                    onChange={(event) => handleReplacePlace(day.dayNumber, i, event.target.value)}
                                    className="bg-paper border border-sawah/30 rounded-lg px-2 py-1 text-xs text-ink outline-none"
                                  >
                                    <option value="">{t('planner_choose_alternative')}</option>
                                    {slot.alternatives.map((alternative) => (
                                      <option key={alternative.id} value={alternative.id}>
                                        {alternative.name}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {itineraryPlaces.map((place) => (
                    <article key={place.id} className="bg-sawah-light rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-sawah-dark font-semibold">
                            {t(categoryMeta[place.category].translationKey)}
                          </p>
                          <h3 className="font-display font-semibold text-lg text-ink mt-1">{place.name}</h3>
                        </div>
                        <span className="text-sm font-semibold text-turmeric-dark shrink-0">★ {place.localScore.toFixed(1)}</span>
                      </div>
                      <p className="text-sm text-ink-soft italic mt-3">&ldquo;{place.quote}&rdquo;</p>
                    </article>
                  ))}
                </div>
                    </>
                  )
                })()}
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
