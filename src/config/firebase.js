import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Tambahkan GoogleAuthProvider

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Fungsi helper untuk memeriksa apakah file .env sudah dikonfigurasi
export function isFirebaseConfigured() {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
  );
}

// === BARIS DEBUGGING (Silakan cek nilainya di Console Browser Anda) ===
console.log("DEBUG - Firebase API Key:", firebaseConfig.apiKey);
console.log("DEBUG - Firebase Project ID:", firebaseConfig.projectId);
// ======================================================================

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Ekspor googleProvider untuk login
