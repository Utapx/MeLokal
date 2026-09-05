import React, { useState } from 'react'
import { Send, MapPin } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import { submitDestination, isSubmissionsApiConfigured } from '../services/submissionsApi.js'
import { destinations } from '../data/destinations.js'
import { useLanguage } from '../context/LanguageContext'

const initialForm = {
  name: '',
  destinationSlug: destinations[0].slug,
  tagline: '',
  description: '',
  category: 'food',
  address: '',
  googleMapsUrl: '',
  heroImage: '',
  submitterName: '',
  submitterEmail: '',
}

export default function SubmitDestination() {
  const { t } = useLanguage()
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setState({ type: '', message: '' })
    try {
      await submitDestination({
        ...form,
        region: destinations.find((destination) => destination.slug === form.destinationSlug)?.region || '',
      })
      setForm(initialForm)
      setState({ type: 'success', message: t('submit_destination_success') })
    } catch (error) {
      setState({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="bg-sawah-light py-14 px-6 md:px-12 text-center">
        <MapPin size={32} className="text-sawah-dark mx-auto mb-3" />
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">{t('submit_destination_title')}</h1>
        <p className="text-ink-soft mt-2 max-w-xl mx-auto">{t('submit_destination_subtitle')}</p>
      </div>

      <Section>
        {!isSubmissionsApiConfigured() && (
          <div className="mb-6 rounded-xl border border-turmeric/30 bg-turmeric-light px-4 py-3 text-sm text-ink-soft">
            {t('submit_destination_not_configured')}
          </div>
        )}
        {state.message && (
          <div className={`mb-6 rounded-xl px-4 py-3 text-sm ${state.type === 'success' ? 'bg-sawah-light text-sawah-dark' : 'bg-clay-light text-clay'}`}>
            {state.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6 rounded-3xl bg-white p-6 shadow-soft md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t('submit_field_name')} name="name" value={form.name} onChange={updateField} required />
            <label className="block text-sm font-semibold text-ink">
              {t('submit_field_city')}
              <select name="destinationSlug" value={form.destinationSlug} onChange={updateField} required className="mt-2 w-full rounded-xl border border-ink/15 bg-paper px-3 py-2.5 font-normal outline-none focus:border-sawah">
                {destinations.map((destination) => (
                  <option key={destination.slug} value={destination.slug}>{destination.name} · {destination.region}</option>
                ))}
              </select>
            </label>
          </div>
          <Field label={t('submit_field_tagline')} name="tagline" value={form.tagline} onChange={updateField} required />
          <Field label={t('submit_field_description')} name="description" value={form.description} onChange={updateField} required textarea />
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-semibold text-ink">
              {t('submit_field_category')}
              <select name="category" value={form.category} onChange={updateField} className="mt-2 w-full rounded-xl border border-ink/15 bg-paper px-3 py-2.5 font-normal outline-none focus:border-sawah">
                <option value="food">{t('category_food')}</option>
                <option value="culture">{t('category_culture')}</option>
                <option value="cafe">{t('category_cafe')}</option>
                <option value="shopping">{t('category_shopping')}</option>
                <option value="hidden-gem">{t('category_hidden_gem')}</option>
              </select>
            </label>
            <Field label={t('submit_field_address')} name="address" value={form.address} onChange={updateField} required />
          </div>
          <Field label={t('submit_field_google_maps_url')} name="googleMapsUrl" value={form.googleMapsUrl} onChange={updateField} type="url" required />
          <p className="-mt-4 text-xs text-ink-soft">{t('submit_field_google_maps_help')}</p>
          <Field label={t('submit_field_image')} name="heroImage" value={form.heroImage} onChange={updateField} type="url" />
          <div className="border-t border-ink/10 pt-5">
            <p className="mb-4 text-sm font-semibold text-ink">{t('submit_contact_heading')}</p>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label={t('submit_field_submitter_name')} name="submitterName" value={form.submitterName} onChange={updateField} required />
              <Field label={t('submit_field_submitter_email')} name="submitterEmail" value={form.submitterEmail} onChange={updateField} type="email" required />
            </div>
          </div>
          <Button type="submit" variant="primary" icon={Send} className="w-full" disabled={loading || !isSubmissionsApiConfigured()}>
            {loading ? t('submit_destination_sending') : t('submit_destination_button')}
          </Button>
        </form>
      </Section>
    </div>
  )
}

function Field({ label, name, value, onChange, required = false, textarea = false, type = 'text', step }) {
  const Component = textarea ? 'textarea' : 'input'
  return (
    <label className="block text-sm font-semibold text-ink">
      {label}
      <Component
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        type={textarea ? undefined : type}
        step={step}
        rows={textarea ? 5 : undefined}
        className="mt-2 w-full rounded-xl border border-ink/15 bg-paper px-3 py-2.5 font-normal outline-none focus:border-sawah"
      />
    </label>
  )
}
