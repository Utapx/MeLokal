# MeLokal

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

### Setup Google Sheets submissions (Opsional)

Untuk menerima pengajuan destinasi dari user dan melakukan review admin, ikuti [GOOGLE_SHEETS_SUBMISSIONS.md](GOOGLE_SHEETS_SUBMISSIONS.md). Setelah deploy Apps Script, isi `.env.local`:

```env
VITE_SUBMISSIONS_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart dev server setelah mengubah `.env.local`.

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
- **Google Sheets + Apps Script** — submission destinasi dan review admin (opsional)
- **localStorage** — penyimpanan Favorites & Saved Journey

Data bawaan destinasi, tempat, dan tips berasal dari **local JSON** di `src/data/`. Destinasi yang disetujui admin dapat dimuat dari Google Sheets.

## Struktur Folder

```
src/
├── components/     # Navbar, Footer, Button, Badge, Card, Modal, MapView, dll (reusable)
├── services/       # API Google Sheets submissions
├── data/           # destinations.js, places.js, tips.js — semua data statis
├── pages/          # Home, Explore, Destination, MapPage, Planner, Favorites, About, submissions
├── utils/
│   ├── planner.js  # algoritma rule-based Trip Planner (bukan AI API)
│   └── storage.js  # wrapper localStorage untuk Favorites & Saved Journey
├── App.jsx         # routing dengan AuthProvider
└── main.jsx        # entry point
```

## Fitur Utama

1. **Explore Destination** (`/explore`) — 5 destinasi dari dataset: Bandung, Yogyakarta, Jakarta, Semarang, Surabaya
2. **Local Guide** (`/destination/:slug`) — bahasa, kuliner, transportasi, budget, etika, "jangan lakukan", local tips
3. **Local Map** (`/map/:slug`) — peta Leaflet interaktif dengan marker per kategori + filter
4. **Live Like A Local** — kartu highlight di landing page per destinasi
5. **Smart Trip Planner** (`/plan`) — generator itinerary rule-based berdasarkan durasi, budget, minat
6. **Favorites** (`/favorites`) — tempat & itinerary tersimpan via localStorage
7. **Submit Destination** (`/submit-destination`) — user mengirim tempat baru untuk direview
8. **Admin Review** (`/admin/submissions`) — admin menerima atau menolak pengajuan dengan token Apps Script

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
  submission final, pertimbangkan mengganti foto pencarian berbasis lokasi dengan
  aset foto terverifikasi agar lebih meyakinkan saat dipresentasikan.
- **Firebase configuration bersifat opsional** — aplikasi dapat berjalan tanpa Firebase,
  namun fitur login dan admin panel memerlukan Firebase setup. Untuk demo tanpa
  setup Firebase, semua fitur lain tetap berfungsi normal.
- Struktur data di `src/data/` sengaja dibuat modular sehingga mudah ditambah
  tanpa mengubah komponen/halaman.
- **Admin emails** dapat dikonfigurasi di `src/context/AuthContext.jsx` pada
  array `adminEmails` untuk mengatur siapa saja yang memiliki akses ke Admin Panel.

## Lisensi

Dibuat untuk keperluan kompetisi mahasiswa (prototype, bukan produk komersial).
