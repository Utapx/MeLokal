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

const INTERESTS = [
  { key: 'kuliner', label: 'Kuliner' },
  { key: 'budaya', label: 'Budaya' },
  { key: 'alam', label: 'Alam' },
  { key: 'nongkrong', label: 'Nongkrong' },
  { key: 'hidden-gem', label: 'Temuan Lokal' },
  { key: 'belanja', label: 'Belanja' },
]

const BUDGETS = [
  { key: 'hemat', label: 'Hemat' },
  { key: 'medium', label: 'Medium' },
  { key: 'premium', label: 'Premium' },
]

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

  function toggleInterest(key) {
    setInterests((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  function handleGenerate() {
    const selectedStart = startPointId === 'current'
      ? currentLocation
      : startPointId === 'center'
        ? { ...destination.center, label: `Pusat kota ${destination.name}` }
        : (livePlaces || getPlacesByDestination(destinationSlug)).find((place) => place.id === startPointId)
    const result = generateItinerary(destinationSlug, days, budget, interests, selectedStart, livePlaces)
    setItinerary(result)
    setSaved(false)
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError('Browser ini tidak mendukung lokasi perangkat.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentLocation({ lat: coords.latitude, lng: coords.longitude, label: 'Lokasi saya' })
        setStartPointId('current')
        setLocationError('')
      },
      () => setLocationError('Lokasi tidak bisa diakses. Pilih pusat kota atau tempat lain.'),
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
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">Smart Trip Planner</h1>
        <p className="text-ink-soft mt-2 max-w-xl mx-auto">
          Rekomendasi disusun dengan algoritma sederhana berbasis data lokal — bukan AI generatif.
        </p>
      </div>

      <Section>
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* FORM */}
          <div className="bg-white rounded-3xl p-6 shadow-soft h-fit">
            <div className="mb-6">
              <p className="font-semibold text-ink mb-2 text-sm">Mau ke mana?</p>
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
              <p className="font-semibold text-ink mb-2 text-sm">Mulai dari mana?</p>
              <select
                value={startPointId}
                onChange={(event) => setStartPointId(event.target.value)}
                className="w-full bg-paper text-ink-soft border border-ink/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-sawah"
              >
                <option value="center">Pusat kota {destination.name}</option>
                {(livePlaces || getPlacesByDestination(destinationSlug)).map((place) => (
                  <option key={place.id} value={place.id}>{place.name}</option>
                ))}
                {currentLocation && <option value="current">Lokasi saya</option>}
              </select>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-sawah-dark hover:text-sawah"
              >
                <LocateFixed size={14} /> Gunakan lokasi saya
              </button>
              {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
            </div>

            <div className="mb-6">
              <p className="font-semibold text-ink mb-2 text-sm">Berapa hari?</p>
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
              <p className="font-semibold text-ink mb-2 text-sm">Budget?</p>
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
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-ink mb-2 text-sm">Kamu suka apa?</p>
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
                    {i.label}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} variant="primary" icon={Sparkles} className="w-full">
              {placesLoading ? 'Memuat tempat...' : 'Generate Journey'}
            </Button>
            {placesError && (
              <p className="text-xs text-ink-soft mt-3">
                Data live tidak tersedia, memakai data cadangan lokal. ({placesError})
              </p>
            )}
          </div>

          {/* RESULT */}
          <div>
            {!itinerary ? (
              <EmptyState
                icon="🗺️"
                title="Itinerary kamu akan muncul di sini"
                description="Lengkapi form di samping, lalu tekan Generate Journey."
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
                      {destination.name} · {itinerary.days} hari · {budget}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                      Your Local Journey
                    </h2>
                  </div>
                  <Button onClick={handleSave} variant="secondary" icon={saved ? CheckCircle2 : Save}>
                    {saved ? 'Tersimpan' : 'Save My Journey'}
                  </Button>
                  <Button onClick={() => downloadJourney(itinerary, destination.name)} variant="ghost" icon={Download}>
                    Download
                  </Button>
                </div>

                <div className="bg-turmeric-light border border-turmeric/30 rounded-xl px-4 py-3 mb-6 text-xs text-ink-soft">
                  {livePlaces
                    ? 'Tempat diambil dari OpenStreetMap. Cek kembali jam buka, harga, dan kondisi terbaru sebelum berangkat.'
                    : 'Data tempat cadangan masih bersifat ilustratif. Cek kembali jam buka dan kondisi terbaru sebelum berangkat.'}
                </div>

                <div className="bg-white rounded-2xl shadow-soft p-3 mb-6">
                  <div className="h-[320px] md:h-[400px]">
                    <MapView center={destination.center} places={itineraryPlaces} />
                  </div>
                  <p className="text-xs text-ink-soft px-2 pt-3">
                    Peta menampilkan semua tempat dalam itinerary. Jarak di bawah tiap agenda adalah estimasi garis lurus.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {itineraryPlaces.map((place) => (
                    <article key={place.id} className="bg-sawah-light rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-sawah-dark font-semibold">
                            {categoryMeta[place.category].label}
                          </p>
                          <h3 className="font-display font-semibold text-lg text-ink mt-1">{place.name}</h3>
                        </div>
                        <span className="text-sm font-semibold text-turmeric-dark shrink-0">★ {place.localScore.toFixed(1)}</span>
                      </div>
                      <p className="text-sm text-ink-soft italic mt-3">&ldquo;{place.quote}&rdquo;</p>
                    </article>
                  ))}
                </div>

                <div className="space-y-6">
                  {itinerary.dayPlans.map((day) => (
                    <div key={day.dayNumber} className="bg-white rounded-2xl shadow-soft p-6">
                      <div className="flex items-baseline justify-between gap-3 mb-4">
                        <h3 className="font-display font-semibold text-lg text-ink">DAY {day.dayNumber}</h3>
                        <p className="text-xs text-ink-soft">
                          Mulai: {day.startPoint.label} · {day.totalDistanceKm.toFixed(1)} km
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
                                    {' '}— {categoryMeta[slot.place.category].label}: {slot.place.name}
                                  </span>
                                )}
                              </p>
                              {slot.place && (
                                <p className="text-xs text-ink-soft">
                                  {slot.place.priceRange} · {slot.distanceFromPrevious.toFixed(1)} km dari titik sebelumnya
                                </p>
                              )}
                              {slot.alternatives.length > 0 && (
                                <label className="inline-flex items-center gap-2 text-xs text-sawah-dark mt-2">
                                  Ganti tempat:
                                  <select
                                    value=""
                                    onChange={(event) => handleReplacePlace(day.dayNumber, i, event.target.value)}
                                    className="bg-paper border border-sawah/30 rounded-lg px-2 py-1 text-xs text-ink outline-none"
                                  >
                                    <option value="">Pilih alternatif</option>
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
