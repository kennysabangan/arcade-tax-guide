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
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
