import React from 'react'
import { Compass, MapPin, Users, Sparkles } from 'lucide-react'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'

export default function About() {
  return (
    <div>
      <div className="bg-sawah text-white py-20 px-6 md:px-12 text-center">
        <Compass size={36} className="text-turmeric mx-auto mb-4" />
        <h1 className="font-display text-4xl font-semibold">Tentang MeLokal</h1>
        <p className="text-white/85 mt-3 max-w-xl mx-auto italic">
          &ldquo;Datang sebagai turis, pulang dengan pengalaman seperti warga lokal.&rdquo;
        </p>
      </div>

      <Section
        eyebrow="Konsep"
        title="Dari Tourist Information menjadi Local Experience."
      >
        <p className="text-ink-soft max-w-2xl">
          Kebanyakan platform wisata menjawab pertanyaan &ldquo;apa yang bisa dikunjungi?&rdquo;.
          MeLokal dibangun untuk menjawab pertanyaan yang lebih dalam: &ldquo;bagaimana cara
          memahami dan menjalani kehidupan di daerah ini seperti warga lokal?&rdquo; — mulai dari
          bahasa sehari-hari, kebiasaan, transportasi, harga wajar, hingga etika yang tidak
          tertulis di buku panduan wisata manapun.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <MapPin className="text-sawah-dark mb-3" size={24} />
            <h3 className="font-display font-semibold text-ink mb-1">Perspektif Warga</h3>
            <p className="text-sm text-ink-soft">
              Setiap tips, tempat, dan rekomendasi disusun dari sudut pandang kebiasaan warga
              lokal, bukan sekadar daftar tempat populer.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <Sparkles className="text-sawah-dark mb-3" size={24} />
            <h3 className="font-display font-semibold text-ink mb-1">Personalisasi</h3>
            <p className="text-sm text-ink-soft">
              Trip Planner menyesuaikan itinerary dengan budget, durasi, dan minatmu — bukan
              rekomendasi generik untuk semua orang.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <Users className="text-sawah-dark mb-3" size={24} />
            <h3 className="font-display font-semibold text-ink mb-1">Untuk Semua Gaya Traveling</h3>
            <p className="text-sm text-ink-soft">
              Dari solo traveler, backpacker, mahasiswa yang bepergian, hingga wisatawan dengan
              budget terbatas.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Catatan" title="Status project ini">
        <div className="bg-turmeric-light rounded-2xl p-6 max-w-2xl">
          <p className="text-sm text-ink-soft">
            MeLokal adalah <strong className="text-ink">prototype/fungsional website</strong>{' '}
            yang dikembangkan untuk keperluan perlombaan pengembangan website mahasiswa. Seluruh
            data destinasi, tempat, harga, dan Local Score pada website ini merupakan data contoh
            (demo) untuk simulasi konsep — bukan hasil riset lapangan real-time maupun direktori
            bisnis terverifikasi.
          </p>
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-4">
          Siap mulai merasakan jadi lokal?
        </h2>
        <Button to="/explore" variant="secondary">Explore Indonesia</Button>
      </Section>
    </div>
  )
}
