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

export function deleteJourney(journeyId) {
  const next = getSavedJourneys().filter((j) => j.id !== journeyId)
  writeJSON(JOURNEYS_KEY, next)
  return next
}
