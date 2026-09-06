import React, { useMemo, useState } from 'react'
import { Check, X, RefreshCw, Trash2, Image, Save } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import { fetchSubmissions, reviewSubmission, deleteSubmission, updateSubmissionImage, isSubmissionsApiConfigured } from '../services/submissionsApi.js'
import { useLanguage } from '../context/LanguageContext'
import { places } from '../data/places.js'
import { destinations } from '../data/destinations.js'
import { getPlaceImageOverrides, savePlaceImageOverride } from '../utils/placeImages.js'

export default function AdminSubmissions() {
  const { t } = useLanguage()
  const [token, setToken] = useState('')
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [savingImageId, setSavingImageId] = useState('')
  const [placeSearch, setPlaceSearch] = useState('')
  const [placeImages, setPlaceImages] = useState(getPlaceImageOverrides)

  const filteredPlaces = useMemo(() => {
    const search = placeSearch.trim().toLowerCase()
    if (!search) return places
    return places.filter((place) => {
      const destination = destinations.find((item) => item.slug === place.destinationSlug)
      return `${place.name} ${destination?.name || ''}`.toLowerCase().includes(search)
    })
  }, [placeSearch])

  async function loadItems() {
    setLoading(true)
    setMessage('')
    setIsAdminAuthenticated(false)
    try {
      setItems(await fetchSubmissions(token))
      setIsAdminAuthenticated(true)
    } catch (error) {
      setItems([])
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id, status) {
    try {
      await reviewSubmission(id, status, token)
      setItems((current) => current.filter((item) => item.id !== id))
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function removeItem(id) {
    if (!window.confirm(t('admin_remove_confirm'))) return
    try {
      await deleteSubmission(id, token)
      setItems((current) => current.filter((item) => item.id !== id))
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function saveImage(item) {
    setSavingImageId(item.id)
    setMessage('')
    try {
      await updateSubmissionImage(item.id, item.heroImage || '', token)
      setMessage(t('admin_image_saved'))
    } catch (error) {
      setMessage(error.message)
    } finally {
      setSavingImageId('')
    }
  }

  return (
    <div>
      <div className="bg-turmeric-light py-14 px-6 md:px-12 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">{t('admin_submissions_title')}</h1>
        <p className="text-ink-soft mt-2 max-w-xl mx-auto">{t('admin_submissions_subtitle')}</p>
      </div>
      <Section>
        {!isSubmissionsApiConfigured() && <p className="mb-5 rounded-xl bg-turmeric-light px-4 py-3 text-sm text-ink-soft">{t('submit_destination_not_configured')}</p>}
        <div className="mx-auto mb-8 flex max-w-2xl gap-2">
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder={t('admin_token_placeholder')}
            className="min-w-0 flex-1 rounded-xl border border-ink/15 bg-white px-3 py-2.5 outline-none focus:border-sawah"
          />
          <Button onClick={loadItems} variant="secondary" icon={RefreshCw}>{t('admin_load_button')}</Button>
        </div>
        {message && <p className="mb-5 rounded-xl bg-clay-light px-4 py-3 text-sm text-clay">{message}</p>}
        {loading ? <p className="text-center text-ink-soft">{t('admin_loading')}</p> : items.length === 0 ? <p className="text-center text-ink-soft">{t('admin_empty')}</p> : (
          <div className="space-y-5">
            {items.map((item) => (
              <article key={item.id} className="rounded-2xl bg-white p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-turmeric-dark">{item.category} · {item.region}</p>
                    <h2 className="font-display text-xl font-semibold text-ink">{item.name}</h2>
                    <p className="mt-1 text-sm text-ink-soft">{item.tagline}</p>
                  </div>
                  <span className="rounded-full bg-turmeric-light px-3 py-1 text-xs font-semibold text-turmeric-dark">{item.status}</span>
                </div>
                <p className="mt-4 text-sm text-ink-soft">{item.description}</p>
                <p className="mt-3 text-xs text-ink-soft">{item.address} · {item.latitude}, {item.longitude}</p>
                <div className="mt-5 rounded-xl border border-ink/10 bg-paper p-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-ink" htmlFor={`image-${item.id}`}>
                    <Image size={16} /> {t('admin_image_label')}
                  </label>
                  <div className="mt-3 flex flex-col gap-3 md:flex-row">
                    <input
                      id={`image-${item.id}`}
                      type="url"
                      value={item.heroImage || ''}
                      onChange={(event) => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, heroImage: event.target.value } : entry))}
                      placeholder={t('admin_image_placeholder')}
                      className="min-w-0 flex-1 rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-sawah"
                    />
                    <Button onClick={() => saveImage(item)} variant="secondary" icon={Save} disabled={savingImageId === item.id}>
                      {savingImageId === item.id ? t('admin_image_saving') : t('admin_image_save')}
                    </Button>
                  </div>
                  {item.heroImage && (
                    <img src={item.heroImage} alt={item.name} className="mt-3 h-32 w-full rounded-xl object-cover" onError={(event) => { event.currentTarget.style.display = 'none' }} />
                  )}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.status === 'pending' ? (
                    <>
                      <Button onClick={() => updateStatus(item.id, 'approved')} variant="secondary" icon={Check}>{t('admin_approve')}</Button>
                      <Button onClick={() => updateStatus(item.id, 'rejected')} variant="ghost" icon={X}>{t('admin_reject')}</Button>
                    </>
                  ) : (
                    <Button onClick={() => removeItem(item.id)} variant="ghost" icon={Trash2}>{t('admin_remove')}</Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
        {isAdminAuthenticated && <div className="mt-12 border-t border-ink/10 pt-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-turmeric-dark">{t('admin_builtin_places_eyebrow')}</p>
              <h2 className="font-display text-2xl font-semibold text-ink">{t('admin_builtin_places_title')}</h2>
              <p className="mt-1 text-sm text-ink-soft">{t('admin_builtin_places_body')}</p>
            </div>
            <input
              value={placeSearch}
              onChange={(event) => setPlaceSearch(event.target.value)}
              placeholder={t('admin_builtin_places_search')}
              className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-sawah md:w-72"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredPlaces.map((place) => {
              const destination = destinations.find((item) => item.slug === place.destinationSlug)
              const imageUrl = placeImages[place.id] || ''
              return (
                <article key={place.id} className="rounded-2xl bg-white p-4 shadow-soft">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-turmeric-dark">{destination?.name}</p>
                      <h3 className="font-display text-lg font-semibold text-ink">{place.name}</h3>
                    </div>
                    <span className="text-xs text-ink-soft">{place.category}</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(event) => setPlaceImages((current) => ({ ...current, [place.id]: event.target.value }))}
                      placeholder={t('admin_image_placeholder')}
                      className="min-w-0 flex-1 rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm outline-none focus:border-sawah"
                    />
                    <Button
                      onClick={() => setPlaceImages(savePlaceImageOverride(place.id, imageUrl))}
                      variant="secondary"
                      icon={Save}
                    >
                      {t('admin_image_save')}
                    </Button>
                  </div>
                  {imageUrl && <img src={imageUrl} alt={place.name} className="mt-3 h-28 w-full rounded-xl object-cover" onError={(event) => { event.currentTarget.style.display = 'none' }} />}
                </article>
              )
            })}
          </div>
        </div>}
      </Section>
    </div>
  )
}
