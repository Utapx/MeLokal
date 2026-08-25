import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Heart, MapPin, LogOut, Trash2, Calendar, Wallet, Route } from 'lucide-react'
import PlaceCard from '../components/PlaceCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Button from '../components/Button.jsx'
import { places, categoryMeta } from '../data/places.js'
import { getDestinationBySlug } from '../data/destinations.js'
import {
  getFavoriteIds,
  toggleFavorite,
  getSavedJourneys,
  deleteJourney,
} from '../utils/storage.js'

export default function UserPanel() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [favoriteIds, setFavoriteIds] = useState([])
  const [journeys, setJourneys] = useState([])
  const [activeTab, setActiveTab] = useState('favorites')

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    setFavoriteIds(getFavoriteIds())
    setJourneys(getSavedJourneys())
  }, [])

  if (!user) return null

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  function handleToggleFavorite(placeId) {
    setFavoriteIds(toggleFavorite(placeId))
  }

  function handleDeleteJourney(id) {
    setJourneys(deleteJourney(id))
  }

  const favoritePlaces = places.filter((p) => favoriteIds.includes(p.id))

  const tabs = [
    { id: 'favorites', label: 'Favorit', icon: Heart, count: favoritePlaces.length },
    { id: 'journeys', label: 'Perjalanan', icon: Route, count: journeys.length },
  ]

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="bg-white border-b border-ink/10 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full ring-2 ring-sawah/30"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-sawah text-white flex items-center justify-center font-semibold text-sm">
                {user.email[0].toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="font-display font-semibold text-ink leading-tight">
                {user.displayName || 'Profil Saya'}
              </h1>
              <p className="text-xs text-ink-soft">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-semibold"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid md:grid-cols-[260px_1fr] gap-8">

          {/* Sidebar — Profile Card */}
          <aside className="h-fit">
            <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-sawah/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-sawah text-white flex items-center justify-center text-3xl font-semibold mx-auto mb-4">
                  {user.email[0].toUpperCase()}
                </div>
              )}
              <h2 className="font-display font-semibold text-ink text-lg">
                {user.displayName || 'Pengguna'}
              </h2>
              <p className="text-sm text-ink-soft mt-1">{user.email}</p>

              <div className="mt-6 space-y-3 border-t border-ink/8 pt-4 text-sm text-left">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Bergabung</span>
                  <span className="font-semibold text-ink text-xs">
                    {new Date(user.metadata?.creationTime).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Favorit</span>
                  <span className="font-semibold text-sawah-dark">{favoritePlaces.length} tempat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Perjalanan</span>
                  <span className="font-semibold text-turmeric-dark">{journeys.length} itinerary</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ink-soft">Status</span>
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    Aktif
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div>
            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl p-1 shadow-soft mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'bg-sawah text-white'
                        : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.id ? 'bg-white/20' : 'bg-ink/8'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Tab: Favorites */}
            {activeTab === 'favorites' && (
              <div>
                {favoritePlaces.length === 0 ? (
                  <EmptyState
                    icon="❤️"
                    title="Belum ada tempat favorit"
                    description="Tekan ikon hati pada tempat di halaman Destination atau Local Map untuk menyimpannya di sini."
                    action={<Button to="/explore" variant="primary">Jelajahi Destinasi</Button>}
                  />
                ) : (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {favoritePlaces.map((p) => (
                      <PlaceCard
                        key={p.id}
                        place={p}
                        isFavorite={favoriteIds.includes(p.id)}
                        onToggleFavorite={handleToggleFavorite}
                        compact
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Saved Journeys */}
            {activeTab === 'journeys' && (
              <div>
                {journeys.length === 0 ? (
                  <EmptyState
                    icon="🗺️"
                    title="Belum ada perjalanan tersimpan"
                    description="Buat itinerary di Trip Planner, lalu tekan Save My Journey untuk menyimpannya di sini."
                    action={<Button to="/plan" variant="primary">Buat Itinerary</Button>}
                  />
                ) : (
                  <div className="space-y-5">
                    {journeys.map((j) => {
                      const destination = getDestinationBySlug(j.destinationSlug)
                      return (
                        <div key={j.id} className="bg-white rounded-2xl shadow-soft p-6">
                          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                            <div>
                              <p className="text-xs uppercase tracking-wide text-turmeric-dark font-semibold flex items-center gap-1 mb-1">
                                <Calendar size={12} />
                                {new Date(j.savedAt).toLocaleDateString('id-ID', {
                                  day: 'numeric', month: 'long', year: 'numeric',
                                })}
                              </p>
                              <h3 className="font-display text-xl font-semibold text-ink">
                                {destination?.name} · {j.days} hari
                              </h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-ink-soft flex items-center gap-1">
                                  <Wallet size={11} /> {j.budget}
                                </span>
                                <span className="text-xs text-ink-soft flex items-center gap-1">
                                  <MapPin size={11} /> {j.startPoint?.label}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/plan?destination=${j.destinationSlug}`}
                                className="text-xs font-semibold text-sawah-dark hover:text-sawah border border-sawah/30 rounded-lg px-3 py-1.5 hover:bg-sawah-light transition-colors"
                              >
                                Buat ulang
                              </Link>
                              <button
                                onClick={() => handleDeleteJourney(j.id)}
                                className="p-1.5 rounded-full text-ink-soft hover:text-clay hover:bg-clay-light transition-colors"
                                aria-label="Hapus perjalanan"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {j.dayPlans.map((day) => (
                              <div key={day.dayNumber} className="bg-paper rounded-xl p-4">
                                <p className="font-semibold text-xs text-sawah-dark uppercase tracking-wide mb-2">
                                  Day {day.dayNumber}
                                </p>
                                <ul className="space-y-1.5">
                                  {day.slots.map((slot, i) => (
                                    <li key={i} className="text-xs text-ink-soft flex items-start gap-1.5">
                                      <span className="font-semibold text-ink shrink-0 w-10">{slot.time}</span>
                                      <span>
                                        {slot.place ? (
                                          <>{categoryMeta[slot.place.category].emoji} {slot.place.name}</>
                                        ) : slot.label}
                                      </span>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
