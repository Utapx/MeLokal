# 🔥 Panduan Setup Firebase untuk Jadi Lokal

## 📋 Apa yang Akan Dilakukan

Panduan ini akan menjelaskan cara setup Firebase Authentication dengan Google Sign-in untuk aplikasi Jadi Lokal, sehingga fitur login dengan Google dapat berfungsi.

---

## 🚀 Step-by-Step Setup Firebase

### Step 1: Buka Firebase Console

1. Kunjungi https://console.firebase.google.com
2. Login dengan akun Google Anda
3. Klik **"Create a project"** atau gunakan project yang sudah ada

### Step 2: Setup Google Authentication

1. Di panel sebelah kiri, pilih **"Build"** → **"Authentication"**
2. Klik tab **"Sign-in method"**
3. Cari dan klik **"Google"**
4. Aktifkan toggle **"Enable"**
5. Isi "Project support email" dengan email Anda
6. Klik **"Save"**

✅ Sekarang Google Sign-in sudah enabled di Firebase project Anda

### Step 3: Dapatkan Firebase Credentials

1. Klik **⚙️ Settings** (ikon gear) di atas → **"Project settings"**
2. Scroll ke bawah hingga ketemu section **"Your apps"**
3. Klik **"Web"** icon (atau tambahkan app jika belum ada)
4. Pilih app Anda atau buat baru dengan nama "Jadi Lokal"
5. Copy configuration JSON yang muncul

Konfigurasi akan terlihat seperti ini:

```javascript
{
  "apiKey": "AIzaSyDxxxxxxxxxx-xxxxxxxxxxxxxx",
  "authDomain": "jadi-lokal-xxxxx.firebaseapp.com",
  "projectId": "jadi-lokal-xxxxx",
  "storageBucket": "jadi-lokal-xxxxx.appspot.com",
  "messagingSenderId": "123456789012",
  "appId": "1:123456789012:web:abcdef1234567890abcd"
}
```

---

## 📝 Mengisi .env.local

### Buka File `.env.local`

Di root folder project Jadi Lokal, buka file `.env.local`:

```
c:\Users\Arsen\Documents\00 WebDev\jadi-lokal-web\.env.local
```

### Isi Setiap Baris Sesuai Firebase Config

Ganti nilai-nilai berikut dengan credentials dari Firebase Anda:

```env
# Dari field "apiKey" di Firebase config
VITE_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxx-xxxxxxxxxxxxxx

# Dari field "authDomain" di Firebase config
VITE_FIREBASE_AUTH_DOMAIN=jadi-lokal-xxxxx.firebaseapp.com

# Dari field "projectId" di Firebase config
VITE_FIREBASE_PROJECT_ID=jadi-lokal-xxxxx

# Dari field "storageBucket" di Firebase config
VITE_FIREBASE_STORAGE_BUCKET=jadi-lokal-xxxxx.appspot.com

# Dari field "messagingSenderId" di Firebase config
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012

# Dari field "appId" di Firebase config
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcd
```

### ✅ Contoh File `.env.local` yang Sudah Lengkap

```env
VITE_FIREBASE_API_KEY=AIzaSyD4KpqFnGcNz8_VhZqX-KyJvWb1234567890
VITE_FIREBASE_AUTH_DOMAIN=jadi-lokal-demo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=jadi-lokal-demo
VITE_FIREBASE_STORAGE_BUCKET=jadi-lokal-demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321098
VITE_FIREBASE_APP_ID=1:987654321098:web:xyz123abc456def789ghi
```

---

## 🔐 Setup Admin Panel (Opsional)

Jika ingin mengatur siapa yang bisa akses Admin Panel:

1. Buka file `src/context/AuthContext.jsx`
2. Cari baris ini (sekitar baris 11):

```javascript
const adminEmails = ['admin@example.com', 'mhmdjefr@gmail.com']
```

3. Ganti dengan email Google yang ingin dijadikan admin:

```javascript
const adminEmails = ['email-anda@gmail.com', 'admin@example.com']
```

4. Save file

✅ Sekarang user dengan email tersebut akan memiliki akses ke Admin Panel

---

## ⚡ Restart Development Server

Setelah mengisi `.env.local`:

1. **Tutup** dev server (Ctrl+C di terminal)
2. **Jalankan lagi** dengan perintah:
   ```bash
   npm run dev
   ```
3. **Buka** http://localhost:5173 di browser

✅ Sekarang halaman login akan mendeteksi Firebase sudah dikonfigurasi dan tombol "Masuk dengan Google" akan aktif!

---

## 🧪 Testing Login

1. Kunjungi halaman login: http://localhost:5173/login
2. Klik tombol **"Masuk dengan Google"**
3. Pilih akun Google Anda
4. Setelah login, Anda akan redirect ke home page dan bisa akses:
   - 👤 **Profile** (klik avatar di navbar)
   - 👨‍💼 **Admin Panel** (jika email Anda di dalam `adminEmails`)

---

## ❌ Troubleshooting

### Error: "API key not valid"

**Penyebab:** Credentials di `.env.local` tidak cocok atau salah

**Solusi:**
1. Buka kembali Firebase Console
2. Copy ulang credentials dengan benar
3. Pastikan tidak ada spasi tambahan
4. Restart dev server

### Error: "Invalid API Key"

**Penyebab:** API Key tidak pernah di-enable di Firebase

**Solusi:**
1. Buka Firebase Console → Project settings
2. Buka tab **"API Keys"**
3. Pastikan ada minimal 1 API Key
4. Jika tidak ada, klik **"Create API Key"**

### Tombol "Masuk dengan Google" Tetap Disabled

**Penyebab:** Firebase config masih demo/placeholder

**Solusi:**
1. Cek file `.env.local` apakah sudah diisi dengan benar
2. Pastikan tidak ada line yang kosong atau tidak lengkap
3. Restart dev server
4. Buka console di browser (F12) untuk cek error lebih detail

---

## 📚 File-File Penting

- **`.env.local`** — Menyimpan Firebase credentials (JANGAN SHARE ke public!)
- **`.env.example`** — Template .env.local (aman untuk di-commit ke git)
- **`src/config/firebase.js`** — Konfigurasi Firebase app
- **`src/context/AuthContext.jsx`** — Logika authentication & admin check

---

## 🔒 Keamanan

- **Jangan pernah** commit `.env.local` ke Git
- File `.env.local` sudah di-add ke `.gitignore`
- Credentials di `.env.local` hanya untuk development lokal
- Untuk production, gunakan environment variables dari deployment platform (Vercel, Netlify, dll)

---

## ✅ Checklist Setup

- [ ] Buat/login ke Firebase Console
- [ ] Enable Google Authentication di project Firebase
- [ ] Copy credentials dari Firebase config
- [ ] Buka file `.env.local`
- [ ] Isi semua 6 environment variables dengan credentials Firebase
- [ ] Save `.env.local`
- [ ] Restart dev server (`npm run dev`)
- [ ] Testing login di http://localhost:5173/login
- [ ] Cek Admin Panel (jika email ada di adminEmails)

---

## 📞 Butuh Bantuan?

Jika ada error, buka browser console (F12) dan lihat pesan error lengkapnya. Error messages biasanya cukup informatif untuk troubleshooting.

Good luck! 🚀
