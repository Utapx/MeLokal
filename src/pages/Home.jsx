import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Compass, Route, Sparkles, ArrowRight } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import DestinationCard from '../components/DestinationCard.jsx'
import BrandLogo from '../components/BrandLogo.jsx'
import { destinations } from '../data/destinations.js'
import { tips } from '../data/tips.js'
import { tipsEn, tipsFallbackEn } from '../data/tips.en.js'
import { useLanguage } from '../context/LanguageContext'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { lang, t } = useLanguage()

  function handleSearch(e) {
    e.preventDefault()
    navigate(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore')
  }

  return (
    <div>
      {/* HERO */}
      <section className="hero-local relative overflow-hidden text-paper">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%)]" />
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-28 text-center animate-fadeIn">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest">
              <Compass size={14} /> {t('home_hero_badge')}
            </span>
            <BrandLogo showIcon={false} className="mt-5 justify-center text-white text-5xl md:text-7xl" />
          </div>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto italic">
            {t('home_hero_quote')}
          </p>

          <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-3xl sm:rounded-full p-2 shadow-soft">
            <div className="flex min-w-0 flex-1 items-center">
              <Search size={18} className="text-ink-soft ml-3 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder={t('home_search_placeholder')}
                className="min-w-0 flex-1 outline-none text-ink text-sm py-2 bg-transparent"
              />
            </div>
            <Button type="submit" variant="secondary" className="shrink-0">{t('home_search_button')}</Button>
          </form>

          <div className="mt-10 border-t border-white/15 pt-8 flex flex-col items-center gap-3">
            <Button
              to="/plan"
              variant="primary"
              icon={ArrowRight}
              className="min-w-[210px] px-7 py-4 text-base shadow-lg hover:-translate-y-0.5"
            >
              <span className="inline-flex items-center gap-2">
                <Sparkles size={17} aria-hidden="true" />
                {t('home_plan_trip_cta')}
              </span>
            </Button>
            <p className="max-w-md text-sm text-white/70">{t('home_plan_trip_cue')}</p>
          </div>
        </div>
      </section>

      {/* STORYTELLING STATEMENT */}
      <Section className="text-center">
        <p className="font-display text-2xl md:text-4xl text-ink max-w-3xl mx-auto leading-snug animate-slideUp">
          {t('home_storytelling_line1')}
          <br />
          <span className="text-sawah-dark">{t('home_storytelling_line2')}</span>
        </p>
        <div className="mt-8">
          <Button to="/explore" variant="soft">{t('home_explore_indonesia')}</Button>
        </div>
      </Section>

      {/* PROBLEM -> SOLUTION */}
      <Section
        eyebrow={t('home_problem_eyebrow')}
        title={t('home_problem_title')}
        subtitle={t('home_problem_subtitle')}
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: MapPin, text: t('home_problem_1') },
            { icon: Route, text: t('home_problem_2') },
            { icon: Compass, text: t('home_problem_3') },
          ].map((item) => (
            <div key={item.text} className="bg-white rounded-2xl p-6 shadow-soft">
              <item.icon className="text-sawah-dark mb-3" size={28} aria-hidden="true" />
              <p className="text-ink-soft text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-sawah-light rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <Sparkles className="text-sawah-dark shrink-0" size={32} />
          <div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">{t('home_solution_heading')}</h3>
              <p className="text-ink-soft text-sm max-w-2xl">
                {t('home_solution_body')}
              </p>
          </div>
        </div>
      </Section>

      {/* EXPLORE DESTINATIONS */}
      <Section
        eyebrow={t('home_explore_eyebrow')}
        title={t('home_explore_title')}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </Section>

      {/* DISCOVERY -> PLANNING TRANSITION */}
      <Section className="pt-0 md:pt-0">
        <div className="border-t border-ink/10 pt-10 md:pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Route className="text-turmeric-dark mt-1 shrink-0" size={26} aria-hidden="true" />
            <div>
              <p className="text-xs uppercase tracking-wide text-turmeric-dark font-semibold mb-2">
                {t('home_discovery_planner_eyebrow')}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                {t('home_discovery_planner_title')}
              </h2>
              <p className="text-ink-soft mt-2 max-w-xl text-sm">
                {t('home_discovery_planner_body')}
              </p>
            </div>
          </div>
          <Button to="/plan" variant="secondary" className="shrink-0">
            {t('home_discovery_planner_cta')}
          </Button>
        </div>
      </Section>

      {/* LOCAL TIPS PREVIEW - "Live Like a Local" */}
      <Section
        className="bg-ink text-white rounded-t-[3rem]"
        eyebrow={t('home_tips_eyebrow')}
        title={t('home_tips_title')}
        dark
      >
        <div className="grid md:grid-cols-2 gap-5">
          {destinations.map((d) => {
            const tip = lang === 'en' ? (tipsEn[d.slug] || tipsFallbackEn) : (tips[d.slug] || tipsFallbackEn)
            return (
              <div key={d.slug} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-xs uppercase tracking-wide text-turmeric mb-2">{d.name}</p>
                <p className="font-display font-semibold text-lg mb-1">
                  {tip.liveLikeLocal.icon} {tip.liveLikeLocal.headline}
                </p>
                <p className="text-white/70 text-sm">{tip.liveLikeLocal.body}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* LOCAL MAP TEASER */}
      <Section eyebrow={t('home_map_eyebrow')} title={t('home_map_title')}>
        <div className="bg-sawah rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <MapPin size={28} className="text-turmeric mb-3" />
            <h3 className="font-display text-2xl font-semibold mb-2">
              {t('home_map_heading')}
            </h3>
            <p className="text-white/80 text-sm">
              {t('home_map_body')}
            </p>
          </div>
          <Button to="/map/bandung" variant="primary">{t('home_map_open')}</Button>
        </div>
      </Section>

      {/* TRIP PLANNER TEASER */}
      <Section eyebrow={t('home_planner_eyebrow')} title={t('home_planner_title')}>
        <div className="grid md:grid-cols-[1fr_auto] items-center gap-8 bg-turmeric-light rounded-3xl p-10 md:p-14">
          <div>
            <Route size={28} className="text-turmeric-dark mb-3" />
            <p className="text-ink max-w-xl">
              {t('home_planner_body')}
            </p>
          </div>
          <Button to="/plan" variant="secondary">{t('home_planner_cta')}</Button>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="text-center">
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-4">
          {t('home_final_cta_title')}
        </h2>
        <p className="text-ink-soft max-w-xl mx-auto mb-8">
          {t('home_final_cta_body')}
        </p>
        <Button to="/explore" variant="secondary">{t('home_final_cta_button')}</Button>
      </Section>
    </div>
  )
}
