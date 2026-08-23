import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BarChart3, Settings, LogOut, MapPin, Users, TrendingUp } from 'lucide-react'
import Button from '../components/Button'

export default function AdminPanel() {
  const navigate = useNavigate()
  const { user, isAdmin, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  React.useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login')
    }
  }, [user, isAdmin, navigate])

  if (!user || !isAdmin) {
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
            <div className="text-2xl">👨‍💼</div>
            <div>
              <h1 className="font-display font-semibold text-ink">Admin Panel</h1>
              <p className="text-xs text-ink-soft">{user.email}</p>
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
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-ink-soft text-sm">Total Destinasi</p>
                <p className="font-display text-3xl font-bold text-ink">4</p>
              </div>
              <MapPin size={24} className="text-sawah-dark" />
            </div>
            <p className="text-xs text-ink-soft">Bandung, Yogyakarta, Bali, Jakarta</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-ink-soft text-sm">Total Tempat</p>
                <p className="font-display text-3xl font-bold text-ink">48</p>
              </div>
              <TrendingUp size={24} className="text-turmeric-dark" />
            </div>
            <p className="text-xs text-ink-soft">Dari semua destinasi</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-ink-soft text-sm">Total Pengguna</p>
                <p className="font-display text-3xl font-bold text-ink">1</p>
              </div>
              <Users size={24} className="text-green-600" />
            </div>
            <p className="text-xs text-ink-soft">Admin user</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="border-b border-ink-soft flex">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'destinations', label: 'Destinasi', icon: MapPin },
              { id: 'users', label: 'Pengguna', icon: Users },
              { id: 'settings', label: 'Pengaturan', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'text-sawah-dark border-b-2 border-sawah-dark'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h2 className="font-display font-semibold text-ink text-lg">Ringkasan Sistem</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-ink-soft/10 rounded-lg">
                    <span className="text-ink">Version</span>
                    <span className="font-semibold text-ink">1.0.0</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-ink-soft/10 rounded-lg">
                    <span className="text-ink">Status</span>
                    <span className="text-green-600 font-semibold">🟢 Aktif</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-ink-soft/10 rounded-lg">
                    <span className="text-ink">Last Update</span>
                    <span className="font-semibold text-ink">Hari ini</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'destinations' && (
              <div className="space-y-4">
                <h2 className="font-display font-semibold text-ink text-lg">Kelola Destinasi</h2>
                <p className="text-ink-soft">Fitur manajemen destinasi akan ditambahkan di update berikutnya.</p>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-4">
                <h2 className="font-display font-semibold text-ink text-lg">Kelola Pengguna</h2>
                <p className="text-ink-soft">Fitur manajemen pengguna akan ditambahkan di update berikutnya.</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <h2 className="font-display font-semibold text-ink text-lg">Pengaturan</h2>
                <p className="text-ink-soft">Fitur pengaturan akan ditambahkan di update berikutnya.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
