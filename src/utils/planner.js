// Rule-based itinerary generator — TIDAK menggunakan AI API,
// murni logika IF/ELSE + scoring sederhana di atas data lokal statis.
import { getPlacesByDestination } from '../data/places.js'
import { getDestinationBySlug } from '../data/destinations.js'

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

const TEMPLATE_C = [
  { time: '07:30', label: 'Early Breakfast', category: 'food' },
  { time: '09:30', label: 'Local Cafe', category: 'cafe' },
  { time: '12:00', label: 'Lunch Spot', category: 'food' },
  { time: '14:30', label: 'Cultural Exploration', category: 'culture' },
  { time: '18:00', label: 'Hidden Gem Sunset', category: 'hidden-gem' },
]

const TEMPLATE_D = [
  { time: '08:30', label: 'Morning Cafe', category: 'cafe' },
  { time: '10:30', label: 'Hidden Gem', category: 'hidden-gem' },
  { time: '13:00', label: 'Lunch', category: 'food' },
  { time: '15:30', label: 'Local Shopping', category: 'shopping' },
  { time: '19:30', label: 'Dinner Local', category: 'food' },
]

const TEMPLATES = [TEMPLATE_A, TEMPLATE_B, TEMPLATE_C, TEMPLATE_D]

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

function distanceKm(from, to) {
  const earthRadiusKm = 6371
  const latDelta = ((to.lat - from.lat) * Math.PI) / 180
  const lngDelta = ((to.lng - from.lng) * Math.PI) / 180
  const fromLat = (from.lat * Math.PI) / 180
  const toLat = (to.lat * Math.PI) / 180
  const haversine =
    Math.sin(latDelta / 2) ** 2 +
    Math.sin(lngDelta / 2) ** 2 * Math.cos(fromLat) * Math.cos(toLat)

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
}

function pickPlaceForSlot({
  category,
  allPlaces,
  interestCategories,
  budget,
  usedIdsToday,
  currentPoint,
}) {
  const candidates = allPlaces.filter((p) => p.category === category)
  if (candidates.length === 0) return null

  const unused = candidates.filter((p) => !usedIdsToday.has(p.id))
  const pool = unused.length > 0 ? unused : candidates // reuse jika kehabisan opsi unik

  const ranked = [...pool].sort((a, b) => {
    const scoreDifference =
      scorePlace(b, interestCategories, budget) - scorePlace(a, interestCategories, budget)
    const distanceDifference = distanceKm(currentPoint, a) - distanceKm(currentPoint, b)

    // Score remains the priority, while distance breaks close calls between places.
    return scoreDifference || distanceDifference
  })
  return {
    place: ranked[0],
    alternatives: ranked.slice(1, 4),
  }
}

export function recalculateRouteDistances(slots, startPoint) {
  let currentPoint = startPoint

  return slots.map((slot) => {
    if (!slot.place) return { ...slot, distanceFromPrevious: null }

    const distanceFromPrevious = distanceKm(currentPoint, slot.place)
    currentPoint = slot.place
    return { ...slot, distanceFromPrevious }
  })
}

/**
 * generateItinerary
 * @param {string} destinationSlug
 * @param {number} days - 1..5
 * @param {'hemat'|'medium'|'premium'} budget
 * @param {string[]} interests - subset of keys INTEREST_TO_CATEGORY
 * @param {{lat: number, lng: number, label?: string}} [startPoint]
 */
export function generateItinerary(destinationSlug, days, budget, interests, startPoint, placesOverride) {
  const allPlaces = placesOverride || getPlacesByDestination(destinationSlug)
  const interestCategories = interests.map((i) => INTEREST_TO_CATEGORY[i]).filter(Boolean)
  const destination = getDestinationBySlug(destinationSlug)
  const routeStart = startPoint || { ...destination.center, label: `Pusat kota ${destination.name}` }

  const dayPlans = []

  for (let dayIndex = 0; dayIndex < days; dayIndex++) {
    const template = TEMPLATES[dayIndex % TEMPLATES.length]
    const usedIdsToday = new Set()
    let currentPoint = routeStart

    const slots = template.map((slot) => {
      const selection = pickPlaceForSlot({
        category: slot.category,
        allPlaces,
        interestCategories,
        budget,
        usedIdsToday,
        currentPoint,
      })
      const place = selection?.place || null
      if (place) usedIdsToday.add(place.id)
      const distanceFromPrevious = place ? distanceKm(currentPoint, place) : null
      if (place) currentPoint = place
      return { ...slot, place, alternatives: selection?.alternatives || [], distanceFromPrevious }
    })

    dayPlans.push({
      dayNumber: dayIndex + 1,
      startPoint: routeStart,
      totalDistanceKm: slots.reduce((total, slot) => total + (slot.distanceFromPrevious || 0), 0),
      slots,
    })
  }

  return {
    destinationSlug,
    days,
    budget,
    interests,
    startPoint: routeStart,
    generatedAt: new Date().toISOString(),
    dayPlans,
  }
}
