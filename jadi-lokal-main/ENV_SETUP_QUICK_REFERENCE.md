# 🔥 Firebase Setup - Quick Reference Card

## Lokasi File .env.local
```
📁 jadi-lokal-web/
   └─ .env.local  ← Edit file ini!
```

---

## 6 Variables yang Perlu Diisi

| No | Variable Name | Sumber Firebase Config | Contoh Nilai |
|---|---|---|---|
| 1 | `VITE_FIREBASE_API_KEY` | `apiKey` | `AIzaSyD4Kpq...` |
| 2 | `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` | `jadi-lokal-demo.firebaseapp.com` |
| 3 | `VITE_FIREBASE_PROJECT_ID` | `projectId` | `jadi-lokal-demo` |
| 4 | `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` | `jadi-lokal-demo.appspot.com` |
| 5 | `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` | `987654321098` |
| 6 | `VITE_FIREBASE_APP_ID` | `appId` | `1:987654321098:web:xyz...` |

---

## Template .env.local

Copy-paste ke `.env.local`, lalu ganti VALUE:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN_HERE
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID_HERE
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET_HERE
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID_HERE
VITE_FIREBASE_APP_ID=YOUR_APP_ID_HERE
```

---

## Cara Dapat Firebase Credentials

### 1️⃣ Buka Firebase Console
```
https://console.firebase.google.com
→ Pilih Project Anda
```

### 2️⃣ Project Settings
```
⚙️ (gear icon) di atas kiri
→ Project Settings
```

### 3️⃣ Scroll ke "Your apps"
```
Lihat bagian "Your apps"
→ Pilih Web App (icon: </>)
```

### 4️⃣ Copy Configuration
```javascript
// Akan muncul konfigurasi seperti ini:
const firebaseConfig = {
  apiKey: "AIzaSyD4KpqFnGcNz8_VhZqX-KyJvWb1234567890",
  authDomain: "jadi-lokal-demo.firebaseapp.com",
  projectId: "jadi-lokal-demo",
  storageBucket: "jadi-lokal-demo.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:xyz123abc456def789ghi"
};
```

### 5️⃣ Isi ke .env.local
```env
VITE_FIREBASE_API_KEY=AIzaSyD4KpqFnGcNz8_VhZqX-KyJvWb1234567890
VITE_FIREBASE_AUTH_DOMAIN=jadi-lokal-demo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=jadi-lokal-demo
VITE_FIREBASE_STORAGE_BUCKET=jadi-lokal-demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321098
VITE_FIREBASE_APP_ID=1:987654321098:web:xyz123abc456def789ghi
```

---

## Apa Sesudah Setup?

### ✅ Restart Dev Server
```bash
# Tutup server yang sedang jalan: Ctrl+C
# Jalankan lagi:
npm run dev
```

### ✅ Testing Login
```
http://localhost:5173/login
→ Klik "Masuk dengan Google"
→ Seharusnya berhasil!
```

### ✅ Admin Access
Edit `src/context/AuthContext.jsx` baris 11:
```javascript
const adminEmails = ['email-anda@gmail.com']
```

---

## ❌ Troubleshooting

| Error | Penyebab | Solusi |
|---|---|---|
| "API key not valid" | Credentials salah | Cek ulang Firebase config |
| "Firebase belum dikonfigurasi" | .env.local masih placeholder | Isi benar credentials |
| Tombol "Masuk" tetap disabled | Server belum restart | Restart: `npm run dev` |
| "Auth/api-key-not-valid" | Typo di credentials | Copy-paste dengan hati-hati |

---

## 🔒 Security Tips

❌ **JANGAN:**
- Commit `.env.local` ke Git
- Share `.env.local` ke orang lain
- Push API Key ke public repository

✅ **BOLEH:**
- Commit `.env.example` (tanpa nilai asli)
- Gunakan `.env.local` untuk local development
- Untuk production, gunakan env variables di platform (Vercel, Netlify, dll)

---

## File Dokumentasi Lengkap

- 📖 **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** — Panduan lengkap step-by-step
- 📊 **[FIREBASE_CONFIG_MAPPING.md](FIREBASE_CONFIG_MAPPING.md)** — Mapping tabel & troubleshooting

---

## Done? ✅

Login berhasil → Bisa akses:
- 👤 Profile page (`/profile`)
- 👨‍💼 Admin panel (`/admin`) — jika email ada di `adminEmails`
