# Firebase Config to .env.local Mapping Guide

## Visual Mapping

```
Firebase Console Web App Config
├── apiKey
├── authDomain
├── projectId
├── storageBucket
├── messagingSenderId
└── appId

                    ⬇️  COPY & PASTE  ⬇️

.env.local File
├── VITE_FIREBASE_API_KEY
├── VITE_FIREBASE_AUTH_DOMAIN
├── VITE_FIREBASE_PROJECT_ID
├── VITE_FIREBASE_STORAGE_BUCKET
├── VITE_FIREBASE_MESSAGING_SENDER_ID
└── VITE_FIREBASE_APP_ID
```

## Field-by-Field Mapping

| Firebase Config | .env.local Variable | Contoh Nilai |
|---|---|---|
| `apiKey` | `VITE_FIREBASE_API_KEY` | `AIzaSyD4KpqFnGcNz8_VhZqX...` |
| `authDomain` | `VITE_FIREBASE_AUTH_DOMAIN` | `jadi-lokal-demo.firebaseapp.com` |
| `projectId` | `VITE_FIREBASE_PROJECT_ID` | `jadi-lokal-demo` |
| `storageBucket` | `VITE_FIREBASE_STORAGE_BUCKET` | `jadi-lokal-demo.appspot.com` |
| `messagingSenderId` | `VITE_FIREBASE_MESSAGING_SENDER_ID` | `987654321098` |
| `appId` | `VITE_FIREBASE_APP_ID` | `1:987654321098:web:xyz123...` |

---

## Langkah-Langkah Mengisi .env.local

### 1. Persiapan: Lihat Firebase Config

Di Firebase Console, configuration Anda akan terlihat seperti:

```javascript
// Firebase Config dari Console
const firebaseConfig = {
  apiKey: "AIzaSyD4KpqFnGcNz8_VhZqX-KyJvWb1234567890",
  authDomain: "jadi-lokal-demo.firebaseapp.com",
  projectId: "jadi-lokal-demo",
  storageBucket: "jadi-lokal-demo.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:xyz123abc456def789ghi"
};
```

### 2. Buka .env.local di Text Editor

File location: `c:\Users\Arsen\Documents\00 WebDev\jadi-lokal-web\.env.local`

File ini sebelumnya mungkin berisi placeholder:

```env
VITE_FIREBASE_API_KEY=AIzaSyDemoKeyPlaceholder
VITE_FIREBASE_AUTH_DOMAIN=demo-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=demo-project
VITE_FIREBASE_STORAGE_BUCKET=demo-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 3. Replace Setiap Baris

**SEBELUM:**
```env
VITE_FIREBASE_API_KEY=AIzaSyDemoKeyPlaceholder
```

**SESUDAH:**
```env
VITE_FIREBASE_API_KEY=AIzaSyD4KpqFnGcNz8_VhZqX-KyJvWb1234567890
```

---

## Contoh Lengkap: Sebelum & Sesudah

### ❌ SEBELUM (Demo/Placeholder)

```env
VITE_FIREBASE_API_KEY=AIzaSyDemoKeyPlaceholder
VITE_FIREBASE_AUTH_DOMAIN=demo-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=demo-project
VITE_FIREBASE_STORAGE_BUCKET=demo-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### ✅ SESUDAH (Real Firebase Config)

```env
VITE_FIREBASE_API_KEY=AIzaSyD4KpqFnGcNz8_VhZqX-KyJvWb1234567890
VITE_FIREBASE_AUTH_DOMAIN=jadi-lokal-demo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=jadi-lokal-demo
VITE_FIREBASE_STORAGE_BUCKET=jadi-lokal-demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321098
VITE_FIREBASE_APP_ID=1:987654321098:web:xyz123abc456def789ghi
```

---

## ⚡ Quick Checklist Saat Mengisi

- [ ] Semua 6 baris sudah diisi (tidak ada baris yang kosong)
- [ ] Tidak ada spasi sebelum atau sesudah `=`
- [ ] Tidak ada tanda kutip di sekitar nilai
- [ ] Nilai diambil dari Firebase config, bukan dari file lain
- [ ] File sudah di-save
- [ ] Dev server sudah di-restart

---

## 🔍 Verifikasi: Cara Cek Firebase Sudah Bekerja

Setelah mengisi `.env.local` dan restart server:

1. Buka http://localhost:5173/login
2. Lihat halaman login
3. Jika konfigurasi benar, akan muncul:
   - ✅ Tombol "Masuk dengan Google" **AKTIF** (bukan disabled)
   - ✅ Tidak ada pesan "Firebase belum dikonfigurasi"

4. Jika masih error, buka browser F12 → Console tab
   - Cek pesan error untuk troubleshooting

---

## ❓ FAQ

**Q: Di mana saya bisa lihat credentials Firebase saya?**
A: Firebase Console → Settings (⚙️) → Project Settings → Scroll ke "Your apps" → Pilih web app Anda

**Q: Apakah apiKey bisa dishare di public/GitHub?**
A: Tidak! apiKey harus dirahasiakan. File `.env.local` sudah di-`.gitignore` agar tidak ter-push ke GitHub.

**Q: Bagaimana kalau saya lupa copy satu field?**
A: Cek di Firebase Console lagi, atau buka `.env.example` untuk melihat structure yang benar.

**Q: Error "auth/api-key-not-valid" muncul lagi setelah setup?**
A: Kemungkinan credentials tidak cocok atau ada typo. Cek ulang setiap field dengan teliti.

---

## 🎯 Summary

Singkatnya:
1. **Dapat 6 nilai dari Firebase Console**
2. **Paste ke 6 baris di .env.local sesuai mapping**
3. **Restart dev server**
4. **Testing login di /login page**

Done! ✅
