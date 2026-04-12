import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SectionLabel, SectionWrapper, Card, Accordion, StatBox, CTAButton } from '../components/Layout'

function ArrowIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}


// ─── Sticky Mobile CTA ───
function StickyMobileCTA() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <a
      href="#lead-form"
      className={`fixed bottom-6 right-6 z-40 px-5 py-2 bg-gold text-dark font-semibold text-sm rounded-full shadow-lg cursor-pointer hover:bg-gold/90 hover:shadow-[0_0_20px_rgba(219,177,85,0.5)] active:scale-95 transition-all duration-200 md:hidden ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      Book My Strategy Call
    </a>
  )
}

function ArcadeLandingPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', mobile: '', filingStatus: '', income: '', taxOwed: '', liquidity: '', urgency: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const [referralRef, setReferralRef] = useState('');
  useEffect(() => {
    // Get ref from URL or sessionStorage
    const urlRef = searchParams.get('ref');
    const storedRef = sessionStorage.getItem('arcadeRef');
    const finalRef = urlRef || storedRef;
    if (finalRef) {
      setReferralRef(finalRef);
      sessionStorage.setItem('arcadeRef', finalRef);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Compute lead score (0-3)
    const computeLeadScore = () => {
  let score = 0;
  const income = parseFloat(String(formData.income).replace(/[^0-9.]/g, '')) || 0;
  if (income > 200000) score++;
  if (formData.liquidity) score++;
  if (formData.urgency && formData.urgency.toLowerCase().includes('30 days')) score++;
  return score;
};
const leadScore = computeLeadScore();
    try {
      const gaClientId = (() => {
        const match = document.cookie.match(/_ga=GA\d+\.\d+\.(\d+\.\d+)/)
        return match ? match[1] : undefined
      })()
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(gaClientId && { 'X-GA-Client-ID': gaClientId })
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.mobile,
          source: referralRef || (window.location.pathname === '/' ? 'Arcade Home Page' : 'Arcade Funnel Page'),
          ref: referralRef,
          customFields: [
            { id: '2SUP1cLPoUkecnIj0fNh', value: String(formData.filingStatus) },
            { id: 'xtYbdtKV2GB7KFBMZIJj', value: String(formData.income) },
            { id: 'iYCMxRDLqgbQaIYiGoCk', value: String(formData.taxOwed) },
            { id: '8DLGn4gzV3BLqRWbt0DP', value: String(formData.liquidity) },
            { id: 'eBxzRtzSfo3UjBknVHkT', value: String(formData.urgency) },
            { id: '1NdH5nTE1us9KEkfJFMi', value: leadScore },
          ],
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      // GA4 conversion event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'lead',
          event_label: 'arcade_landing_page',
          value: 1,
        })
      }
      // Meta Pixel Lead event
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', { content_name: 'arcade_landing_page' })
      }
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const trustBullets = [
    { label: 'Bonus Depr.', value: '100%' },
    { label: 'Cash Needed', value: '$25k' },
    { label: 'Potential Deduction', value: '$200k' },
    { label: 'Est. Tax Savings', value: '$80k' },
  ]

  const problems = [
    { title: 'High W2 Tax Exposure', icon: '💰' },
    { title: 'Roth Conversion Tax Spikes', icon: '📈' },
    { title: 'K-1 Income Surprises', icon: '📄' },
    { title: 'No Last-Minute Deductions', icon: '⏳' },
  ]

  const steps = [
    { title: 'Acquire the Asset', desc: '$25,000 down payment, financed balance, skill-based arcade machine.' },
    { title: 'Capture the Deduction', desc: 'Potential 100% first-year bonus depreciation once placed in service.' },
    { title: 'Generate Revenue', desc: 'Ongoing cash-flow business — not just a tax deduction.' },
  ]

  const personas = [
    'Dentists', 'Physicians', 'Attorneys', 'CPAs', 'Business Owners', 'Franchise Operators', 'Executives', 'Roth Conversion Clients',
  ]

  const faqs = [
    { q: 'How does financing work?', a: 'We work with preferred lenders who understand the arcade business model. Down payments start at $25,000 with competitive rates.' },
    { q: 'Does this create at-risk basis?', a: 'Yes. The down payment and your share of liabilities create basis, enabling deduction claims.' },
    { q: 'Can it offset Roth conversion tax?', a: 'Absolutely. The bonus depreciation deduction can directly offset the taxable income from a Roth conversion.' },
    { q: 'What management is required?', a: 'Placement into a revenue-share program with professional operators means minimal day-to-day involvement.' },
    { q: 'Is there an admin fee?', a: 'There is a $2,500 documentation and coordination fee included in the package.' },
  ]

  const inputClasses = 'w-full bg-body border border-card-border rounded-md px-4 py-3 text-cream placeholder-cream-40 focus:border-gold focus:outline-none transition-colors'

  // ─── Submitted view ───
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-body px-4">
        <Card className="p-8 max-w-2xl w-full text-center">
          <div className="w-16 h-16 mx-auto bg-gold-20/20 rounded-full flex items-center justify-center mb-6">
            <CheckIcon />
          </div>
          <h2 className="font-heading text-gold text-2xl font-bold mb-4">Thank You</h2>
          <p className="text-cream-70 mb-6">
            Your strategy review request has been submitted. We'll review your information and contact you shortly to schedule your call.
          </p>
          <p className="text-cream-70 mb-6">
            If you'd like to expedite the process, you can book a call directly:
          </p>
          <a
            href="https://calendly.com/carmen-fastfundbusiness/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-sm text-lg bg-gold text-dark font-bold hover:bg-gold/90"
          >
            Book a Call Now
          </a>
        </Card>
      </div>
    )
  }

  const inputStyles = {
    background: 'var(--color-body)',
    border: '1px solid var(--color-card-border)',
    color: 'var(--color-cream)',
  }

  return (
    <div className="min-h-screen bg-body text-cream">
      <StickyMobileCTA />

      {/* Hero */}
      <section className="relative flex flex-col overflow-x-hidden min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh]">
        {/* Announcement Bar */}
        <div className="relative z-30 w-full py-3 sm:py-4" style={{ background: '#1a5f45', borderBottom: '2px solid rgba(219,177,85,0.3)' }}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-heading font-bold text-base sm:text-xl md:text-xl text-white">
              BONUS DEPRECIATION STRATEGY FOR QUALIFIED TAXPAYERS
            </p>
            <p className="text-xs sm:text-xs mt-1 text-green-100">
              Turn a $25,000 Down Payment Into a $200,000 Tax Deduction — Plus a Real Revenue Business
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-body" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.4) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 75% 60% at 50% 45%, rgba(26,95,69,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative z-20 flex-1 flex flex-row items-stretch px-5 py-4 sm:py-6 landscape:py-2 gap-8 max-w-6xl mx-auto">
          <div className="flex-1 max-w-xl order-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 landscape:px-2 landscape:py-0.5 rounded-sm border border-green-700/30 bg-green-900/20 mt-4 mb-8 sm:mb-10 lg:mb-12 landscape:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.8)' }} />
              <span className="text-green-400 text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] font-nav whitespace-nowrap">
                IRC Section 168(k) Bonus Depreciation
              </span>
            </div>

            <h1 className="font-heading font-bold leading-[1.1] mb-4 sm:mb-6 lg:mb-8 landscape:mb-2 landscape:text-xl text-2xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">
              <span className="block text-cream-warm">$25,000 Down.</span>
              <span className="block">
                <span className="text-gold neon-gold">$200,000 Deduction.</span>
              </span>
              <span className="block text-cream-warm">Real Revenue Business.</span>
            </h1>

            <p className="text-cream-70 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-lg landscape:text-lg max-w-md sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl landscape:mb-2 leading-relaxed">
              For high-income W2 earners, business owners, and Roth conversion taxpayers who need a 2026 bonus depreciation strategy that can create tax savings greater than the initial cash invested.
            </p>

            <div className="mt-6 sm:mt-10 lg:mt-12 mb-6 sm:mb-10 lg:mb-14 landscape:mt-6 landscape:mb-6" style={{ flexBasis: 'auto' }}>
              <div className="mb-2 sm:mb-3 lg:mb-4 landscape:mb-2">
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center px-8 sm:px-12 lg:px-12 xl:px-14 2xl:px-14 py-2.5 sm:py-3 lg:py-3 xl:py-3 2xl:py-3 text-base sm:text-lg lg:text-base xl:text-lg landscape:text-lg landscape:px-6 landscape:py-3 font-heading font-bold rounded-sm bg-gold text-dark hover:bg-gold/90 hover:shadow-[0_0_32px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200"
                >
                  See If You Qualify
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl sm:max-w-4xl lg:max-w-6xl" style={{ flexBasis: 'auto' }}>
                {trustBullets.map((s, i) => (
                  <StatBox key={i} label={s.label} value={s.value} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-[200px] sm:max-w-[280px] flex justify-center items-center order-2" style={{ flexBasis: 'auto' }}>
            <img src="/images/arcade-machine.jpg" alt="Arcade Machine" className="w-full h-full object-contain" />
          </div>
        </div>
      </section>

      {/* Problem — alternating bg */}
      <div style={{ background: 'rgba(13,13,18,0.5)' }}>
        <SectionWrapper>
          <div className="text-center mb-6">
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">Why High Earners Overpay in Taxes</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {problems.map((p, i) => (
              <Card key={i} className="hover:bg-card-bg/80 transition-colors text-center">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{p.icon}</div>
                <h3 className="font-heading text-cream font-bold text-sm sm:text-lg">{p.title}</h3>
              </Card>
            ))}
          </div>
        </SectionWrapper>
      </div>

      {/* Solution */}
      <SectionWrapper>
        <div className="text-center mb-6">
          <SectionLabel>The Strategy</SectionLabel>
          <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-10">How the Arcade Strategy Works</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-gold"
                style={{
                  background: 'rgba(219,177,85,0.1)',
                  border: '1px solid rgba(219,177,85,0.3)',
                }}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="font-heading text-cream font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-cream-70 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Example Numbers — alternating bg */}
      <div style={{ background: 'rgba(13,13,18,0.5)' }}>
        <SectionWrapper>
          <div className="text-center mb-6">
            <SectionLabel>The Math</SectionLabel>
            <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-10">Example Tax Savings Breakdown</h2>
          </div>
          <div className="max-w-xl mx-auto">
            <Card>
              <div
                className="rounded-lg ring-1 ring-gold-20/30 p-6 sm:p-8"
                style={{ boxShadow: '0 0 60px rgba(219,177,85,0.08), 0 0 120px rgba(219,177,85,0.04)' }}
              >
                <div className="space-y-6">
                  {[
                    { label: 'Asset acquisition', value: '$200,000' },
                    { label: 'Down payment', value: '$25,000' },
                    { label: 'Potential deduction (100%)', value: '$200,000', highlight: true },
                    { label: 'Combined tax bracket', value: '40%' },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-card-border pb-4">
                      <span className="text-cream-70">{row.label}</span>
                      <span
                        className={`font-mono font-bold text-xl ${row.highlight ? 'text-gold neon-gold' : 'text-cream'}`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-cream font-bold text-lg">Estimated tax savings</span>
                    <span
                      className="font-mono font-bold text-3xl text-gold"
                      style={{ textShadow: '0 0 16px rgba(219,177,85,0.6)' }}
                    >
                      $80,000
                    </span>
                  </div>
                </div>
                <p className="mt-6 text-center text-cream-50 text-sm leading-relaxed">
                  Tax savings may exceed the day-one cash investment while leaving the client with a revenue-producing business.
                </p>
              </div>

              {/* CTA after example math */}
              <div className="mt-8 text-center">
                <a
                  href="#lead-form"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-sm text-base bg-gold text-dark font-bold hover:bg-gold/90 hover:shadow-[0_0_32px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200"
                >
                  See If You Qualify <ArrowIcon />
                </a>
              </div>
            </Card>
          </div>
        </SectionWrapper>
      </div>

      {/* Personas */}
      <SectionWrapper>
        <div className="text-center mb-6">
          <SectionLabel>Who This Is For</SectionLabel>
          <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-8">Best Fit Clients</h2>
        </div>
        <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
          {personas.map((p, i) => (
            <span
              key={i}
              className="px-5 py-2.5 rounded-full text-cream font-medium text-sm"
              style={{
                background: 'rgba(219,177,85,0.06)',
                border: '1px solid rgba(219,177,85,0.2)',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ — alternating bg */}
      <div style={{ background: 'rgba(13,13,18,0.5)' }}>
        <SectionWrapper>
          <div className="text-center mb-6">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-8">Common Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <Accordion key={i} title={faq.q}>
                <p className="text-cream-70">{faq.a}</p>
              </Accordion>
            ))}
          </div>

          {/* CTA after FAQ */}
          <div className="mt-10 text-center">
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-sm text-base bg-gold text-dark font-bold hover:bg-gold/90 hover:shadow-[0_0_32px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200"
            >
              Book My Strategy Review <ArrowIcon />
            </a>
          </div>
        </SectionWrapper>
      </div>

      {/* Lead Form */}
      <section id="lead-form" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <SectionLabel>Take Action</SectionLabel>
            <h2 className="font-heading text-gold text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 mb-3">
              See If Your Tax Savings Could Exceed Your Investment
            </h2>
            <p className="text-cream-70 text-base max-w-xl mx-auto">
              Complete this brief questionnaire to qualify for your strategy review.
            </p>
          </div>

          <Card>
            <div
              className="rounded-lg ring-1 ring-gold-20/30 p-6 sm:p-10"
              style={{ boxShadow: '0 0 60px rgba(219,177,85,0.08), 0 0 120px rgba(219,177,85,0.04)' }}
            >
              {error && (
                <div className="mb-6 p-4 rounded-md border border-red-500/30 bg-red-900/20 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">First Name *</label>
                    <input name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="John" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Last Name *</label>
                    <input name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Smith" className={inputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Email *</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Mobile *</label>
                    <input name="mobile" type="tel" required value={formData.mobile} onChange={handleChange} placeholder="(555) 123-4567" className={inputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Filing Status *</label>
                    <select name="filingStatus" required value={formData.filingStatus} onChange={handleChange} className={inputClasses + ' bg-body'} style={inputStyles}>
                      <option value="">Select...</option>
                      <option value="Single">Single</option>
                      <option value="Married Filing Joint">Married Filing Joint</option>
                      <option value="Married Filing Separate">Married Filing Separate</option>
                      <option value="Head of Household">Head of Household</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">WHEN YOU'D LIKE THIS DONE *</label>
                    <select name="urgency" required value={formData.urgency} onChange={handleChange} className={inputClasses + ' bg-body'} style={inputStyles}>
                      <option value="">Select...</option>
                      <option value="Within 30 days">Within 30 days</option>
                      <option value="Within 90 days">Within 90 days</option>
                      <option value="Within 180 days">Within 180 days</option>
                      <option value="Just Exploring">Just Exploring</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Estimated 2026 Income *</label>
                    <input name="income" type="text" required value={formData.income} onChange={handleChange} placeholder="$200,000+" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Estimated Tax Owed *</label>
                    <input name="taxOwed" type="text" required value={formData.taxOwed} onChange={handleChange} placeholder="$40,000+" className={inputClasses} />
                  </div>
                </div>

                <div>
                  <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Available Liquidity ($25k+ required) *</label>
                  <select name="liquidity" required value={formData.liquidity} onChange={handleChange} className={inputClasses + ' bg-body'} style={inputStyles}>
                    <option value="">Select...</option>
                    <option value="25-50">$25k - $50k</option>
                    <option value="50-100">$50k - $100k</option>
                    <option value="100-250">$100k - $250k</option>
                    <option value="250+">$250k+</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm text-lg bg-gold text-dark font-bold hover:bg-gold/90 hover:shadow-[0_0_24px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Book My Strategy Review'}
                </button>

                <p className="text-cream-40 text-xs text-center">Your information is kept private and secure.</p>
              </form>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA — alternating bg */}
      <div style={{ background: 'rgba(13,13,18,0.5)' }}>
        <SectionWrapper>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gold font-heading text-2xl sm:text-3xl font-bold mb-4">
              You now understand the strategy. The numbers work. The tax code is on your side.
            </p>
            <p className="text-cream-70 text-base sm:text-lg leading-relaxed mb-8">
              Most people overpay in taxes because nobody showed them what's possible. You've seen the math — a $25K investment that can eliminate six figures in tax liability and put a real business in your name. The only question left is whether you want to be the one who took action or the one who wished they had.
            </p>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center px-8 sm:px-12 py-2.5 sm:py-4 text-lg sm:text-2xl font-heading font-bold rounded-sm bg-gold text-dark hover:bg-gold/90 hover:shadow-[0_0_32px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200"
            >
              Book Discovery Call Now
            </a>
            <p className="text-cream-50 text-sm mt-4">No commitment. Just a conversation about your situation.</p>
          </div>
        </SectionWrapper>
      </div>

      {/* Footer */}
      <footer className="border-t border-gold-20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cream-50 text-sm mb-2">© {new Date().getFullYear()} Arcade Tax Guide. All rights reserved.</p>
          <p className="text-xs text-cream-40">Not tax advice. Consult your CPA.</p>
        </div>
      </footer>
    </div>
  )
}

export default ArcadeLandingPage
