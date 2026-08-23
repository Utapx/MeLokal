import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Compass, Route, Sparkles } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import DestinationCard from '../components/DestinationCard.jsx'
import { destinations } from '../data/destinations.js'
import { tips } from '../data/tips.js'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore')
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-sawah text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%)]" />
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-28 text-center animate-fadeIn">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest mb-6">
            <Compass size={14} /> Local Experience Platform
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05]">
            Jadi Lokal
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto italic">
            &ldquo;Datang sebagai turis, pulang dengan pengalaman seperti warga lokal.&rdquo;
          </p>

          <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto flex items-center gap-2 bg-white rounded-full p-2 shadow-soft">
            <Search size={18} className="text-ink-soft ml-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Mau menjelajah ke mana?"
              className="flex-1 outline-none text-ink text-sm py-2 bg-transparent"
            />
            <Button type="submit" variant="secondary">Cari</Button>
          </form>

          <div className="mt-8">
            <Button to="/explore" variant="outline">Explore Indonesia</Button>
          </div>
        </div>
      </section>

      {/* STORYTELLING STATEMENT */}
      <Section className="text-center">
        <p className="font-display text-2xl md:text-4xl text-ink max-w-3xl mx-auto leading-snug animate-slideUp">
          Traveling is easy.
          <br />
          <span className="text-sawah-dark">Living like a local is different.</span>
        </p>
      </Section>

      {/* PROBLEM -> SOLUTION */}
      <Section
        eyebrow="Masalah yang sering terjadi"
        title="Website wisata biasa cuma jawab satu pertanyaan."
        subtitle="“Apa yang bisa saya kunjungi?” — padahal pertanyaan yang lebih penting adalah bagaimana caranya benar-benar memahami tempat itu."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: '🗣️', text: 'Tidak tahu bahasa/istilah lokal sehari-hari.' },
            { icon: '💸', text: 'Tidak tahu kisaran harga wajar, rawan “harga turis”.' },
            { icon: '🙏', text: 'Tidak tahu etika & aturan tidak tertulis setempat.' },
          ].map((item) => (
            <div key={item.text} className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-ink-soft text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-sawah-light rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <Sparkles className="text-sawah-dark shrink-0" size={32} />
          <div>
            <h3 className="font-display text-xl font-semibold text-ink mb-2">Solusi Jadi Lokal</h3>
            <p className="text-ink-soft text-sm max-w-2xl">
              Jadi Lokal menyusun panduan dari sudut pandang warga: bahasa, kuliner, transportasi,
              budget, etika, dan tips praktis — lalu memadukannya dengan peta interaktif dan
              itinerary yang dipersonalisasi sesuai budget dan minatmu.
            </p>
          </div>
        </div>
      </Section>

      {/* EXPLORE DESTINATIONS */}
      <Section
        eyebrow="Explore Indonesia"
        title="Pilih daerah, mulai pahami cara hidupnya."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </Section>

      {/* LOCAL TIPS PREVIEW - "Live Like a Local" */}
      <Section
        className="bg-ink text-white rounded-t-[3rem]"
        eyebrow="Live Like A Local"
        title={'Kalau mau jadi lokal, kamu harus tahu ini.'}
        dark
      >
        <div className="grid md:grid-cols-2 gap-5">
          {destinations.map((d) => {
            const t = tips[d.slug]
            return (
              <div key={d.slug} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-xs uppercase tracking-wide text-turmeric mb-2">{d.name}</p>
                <p className="font-display font-semibold text-lg mb-1">
                  {t.liveLikeLocal.icon} {t.liveLikeLocal.headline}
                </p>
                <p className="text-white/70 text-sm">{t.liveLikeLocal.body}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* LOCAL MAP TEASER */}
      <Section eyebrow="Local Map" title="Semua tempat favorit warga, dalam satu peta.">
        <div className="bg-sawah rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <MapPin size={28} className="text-turmeric mb-3" />
            <h3 className="font-display text-2xl font-semibold mb-2">
              Peta interaktif, bukan sekadar daftar tempat.
            </h3>
            <p className="text-white/80 text-sm">
              Temukan tempat makan, hidden gem, budaya, cafe, hingga pasar lokal — lengkap dengan
              filter kategori dan Local Score di setiap titik.
            </p>
          </div>
          <Button to="/map/bandung" variant="primary">Buka Local Map</Button>
        </div>
      </Section>

      {/* TRIP PLANNER TEASER */}
      <Section eyebrow="Smart Trip Planner" title="Itinerary yang terasa personal, bukan generik.">
        <div className="grid md:grid-cols-[1fr_auto] items-center gap-8 bg-turmeric-light rounded-3xl p-10 md:p-14">
          <div>
            <Route size={28} className="text-turmeric-dark mb-3" />
            <p className="text-ink max-w-xl">
              Pilih destinasi, durasi, budget, dan minatmu — Jadi Lokal menyusun itinerary harian
              berbasis rekomendasi warga lokal, siap dipakai dan disimpan.
            </p>
          </div>
          <Button to="/plan" variant="secondary">Buat Itinerary</Button>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="text-center">
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-4">
          Don&rsquo;t just visit. Experience.
        </h2>
        <p className="text-ink-soft max-w-xl mx-auto mb-8">
          Jangan hanya mengunjungi sebuah kota. Kenali cara hidupnya.
        </p>
        <Button to="/explore" variant="secondary">Start Exploring</Button>
      </Section>
    </div>
  )
}
