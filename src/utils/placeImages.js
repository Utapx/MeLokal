const PLACE_IMAGES_KEY = 'melokal:place-images'

function readOverrides() {
  try {
    return JSON.parse(window.localStorage.getItem(PLACE_IMAGES_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeOverrides(overrides) {
  window.localStorage.setItem(PLACE_IMAGES_KEY, JSON.stringify(overrides))
}

export function getPlaceImageOverrides() {
  return readOverrides()
}

export function getPlaceImageOverride(placeId) {
  return readOverrides()[placeId] || ''
}

export function savePlaceImageOverride(placeId, imageUrl) {
  const overrides = readOverrides()
  const value = imageUrl.trim()
  if (value) overrides[placeId] = value
  else delete overrides[placeId]
  writeOverrides(overrides)
  return overrides
}
