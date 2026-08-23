import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Heart, MapPin, LogOut } from 'lucide-react'

export default function UserPanel() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  React.useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-ink">
      {/* Header */}
      <header className="bg-white border-b border-ink-soft">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <h1 className="font-display font-semibold text-ink">Profil Saya</h1>
              <p className="text-xs text-ink-soft">{user.displayName || user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-semibold"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 space-y-4">
              <div className="text-center">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                )}
                <h2 className="font-display font-semibold text-ink text-lg">
                  {user.displayName || 'Pengguna'}
                </h2>
                <p className="text-sm text-ink-soft">{user.email}</p>
              </div>

              <div className="space-y-2 border-t border-ink-soft pt-4">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Bergabung</span>
                  <span className="font-semibold text-ink">
                    {new Date(user.metadata?.creationTime).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Status</span>
                  <span className="font-semibold text-green-600">🟢 Aktif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Favorit */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-red-600" />
                <h2 className="font-display font-semibold text-ink text-lg">Tempat Favorit</h2>
              </div>
              <p className="text-ink-soft">
                Tempat yang Anda tandai sebagai favorit akan muncul di sini.
              </p>
              <button
                onClick={() => navigate('/favorites')}
                className="mt-4 px-4 py-2 bg-turmeric text-white rounded-lg font-semibold hover:bg-turmeric-dark transition-colors"
              >
                Lihat Favorit
              </button>
            </div>

            {/* Journey */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-sawah-dark" />
                <h2 className="font-display font-semibold text-ink text-lg">Perjalanan Tersimpan</h2>
              </div>
              <p className="text-ink-soft">
                Itinerary yang Anda buat dengan Trip Planner akan tersimpan di sini.
              </p>
              <button
                onClick={() => navigate('/plan')}
                className="mt-4 px-4 py-2 bg-sawah text-white rounded-lg font-semibold hover:bg-sawah-dark transition-colors"
              >
                Buat Perjalanan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
