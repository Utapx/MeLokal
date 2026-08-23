import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import PlaceCard from '../components/PlaceCard.jsx'
import { places } from '../data/places.js'
import { getDestinationBySlug } from '../data/destinations.js'
import { categoryMeta } from '../data/places.js'
import {
  getFavoriteIds,
  toggleFavorite,
  getSavedJourneys,
  deleteJourney,
} from '../utils/storage.js'

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [journeys, setJourneys] = useState([])

  useEffect(() => {
    setFavoriteIds(getFavoriteIds())
    setJourneys(getSavedJourneys())
  }, [])

  const favoritePlaces = places.filter((p) => favoriteIds.includes(p.id))

  function handleToggleFavorite(placeId) {
    setFavoriteIds(toggleFavorite(placeId))
  }

  function handleDeleteJourney(id) {
    setJourneys(deleteJourney(id))
  }

  return (
    <div>
      <div className="bg-sawah-light py-14 px-6 md:px-12 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">Favorites</h1>
        <p className="text-ink-soft mt-2 max-w-xl mx-auto">
          Semua tempat dan itinerary yang kamu simpan — tersimpan di perangkat ini, tanpa akun.
        </p>
      </div>

      <Section eyebrow="Tempat Favorit" title="Tempat yang sudah kamu simpan">
        {favoritePlaces.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="Belum ada tempat favorit"
            description="Tekan ikon hati pada tempat di halaman Destination atau Local Map untuk menyimpannya di sini."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favoritePlaces.map((p) => (
              <PlaceCard
                key={p.id}
                place={p}
                isFavorite
                onToggleFavorite={handleToggleFavorite}
                compact
              />
            ))}
          </div>
        )}
      </Section>

      <Section eyebrow="Perjalanan Tersimpan" title="Itinerary hasil Trip Planner">
        {journeys.length === 0 ? (
          <EmptyState
            icon="🗺️"
            title="Belum ada perjalanan tersimpan"
            description="Buat itinerary di Trip Planner, lalu tekan Save My Journey."
            action={<Button to="/plan" variant="primary">Buat Itinerary</Button>}
          />
        ) : (
          <div className="space-y-6">
            {journeys.map((j) => {
              const destination = getDestinationBySlug(j.destinationSlug)
              return (
                <div key={j.id} className="bg-white rounded-2xl shadow-soft p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-turmeric-dark font-semibold">
                        {new Date(j.savedAt).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </p>
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {destination?.name} · {j.days} hari · {j.budget}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDeleteJourney(j.id)}
                      className="p-2 rounded-full text-clay hover:bg-clay-light transition-colors"
                      aria-label="Hapus perjalanan"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    {j.dayPlans.map((day) => (
                      <div key={day.dayNumber} className="bg-paper rounded-xl p-4">
                        <p className="font-semibold text-sm text-ink mb-2">DAY {day.dayNumber}</p>
                        <ul className="space-y-1">
                          {day.slots.map((slot, i) => (
                            <li key={i} className="text-xs text-ink-soft">
                              <span className="font-semibold text-ink">{slot.time}</span> —{' '}
                              {slot.place ? (
                                <>{categoryMeta[slot.place.category].emoji} {slot.place.name}</>
                              ) : (
                                slot.label
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Section>
    </div>
  )
}
