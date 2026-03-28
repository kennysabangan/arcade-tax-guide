import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'
import TaxGuidePage from './pages/TaxGuidePage'
import CalculatorPage from './pages/CalculatorPage'
import FinancialsPage from './pages/FinancialsPage'
import ScenariosPage from './pages/ScenariosPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tax-guide" element={<TaxGuidePage />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="financials" element={<FinancialsPage />} />
          <Route path="scenarios" element={<ScenariosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
