import React, { useState } from 'react'
import { Check, X, RefreshCw, Trash2 } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import { fetchSubmissions, reviewSubmission, deleteSubmission, isSubmissionsApiConfigured } from '../services/submissionsApi.js'
import { useLanguage } from '../context/LanguageContext'

export default function AdminSubmissions() {
  const { t } = useLanguage()
  const [token, setToken] = useState('')
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadItems() {
    setLoading(true)
    setMessage('')
    try {
      setItems(await fetchSubmissions(token))
    } catch (error) {
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
      </Section>
    </div>
  )
}
