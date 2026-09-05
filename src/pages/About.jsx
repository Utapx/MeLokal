import React from 'react'
import { Compass, MapPin, Users, Sparkles, Info } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <div>
      <div className="bg-sawah text-white py-20 px-6 md:px-12 text-center">
        <Compass size={36} className="text-turmeric mx-auto mb-4" />
        <h1 className="font-display text-4xl font-semibold">{t('about_title')}</h1>
        <p className="text-white/85 mt-3 max-w-xl mx-auto italic">
          {t('about_quote')}
        </p>
      </div>

      <Section
        eyebrow={t('about_concept_eyebrow')}
        title={t('about_concept_title')}
      >
        <p className="text-ink-soft max-w-2xl">
          {t('about_concept_body')}
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <MapPin className="text-sawah-dark mb-3" size={24} />
            <h3 className="font-display font-semibold text-ink mb-1">{t('about_pillar1_title')}</h3>
            <p className="text-sm text-ink-soft">
              {t('about_pillar1_body')}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <Sparkles className="text-sawah-dark mb-3" size={24} />
            <h3 className="font-display font-semibold text-ink mb-1">{t('about_pillar2_title')}</h3>
            <p className="text-sm text-ink-soft">
              {t('about_pillar2_body')}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <Users className="text-sawah-dark mb-3" size={24} />
            <h3 className="font-display font-semibold text-ink mb-1">{t('about_pillar3_title')}</h3>
            <p className="text-sm text-ink-soft">
              {t('about_pillar3_body')}
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow={t('about_status_eyebrow')} title={t('about_status_title')}>
        <div className="grid md:grid-cols-[auto_1fr] gap-5 md:gap-7 items-start bg-turmeric-light rounded-3xl p-6 md:p-8">
          <div className="w-12 h-12 rounded-2xl bg-white/70 text-turmeric-dark flex items-center justify-center">
            <Info size={24} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-turmeric-dark mb-2">
              {t('about_status_badge')}
            </p>
            <p className="text-sm text-ink-soft max-w-3xl">
              {t('about_status_body_before')}{' '}
              <strong className="text-ink">{t('about_status_strong')}</strong>{' '}
              {t('about_status_body_after')}
            </p>
          </div>
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-4">
          {t('about_final_cta_title')}
        </h2>
        <Button to="/explore" variant="secondary">{t('home_explore_indonesia')}</Button>
      </Section>
    </div>
  )
}
