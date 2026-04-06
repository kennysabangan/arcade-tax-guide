import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'
import TaxGuidePage from './pages/TaxGuidePage'
import CalculatorPage from './pages/CalculatorPage'
import FinancialsPage from './pages/FinancialsPage'
import RetirementPage from './pages/RetirementPage'
import ReportPage from './pages/ReportPage'
import AnalyticsPage from './pages/AnalyticsPage'
import ArcadeLandingPage from './pages/ArcadeLandingPage'

function ScrollToHash() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      // Small delay to let the page render
      const id = location.hash.replace('#', '')
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          setTimeout(tryScroll, 100)
        }
      }
      setTimeout(tryScroll, 150)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])
  return null
}

function PageTracker() {
  const location = useLocation()
  
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-G6VD432JZL', {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])
  
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <PageTracker />
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tax-guide" element={<TaxGuidePage />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="financials" element={<FinancialsPage />} />
          <Route path="retirement" element={<RetirementPage />} />
          <Route path="report" element={<ReportPage />} />
        </Route>
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="arcade" element={<ArcadeLandingPage />} />
      </Routes>
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
