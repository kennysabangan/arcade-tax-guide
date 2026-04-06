import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SectionWrapper, Card, Accordion } from '../components/Layout'

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

function ArcadeLandingPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', mobile: '', filingStatus: '', income: '', taxOwed: '', liquidity: '', rothConversion: '', timeline: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Lead submitted:', formData)
    setSubmitted(true)
    setTimeout(() => navigate('/arcade/thank-you'), 1000)
  }

  const trustBullets = [
    '100% bonus depreciation strategy',
    'Revenue-producing arcade business',
    'Financing available on approved deals',
    'Designed for taxpayers earning $200,000+'
  ]

  const problems = [
    { title: 'High W2 Tax Exposure', icon: '💰' },
    { title: 'Roth Conversion Tax Spikes', icon: '📈' },
    { title: 'K-1 Income Surprises', icon: '📄' },
    { title: 'No Last-Minute Deductions', icon: '⏳' }
  ]

  const steps = [
    { title: 'Acquire the Asset', desc: '$25,000 down payment, financed balance, skill-based arcade machine.' },
    { title: 'Capture the Deduction', desc: 'Potential 100% first-year bonus depreciation once placed in service.' },
    { title: 'Generate Revenue', desc: 'Ongoing cash-flow business — not just a tax deduction.' }
  ]

  const personas = [
    'Dentists', 'Physicians', 'Attorneys', 'CPAs', 'Business Owners', 'Franchise Operators', 'Executives', 'Roth Conversion Clients'
  ]

  const faqs = [
    { q: 'How does financing work?', a: 'We work with preferred lenders who understand the arcade business model. Down payments start at $25,000 with competitive rates.' },
    { q: 'Does this create at-risk basis?', a: 'Yes. The down payment and your share of liabilities create basis, enabling deduction claims.' },
    { q: 'Can it offset Roth conversion tax?', a: 'Absolutely. The bonus depreciation deduction can directly offset the taxable income from a Roth conversion.' },
    { q: 'What management is required?', a: 'Placement into a revenue-share program with professional operators means minimal day-to-day involvement.' },
    { q: 'Is there an admin fee?', a: 'There is a $2,500 documentation and coordination fee included in the package.' }
  ]

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <Card className="p-8 max-w-2xl w-full text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckIcon />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You</h2>
          <p className="text-gray-700 mb-6">Your strategy review request has been submitted. Please pick a time below to complete your booking.</p>
          <iframe
            src="https://calendly.com/carmen-fastfundbusiness/arcade-tax-strategy-call"
            width="100%"
            height="700"
            frameBorder="0"
            className="rounded"
            title="Book your strategy call"
          />
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <a
          href="#lead-form"
          className="block w-full bg-[#1a5f45] text-white text-center font-bold py-4 rounded shadow-lg"
        >
          Book My Strategy Call
        </a>
      </div>

      {/* Hero */}
      <section className="pt-20 pb-24 px-5 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-800 text-xs font-semibold uppercase tracking-wide mb-6">
          Bonus Depreciation Strategy
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          $25,000 Down. $200,000 Deduction. Real Revenue Business.
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
          For high-income W2 earners, business owners, and Roth conversion taxpayers who need a 2026 bonus depreciation strategy that can create tax savings greater than the initial cash invested.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Bonus Depreciation</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">$25k</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Cash Needed</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">$200k</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Potential Deduction</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">$80k</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Est. Tax Savings</div>
          </div>
        </div>

        <a
          href="#lead-form"
          className="inline-block bg-[#1a5f45] hover:bg-[#144e3a] text-white font-bold py-4 px-10 rounded shadow-lg transition"
        >
          See If You Qualify
        </a>
      </section>

      {/* Problem */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Why High Earners Overpay in Taxes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {problems.map((p, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-lg text-gray-900">{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">How the Arcade Strategy Works</h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1a5f45] text-white flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Numbers */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Example Tax Savings</h2>
          <div className="bg-white rounded-xl border-2 border-green-200 p-8 max-w-xl mx-auto">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-gray-700">Asset acquisition</span>
                <span className="font-bold text-xl text-gray-900">$200,000</span>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-gray-700">Down payment</span>
                <span className="font-bold text-gray-900">$25,000</span>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-gray-700">Potential deduction (100%)</span>
                <span className="font-bold text-xl text-green-700">$200,000</span>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-gray-700">Combined tax bracket</span>
                <span className="font-bold text-xl text-gray-900">40%</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-lg text-gray-900">Estimated tax savings</span>
                <span className="font-bold text-3xl text-green-700">$80,000</span>
              </div>
            </div>
            <p className="mt-6 text-center text-gray-600 text-sm">
              Tax savings may exceed the day-one investment while leaving you with a revenue-producing business.
            </p>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Best Fit Clients</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {personas.map((p, i) => (
              <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Common Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Accordion key={i} title={faq.q}>
                <p className="text-gray-700">{faq.a}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">See If Your Tax Savings Could Exceed Your Investment</h2>
            <p className="text-gray-600 mb-8">Complete this brief questionnaire to qualify.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded p-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
                  <input name="mobile" type="tel" required value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 rounded p-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status *</label>
                  <select name="filingStatus" required value={formData.filingStatus} onChange={handleChange} className="w-full border border-gray-300 rounded p-3">
                    <option value="">Select...</option>
                    <option value="single">Single</option>
                    <option value="married-joint">Married Filing Jointly</option>
                    <option value="married-separate">Married Separate</option>
                    <option value="head">Head of Household</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timeline *</label>
                  <select name="timeline" required value={formData.timeline} onChange={handleChange} className="w-full border border-gray-300 rounded p-3">
                    <option value="">Select...</option>
                    <option value="30">Within 30 days</option>
                    <option value="90">Within 90 days</option>
                    <option value="180">Within 180 days</option>
                    <option value="exploring">Just Exploring</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated 2026 Income *</label>
                  <input name="income" type="text" required value={formData.income} onChange={handleChange} placeholder="$200,000+" className="w-full border border-gray-300 rounded p-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Tax Owed *</label>
                  <input name="taxOwed" type="text" required value={formData.taxOwed} onChange={handleChange} placeholder="$40,000+" className="w-full border border-gray-300 rounded p-3" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Liquidity ($25k+ required) *</label>
                <select name="liquidity" required value={formData.liquidity} onChange={handleChange} className="w-full border border-gray-300 rounded p-3">
                  <option value="">Select...</option>
                  <option value="25-50">$25k - $50k</option>
                  <option value="50-100">$50k - $100k</option>
                  <option value="100-250">$100k - $250k</option>
                  <option value="250+">$250k+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roth Conversion Planned? *</label>
                <div className="flex gap-6 mt-2">
                  <label className="inline-flex items-center">
                    <input type="radio" name="rothConversion" value="yes" required checked={formData.rothConversion === 'yes'} onChange={handleChange} className="form-radio" />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="rothConversion" value="no" required checked={formData.rothConversion === 'no'} onChange={handleChange} className="form-radio" />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a5f45] hover:bg-[#144e3a] text-white font-bold py-4 rounded shadow-lg transition"
              >
                Book My Strategy Review
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to our terms. We respect your privacy.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400 mb-4">© 2026 Fast Fund Business. All rights reserved.</p>
          <p className="text-sm text-gray-500">Not tax advice. Consult your CPA.</p>
        </div>
      </footer>
    </div>
  )
}

export default ArcadeLandingPage
