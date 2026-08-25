import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import Destination from './pages/Destination.jsx'
import MapPage from './pages/MapPage.jsx'
import Planner from './pages/Planner.jsx'
import Favorites from './pages/Favorites.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import UserPanel from './pages/UserPanel.jsx'

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-6xl mb-4">🧭</p>
      <h1 className="text-2xl font-display font-semibold text-ink">Halaman tidak ditemukan</h1>
      <p className="text-ink-soft mt-2">Kamu tersesat dari rute MeLokal. Coba kembali ke beranda.</p>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/destination/:slug" element={<Destination />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/map/:slug" element={<MapPage />} />
            <Route path="/plan" element={<Planner />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
