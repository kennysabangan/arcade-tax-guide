import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

// ─── Icons ───
function LockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

// ─── Config ───
// TODO: Replace with real SwissPay API endpoint + publishable key
const SWISSPAY_API_URL = 'https://app.swisspay.ai/api/v1/payments'
const SWISSPAY_PK = '' // Insert publishable key here

const PRODUCTS = {
  'strategy-review': {
    name: 'Arcade Tax Strategy Review',
    description: '1-on-1 strategy session with a qualified tax advisor. Includes personalized analysis of your tax situation, bonus depreciation eligibility, and projected savings.',
    price: 250000, // $2,500.00 in cents
    priceDisplay: '$2,500',
    features: [
      'Personalized tax strategy analysis',
      'Bonus depreciation eligibility review',
      'Projected savings report',
      '60-minute strategy call',
      'Follow-up action plan',
    ],
  },
  'documentation-fee': {
    name: 'Documentation & Coordination Fee',
    description: 'Full documentation package for your arcade acquisition including entity setup coordination, lender introductions, and compliance review.',
    price: 250000, // $2,500.00
    priceDisplay: '$2,500',
    features: [
      'Entity structure coordination',
      'Lender introduction & facilitation',
      'Compliance documentation review',
      'Asset acquisition support',
      'Ongoing advisor access',
    ],
  },
}

// ─── Light theme input ───
const inputClasses = 'w-full bg-white border border-gray-200 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-colors font-body'

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2)
  return digits
}

// ─── Reusable light card ───
function LightCard({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

// ─── Dark branded sidebar card ───
function DarkCard({ children, className = '' }) {
  return (
    <div
      className={`relative rounded-xl border border-card-border p-5 sm:p-6 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        boxShadow: '0 0 40px rgba(219,177,85,0.04)',
      }}
    >
      {/* gold corner accents */}
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold rounded-tl-xl" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold rounded-tr-xl" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold rounded-bl-xl" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold rounded-br-xl" />
      {children}
    </div>
  )
}

// ─── Main Component ───
export default function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const productId = searchParams.get('product') || 'strategy-review'
  const product = PRODUCTS[productId] || PRODUCTS['strategy-review']

  const [step, setStep] = useState('details') // details | processing | success | failed
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expMonth: '',
    cvc: '',
    holderName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  })

  const [referralRef, setReferralRef] = useState('')
  useEffect(() => {
    const urlRef = searchParams.get('ref')
    const storedRef = sessionStorage.getItem('arcadeRef')
    const finalRef = urlRef || storedRef
    if (finalRef) {
      setReferralRef(finalRef)
      sessionStorage.setItem('arcadeRef', finalRef)
    }
  }, [searchParams])

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === 'cardNumber') value = formatCardNumber(value)
    if (name === 'expMonth') value = formatExpiry(value)
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function parseExpiry() {
    const raw = form.expMonth.replace(/\s/g, '')
    const parts = raw.split('/')
    const month = parseInt(parts[0], 10)
    const year = parts[1] ? 2000 + parseInt(parts[1], 10) : 0
    return { month, year }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setStep('processing')

    try {
      // ── SwissPay API call placeholder ──
      // const { month, year } = parseExpiry()
      // const idempotencyKey = crypto.randomUUID()
      // const res = await fetch(SWISSPAY_API_URL, { ... })
      // ... handle response ...

      // ── DEMO MODE ──
      await new Promise((r) => setTimeout(r, 2000))
      setStep('success')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStep('details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const status = searchParams.get('status')
    if (status === 'success') setStep('success')
    if (status === 'failed') {
      setStep('failed')
      setError('Payment was declined. Please try a different payment method.')
    }
  }, [searchParams])

  // ─── Success ───
  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col bg-body">
        <DarkHeader />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <LightCard className="max-w-lg w-full text-center">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(219,177,85,0.1)', border: '2px solid rgba(219,177,85,0.3)' }}>
              <span className="text-gold"><CheckIcon /></span>
            </div>
            <h2 className="font-heading text-gray-900 text-2xl font-bold mb-3">Payment Confirmed</h2>
            <p className="text-gray-500 mb-6">
              You'll receive a confirmation email at <span className="text-gray-900 font-medium">{form.email || 'your email'}</span> shortly.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6 text-left">
              <p className="text-xs uppercase tracking-wider text-gray-400 font-nav mb-1">Order</p>
              <p className="text-gray-900 font-medium">{product.name}</p>
              <p className="text-gold font-mono font-bold text-xl mt-2">{product.priceDisplay}</p>
            </div>
            <p className="text-gray-400 text-sm mb-6">Our team will reach out within 1 business day to schedule your session.</p>
            <a href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm bg-gold text-dark font-bold hover:bg-gold/90 hover:shadow-[0_0_18px_rgba(219,177,85,0.55)] active:scale-[0.98] transition-all duration-200">
              Back to Home <ArrowIcon />
            </a>
          </LightCard>
        </div>
        <DarkFooter />
      </div>
    )
  }

  // ─── Failed ───
  if (step === 'failed') {
    return (
      <div className="min-h-screen flex flex-col bg-body">
        <DarkHeader />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <LightCard className="max-w-lg w-full text-center">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(239,68,68,0.08)', border: '2px solid rgba(239,68,68,0.2)' }}>
              <span className="text-red-500 text-2xl">✕</span>
            </div>
            <h2 className="font-heading text-gray-900 text-2xl font-bold mb-3">Payment Declined</h2>
            <p className="text-gray-500 mb-6">{error || 'Your card was declined. Please try a different payment method.'}</p>
            <button
              onClick={() => { setStep('details'); setError('') }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm border border-gold text-gold font-semibold hover:bg-gold/5 transition-all duration-200 cursor-pointer"
            >
              Try Again
            </button>
          </LightCard>
        </div>
        <DarkFooter />
      </div>
    )
  }

  // ─── Processing ───
  if (step === 'processing') {
    return (
      <div className="min-h-screen flex flex-col bg-body">
        <DarkHeader />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <LightCard className="max-w-lg w-full text-center">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(219,177,85,0.08)', border: '2px solid rgba(219,177,85,0.2)' }}>
              <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="font-heading text-gray-900 text-xl font-bold mb-2">Processing Payment</h2>
            <p className="text-gray-400 text-sm">Please don't close this window...</p>
          </LightCard>
        </div>
        <DarkFooter />
      </div>
    )
  }

  // ─── Checkout form ───
  return (
    <div className="min-h-screen flex flex-col bg-body text-cream">
      <DarkHeader />

      {/* Gradient bridge: dark → light */}
      <div style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0a0a0f 40%, #f8f6f1 100%)' }} className="h-16 sm:h-20" />

      {/* Light body */}
      <div className="flex-1" style={{ background: '#f8f6f1' }}>
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Left — Form (3 cols) */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-gold/20 bg-gold/5">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] font-nav text-gold">Secure Payment</span>
                </span>
                <h1 className="font-heading text-gray-900 text-2xl sm:text-3xl font-bold mt-4 mb-2">Complete Your Purchase</h1>
                <p className="text-gray-400 text-sm">All fields are required. Your payment is encrypted and secure.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Contact */}
                <LightCard>
                  <h3 className="font-heading text-gray-900 font-bold text-lg mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">First Name</label>
                      <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="John" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">Last Name</label>
                      <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Smith" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">Email</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">Phone</label>
                      <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className={inputClasses} />
                    </div>
                  </div>
                </LightCard>

                {/* Card details */}
                <LightCard>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400"><CardIcon /></span>
                    <h3 className="font-heading text-gray-900 font-bold text-lg">Payment Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">Cardholder Name</label>
                      <input name="holderName" required value={form.holderName} onChange={handleChange} placeholder="John Smith" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">Card Number</label>
                      <div className="relative">
                        <input
                          name="cardNumber"
                          required
                          value={form.cardNumber}
                          onChange={handleChange}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                          className={inputClasses + ' font-mono tracking-wider pr-12'}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                          <CardIcon />
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">Expiry</label>
                        <input name="expMonth" required value={form.expMonth} onChange={handleChange} placeholder="MM / YY" maxLength={7} className={inputClasses + ' font-mono'} />
                      </div>
                      <div>
                        <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">CVC</label>
                        <input name="cvc" required value={form.cvc} onChange={handleChange} placeholder="123" maxLength={4} className={inputClasses + ' font-mono'} />
                      </div>
                    </div>
                  </div>
                </LightCard>

                {/* Billing */}
                <LightCard>
                  <h3 className="font-heading text-gray-900 font-bold text-lg mb-4">Billing Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">Street Address</label>
                      <input name="address" required value={form.address} onChange={handleChange} placeholder="123 Main St" className={inputClasses} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">City</label>
                        <input name="city" required value={form.city} onChange={handleChange} placeholder="New York" className={inputClasses} />
                      </div>
                      <div>
                        <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">State</label>
                        <input name="state" required value={form.state} onChange={handleChange} placeholder="NY" className={inputClasses} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">ZIP Code</label>
                        <input name="zip" required value={form.zip} onChange={handleChange} placeholder="10001" className={inputClasses} />
                      </div>
                      <div>
                        <label className="block text-gray-500 text-xs font-nav uppercase tracking-wider mb-1.5">Country</label>
                        <select name="country" value={form.country} onChange={handleChange} className={inputClasses + ' bg-white'}>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="CH">Switzerland</option>
                          <option value="DE">Germany</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </LightCard>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !SWISSPAY_PK}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md text-lg bg-gold text-dark font-bold hover:bg-gold/90 hover:shadow-[0_0_24px_rgba(219,177,85,0.5)] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <LockIcon />
                      Pay {product.priceDisplay}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-gray-400 text-xs pt-1">
                  <span className="flex items-center gap-1"><LockIcon /> 256-bit SSL</span>
                  <span>•</span>
                  <span>PCI Compliant</span>
                  <span>•</span>
                  <span>Powered by SwissPay</span>
                </div>
              </form>
            </div>

            {/* Right — Order summary (dark, branded sidebar) */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-card-border bg-card-bg">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] font-nav text-gold">Order Summary</span>
                </span>
                <DarkCard className="mt-4">
                  <h3 className="font-heading text-cream font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-cream-60 text-sm leading-relaxed mb-5">{product.description}</p>

                  <div className="border-t border-card-border pt-4 mb-4">
                    <ul className="space-y-2.5">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-gold mt-0.5 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-cream-70">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-card-border pt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-cream-60 text-sm">Subtotal</span>
                      <span className="text-cream font-mono">{product.priceDisplay}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-cream-60 text-sm">Processing fee</span>
                      <span className="text-cream font-mono">$0</span>
                    </div>
                    <div className="border-t border-card-border pt-3 flex justify-between items-center">
                      <span className="text-cream font-bold text-lg">Total</span>
                      <span className="text-gold font-mono font-bold text-2xl" style={{ textShadow: '0 0 12px rgba(219,177,85,0.5)' }}>
                        {product.priceDisplay}
                      </span>
                    </div>
                  </div>
                </DarkCard>

                {/* Trust signals */}
                <div className="mt-4 space-y-2">
                  {[
                    { icon: '🔒', text: 'Encrypted & secure payment' },
                    { icon: '📞', text: 'Support: info@fastfundbusiness.com' },
                    { icon: '↩️', text: 'Full refund within 7 days' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-cream-50 text-xs font-nav px-2">
                      <span>{t.icon}</span>
                      <span>{t.text}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-cream-40 text-[11px] leading-relaxed px-2">
                  By completing this purchase you agree to the terms of service. Tax strategy consultations are for informational purposes and do not constitute tax advice. Consult your CPA.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Gradient bridge: light → dark */}
      <div style={{ background: 'linear-gradient(180deg, #f8f6f1 0%, #0a0a0f 100%)' }} className="h-16 sm:h-20" />

      <DarkFooter />
    </div>
  )
}

// ─── Branded header (dark, matches landing page) ───
function DarkHeader() {
  return (
    <div className="bg-body border-b border-gold-20 py-3 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-gold text-lg leading-none" style={{ textShadow: '0 0 8px rgba(219,177,85,0.7)' }}>◈</span>
          <span className="font-heading font-bold text-lg text-gold transition-opacity group-hover:opacity-80" style={{ textShadow: '0 0 10px rgba(219,177,85,0.4)' }}>
            Arcade Tax Guide
          </span>
        </a>
        <div className="flex items-center gap-1.5 text-cream-50 text-xs font-nav">
          <LockIcon />
          <span>Secure Checkout</span>
        </div>
      </div>
    </div>
  )
}

// ─── Branded footer (dark) ───
function DarkFooter() {
  return (
    <footer className="bg-body border-t border-gold-20 py-8 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-cream-50 text-sm mb-1">© {new Date().getFullYear()} Arcade Tax Guide. All rights reserved.</p>
        <p className="text-xs text-cream-40">Not tax advice. Consult your CPA.</p>
      </div>
    </footer>
  )
}
