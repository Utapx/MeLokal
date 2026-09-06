import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import Destination from './pages/Destination.jsx'
import MapPage from './pages/MapPage.jsx'
import Planner from './pages/Planner.jsx'
import Favorites from './pages/Favorites.jsx'
import About from './pages/About.jsx'
import SubmitDestination from './pages/SubmitDestination.jsx'
import AdminSubmissions from './pages/AdminSubmissions.jsx'
import { useLanguage } from './context/LanguageContext'

function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <Compass size={56} className="text-sawah mb-4" aria-hidden="true" />
      <h1 className="text-2xl font-display font-semibold text-ink">{t('notfound_title')}</h1>
      <p className="text-ink-soft mt-2">{t('notfound_body')}</p>
    </div>
  )
}

export default function App() {
  return (
    <div className="page-shell min-h-screen flex flex-col">
        <Navbar />
      <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/destination/:slug" element={<Destination />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/map/:slug" element={<MapPage />} />
            <Route path="/plan" element={<Planner />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/submit-destination" element={<SubmitDestination />} />
            <Route path="/admin/submissions" element={<AdminSubmissions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
    </div>
  )
}
