// Wrapper sederhana di atas localStorage — tidak butuh backend/database.
const FAVORITES_KEY = 'jadilokal_favorites'
const JOURNEYS_KEY = 'jadilokal_journeys'

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (err) {
    console.warn('Gagal membaca localStorage untuk key:', key, err)
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn('Gagal menulis localStorage untuk key:', key, err)
  }
}

// ---------- Favorites (place ids) ----------
export function getFavoriteIds() {
  return readJSON(FAVORITES_KEY, [])
}

export function isFavorite(placeId) {
  return getFavoriteIds().includes(placeId)
}

export function toggleFavorite(placeId) {
  const current = getFavoriteIds()
  const next = current.includes(placeId)
    ? current.filter((id) => id !== placeId)
    : [...current, placeId]
  writeJSON(FAVORITES_KEY, next)
  return next
}

// ---------- Saved journeys (itineraries) ----------
export function getSavedJourneys() {
  return readJSON(JOURNEYS_KEY, [])
}

export function saveJourney(journey) {
  const current = getSavedJourneys()
  const withId = { ...journey, id: `journey-${Date.now()}`, savedAt: new Date().toISOString() }
  const next = [withId, ...current]
  writeJSON(JOURNEYS_KEY, next)
  return next
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function downloadJourney(journey, destinationName) {
  const days = journey.dayPlans
    .map((day) => {
      const slots = day.slots
        .map((slot) => {
          if (!slot.place) return `<li><strong>${escapeHtml(slot.time)}</strong> ${escapeHtml(slot.label)}</li>`
          return `<li><strong>${escapeHtml(slot.time)}</strong> ${escapeHtml(slot.label)} — ${escapeHtml(slot.place.name)}<br><small>${escapeHtml(slot.place.priceRange)} · ${slot.distanceFromPrevious.toFixed(1)} km · ★ ${slot.place.localScore.toFixed(1)}<br><em>${escapeHtml(slot.place.quote)}</em></small></li>`
        })
        .join('')
      return `<section><h2>Day ${day.dayNumber}</h2><p>Mulai: ${escapeHtml(day.startPoint.label)} · ${day.totalDistanceKm.toFixed(1)} km</p><ol>${slots}</ol></section>`
    })
    .join('')

  const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Jadi Lokal - ${escapeHtml(destinationName)}</title><style>body{font-family:Arial,sans-serif;max-width:760px;margin:40px auto;line-height:1.5;color:#241c15}h1{color:#2f6b4f}section{border-top:1px solid #ddd;padding:16px 0}li{margin:12px 0}small{color:#4a3f35}</style></head><body><h1>Jadi Lokal: ${escapeHtml(destinationName)}</h1><p>${journey.days} hari · Budget ${escapeHtml(journey.budget)} · Titik mulai ${escapeHtml(journey.startPoint.label)}</p>${days}</body></html>`
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `jadi-lokal-${journey.destinationSlug}-itinerary.html`
  link.click()
  URL.revokeObjectURL(url)
}

export function deleteJourney(journeyId) {
  const next = getSavedJourneys().filter((j) => j.id !== journeyId)
  writeJSON(JOURNEYS_KEY, next)
  return next
}
