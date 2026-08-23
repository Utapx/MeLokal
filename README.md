# Jadi Lokal 🧭

> "Datang sebagai turis, pulang dengan pengalaman seperti warga lokal."

Prototype/fungsional website untuk perlombaan pengembangan website mahasiswa.
Membantu wisatawan memahami cara hidup, kebiasaan, budaya, makanan, transportasi,
harga, bahasa, dan tips lokal suatu daerah — bukan sekadar daftar tempat wisata.

## Menjalankan Project

Butuh [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

Build untuk production (opsional, tidak wajib untuk demo lomba):

```bash
npm run build
npm run preview
```

## Stack Teknologi

- **React + Vite** — frontend, tanpa backend/server terpisah
- **Tailwind CSS** — styling
- **React Router** — routing antar halaman
- **Leaflet + OpenStreetMap** — peta interaktif (gratis, tanpa API key)
- **lucide-react** — icon set
- **localStorage** — penyimpanan Favorites & Saved Journey (tanpa login/database)

Semua data destinasi, tempat, dan tips berasal dari **local JSON** di `src/data/`
— tidak ada database server maupun backend custom.

## Struktur Folder

```
src/
├── components/     # Navbar, Footer, Button, Badge, Card, Modal, MapView, dll (reusable)
├── data/           # destinations.js, places.js, tips.js — semua data statis
├── pages/          # Home, Explore, Destination, MapPage, Planner, Favorites, About
├── utils/
│   ├── planner.js  # algoritma rule-based Trip Planner (bukan AI API)
│   └── storage.js  # wrapper localStorage untuk Favorites & Saved Journey
├── App.jsx         # routing
└── main.jsx        # entry point
```

## Fitur Utama

1. **Explore Destination** (`/explore`) — 4 destinasi: Bandung, Yogyakarta, Bali, Jakarta
2. **Local Guide** (`/destination/:slug`) — bahasa, kuliner, transportasi, budget, etika, "jangan lakukan", local tips
3. **Local Map** (`/map/:slug`) — peta Leaflet interaktif dengan marker per kategori + filter
4. **Live Like A Local** — kartu highlight di landing page per destinasi
5. **Smart Trip Planner** (`/plan`) — generator itinerary rule-based berdasarkan durasi, budget, minat
6. **Favorites** (`/favorites`) — tempat & itinerary tersimpan via localStorage, tanpa login

## Alur Demo yang Disarankan (< 5 menit)

```
Landing Page
  → Pilih Yogyakarta (Explore)
  → Lihat Local Guide (bahasa, kuliner, etika, jangan lakukan)
  → Buka Local Map, coba filter kategori, klik salah satu marker
  → Masuk Trip Planner
  → Pilih Yogyakarta + 3 hari + Budget Hemat + minat Kuliner & Budaya
  → Generate Journey
  → Save My Journey
  → Cek halaman Favorites — itinerary tersimpan tanpa login
```

## Catatan Penting

- **Data adalah data demo/prototipe.** Nama tempat, harga, dan Local Score dibuat
  untuk simulasi konsep lomba, bukan hasil riset lapangan real-time. Sebelum
  submission final, pertimbangkan mengganti foto (`picsum.photos` seed placeholder)
  dengan foto asli destinasi agar lebih meyakinkan saat dipresentasikan.
- **Tidak ada backend/database/login** sesuai ketentuan project — semua fitur
  berjalan penuh di sisi client (frontend-only), cukup dijalankan dengan `npm run dev`.
- Struktur data di `src/data/` sengaja dibuat modular sehingga mudah ditambah
  (misalnya menambah destinasi ke-5) tanpa mengubah komponen/halaman.

## Lisensi

Dibuat untuk keperluan kompetisi mahasiswa (prototype, bukan produk komersial).
