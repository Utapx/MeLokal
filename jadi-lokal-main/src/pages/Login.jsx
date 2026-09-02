import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, AlertCircle, Info } from 'lucide-react'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loginWithGoogle, firebaseReady } = useAuth()
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/'
      navigate(from)
    }
  }, [user, navigate, location])

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      await loginWithGoogle()
    } catch (err) {
      const errorMsg = err.message || 'Gagal login dengan Google'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-ink-soft to-ink flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="font-display text-3xl font-semibold text-ink">MeLokal</h1>
            <p className="text-ink-soft">Masuk untuk menyimpan petualangan lokal kamu</p>
          </div>

          {/* Firebase Not Configured Warning */}
          {!firebaseReady && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
              <Info size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-600">
                <p className="font-semibold mb-1">Firebase belum dikonfigurasi</p>
                <p className="text-xs">Setup Firebase di .env.local untuk mengaktifkan Google login. Saat ini fitur login tidak tersedia.</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-600">
                <p className="font-semibold mb-1">Error Login</p>
                <p className="text-xs">{error}</p>
              </div>
            </div>
          )}

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading || !firebaseReady}
            className="w-full bg-white border-2 border-ink rounded-xl py-3 px-4 font-semibold text-ink hover:bg-ink hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Sedang login...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Masuk dengan Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ink-soft"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-ink-soft">atau</span>
            </div>
          </div>

          {/* Info Text */}
          {firebaseReady ? (
            <div className="bg-turmeric-light rounded-lg p-4 space-y-2">
              <p className="text-sm text-ink font-semibold flex items-center gap-2">
                <LogIn size={16} />
                Siap Login
              </p>
              <p className="text-xs text-ink-soft">
                Gunakan akun Google Anda untuk login. Pastikan email terdaftar di sistem.
              </p>
            </div>
          ) : (
            <div className="bg-ink-soft/10 rounded-lg p-4 space-y-3">
              <p className="text-sm text-ink font-semibold">Cara Setup Firebase</p>
              <ol className="text-xs text-ink-soft space-y-2 list-decimal list-inside">
                <li>Buat project di <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-sawah-dark underline">Firebase Console</a></li>
                <li>Aktifkan Google Authentication</li>
                <li>Copy credentials ke <code className="bg-white px-1 py-0.5 rounded">.env.local</code></li>
                <li>Restart dev server</li>
              </ol>
            </div>
          )}

          {/* Footer */}
          <p className="text-xs text-ink-soft text-center">
            Dengan login, Anda menyetujui Kebijakan Privasi kami
          </p>

          {/* Back Home Button */}
          <Button to="/" variant="secondary" className="w-full">
            ← Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  )
}
