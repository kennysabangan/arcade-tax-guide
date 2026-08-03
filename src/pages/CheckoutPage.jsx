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

function ShieldIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

// ─── Config ───
const PRODUCTS = {
  'one-unit': {
    name: 'Arcade Machine — 1 Unit',
    description: 'One arcade machine acquisition package including game unit deposit, administration, and convenience fee.',
    price: 2865000,
    priceDisplay: '$28,650',
    lineItems: [
      { label: 'Arcade Game Deposit', amount: '$25,000' },
      { label: 'Administration Fee', amount: '$2,500' },
      { label: 'Convenience Fee', amount: '$1,150' },
    ],
    features: [
      'Full arcade game unit',
      'Placement & installation coordination',
      'Entity & compliance documentation',
      'Revenue-share program enrollment',
      'Ongoing advisor access',
    ],
  },
  'two-unit': {
    name: 'Arcade Machines — 2 Units',
    description: 'Two arcade machine acquisition package including game unit deposits, administration, and convenience fees.',
    price: 5730000,
    priceDisplay: '$57,300',
    lineItems: [
      { label: 'Arcade Game Deposit (×2)', amount: '$50,000' },
      { label: 'Administration Fee (×2)', amount: '$5,000' },
      { label: 'Convenience Fee (×2)', amount: '$2,300' },
    ],
    features: [
      'Two full arcade game units',
      'Placement & installation coordination',
      'Entity & compliance documentation',
      'Revenue-share program enrollment',
      'Ongoing advisor access',
    ],
  },
}

// ─── Styling ───
const inputClasses =
  'w-full rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 focus:border-[#dbb155] focus:ring-2 focus:ring-[#dbb155]/20 focus:outline-none transition-all text-sm shadow-sm'

const labelClasses = 'block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1.5'

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2)
  return digits
}

// ─── Header (dark brand bar) ───
function CheckoutHeader() {
  return (
    <header style={{ background: '#0a0a0f' }} className="border-b border-[#dbb155]/20 py-3 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-[#dbb155] text-lg leading-none" style={{ textShadow: '0 0 8px rgba(219,177,85,0.7)' }}>◈</span>
          <span className="font-['Playfair_Display',serif] font-bold text-lg text-[#dbb155] group-hover:opacity-80 transition-opacity" style={{ textShadow: '0 0 10px rgba(219,177,85,0.4)' }}>
            Arcade Tax Guide
          </span>
        </a>
        <div className="flex items-center gap-1.5 text-white/40 text-xs font-['Inter',sans-serif]">
          <LockIcon />
          <span>Secure Checkout</span>
        </div>
      </div>
    </header>
  )
}

// ─── Footer (dark brand bar) ───
function CheckoutFooter() {
  return (
    <footer style={{ background: '#0a0a0f' }} className="border-t border-[#dbb155]/20 py-8 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-white/40 text-sm mb-3">© {new Date().getFullYear()} Arcade Tax Guide. All rights reserved.</p>
        <div className="flex items-center justify-center gap-4 text-xs mb-3">
          <a href="/terms-of-service" className="text-white/30 hover:text-[#dbb155] transition-colors">Terms of Service</a>
          <span className="text-white/10">|</span>
          <a href="/privacy-policy" className="text-white/30 hover:text-[#dbb155] transition-colors">Privacy Policy</a>
        </div>
        <p className="text-xs text-white/25">Not tax advice. Consult your CPA.</p>
      </div>
    </footer>
  )
}

// ─── Form section card ───
function FormSection({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2.5 mb-5">
        {icon && <span className="text-[#dbb155]">{icon}</span>}
        <h3 className="font-['Playfair_Display',serif] text-gray-900 font-bold text-lg">{title}</h3>
      </div>
      {children}
    </div>
  )
}

// ─── Main Component ───
export default function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const productId = searchParams.get('product') || 'one-unit'
  const product = PRODUCTS[productId] || PRODUCTS['one-unit']

  const [step, setStep] = useState('details')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    cardNumber: '', expMonth: '', cvc: '', holderName: '',
    address: '', city: '', state: '', zip: '', country: 'US',
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
      const { month, year } = parseExpiry()
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': crypto.randomUUID(),
        },
        body: JSON.stringify({
          productId,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          referral: referralRef,
          cardNumber: form.cardNumber,
          expMonth: month,
          expYear: year,
          cvc: form.cvc,
          holderName: form.holderName,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      if (data.requiresAction && data.redirectUrl) {
        // 3DS challenge — redirect shopper
        window.location.href = data.redirectUrl
        return
      }
      if (data.success) {
        setStep('success')
      }
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
      <div className="min-h-screen flex flex-col" style={{ background: '#f9f7f2' }}>
        <CheckoutHeader />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 max-w-lg w-full text-center">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(219,177,85,0.1)', border: '2px solid rgba(219,177,85,0.3)' }}>
              <span className="text-[#dbb155]"><CheckIcon /></span>
            </div>
            <h2 className="font-['Playfair_Display',serif] text-gray-900 text-2xl font-bold mb-3">Payment Confirmed</h2>
            <p className="text-gray-500 mb-6">
              Our team will reach out within 1 business day to schedule your session.
            </p>
            <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 mb-6 text-left">
              <p className="text-xs uppercase tracking-wider text-gray-400 font-['Inter',sans-serif] mb-1">Order</p>
              <p className="text-gray-900 font-medium">{product.name}</p>
              <p className="text-[#dbb155] font-['JetBrains_Mono',monospace] font-bold text-xl mt-2">{product.priceDisplay}</p>
            </div>
            <a href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm bg-[#dbb155] text-[#0a0a0f] font-bold hover:brightness-110 hover:shadow-[0_0_20px_rgba(219,177,85,0.4)] active:scale-[0.98] transition-all duration-200">
              Back to Home <ArrowIcon />
            </a>
          </div>
        </div>
        <CheckoutFooter />
      </div>
    )
  }

  // ─── Failed ───
  if (step === 'failed') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#f9f7f2' }}>
        <CheckoutHeader />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 max-w-lg w-full text-center">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(239,68,68,0.08)', border: '2px solid rgba(239,68,68,0.2)' }}>
              <span className="text-red-500 text-2xl">✕</span>
            </div>
            <h2 className="font-['Playfair_Display',serif] text-gray-900 text-2xl font-bold mb-3">Payment Declined</h2>
            <p className="text-gray-500 mb-6">{error || 'Your card was declined. Please try a different payment method.'}</p>
            <button
              onClick={() => { setStep('details'); setError('') }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm border border-[#dbb155] text-[#dbb155] font-semibold hover:bg-[#dbb155]/5 transition-all duration-200 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
        <CheckoutFooter />
      </div>
    )
  }

  // ─── Processing ───
  if (step === 'processing') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#f9f7f2' }}>
        <CheckoutHeader />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 max-w-lg w-full text-center">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(219,177,85,0.08)', border: '2px solid rgba(219,177,85,0.2)' }}>
              <div className="w-6 h-6 border-2 border-[#dbb155] border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="font-['Playfair_Display',serif] text-gray-900 text-xl font-bold mb-2">Processing Payment</h2>
            <p className="text-gray-400 text-sm">Please don't close this window...</p>
          </div>
        </div>
        <CheckoutFooter />
      </div>
    )
  }

  // ─── Checkout form ───
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f9f7f2', color: '#1a1a1a' }}>
      <CheckoutHeader />

      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* Left — Form (3 cols) */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#dbb155]/20 bg-[#dbb155]/5">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] font-['Inter',sans-serif] text-[#dbb155]">Secure Payment</span>
                </span>
                <h1 className="font-['Playfair_Display',serif] text-gray-900 text-2xl sm:text-3xl font-bold mt-4 mb-2">Complete Your Purchase</h1>
                <p className="text-gray-400 text-sm">All fields are required. Your payment is encrypted and secure.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-lg text-sm bg-red-50 border border-red-200 text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormSection title="Contact Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>First Name</label>
                      <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="John" className={inputClasses} />
                    </div>
                    <div>
                      <label className={labelClasses}>Last Name</label>
                      <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Smith" className={inputClasses} />
                    </div>
                    <div>
                      <label className={labelClasses}>Email</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClasses} />
                    </div>
                    <div>
                      <label className={labelClasses}>Phone</label>
                      <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className={inputClasses} />
                    </div>
                  </div>
                </FormSection>

                <FormSection title="Payment Details" icon={<CardIcon />}>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClasses}>Cardholder Name</label>
                      <input name="holderName" required value={form.holderName} onChange={handleChange} placeholder="John Smith" className={inputClasses} />
                    </div>
                    <div>
                      <label className={labelClasses}>Card Number</label>
                      <div className="relative">
                        <input
                          name="cardNumber"
                          required
                          value={form.cardNumber}
                          onChange={handleChange}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                          autoComplete="off"
                          className={inputClasses + ' font-["JetBrains_Mono",monospace] tracking-wider pr-12'}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                          <CardIcon />
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>Expiry</label>
                        <input name="expMonth" required value={form.expMonth} onChange={handleChange} placeholder="MM / YY" maxLength={7} autoComplete="off" className={inputClasses + ' font-["JetBrains_Mono",monospace]'} />
                      </div>
                      <div>
                        <label className={labelClasses}>CVC</label>
                        <input name="cvc" required value={form.cvc} onChange={handleChange} placeholder="123" maxLength={4} autoComplete="off" className={inputClasses + ' font-["JetBrains_Mono",monospace]'} />
                      </div>
                    </div>
                  </div>
                </FormSection>

                <FormSection title="Billing Address">
                  <div className="space-y-4">
                    <div>
                      <label className={labelClasses}>Street Address</label>
                      <input name="address" required value={form.address} onChange={handleChange} placeholder="123 Main St" className={inputClasses} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>City</label>
                        <input name="city" required value={form.city} onChange={handleChange} placeholder="New York" className={inputClasses} />
                      </div>
                      <div>
                        <label className={labelClasses}>State</label>
                        <input name="state" required value={form.state} onChange={handleChange} placeholder="NY" className={inputClasses} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>ZIP Code</label>
                        <input name="zip" required value={form.zip} onChange={handleChange} placeholder="10001" className={inputClasses} />
                      </div>
                      <div>
                        <label className={labelClasses}>Country</label>
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
                </FormSection>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-lg bg-[#dbb155] text-[#0a0a0f] font-bold hover:brightness-110 hover:shadow-[0_0_24px_rgba(219,177,85,0.4)] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0a0a0f] border-t-transparent rounded-full animate-spin" />
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
                  <span className="flex items-center gap-1"><ShieldIcon /> 256-bit SSL</span>
                  <span>·</span>
                  <span>PCI Compliant</span>
                  <span>·</span>
                  <span>Powered by SwissPay</span>
                </div>
              </form>
            </div>

            {/* Right — Order summary sidebar */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#dbb155]/20 bg-[#dbb155]/5">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] font-['Inter',sans-serif] text-[#dbb155]">Order Summary</span>
                </span>
                <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-['Playfair_Display',serif] text-gray-900 font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{product.description}</p>

                  <div className="border-t border-gray-100 pt-4 mb-4">
                    {product.lineItems && (
                      <div className="mb-4 space-y-1.5">
                        {product.lineItems.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-500">{item.label}</span>
                            <span className="text-gray-700 font-['JetBrains_Mono',monospace]">{item.amount}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-100 pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="text-gray-900 font-bold">Total</span>
                            <span className="text-[#dbb155] font-['JetBrains_Mono',monospace] font-bold text-2xl" style={{ textShadow: '0 0 12px rgba(219,177,85,0.3)' }}>
                              {product.priceDisplay}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <ul className="space-y-2.5">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm">
                          <span className="text-[#dbb155] mt-0.5 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-gray-600">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-5 space-y-3">
                  {[
                    { icon: <ShieldIcon />, text: 'Encrypted & secure payment' },
                    { icon: <span className="text-sm">📞</span>, text: 'Support: info@fastfundbusiness.com' },
                    { icon: <span className="text-sm">↩️</span>, text: 'Full refund within 7 days' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-gray-400 text-xs font-['Inter',sans-serif] px-1">
                      <span className="text-[#dbb155]/50 flex-shrink-0">{t.icon}</span>
                      <span>{t.text}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-gray-300 text-[11px] leading-relaxed px-1">
                  By completing this purchase you agree to the{' '}
                  <a href="/terms-of-service" className="text-[#dbb155] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy-policy" className="text-[#dbb155] hover:underline">Privacy Policy</a>.
                  {' '}Tax strategy consultations are for informational purposes and do not constitute tax advice. Consult your CPA.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <CheckoutFooter />
    </div>
  )
}
