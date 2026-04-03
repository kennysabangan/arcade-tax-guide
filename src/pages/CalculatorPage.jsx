import { SectionLabel, SectionWrapper, CTAButton, BookCallCTA } from '../components/Layout'
import { useState, useMemo, useEffect } from 'react'

const SERVICE_PERIODS = [
  { label: 'After Jan 19, 2025 (OBBBA — 100%)', value: 1, id: 'obbba' },
  { label: 'Jan 1, 2025 – Jan 19, 2025 (40%)', value: 0.4, id: 'jan2025' },
  { label: '2024 (60%)', value: 0.6, id: 'y2024' },
  { label: '2023 (80%)', value: 0.8, id: 'y2023' },
  { label: '2022 or earlier (100%)', value: 1, id: 'y2022' },
]

const TAX_RATES = [
  { label: '10%', value: 0.1 },
  { label: '12%', value: 0.12 },
  { label: '22%', value: 0.22 },
  { label: '24%', value: 0.24 },
  { label: '32%', value: 0.32 },
  { label: '35%', value: 0.35 },
  { label: '37%', value: 0.37 },
  { label: '21% (Corporate)', value: 0.21 },
]

const MACRS_YEAR1 = 0.1429

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}

function pct(n) {
  return `${(n * 100).toFixed(0)}%`
}

function ResultRow({ label, value, sublabel, highlight }) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <div className={`text-sm ${highlight ? 'text-cream font-semibold' : 'text-cream-70'}`}>{label}</div>
        {sublabel && <div className="text-cream-40 text-xs">{sublabel}</div>}
      </div>
      <div className={`font-mono text-right ${highlight ? 'text-gold font-bold text-lg' : 'text-cream font-semibold'}`}>{value}</div>
    </div>
  )
}

// ─── Checklist ───
const CHECKLIST = [
  { id: 1, category: 'Purchase', text: 'Purchase invoice or receipt showing date, amount, and seller information' },
  { id: 2, category: 'Purchase', text: 'Proof of payment (cancelled check, credit card statement, wire confirmation)' },
  { id: 3, category: 'Purchase', text: 'Bill of lading or delivery receipt showing delivery date' },
  { id: 4, category: 'Placed in Service', text: 'Documentation of the date the game was placed in service (installed and operational)' },
  { id: 5, category: 'Placed in Service', text: 'Photos of the game installed at the business location' },
  { id: 6, category: 'Placed in Service', text: 'Written log of installation date and setup completion' },
  { id: 7, category: 'Business Use', text: 'Contemporaneous log of business use vs. personal use' },
  { id: 8, category: 'Business Use', text: 'Documentation of business purpose (customer retention, employee morale, revenue generation)' },
  { id: 9, category: 'Business Use', text: 'Revenue reports from coin/card-operated systems (if applicable)' },
  { id: 10, category: 'Business Use', text: 'Business use percentage calculation worksheet' },
  { id: 11, category: 'Tax Filing', text: 'IRS Form 4562 (Depreciation and Amortization) completed for the tax year' },
  { id: 12, category: 'Tax Filing', text: 'Asset class 79.0 classification documentation' },
  { id: 13, category: 'Tax Filing', text: 'Election statement for bonus depreciation (if required)' },
  { id: 14, category: 'Tax Filing', text: 'Maintenance and repair records for the asset' },
]

function Checklist() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('checklist-state')) || {} } catch { return {} }
  })
  useEffect(() => { localStorage.setItem('checklist-state', JSON.stringify(checked)) }, [checked])

  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }))
  const done = Object.values(checked).filter(Boolean).length
  const categories = [...new Set(CHECKLIST.map((c) => c.category))]

  return (
    <SectionWrapper id="checklist">
      <div className="text-center mb-6">
        <SectionLabel>IRC § 274(D)</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Record-Keeping Checklist</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          Track the substantiation requirements for listed property to maintain your bonus depreciation eligibility.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-cream-60 text-sm">
            <span className="text-gold font-bold text-lg">{done}</span> of{' '}
            <span className="font-semibold">{CHECKLIST.length}</span> complete
          </div>
          <div className="w-48 h-2 bg-card-bg border border-card-border rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full transition-all duration-500" style={{ width: `${(done / CHECKLIST.length) * 100}%` }} />
          </div>
        </div>
        {categories.map((cat) => (
          <div key={cat} className="mb-6">
            <h3 className="text-gold font-nav font-semibold text-sm uppercase tracking-wider mb-3">{cat}</h3>
            <div className="space-y-2">
              {CHECKLIST.filter((c) => c.category === cat).map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    checked[item.id] ? 'border-gold-20 bg-gold-20/10' : 'border-card-border bg-card-bg hover:border-gold-dim'
                  }`}
                >
                  <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)} className="mt-0.5 accent-gold" />
                  <span className={`text-sm leading-relaxed ${checked[item.id] ? 'text-cream-50 line-through' : 'text-cream-70'}`}>{item.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

// ─── Calculator ───
function Calculator() {
  const [price, setPrice] = useState(200000)
  const [servicePeriod, setServicePeriod] = useState('obbba')
  const [bizUse, setBizUse] = useState(100)
  const [taxRate, setTaxRate] = useState(0.37)
  const [calculated, setCalculated] = useState(false)

  const bonusRate = SERVICE_PERIODS.find(sp => sp.id === servicePeriod)?.value || 1

  const results = useMemo(() => {
    if (!calculated) return null
    const basis = (bizUse / 100) * price
    const bonus = basis * bonusRate
    const regular = (basis - bonus) * MACRS_YEAR1
    const total = bonus + regular
    const savings = total * taxRate
    return { basis, bonus, regular, total, savings, effectiveCost: price - savings }
  }, [price, servicePeriod, bizUse, taxRate, calculated])

  const qualifies = bizUse > 50

  return (
    <SectionWrapper id="calculator">
      <div className="text-center mb-6">
        <SectionLabel>Interactive Tool</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Depreciation Calculator</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          Estimate your first-year deduction and tax savings for an arcade game purchase.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="bg-card-bg border border-card-border rounded-lg p-6">
          <h3 className="text-cream font-semibold text-lg mb-6">Enter Your Details</h3>

          <div className="mb-6">
            <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-2">Purchase Price of Arcade Game</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-50">$</span>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-body border border-card-border rounded-md pl-8 pr-4 py-3 text-cream font-mono focus:border-gold focus:outline-none transition-colors" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-2">Placed in Service Period</label>
            <div className="space-y-2">
              {SERVICE_PERIODS.map((sp) => (
                <label key={sp.id} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${servicePeriod === sp.id ? 'border-gold bg-gold-20/20' : 'border-card-border hover:border-gold-dim'}`}>
                  <input type="radio" name="servicePeriod" checked={servicePeriod === sp.id} onChange={() => setServicePeriod(sp.id)} className="accent-gold" />
                  <span className="text-cream-70 text-sm">{sp.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-2">Business Use Percentage: {bizUse}%</label>
            <input type="range" min="0" max="100" value={bizUse} onChange={(e) => setBizUse(Number(e.target.value))} className="w-full accent-gold" />
            <div className="flex justify-between text-cream-40 text-xs mt-1">
              <span>0%</span>
              <span className={qualifies ? 'text-green-400' : 'text-red-400'}>
                {qualifies ? '✓ Qualifies for bonus depreciation' : '✗ Does not qualify (must be >50%)'}
              </span>
              <span>100%</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-2">Marginal Tax Rate</label>
            <div className="flex flex-wrap gap-2">
              {TAX_RATES.map((tr) => (
                <button
                  key={tr.value}
                  onClick={() => setTaxRate(tr.value)}
                  className={`px-4 py-2 text-sm rounded-md border transition-all ${
                    taxRate === tr.value
                      ? 'bg-gold text-dark border-gold font-semibold'
                      : 'bg-card-bg border-card-border text-cream-70 hover:border-gold-dim hover:text-cream'
                  }`}
                >
                  {tr.label}
                </button>
              ))}
            </div>
          </div>

          <CTAButton onClick={() => setCalculated(true)} className="w-full">Calculate Depreciation</CTAButton>
        </div>

        {/* Output */}
        <div className="bg-card-bg border border-card-border rounded-lg p-6">
          {results ? (
            <>
              <h3 className="text-gold font-heading font-bold text-xl mb-6">Your Depreciation Results</h3>
              <div className="space-y-4">
                <ResultRow label="Depreciable Basis" value={fmt(results.basis)} />
                <ResultRow label="Bonus Depreciation" value={fmt(results.bonus)} sublabel={`${pct(bonusRate)} of basis`} />
                <ResultRow label="Regular MACRS (Year 1)" value={fmt(results.regular)} sublabel="14.29% of remaining basis" />
                <div className="border-t border-gold-20 pt-4">
                  <ResultRow label="Total First-Year Deduction" value={fmt(results.total)} highlight />
                </div>
                <div className="bg-gold-20/20 rounded-lg p-4 border border-gold-20">
                  <div className="text-cream-60 text-xs uppercase tracking-wider font-nav mb-1">Estimated Tax Savings</div>
                  <div className="text-gold font-heading text-3xl font-bold">{fmt(results.savings)}</div>
                  <div className="text-cream-50 text-sm mt-1">at {pct(taxRate)} marginal rate</div>
                </div>
                <ResultRow label="Effective Cost After Tax Savings" value={fmt(results.effectiveCost)} />
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <p className="text-cream-50 text-sm">
                Enter your arcade game purchase details and click "Calculate" to see your estimated first-year depreciation deduction.
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default function CalculatorPage() {
  return (
    <div className="pt-16">
      <Calculator />
      <Checklist />
      <BookCallCTA />
    </div>
  )
}
