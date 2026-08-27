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

### Setup Firebase untuk Authentication (Opsional)

Untuk menggunakan fitur login dengan Google:

**📖 Lihat panduan lengkap:** [FIREBASE_SETUP.md](FIREBASE_SETUP.md) atau [FIREBASE_CONFIG_MAPPING.md](FIREBASE_CONFIG_MAPPING.md)

**Quick setup:**
1. Buat project di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan Google Authentication di Authentication > Sign-in methods
3. Copy Firebase config dari Project Settings > Your apps
4. Buat/edit file `.env.local` di root project:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Restart dev server: `npm run dev`

Lihat `.env.example` untuk template lengkap.

**⚠️ Penting:** Jangan commit `.env.local` ke Git! File ini sudah di-`.gitignore`.

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
- **Firebase + Google Auth** — authentication & login dengan Google
- **localStorage** — penyimpanan Favorites & Saved Journey

Semua data destinasi, tempat, dan tips berasal dari **local JSON** di `src/data/`
— tidak ada database server maupun backend custom.

## Struktur Folder

```
src/
├── components/     # Navbar, Footer, Button, Badge, Card, Modal, MapView, dll (reusable)
├── config/         # firebase.js - konfigurasi Firebase
├── context/        # AuthContext.jsx - context untuk authentication
├── data/           # destinations.js, places.js, tips.js — semua data statis
├── pages/          # Home, Explore, Destination, MapPage, Planner, Favorites, About, Login, AdminPanel, UserPanel
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
7. **Google Authentication** (`/login`) — login dengan Google untuk akses User Panel & Admin Panel
8. **User Panel** (`/profile`) — dashboard pengguna untuk mengelola favorit dan perjalanan tersimpan
9. **Admin Panel** (`/admin`) — dashboard admin (untuk user dengan email tertentu) untuk mengelola sistem

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
