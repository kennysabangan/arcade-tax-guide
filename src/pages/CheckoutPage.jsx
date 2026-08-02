import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { SectionLabel, Card } from '../components/Layout'

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
    <svg className="w-5 h-5 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

// ─── Input styling (matches landing page) ───
const inputClasses = 'w-full bg-body border border-card-border rounded-md px-4 py-3 text-cream placeholder-cream-40 focus:border-gold focus:outline-none transition-colors font-body'

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2)
  return digits
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

  // Customer info
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Card
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    holderName: '',
    // Billing
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

  // Parse expiry into month/year
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
      // When Kenny provides the SwissPay API key, uncomment and configure:
      //
      // const { month, year } = parseExpiry()
      // const idempotencyKey = crypto.randomUUID()
      //
      // const res = await fetch(SWISSPAY_API_URL, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${SWISSPAY_PK}`,
      //     'Content-Type': 'application/json',
      //     'Idempotency-Key': idempotencyKey,
      //   },
      //   body: JSON.stringify({
      //     amount: product.price,
      //     currency: 'USD',
      //     reference: `order_${productId}_${Date.now()}`,
      //     success_url: `${window.location.origin}/checkout?status=success&product=${productId}`,
      //     failure_url: `${window.location.origin}/checkout?status=failed&product=${productId}`,
      //     customer: {
      //       email: form.email,
      //       name: `${form.firstName} ${form.lastName}`,
      //       phone: form.phone,
      //       billing_address: {
      //         line1: form.address,
      //         city: form.city,
      //         state: form.state,
      //         postal_code: form.zip,
      //         country: form.country,
      //       },
      //     },
      //     payment_method: {
      //       type: 'card',
      //       number: form.cardNumber.replace(/\s/g, ''),
      //       exp_month: month,
      //       exp_year: year,
      //       cvc: form.cvc,
      //       holder_name: form.holderName,
      //     },
      //     metadata: {
      //       product: productId,
      //       ref: referralRef,
      //       source: 'fastfundbusiness_checkout',
      //     },
      //   }),
      // })
      //
      // const data = await res.json()
      //
      // if (data.status === 'succeeded') {
      //   setStep('success')
      //   // GA4 conversion
      //   if (typeof window.gtag === 'function') {
      //     window.gtag('event', 'purchase', {
      //       transaction_id: data.id,
      //       value: product.price / 100,
      //       currency: 'USD',
      //       items: [{ item_name: product.name, price: product.price / 100 }],
      //     })
      //   }
      //   // Meta Pixel
      //   if (typeof window.fbq === 'function') {
      //     window.fbq('track', 'Purchase', {
      //       value: product.price / 100,
      //       currency: 'USD',
      //       content_name: product.name,
      //     })
      //   }
      // } else if (data.status === 'requires_action' && data.next_action) {
      //   // 3DS redirect
      //   window.location.href = data.next_action.url
      // } else {
      //   throw new Error(data.failure?.reason || 'Payment failed')
      // }

      // ── DEMO MODE: Remove once SwissPay is wired up ──
      await new Promise((r) => setTimeout(r, 2000))
      setStep('success')

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStep('details')
    } finally {
      setLoading(false)
    }
  }

  // Check URL for success/failed status (3DS redirect back)
  useEffect(() => {
    const status = searchParams.get('status')
    if (status === 'success') setStep('success')
    if (status === 'failed') {
      setStep('failed')
      setError('Payment was declined. Please try a different payment method.')
    }
  }, [searchParams])

  // ─── Success state ───
  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-body px-4">
        <Card className="p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(219,177,85,0.15)', border: '1px solid rgba(219,177,85,0.3)' }}>
            <span className="text-gold"><CheckIcon /></span>
          </div>
          <h2 className="font-heading text-gold text-2xl font-bold mb-4">Payment Confirmed</h2>
          <p className="text-cream-70 mb-6">
            Thank you for your purchase. You'll receive a confirmation email at <span className="text-cream font-medium">{form.email || 'your email'}</span> shortly.
          </p>
          <div className="border border-card-border rounded-lg p-4 mb-6 bg-card-bg">
            <p className="text-cream-50 text-sm uppercase tracking-wider font-nav mb-1">Order</p>
            <p className="text-cream font-medium">{product.name}</p>
            <p className="text-gold font-mono font-bold text-xl mt-2">{product.priceDisplay}</p>
          </div>
          <p className="text-cream-60 text-sm mb-6">
            Our team will reach out within 1 business day to schedule your session.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm bg-gold text-dark font-bold hover:bg-gold/90 hover:shadow-[0_0_18px_rgba(219,177,85,0.55)] active:scale-[0.98] transition-all duration-200"
          >
            Back to Home <ArrowIcon />
          </a>
        </Card>
      </div>
    )
  }

  // ─── Failed state ───
  if (step === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-body px-4">
        <Card className="p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <span className="text-red-400 text-2xl">✕</span>
          </div>
          <h2 className="font-heading text-red-400 text-2xl font-bold mb-4">Payment Declined</h2>
          <p className="text-cream-70 mb-6">{error || 'Your card was declined. Please try a different payment method.'}</p>
          <button
            onClick={() => { setStep('details'); setError('') }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm border border-gold/60 text-gold font-medium hover:border-gold hover:bg-gold-20 hover:shadow-[0_0_14px_rgba(219,177,85,0.3)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Try Again
          </button>
        </Card>
      </div>
    )
  }

  // ─── Processing state ───
  if (step === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-body px-4">
        <Card className="p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(219,177,85,0.15)', border: '1px solid rgba(219,177,85,0.3)' }}>
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="font-heading text-gold text-xl font-bold mb-3">Processing Payment</h2>
          <p className="text-cream-60 text-sm">Please don't close this window. This may take a moment...</p>
        </Card>
      </div>
    )
  }

  // ─── Checkout form ───
  return (
    <div className="min-h-screen bg-body text-cream">
      {/* Top bar */}
      <div className="border-b border-gold-20 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-gold text-lg leading-none" style={{ textShadow: '0 0 8px rgba(219,177,85,0.7)' }}>◈</span>
            <span className="font-heading font-bold text-lg text-gold" style={{ textShadow: '0 0 10px rgba(219,177,85,0.4)' }}>Arcade Tax Guide</span>
          </a>
          <div className="flex items-center gap-1.5 text-cream-50 text-xs font-nav">
            <LockIcon />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Left — Form (3 cols) */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <SectionLabel>Secure Payment</SectionLabel>
              <h1 className="font-heading text-gold text-2xl sm:text-3xl font-bold mt-4 mb-2">Complete Your Purchase</h1>
              <p className="text-cream-60 text-sm">All fields are required. Your payment is encrypted and secure.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-md border border-red-500/30 bg-red-900/20 text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <Card className="!p-5 sm:!p-6">
                <h3 className="font-heading text-cream font-bold text-lg mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">First Name</label>
                    <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="John" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">Last Name</label>
                    <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Smith" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">Email</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">Phone</label>
                    <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className={inputClasses} />
                  </div>
                </div>
              </Card>

              {/* Card details */}
              <Card className="!p-5 sm:!p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CardIcon />
                  <h3 className="font-heading text-cream font-bold text-lg">Payment Details</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">Cardholder Name</label>
                    <input name="holderName" required value={form.holderName} onChange={handleChange} placeholder="John Smith" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">Card Number</label>
                    <input
                      name="cardNumber"
                      required
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className={inputClasses + ' font-mono tracking-wider'}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">Expiry</label>
                      <input
                        name="expMonth"
                        required
                        value={form.expMonth}
                        onChange={handleChange}
                        placeholder="MM / YY"
                        maxLength={7}
                        className={inputClasses + ' font-mono'}
                      />
                    </div>
                    <div>
                      <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">CVC</label>
                      <input
                        name="cvc"
                        required
                        value={form.cvc}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={4}
                        className={inputClasses + ' font-mono'}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Billing address */}
              <Card className="!p-5 sm:!p-6">
                <h3 className="font-heading text-cream font-bold text-lg mb-4">Billing Address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">Street Address</label>
                    <input name="address" required value={form.address} onChange={handleChange} placeholder="123 Main St" className={inputClasses} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">City</label>
                      <input name="city" required value={form.city} onChange={handleChange} placeholder="New York" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">State</label>
                      <input name="state" required value={form.state} onChange={handleChange} placeholder="NY" className={inputClasses} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">ZIP Code</label>
                      <input name="zip" required value={form.zip} onChange={handleChange} placeholder="10001" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-cream-60 text-xs font-nav uppercase tracking-wider mb-1">Country</label>
                      <select name="country" value={form.country} onChange={handleChange} className={inputClasses + ' bg-body'}>
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
              </Card>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !SWISSPAY_PK}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm text-lg bg-gold text-dark font-bold hover:bg-gold/90 hover:shadow-[0_0_24px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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

              <div className="flex items-center justify-center gap-4 text-cream-40 text-xs">
                <span className="flex items-center gap-1"><LockIcon /> 256-bit SSL</span>
                <span>•</span>
                <span>PCI Compliant</span>
                <span>•</span>
                <span>Powered by SwissPay</span>
              </div>
            </form>
          </div>

          {/* Right — Order summary (2 cols) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <SectionLabel>Order Summary</SectionLabel>
              <Card className="mt-4 !p-5 sm:!p-6">
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
                    <span
                      className="text-gold font-mono font-bold text-2xl"
                      style={{ textShadow: '0 0 12px rgba(219,177,85,0.5)' }}
                    >
                      {product.priceDisplay}
                    </span>
                  </div>
                </div>
              </Card>

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

              {/* Disclaimer */}
              <p className="mt-4 text-cream-40 text-[11px] leading-relaxed px-2">
                By completing this purchase you agree to the terms of service. Tax strategy consultations are for informational purposes and do not constitute tax advice. Consult your CPA before making tax-related decisions.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gold-20 py-8 px-4 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cream-50 text-sm mb-1">© {new Date().getFullYear()} Arcade Tax Guide. All rights reserved.</p>
          <p className="text-xs text-cream-40">Not tax advice. Consult your CPA.</p>
        </div>
      </footer>
    </div>
  )
}
