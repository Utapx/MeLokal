import React from 'react'
import { Compass } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white font-display text-xl font-semibold">
            <Compass size={22} className="text-turmeric" />
            Jadi Lokal
          </div>
          <p className="text-sm mt-3 max-w-xs">
            Datang sebagai turis, pulang dengan pengalaman seperti warga lokal.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-3">Jelajahi</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/explore" className="hover:text-turmeric transition-colors">Explore Destination</a></li>
            <li><a href="/plan" className="hover:text-turmeric transition-colors">Trip Planner</a></li>
            <li><a href="/favorites" className="hover:text-turmeric transition-colors">Favorites</a></li>
            <li><a href="/about" className="hover:text-turmeric transition-colors">Tentang Jadi Lokal</a></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-3">Catatan Prototipe</p>
          <p className="text-sm">
            Seluruh data destinasi, tempat, harga, dan Local Score pada website ini adalah
            data contoh (demo) untuk keperluan simulasi konsep lomba mahasiswa, bukan hasil
            riset lapangan real-time.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs py-4">
        Dibuat untuk perlombaan pengembangan website mahasiswa — Jadi Lokal, {new Date().getFullYear()}.
      </div>
    </footer>
  )
}
