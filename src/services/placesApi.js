const OVERPASS_ENDPOINT = 'https://overpass-api.de/api/interpreter'

const CATEGORY_TAGS = [
  'nwr["amenity"~"restaurant|cafe|fast_food|food_court"]',
  'nwr["tourism"~"museum|gallery|attraction|viewpoint"]',
  'nwr["shop"~"market|mall|department_store"]',
  'nwr["leisure"~"park|nature_reserve"]',
]

function getCategory(tags) {
  if (tags.amenity === 'cafe') return 'cafe'
  if (tags.amenity) return 'food'
  if (tags.shop) return 'shopping'
  if (tags.leisure) return 'hidden-gem'
  return 'culture'
}

function getCoordinates(element) {
  if (element.type === 'node') return { lat: element.lat, lng: element.lon }
  if (element.center) return { lat: element.center.lat, lng: element.center.lon }
  return null
}

export async function fetchLivePlaces(destination) {
  const around = CATEGORY_TAGS
    .map((tag) => `${tag}(around:15000,${destination.center.lat},${destination.center.lng});`)
    .join('')
  const query = `[out:json][timeout:20];(${around});out center tags;`
  const response = await fetch(OVERPASS_ENDPOINT, {
    method: 'POST',
    body: new URLSearchParams({ data: query }),
  })

  if (!response.ok) throw new Error('OpenStreetMap sedang tidak bisa diakses.')

  const payload = await response.json()
  const places = payload.elements
    .map((element) => {
      const coordinates = getCoordinates(element)
      const name = element.tags?.name
      if (!coordinates || !name) return null

      return {
        id: `osm-${element.type}-${element.id}`,
        destinationSlug: destination.slug,
        name,
        category: getCategory(element.tags),
        ...coordinates,
        priceRange: 'Cek harga di lokasi',
        priceTier: 2,
        localScore: 3.8,
        quote: 'Tempat ditemukan dari OpenStreetMap. Cek jam buka dan ulasan terbaru sebelum berkunjung.',
        quoteEn: 'A local place found on OpenStreetMap. Check the latest opening hours and reviews before visiting.',
        source: 'OpenStreetMap',
      }
    })
    .filter(Boolean)

  if (places.length === 0) throw new Error('Belum ada tempat bernama di area destinasi ini.')
  return places
}