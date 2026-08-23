import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, Save, CheckCircle2 } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { destinations } from '../data/destinations.js'
import { categoryMeta } from '../data/places.js'
import { generateItinerary } from '../utils/planner.js'
import { saveJourney } from '../utils/storage.js'

const INTERESTS = [
  { key: 'kuliner', label: 'Kuliner', emoji: '🍜' },
  { key: 'budaya', label: 'Budaya', emoji: '🏛' },
  { key: 'alam', label: 'Alam', emoji: '🌿' },
  { key: 'nongkrong', label: 'Nongkrong', emoji: '☕' },
  { key: 'hidden-gem', label: 'Hidden Gem', emoji: '💎' },
  { key: 'belanja', label: 'Belanja', emoji: '🛍' },
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
  const [itinerary, setItinerary] = useState(null)
  const [saved, setSaved] = useState(false)

  function toggleInterest(key) {
    setInterests((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  function handleGenerate() {
    const result = generateItinerary(destinationSlug, days, budget, interests)
    setItinerary(result)
    setSaved(false)
  }

  function handleSave() {
    if (!itinerary) return
    saveJourney(itinerary)
    setSaved(true)
  }

  const destination = destinations.find((d) => d.slug === destinationSlug)

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
                    {i.emoji} {i.label}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} variant="primary" icon={Sparkles} className="w-full">
              Generate Journey
            </Button>
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
                </div>

                <div className="space-y-6">
                  {itinerary.dayPlans.map((day) => (
                    <div key={day.dayNumber} className="bg-white rounded-2xl shadow-soft p-6">
                      <h3 className="font-display font-semibold text-lg text-ink mb-4">
                        DAY {day.dayNumber}
                      </h3>
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
                                    {' '}— {categoryMeta[slot.place.category].emoji} {slot.place.name}
                                  </span>
                                )}
                              </p>
                              {slot.place && (
                                <p className="text-xs text-ink-soft">{slot.place.priceRange}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
