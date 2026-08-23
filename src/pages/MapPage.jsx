import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import MapView from '../components/MapView.jsx'
import PlaceCard from '../components/PlaceCard.jsx'
import Modal from '../components/Modal.jsx'
import Section from '../components/Section.jsx'
import { destinations, getDestinationBySlug } from '../data/destinations.js'
import { getPlacesByDestination, categoryMeta } from '../data/places.js'
import { getFavoriteIds, toggleFavorite } from '../utils/storage.js'

const ALL_CATEGORIES = Object.keys(categoryMeta)

export default function MapPage() {
  const { slug } = useParams()
  const destination = slug ? getDestinationBySlug(slug) : null
  const [activeCategories, setActiveCategories] = useState(ALL_CATEGORIES)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [favoriteIds, setFavoriteIds] = useState([])

  useEffect(() => {
    setFavoriteIds(getFavoriteIds())
  }, [])

  function toggleCategory(cat) {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  function handleToggleFavorite(placeId) {
    setFavoriteIds(toggleFavorite(placeId))
  }

  // Tidak ada slug -> tampilkan picker destinasi
  if (!destination) {
    return (
      <Section eyebrow="Local Map" title="Pilih destinasi untuk membuka peta interaktif">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              to={`/map/${d.slug}`}
              className="card-hover bg-white rounded-2xl p-6 shadow-soft text-center"
            >
              <p className="font-display text-xl font-semibold text-ink">{d.name}</p>
              <p className="text-ink-soft text-sm mt-1">{d.region}</p>
            </Link>
          ))}
        </div>
      </Section>
    )
  }

  const places = getPlacesByDestination(destination.slug).filter((p) =>
    activeCategories.includes(p.category)
  )

  return (
    <div>
      <div className="bg-sawah-light py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink">
            Local Map — {destination.name}
          </h1>
          <p className="text-ink-soft text-sm mt-1">
            Klik marker untuk melihat detail tempat ala warga lokal.
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {ALL_CATEGORIES.map((cat) => {
              const meta = categoryMeta[cat]
              const active = activeCategories.includes(cat)
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    active
                      ? 'bg-sawah text-white border-sawah'
                      : 'bg-white text-ink-soft border-ink/15 hover:border-sawah'
                  }`}
                >
                  {meta.emoji} {meta.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        <div className="h-[60vh] min-h-[380px] rounded-3xl overflow-hidden shadow-soft">
          <MapView
            center={destination.center}
            places={places}
            onViewDetails={(place) => setSelectedPlace(place)}
          />
        </div>
        {places.length === 0 && (
          <p className="text-center text-ink-soft text-sm mt-4">
            Tidak ada tempat untuk kategori yang dipilih. Coba aktifkan kategori lain.
          </p>
        )}
      </div>

      <Modal open={!!selectedPlace} onClose={() => setSelectedPlace(null)} title="Detail Tempat">
        {selectedPlace && (
          <PlaceCard
            place={selectedPlace}
            isFavorite={favoriteIds.includes(selectedPlace.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </Modal>
    </div>
  )
}
