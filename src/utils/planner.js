// Rule-based itinerary generator — TIDAK menggunakan AI API,
// murni logika IF/ELSE + scoring sederhana di atas data lokal statis.
import { getPlacesByDestination } from '../data/places.js'

// Peta minat pengguna -> kategori tempat yang relevan
const INTEREST_TO_CATEGORY = {
  kuliner: 'food',
  budaya: 'culture',
  alam: 'hidden-gem',
  nongkrong: 'cafe',
  'hidden-gem': 'hidden-gem',
  belanja: 'shopping',
}

// Dua template slot waktu yang dipakai bergantian tiap hari (sesuai contoh spesifikasi)
const TEMPLATE_A = [
  { time: '08:00', label: 'Local Breakfast', category: 'food' },
  { time: '10:00', label: 'Cultural Spot', category: 'culture' },
  { time: '13:00', label: 'Local Lunch', category: 'food' },
  { time: '15:00', label: 'Hidden Gem', category: 'hidden-gem' },
  { time: '19:00', label: 'Night Food', category: 'food' },
]

const TEMPLATE_B = [
  { time: '08:00', label: 'Local Market', category: 'shopping' },
  { time: '10:00', label: 'Explore City', category: 'culture' },
  { time: '13:00', label: 'Local Food', category: 'food' },
  { time: '16:00', label: 'Cafe', category: 'cafe' },
  { time: '19:00', label: 'Night Activity', category: 'culture' },
]

function scorePlace(place, interestCategories, budget) {
  let score = 0

  // IF minat pengguna mencakup kategori tempat ini THEN prioritaskan
  if (interestCategories.includes(place.category)) {
    score += 50
  }

  // IF budget hemat THEN prioritaskan tempat murah (priceTier kecil)
  // IF budget premium THEN prioritaskan tempat priceTier lebih tinggi
  if (budget === 'hemat') {
    score += (3 - place.priceTier) * 10
  } else if (budget === 'premium') {
    score += place.priceTier * 10
  } else {
    score += 10 // medium: netral
  }

  // Local Score keseluruhan tetap jadi faktor tambahan
  score += place.localScore * 4

  return score
}

function pickPlaceForSlot({ category, allPlaces, interestCategories, budget, usedIdsToday }) {
  const candidates = allPlaces.filter((p) => p.category === category)
  if (candidates.length === 0) return null

  const unused = candidates.filter((p) => !usedIdsToday.has(p.id))
  const pool = unused.length > 0 ? unused : candidates // reuse jika kehabisan opsi unik

  const ranked = [...pool].sort(
    (a, b) => scorePlace(b, interestCategories, budget) - scorePlace(a, interestCategories, budget)
  )
  return ranked[0]
}

/**
 * generateItinerary
 * @param {string} destinationSlug
 * @param {number} days - 1..5
 * @param {'hemat'|'medium'|'premium'} budget
 * @param {string[]} interests - subset of keys INTEREST_TO_CATEGORY
 */
export function generateItinerary(destinationSlug, days, budget, interests) {
  const allPlaces = getPlacesByDestination(destinationSlug)
  const interestCategories = interests.map((i) => INTEREST_TO_CATEGORY[i]).filter(Boolean)

  const dayPlans = []

  for (let dayIndex = 0; dayIndex < days; dayIndex++) {
    const template = dayIndex % 2 === 0 ? TEMPLATE_A : TEMPLATE_B
    const usedIdsToday = new Set()

    const slots = template.map((slot) => {
      const place = pickPlaceForSlot({
        category: slot.category,
        allPlaces,
        interestCategories,
        budget,
        usedIdsToday,
      })
      if (place) usedIdsToday.add(place.id)
      return { ...slot, place }
    })

    dayPlans.push({ dayNumber: dayIndex + 1, slots })
  }

  return {
    destinationSlug,
    days,
    budget,
    interests,
    generatedAt: new Date().toISOString(),
    dayPlans,
  }
}
