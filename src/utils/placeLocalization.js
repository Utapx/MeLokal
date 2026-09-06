export function getLocalizedPriceRange(place, lang) {
  const priceRange = place.priceRange || '—'
  if (lang === 'id') return priceRange
  if (place.priceRangeEn) return place.priceRangeEn

  return priceRange
    .replaceAll('Bervariasi', 'Varies')
    .replaceAll('Gratis', 'Free')
    .replaceAll('Cek harga di lokasi', 'Check local prices')
}

export function getLocalizedQuote(place, lang) {
  if (lang === 'id') return place.quote || 'Tempat lokal pilihan warga.'
  if (place.quoteEn) return place.quoteEn
  if (place.source === 'OpenStreetMap') {
    return 'A local place found on OpenStreetMap. Check the latest hours and reviews before visiting.'
  }
  return 'A local recommendation worth discovering.'
}
