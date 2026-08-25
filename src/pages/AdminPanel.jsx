import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BarChart3, Settings, LogOut, MapPin, Users, TrendingUp, Globe, Star, Coffee, ShoppingBag, Eye } from 'lucide-react'
import { destinations } from '../data/destinations.js'
import { places, categoryMeta } from '../data/places.js'

// Stats per destination
function getDestinationStats() {
  return destinations.map((d) => {
    const destPlaces = places.filter((p) => p.destinationSlug === d.slug)
    const avgScore = destPlaces.length
      ? (destPlaces.reduce((s, p) => s + p.localScore, 0) / destPlaces.length).toFixed(1)
      : '-'
    return { ...d, placeCount: destPlaces.length, avgScore }
  })
}

const categoryIcons = { food: Coffee, 'hidden-gem': Star, culture: Globe, cafe: Coffee, shopping: ShoppingBag }

export default function AdminPanel() {
  const navigate = useNavigate()
  const { user, isAdmin, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  React.useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login')
    }
  }, [user, isAdmin, navigate])

  if (!user || !isAdmin) return null

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const destStats = getDestinationStats()
  const totalPlaces = places.length

  // Category breakdown
  const categoryBreakdown = Object.entries(categoryMeta).map(([key, meta]) => ({
    key,
    ...meta,
    count: places.filter((p) => p.category === key).length,
  }))

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'destinations', label: 'Destinasi', icon: MapPin },
    { id: 'places', label: 'Tempat', icon: TrendingUp },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="bg-white border-b border-ink/10 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sawah text-white flex items-center justify-center font-semibold text-sm">
              A
            </div>
            <div>
              <h1 className="font-display font-semibold text-ink leading-tight">Admin Panel</h1>
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
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-ink-soft text-xs uppercase tracking-wide">Destinasi</p>
                <p className="font-display text-3xl font-bold text-ink mt-1">{destinations.length}</p>
              </div>
              <div className="w-10 h-10 bg-sawah-light rounded-xl flex items-center justify-center">
                <MapPin size={20} className="text-sawah-dark" />
              </div>
            </div>
            <p className="text-xs text-ink-soft">Bandung, Yogyakarta, Bali, Jakarta</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-ink-soft text-xs uppercase tracking-wide">Total Tempat</p>
                <p className="font-display text-3xl font-bold text-ink mt-1">{totalPlaces}</p>
              </div>
              <div className="w-10 h-10 bg-turmeric-light rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-turmeric-dark" />
              </div>
            </div>
            <p className="text-xs text-ink-soft">Dari semua destinasi</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-ink-soft text-xs uppercase tracking-wide">Avg Local Score</p>
                <p className="font-display text-3xl font-bold text-ink mt-1">
                  {(places.reduce((s, p) => s + p.localScore, 0) / places.length).toFixed(1)}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Star size={20} className="text-yellow-500" />
              </div>
            </div>
            <p className="text-xs text-ink-soft">Rata-rata semua tempat</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-ink-soft text-xs uppercase tracking-wide">Kategori</p>
                <p className="font-display text-3xl font-bold text-ink mt-1">{Object.keys(categoryMeta).length}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Globe size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-xs text-ink-soft">Food, Cafe, Culture, dst.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="border-b border-ink/8 flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[120px] px-5 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-sawah-dark border-b-2 border-sawah-dark bg-sawah-light/40'
                      : 'text-ink-soft hover:text-ink hover:bg-ink/3'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="font-display font-semibold text-ink text-lg">Ringkasan Sistem MeLokal</h2>

                {/* System info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {[
                      { label: 'Versi', value: '1.0.0' },
                      { label: 'Status', value: '🟢 Aktif', colored: true },
                      { label: 'Build', value: 'Vite + React 18' },
                      { label: 'Auth', value: 'Firebase Google OAuth' },
                      { label: 'Storage', value: 'localStorage (client-side)' },
                      { label: 'Peta', value: 'Leaflet + OpenStreetMap' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 bg-paper rounded-lg">
                        <span className="text-sm text-ink-soft">{item.label}</span>
                        <span className={`text-sm font-semibold ${item.colored ? 'text-green-600' : 'text-ink'}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Category breakdown */}
                  <div>
                    <p className="text-sm font-semibold text-ink mb-3">Distribusi Kategori Tempat</p>
                    <div className="space-y-2">
                      {categoryBreakdown.map((cat) => (
                        <div key={cat.key} className="flex items-center gap-3 p-3 bg-paper rounded-lg">
                          <span className="text-base">{cat.emoji}</span>
                          <span className="text-sm text-ink flex-1">{cat.label}</span>
                          <span className="text-sm font-semibold text-sawah-dark">{cat.count} tempat</span>
                          <div className="w-16 h-1.5 bg-ink/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-sawah rounded-full"
                              style={{ width: `${(cat.count / totalPlaces) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Destinations Tab */}
            {activeTab === 'destinations' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-semibold text-ink text-lg">Kelola Destinasi</h2>
                  <span className="text-xs text-ink-soft bg-paper px-3 py-1 rounded-full">{destinations.length} destinasi aktif</span>
                </div>

                <div className="space-y-3">
                  {destStats.map((d) => (
                    <div key={d.slug} className="flex items-center gap-4 p-4 bg-paper rounded-xl hover:bg-sawah-light/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-ink text-sm">{d.name}</p>
                          <span className="text-xs bg-white border border-ink/10 px-2 py-0.5 rounded-full text-ink-soft">{d.badge}</span>
                        </div>
                        <p className="text-xs text-ink-soft mt-0.5">{d.region}</p>
                      </div>
                      <div className="text-center shrink-0">
                        <p className="text-xs text-ink-soft">Tempat</p>
                        <p className="font-bold text-ink">{d.placeCount}</p>
                      </div>
                      <div className="text-center shrink-0">
                        <p className="text-xs text-ink-soft">Avg Score</p>
                        <p className="font-bold text-turmeric-dark">★ {d.avgScore}</p>
                      </div>
                      <Link
                        to={`/destination/${d.slug}`}
                        className="shrink-0 flex items-center gap-1 text-xs font-semibold text-sawah-dark hover:text-sawah border border-sawah/30 rounded-lg px-3 py-1.5 hover:bg-sawah-light transition-colors"
                      >
                        <Eye size={12} /> Lihat
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-turmeric-light rounded-xl">
                  <p className="text-sm text-ink-soft">
                    💡 Untuk menambah destinasi baru, edit file <code className="bg-white px-1 rounded text-ink text-xs">src/data/destinations.js</code>,
                    <code className="bg-white px-1 rounded text-ink text-xs mx-1">src/data/places.js</code>, dan
                    <code className="bg-white px-1 rounded text-ink text-xs">src/data/tips.js</code>.
                    Sistem otomatis menyesuaikan tanpa perlu mengubah komponen lain.
                  </p>
                </div>
              </div>
            )}

            {/* Places Tab */}
            {activeTab === 'places' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-semibold text-ink text-lg">Data Tempat</h2>
                  <span className="text-xs text-ink-soft bg-paper px-3 py-1 rounded-full">{totalPlaces} total tempat</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-ink/8">
                        <th className="text-left py-3 px-3 text-xs text-ink-soft font-semibold uppercase tracking-wide">Nama</th>
                        <th className="text-left py-3 px-3 text-xs text-ink-soft font-semibold uppercase tracking-wide">Destinasi</th>
                        <th className="text-left py-3 px-3 text-xs text-ink-soft font-semibold uppercase tracking-wide">Kategori</th>
                        <th className="text-right py-3 px-3 text-xs text-ink-soft font-semibold uppercase tracking-wide">Score</th>
                        <th className="text-right py-3 px-3 text-xs text-ink-soft font-semibold uppercase tracking-wide">Harga</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                      {places.map((p) => {
                        const dest = destinations.find((d) => d.slug === p.destinationSlug)
                        return (
                          <tr key={p.id} className="hover:bg-paper transition-colors">
                            <td className="py-3 px-3 font-medium text-ink">{p.name}</td>
                            <td className="py-3 px-3 text-ink-soft">{dest?.name}</td>
                            <td className="py-3 px-3">
                              <span className="inline-flex items-center gap-1 text-xs bg-sawah-light text-sawah-dark px-2 py-0.5 rounded-full">
                                {categoryMeta[p.category].emoji} {categoryMeta[p.category].label}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right font-semibold text-turmeric-dark">★ {p.localScore}</td>
                            <td className="py-3 px-3 text-right text-xs text-ink-soft">{p.priceRange}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="font-display font-semibold text-ink text-lg">Pengaturan Sistem</h2>

                <div className="space-y-4">
                  <div className="p-5 bg-paper rounded-xl">
                    <p className="font-semibold text-ink text-sm mb-1">Admin Emails</p>
                    <p className="text-xs text-ink-soft mb-3">
                      Daftar email yang memiliki akses Admin Panel. Konfigurasi di{' '}
                      <code className="bg-white px-1 rounded">src/context/AuthContext.jsx</code>
                    </p>
                    <div className="bg-white rounded-lg px-4 py-3 text-xs font-mono text-ink border border-ink/8">
                      <span className="text-sawah-dark">const</span> adminEmails = [<span className="text-turmeric-dark">"{user.email}"</span>, ...]
                    </div>
                  </div>

                  <div className="p-5 bg-paper rounded-xl">
                    <p className="font-semibold text-ink text-sm mb-1">Firebase Auth</p>
                    <p className="text-xs text-ink-soft mb-3">Status koneksi Firebase Authentication</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-green-600 font-semibold">Terhubung</span>
                      <span className="text-xs text-ink-soft ml-2">Google OAuth aktif</span>
                    </div>
                  </div>

                  <div className="p-5 bg-paper rounded-xl">
                    <p className="font-semibold text-ink text-sm mb-1">Data Storage</p>
                    <p className="text-xs text-ink-soft mb-3">
                      Favorites dan itinerary user disimpan di browser localStorage dengan key <code className="bg-white px-1 rounded">melokal_*</code>
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white rounded-lg px-3 py-2 border border-ink/8">
                        <span className="text-ink-soft">Favorites key:</span>
                        <span className="font-mono text-ink ml-2">melokal_favorites</span>
                      </div>
                      <div className="bg-white rounded-lg px-3 py-2 border border-ink/8">
                        <span className="text-ink-soft">Journeys key:</span>
                        <span className="font-mono text-ink ml-2">melokal_journeys</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
