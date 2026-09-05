import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { categoryMeta } from '../data/places.js'
import { useLanguage } from '../context/LanguageContext'
import 'leaflet/dist/leaflet.css'

function buildIcon(label) {
  return L.divIcon({
    html: `<div style="
      background:#FAF6EC;
      border:2px solid #2F6B4F;
      border-radius:9999px;
      width:36px;height:36px;
      display:flex;align-items:center;justify-content:center;
      font-size:9px;
      font-weight:700;
      box-shadow:0 2px 6px rgba(36,28,21,0.35);
    ">${label}</div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  })
}

export default function MapView({ center, zoom = 13, places, onViewDetails }) {
  const { t } = useLanguage()
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '1.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => {
        const meta = categoryMeta[place.category]
        return (
          <Marker key={place.id} position={[place.lat, place.lng]} icon={buildIcon(meta.shortLabel)}>
            <Popup>
              <div className="p-3 font-body">
                <p className="text-[10px] uppercase tracking-wide text-turmeric-dark font-semibold mb-1">
                  {t(meta.translationKey)}
                </p>
                <p className="font-display font-semibold text-ink leading-snug">{place.name}</p>
                <p className="text-sm text-ink mt-1">{t('local_score')} {place.localScore.toFixed(1)}</p>
                <p className="text-xs italic text-ink-soft mt-1">&ldquo;{place.quote}&rdquo;</p>
                <p className="text-sm font-medium text-sawah-dark mt-1">{place.priceRange}</p>
                <button
                  onClick={() => onViewDetails && onViewDetails(place)}
                  className="mt-2 w-full text-xs font-semibold text-white bg-sawah hover:bg-sawah-dark rounded-full py-1.5 transition-colors"
                >
                  {t('map_view_details')}
                </button>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
