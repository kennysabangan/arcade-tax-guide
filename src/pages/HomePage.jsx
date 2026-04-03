import { SectionLabel, SectionWrapper, Card, CTAButton, StatBox, Accordion } from '../components/Layout'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ─── Hero ───
function Hero() {
  const stats = [
    { label: 'Bonus Depr.', value: '100%' },
    { label: 'Leverage', value: '8x' },
    { label: 'Initial Investment', value: '$25k' },
  ]

  return (
    <section className="relative flex flex-col overflow-x-hidden pt-16 min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh]">
      {/* Announcement Bar */}
      <div className="relative z-30 w-full py-3 sm:py-4" style={{ background: '#1a1a2e', borderBottom: '2px solid #dbb155' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-heading font-bold text-base sm:text-xl md:text-xl" style={{ color: '#dbb155' }}>
            UNCLE SAM WANTS YOU TO USE YOUR TAX DOLLARS TO OWN A BUSINESS!
          </p>
          <p className="text-xs sm:text-xs mt-1" style={{ color: '#dbb155' }}>
            Eliminate/Minimize Your Taxes By Investing In A Revenue Producing Business — After Tax Savings, The Business Is Owned For Net Zero Cash
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
        style={{ background: 'radial-gradient(ellipse 75% 60% at 50% 45%, rgba(219,177,85,0.1) 0%, transparent 70%)' }}
      />
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-5 py-4 sm:py-6 landscape:py-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 landscape:px-2 landscape:py-0.5 rounded-sm border border-gold-20 bg-gold-20/10 mt-4 mb-8 sm:mb-10 lg:mb-12 landscape:mb-4 neon-border-gold">
          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(219,177,85,0.8)' }} />
          <span className="text-gold text-[10px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] font-nav whitespace-nowrap">
            IRC Section 168(k) Tax Strategy
          </span>
        </div>

        <h1 className="font-heading font-bold leading-[1.1] mb-4 sm:mb-6 lg:mb-8 landscape:mb-2 landscape:!text-[clamp(1.25rem,4vw,3rem)]" style={{ fontSize: 'clamp(2rem, 6vw, 7rem)' }}>
          <span className="block">
            <span className="text-cream-warm">Qualifying </span>
            <span className="text-gold neon-gold">Arcade Games</span>
          </span>
          <span className="block">
            <span className="text-cream-warm">for </span>
            <span className="text-gold neon-gold">Bonus Depreciation</span>
          </span>
        </h1>

        <p className="text-cream-70 text-sm sm:text-lg lg:text-[2.2rem] xl:text-[2.5rem] 2xl:text-[2.8rem] landscape:text-sm max-w-xs sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto mb-4 sm:mb-8 lg:mb-10 landscape:mb-2 leading-relaxed">
          A comprehensive guide to leveraging arcade games as qualifying business assets under the Internal Revenue Code,
          including the permanent{' '}
          <span className="text-gold font-semibold">100% bonus depreciation</span>{' '}
          restored by the One Big Beautiful Bill Act.
        </p>

        <div className="mb-4 sm:mb-8 lg:mb-14 lg:mt-6 landscape:mb-2">
          <CTAButton
            href="#book-a-call"
            className="inline-flex items-center justify-center px-10 sm:px-12 lg:px-20 xl:px-24 2xl:px-28 py-4 sm:py-4 lg:py-6 xl:py-7 2xl:py-8 text-xl sm:text-xl lg:text-[1.6rem] xl:text-[1.8rem] 2xl:text-[2rem] landscape:text-sm landscape:px-4 landscape:py-2 font-heading font-bold rounded-sm bg-gold text-dark hover:bg-gold/90 hover:shadow-[0_0_32px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200"
          >
            Book My Discovery Call Now
          </CTAButton>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-8 lg:mb-10 landscape:mb-2">
          <CTAButton to="/tax-guide" variant="outline" className="text-xs sm:text-sm lg:text-[1.1rem] xl:text-[1.3rem] 2xl:text-[1.5rem] landscape:text-xs landscape:px-2 landscape:py-1.5 px-2.5 sm:px-4 lg:px-10 xl:px-12 2xl:px-14 py-1.5 sm:py-2 lg:py-4 xl:py-5 2xl:py-6">Explore the Tax Guide</CTAButton>
          <CTAButton to="/retirement" variant="outline" className="text-xs sm:text-sm lg:text-[1.1rem] xl:text-[1.3rem] 2xl:text-[1.5rem] landscape:text-xs landscape:px-2 landscape:py-1.5 px-2.5 sm:px-4 lg:px-10 xl:px-12 2xl:px-14 py-1.5 sm:py-2 lg:py-4 xl:py-5 2xl:py-6">Retire with Arcade Games</CTAButton>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-10 lg:gap-16 border-t border-gold-20 pt-2 sm:pt-3 lg:pt-4 lg:mt-8 w-full max-w-xs sm:max-w-sm lg:max-w-lg">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="font-bold text-xl sm:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl landscape:text-sm leading-none mb-1"
                style={{ color: '#dbb155', textShadow: '0 0 10px rgba(219,177,85,0.5)' }}
              >
                {s.value}
              </div>
              <div className="text-cream-50 text-[10px] sm:text-xs lg:text-xs xl:text-sm 2xl:text-base uppercase tracking-wider font-nav">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-20 mt-6 sm:mt-10">
        <Ticker />
      </div>
    </section>
  )
}

// ─── Ticker ───
const TICKER_DATA = [
  { label: 'Bonus Depreciation', value: '100%' },
  { label: 'Post-OBBBA', value: 'Permanent' },
  { label: 'MACRS Recovery', value: '7-Year' },
  { label: 'Asset Class', value: '79.0' },
  { label: 'Business Use Required', value: '>50%' },
  { label: 'IRC Section', value: '168(k)' },
  { label: 'Qualified Property', value: 'Listed' },
  { label: 'Depreciation Method', value: '200% DB' },
  { label: 'ADS Recovery', value: '10-Year' },
  { label: 'Down Payment', value: '10%' },
]
const TICKER_ITEMS = [...TICKER_DATA, ...TICKER_DATA]

function Ticker() {
  return (
    <div
      className="relative overflow-hidden border-y py-3"
      style={{
        borderColor: 'rgba(219,177,85,0.25)',
        background: 'linear-gradient(90deg, rgba(219,177,85,0.06) 0%, rgba(0,255,209,0.04) 50%, rgba(219,177,85,0.06) 100%)',
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--color-body), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--color-body), transparent)' }} />
      <div className="ticker-track">
        {TICKER_ITEMS.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 whitespace-nowrap">
            <span className="text-gold opacity-50 text-xs" style={{ textShadow: '0 0 6px rgba(219,177,85,0.6)' }}>◆</span>
            <span className="text-cream-50 text-xs uppercase tracking-widest font-nav">{item.label}</span>
            <span className="text-gold text-sm font-bold font-mono" style={{ textShadow: '0 0 8px rgba(219,177,85,0.6)' }}>{item.value}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Overview ───
function Overview() {
  return (
    <SectionWrapper>
      <div className="text-center mb-6">
        <SectionLabel>Overview</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">Turning Play into Tax Strategy</h2>
        <p className="text-cream-70 text-base max-w-3xl mx-auto leading-relaxed">
          The Internal Revenue Code offers several incentives to encourage business investment, one of the most significant
          being the additional first-year depreciation deduction, commonly known as bonus depreciation, codified under
          Section 168(k). This provision allows businesses to immediately deduct a substantial percentage of the cost of
          qualifying assets in the year they are placed in service, rather than depreciating them over their useful life.
        </p>
        <p className="text-cream-60 text-base max-w-3xl mx-auto leading-relaxed mt-4">
          Arcade games and coin-operated amusement devices qualify as tangible personal property under MACRS Asset Class
          79.0 (Recreation), with a 7-year recovery period. When used in a trade or business, these assets are eligible
          for 100% bonus depreciation under the One Big Beautiful Bill Act, allowing the full cost to be deducted in the
          first year.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox label="Bonus Depreciation" value="100%" sublabel="Post-OBBBA" />
        <StatBox label="MACRS Recovery" value="7-Year" sublabel="Asset Class 79.0" />
        <StatBox label="Business Use Required" value=">50%" sublabel="Listed Property" />
        <StatBox label="IRC Section" value="168(k)" sublabel="Qualified Property" />
      </div>
    </SectionWrapper>
  )
}

// ─── Savings CTA ───
function SavingsCTA() {
  return (
    <SectionWrapper>
      <div className="text-center mb-6">
        <SectionLabel>Real Numbers</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">See What This Looks Like In Practice</h2>
        <p className="text-cream-70 text-base max-w-3xl mx-auto leading-relaxed">
          A taxpayer earning $215,000 of W-2 income may owe approximately $40,334 as a single filer or $29,640 married filing jointly. By acquiring a qualified arcade business asset with only a $25,000 down payment, the strategy can generate a $200,000 first-year bonus depreciation deduction that may reduce federal tax liability to zero. In many cases, the tax savings alone exceed the initial cash investment, allowing the client to own a real income-producing business while creating immediate positive cash flow.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton to="/financials" className="inline-flex items-center justify-center px-8 py-3 text-base sm:text-lg font-heading font-bold rounded-sm bg-gold text-dark hover:bg-gold/90 hover:shadow-[0_0_32px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200">
            See Savings Example
          </CTAButton>
          <CTAButton href="#book-a-call" className="inline-flex items-center justify-center px-8 py-3 text-base sm:text-lg font-heading font-bold rounded-sm bg-gold text-dark hover:bg-gold/90 hover:shadow-[0_0_32px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200">
            Book Discovery Call Now
          </CTAButton>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ─── Gallery ───
const GALLERY = [
  { src: '/images/arcade-closeup.png', alt: 'Commercial arcade game machine close-up view showing touchscreen display and bill acceptor' },
  { src: '/images/arcade-restaurant.png', alt: 'Arcade game machines deployed in a restaurant business setting' },
  { src: '/images/arcade-business.png', alt: 'Arcade games in a commercial entertainment venue' },
]

function Gallery() {
  return (
    <SectionWrapper>
      <div className="text-center mb-10">
        <SectionLabel>Real-World Deployments</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4">Commercial-Grade Arcade Games in Action</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GALLERY.map((img, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg border border-card-border group">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-[28rem] sm:h-[32rem] object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-body/80 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-cream-70 text-sm">{[
              "Premium touchscreen units with integrated bill acceptors",
              "Deployed in high-traffic restaurant locations",
              "Generating consistent revenue in entertainment venues",
            ][i]}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

// ─── FAQ ───
const FAQ_DATA = [
  { category: 'Eligibility', question: 'Can I claim bonus depreciation if I\'m self-employed?', answer: 'Yes. Self-employed individuals who use an arcade game in their trade or business can claim bonus depreciation. The key requirement is that the game is used in a legitimate trade or business activity, not a hobby, and that business use exceeds 50%.' },
  { category: 'Eligibility', question: 'Does the arcade game have to be brand new to qualify?', answer: 'No. Both new and used property qualify for bonus depreciation under the TCJA and OBBBA, provided the used property was not previously used by the taxpayer or a related party.' },
  { category: 'Eligibility', question: 'What types of arcade games qualify?', answer: 'Coin-operated amusement devices including video arcade games, pinball machines, and similar entertainment equipment fall under MACRS Asset Class 79.0 (Recreation) and qualify for bonus depreciation when used in a trade or business.' },
  { category: 'Business Use', question: 'How do I prove business use exceeds 50%?', answer: 'You must maintain contemporaneous records documenting each use of the property, including the date, duration, and business purpose. For games in a business location during business hours, the availability for business use during those hours generally counts as business use.' },
  { category: 'Business Use', question: 'What happens if business use drops below 50% in a later year?', answer: 'If business use falls to 50% or below during the MACRS recovery period, you must recapture the excess depreciation previously claimed as ordinary income and switch to the Alternative Depreciation System (ADS) with straight-line depreciation for the remaining recovery period.' },
  { category: 'Business Use', question: 'Can I place the arcade game in my home office?', answer: 'Potentially, if the home office is used regularly and exclusively for business and the game serves a legitimate business purpose in that context. However, this may attract additional scrutiny, so thorough documentation is essential.' },
  { category: 'Tax Strategy', question: 'Can I use Section 179 instead of bonus depreciation?', answer: 'Yes. Section 179 also allows immediate expensing of qualifying assets. However, Section 179 has annual dollar limits and cannot create a net operating loss, while bonus depreciation has no dollar cap and can create an NOL. Many taxpayers use bonus depreciation for these reasons.' },
  { category: 'Tax Strategy', question: 'Can bonus depreciation create a net operating loss (NOL)?', answer: 'Yes. Unlike Section 179, bonus depreciation can create or increase a net operating loss. Under current law, NOLs can be carried forward indefinitely and can offset up to 80% of taxable income in future years.' },
  { category: 'Tax Strategy', question: 'Is the 100% bonus depreciation permanent under the OBBBA?', answer: 'Yes. The One Big Beautiful Bill Act of 2025 restored 100% bonus depreciation for property acquired and placed in service after January 19, 2025, and made this rate permanent, eliminating the phase-down schedule from the original TCJA.' },
  { category: 'Financing', question: 'Can I claim the full deduction even if I finance the purchase?', answer: 'Yes. You can claim bonus depreciation on the full purchase price of the asset regardless of how it is financed. Whether you pay cash, take out a loan, or use seller financing, the full cost is eligible for the deduction.' },
  { category: 'Financing', question: 'Does the interest rate on financing affect the depreciation deduction?', answer: 'No. The depreciation deduction is based on the cost basis of the asset, not the financing terms. However, the interest on a business loan used to purchase the asset may be separately deductible as a business expense.' },
  { category: 'Compliance', question: 'What records do I need to keep?', answer: 'For listed property, you must keep contemporaneous records of: the amount of each business and personal use, the date of each use, and the business purpose. You should also retain purchase documentation, proof of payment, and records of the placed-in-service date.' },
  { category: 'Compliance', question: 'What happens if the game breaks down or needs repairs?', answer: 'Repair and maintenance costs for business property are generally deductible as ordinary business expenses under IRC § 162. A breakdown does not affect previously claimed depreciation, but the asset must remain in service to continue claiming depreciation.' },
  { category: 'Compliance', question: 'Will claiming bonus depreciation on an arcade game trigger an audit?', answer: 'Bonus depreciation on business assets is a routine and widely-used tax provision. Proper documentation and a legitimate business purpose are the best defenses. While no deduction is immune from audit scrutiny, a well-documented claim should withstand examination.' },
]

function FAQ() {
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...new Set(FAQ_DATA.map((f) => f.category))]
  const filtered = filter === 'All' ? FAQ_DATA : FAQ_DATA.filter((f) => f.category === filter)

  return (
    <SectionWrapper id="faq">
      <div className="text-center mb-6">
        <SectionLabel>Common Questions</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Frequently Asked Questions</h2>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                filter === cat
                  ? 'bg-gold text-dark border-gold font-semibold'
                  : 'border-card-border text-cream-60 hover:border-gold-dim hover:text-cream'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1 text-xs opacity-70">({FAQ_DATA.filter((f) => f.category === cat).length})</span>
              )}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <Accordion key={i} title={item.question}>
              <p>{item.answer}</p>
            </Accordion>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ─── Glossary ───
const GLOSSARY = [
  { term: 'Bonus Depreciation', category: 'Depreciation', definition: 'An additional first-year depreciation deduction under IRC § 168(k) that allows businesses to immediately deduct a percentage of the cost of qualifying assets in the year placed in service.' },
  { term: 'MACRS', category: 'Depreciation', definition: 'Modified Accelerated Cost Recovery System — the current tax depreciation system in the United States that assigns assets to classes with specified recovery periods.' },
  { term: 'Recovery Period', category: 'Depreciation', definition: 'The number of years over which an asset is depreciated under MACRS. Arcade games fall under the 7-year recovery period.' },
  { term: 'Asset Class 79.0', category: 'Classification', definition: 'The IRS asset classification for "Recreation" assets, which includes coin-operated amusement devices. Has a 10-year class life and 7-year GDS recovery period.' },
  { term: 'Listed Property', category: 'Classification', definition: 'A category of depreciable assets under IRC § 280F that are susceptible to personal use, requiring additional substantiation. Includes entertainment and amusement property.' },
  { term: 'Placed in Service', category: 'Tax Concepts', definition: 'The date when property is in a condition or state of readiness and availability for a specifically assigned function, whether in a trade or business or income-producing activity.' },
  { term: 'Trade or Business', category: 'Tax Concepts', definition: 'An activity carried on for profit with regularity and continuity. Must have a primary motive of income or profit to qualify for depreciation deductions.' },
  { term: 'Ordinary and Necessary', category: 'Tax Concepts', definition: 'The standard under IRC § 162 for deductible business expenses. An expense must be common and accepted in the trade or business and helpful and appropriate.' },
  { term: 'Section 179', category: 'Depreciation', definition: 'An IRC provision allowing immediate expensing of qualifying assets, subject to annual dollar limits. Unlike bonus depreciation, cannot create a net operating loss.' },
  { term: 'Net Operating Loss (NOL)', category: 'Tax Concepts', definition: 'Occurs when allowable tax deductions exceed taxable income. NOLs from bonus depreciation can be carried forward indefinitely to offset up to 80% of future taxable income.' },
  { term: 'TCJA', category: 'Legislation', definition: 'Tax Cuts and Jobs Act of 2017 — enhanced bonus depreciation to 100% for property acquired after September 27, 2017, and included used property for the first time.' },
  { term: 'OBBBA', category: 'Legislation', definition: 'One Big Beautiful Bill Act of 2025 — restored 100% bonus depreciation permanently for property acquired and placed in service after January 19, 2025.' },
  { term: 'GDS', category: 'Depreciation', definition: 'General Depreciation System — the default MACRS depreciation system using shorter recovery periods and accelerated methods (200% declining balance for most property).' },
  { term: 'ADS', category: 'Depreciation', definition: 'Alternative Depreciation System — uses longer recovery periods and straight-line depreciation. Required when listed property business use falls to 50% or below.' },
  { term: 'Recapture', category: 'Tax Concepts', definition: 'The requirement to include previously deducted depreciation as ordinary income when listed property business use drops to 50% or below, or when property is disposed of.' },
  { term: 'Contemporaneous Records', category: 'Compliance', definition: 'Records made at or near the time of the property use, as required by IRC § 274(d) for listed property substantiation.' },
  { term: 'Form 4562', category: 'Compliance', definition: 'IRS Form for Depreciation and Amortization — used to claim depreciation deductions including bonus depreciation and Section 179 expensing.' },
  { term: 'Depreciable Basis', category: 'Tax Concepts', definition: 'The cost of the asset eligible for depreciation, typically the purchase price adjusted for business use percentage.' },
  { term: 'Tangible Personal Property', category: 'Classification', definition: 'Physical property that can be touched and moved, as distinguished from real property. Arcade games qualify as tangible personal property.' },
  { term: 'Revenue Procedure 87-56', category: 'Compliance', definition: 'IRS guidance that establishes class lives and recovery periods for various types of assets, including the classification of coin-operated amusement devices.' },
]

function Glossary() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const categories = ['All', ...new Set(GLOSSARY.map((g) => g.category))]

  const filtered = GLOSSARY.filter((item) => {
    const matchSearch =
      search === '' ||
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'All' || item.category === catFilter
    return matchSearch && matchCat
  })

  return (
    <SectionWrapper id="glossary">
      <div className="text-center mb-6">
        <SectionLabel>Reference</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Glossary of Terms</h2>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-body border border-card-border rounded-md px-4 py-3 text-cream placeholder-cream-40 focus:border-gold focus:outline-none transition-colors"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                catFilter === cat
                  ? 'bg-gold text-dark border-gold font-semibold'
                  : 'border-card-border text-cream-60 hover:border-gold-dim hover:text-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-cream-50 text-sm mb-4">
          Showing {filtered.length} of {GLOSSARY.length} terms
        </div>
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <Accordion key={i} title={item.term}>
              <span className="inline-block px-2 py-0.5 text-xs bg-gold-20/20 text-gold rounded mb-2">{item.category}</span>
              <p>{item.definition}</p>
            </Accordion>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ─── CPA Email ───
function CPAEmail() {
  const [name, setName] = useState('')
  const [cpaName, setCpaName] = useState('')
  const [bizName, setBizName] = useState('')
  const [price, setPrice] = useState('200,000')
  const [copied, setCopied] = useState(false)

  const email = `Dear ${cpaName || '[CPA Name]'},

I hope this message finds you well. I am writing to discuss a potential tax strategy involving the purchase of commercial arcade games for ${bizName || '[Business Name]'}.

I am considering purchasing arcade game equipment with an estimated cost of $${price} to be used in my business. Based on my research, these assets may qualify for 100% bonus depreciation under IRC § 168(k) as restored by the One Big Beautiful Bill Act of 2025.

Key points I'd like to discuss:

1. Classification: Coin-operated amusement devices fall under MACRS Asset Class 79.0 (Recreation) with a 7-year recovery period.

2. Bonus Depreciation: The OBBBA permanently restored 100% first-year bonus depreciation for qualifying property acquired and placed in service after January 19, 2025.

3. Listed Property: As entertainment assets classified as listed property under IRC § 280F, business use must exceed 50% with contemporaneous record-keeping requirements.

4. Business Purpose: The games will be used for [customer experience enhancement / employee morale / direct revenue generation] at our business location.

I would appreciate your guidance on:
- Whether this strategy is appropriate for my specific tax situation
- The documentation and substantiation requirements I should prepare
- Any potential risks or considerations I should be aware of
- The optimal timing for the purchase relative to my tax year

Please let me know your availability to discuss this further.

Best regards,
${name || '[Your Name]'}`

  return (
    <SectionWrapper id="cpa-email">
      <div className="text-center mb-6">
        <SectionLabel>Take Action</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Email Your CPA</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          Use this customizable email template to start the conversation with your tax professional about arcade game bonus depreciation.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-cream font-semibold mb-4">Customize Your Email</h3>
          <div>
            <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Your Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" className="w-full bg-body border border-card-border rounded-md px-4 py-2.5 text-cream placeholder-cream-40 focus:border-gold focus:outline-none" />
          </div>
          <div>
            <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">CPA / Advisor Name</label>
            <input type="text" value={cpaName} onChange={(e) => setCpaName(e.target.value)} placeholder="Jane Doe, CPA" className="w-full bg-body border border-card-border rounded-md px-4 py-2.5 text-cream placeholder-cream-40 focus:border-gold focus:outline-none" />
          </div>
          <div>
            <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Business Name</label>
            <input type="text" value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="Acme Corp" className="w-full bg-body border border-card-border rounded-md px-4 py-2.5 text-cream placeholder-cream-40 focus:border-gold focus:outline-none" />
          </div>
          <div>
            <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Estimated Purchase Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-50">$</span>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-body border border-card-border rounded-md pl-8 pr-4 py-2.5 text-cream focus:border-gold focus:outline-none" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <CTAButton
              onClick={() => { navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              className="flex-1"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </CTAButton>
            <CTAButton
              onClick={() => { const body = encodeURIComponent(email); window.open(`mailto:?subject=Arcade%20Game%20Bonus%20Depreciation%20Strategy%20Discussion&body=${body}`) }}
              variant="outline"
              className="flex-1"
            >
              Open in Email
            </CTAButton>
          </div>
        </div>
        <div className="bg-card-bg border border-card-border rounded-lg p-5">
          <h3 className="text-cream font-semibold mb-4">Email Preview</h3>
          <pre className="text-cream-70 text-sm leading-relaxed whitespace-pre-wrap font-body">{email}</pre>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ─── Book a Call ───
function BookCall() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [income, setIncome] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const nameParts = name.trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const contactBody = {
      firstName,
      lastName,
      email,
      phone,
      customFields: [
        { id: 'anticipated_taxable_income', value: income },
      ],
    }

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactBody),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClasses = 'w-full bg-body border border-card-border rounded-md px-4 py-2.5 text-cream placeholder-cream-40 focus:border-gold focus:outline-none transition-colors'

  const offerStack = [
    { item: 'Custom Tax Savings Report', desc: 'personalized to your income bracket', value: '$500' },
    { item: 'Bonus Depreciation Calculator Walkthrough', desc: 'see your exact first-year deduction', value: '$250' },
    { item: 'Business Structure Review', desc: 'ensure you qualify under IRC § 168(k)', value: '$300' },
    { item: 'Documentation Checklist', desc: 'everything your CPA needs', value: '$150' },
    { item: 'Complete Implementation Roadmap', desc: 'step-by-step from purchase to filing', value: '$400' },
  ]

  return (
    <SectionWrapper id="book-a-call">
      <div className="max-w-3xl mx-auto">
        {submitted ? (
          <div className="bg-card-bg border border-card-border rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-gold-20/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-cream font-heading font-bold text-xl">Thank you! We'll be in touch shortly.</p>
          </div>
        ) : (
          <Card>
            <div
              className="rounded-lg ring-1 ring-gold-20/30 p-6 sm:p-10"
              style={{ boxShadow: '0 0 60px rgba(219,177,85,0.08), 0 0 120px rgba(219,177,85,0.04)' }}
            >
              {/* Urgency badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold bg-gold/10">
                  <span
                    className="w-2 h-2 rounded-full bg-gold flex-shrink-0 animate-pulse"
                    style={{ boxShadow: '0 0 8px rgba(219,177,85,0.9)' }}
                  />
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.15em] font-nav">
                    Limited Availability — Apply Now
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="font-heading font-bold text-center leading-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
                <span className="text-cream-warm">Get Your Free </span>
                <span className="text-gold neon-gold">Arcade Tax Strategy Blueprint</span>
              </h2>

              {/* Subheadline */}
              <p className="text-cream-70 text-center text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
                In this free 30-minute consultation, we'll walk you through exactly how much you could save with arcade game bonus depreciation — personalized to your income and business structure.
              </p>

              {/* Offer stack */}
              <div className="bg-body/60 border border-card-border rounded-lg p-5 sm:p-8 mb-8">
                <p className="text-cream-50 text-xs font-nav uppercase tracking-widest text-center mb-5">Here's Everything You Get — Absolutely Free</p>
                <div className="space-y-4">
                  {offerStack.map((o, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="text-gold text-lg mt-0.5 flex-shrink-0"
                        style={{ textShadow: '0 0 8px rgba(219,177,85,0.7)' }}
                      >
                        ✓
                      </span>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                        <span className="text-cream text-sm sm:text-base">
                          <span className="font-semibold">{o.item}</span>{' '}
                          <span className="text-cream-60">— {o.desc}</span>
                        </span>
                        <span className="text-gold font-mono font-bold text-sm whitespace-nowrap">(Value: {o.value})</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total value */}
                <div className="mt-6 pt-5 border-t border-gold-20/40 text-center">
                  <p className="font-heading font-bold text-xl sm:text-2xl">
                    <span className="text-cream-50">Total Value: </span>
                    <span
                      className="text-gold"
                      style={{ textShadow: '0 0 12px rgba(219,177,85,0.6)' }}
                    >
                      $1,600
                    </span>
                    <span className="text-cream-warm"> — Yours FREE</span>
                  </p>
                </div>
              </div>

              {/* Risk reversal */}
              <div className="flex items-start gap-3 bg-gold/5 border border-gold-20/30 rounded-lg p-4 mb-8">
                <span className="text-gold text-xl flex-shrink-0 mt-0.5">🛡️</span>
                <p className="text-cream-70 text-sm sm:text-base leading-relaxed">
                  <span className="text-cream font-semibold">Our Guarantee:</span> If we can't show you at least <span className="text-gold font-bold">$27,500</span> in potential tax savings, we'll give you the documentation checklist for free anyway. You risk nothing.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-card-border my-6" />

              {/* Form */}
              <p className="text-cream-50 text-xs font-nav uppercase tracking-widest text-center mb-5">Claim Your Free Blueprint</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Name <span className="text-gold">*</span></label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" className={inputClasses} />
                </div>
                <div>
                  <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Email <span className="text-gold">*</span></label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className={inputClasses} />
                </div>
                <div>
                  <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Phone <span className="text-gold">*</span></label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className={inputClasses} />
                </div>
                <div>
                  <label className="block text-cream-60 text-sm font-nav uppercase tracking-wider mb-1">Anticipated Taxable Income <span className="text-gold">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-50">$</span>
                    <input type="number" required value={income} onChange={(e) => setIncome(e.target.value)} placeholder="500,000" className={`pl-8 ${inputClasses}`} />
                  </div>
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm text-lg bg-gold text-dark font-bold hover:bg-gold/90 hover:shadow-[0_0_24px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Claim My Free Blueprint and Book My Call'}
                </button>
                <p className="text-cream-40 text-xs text-center">Your information is kept private and secure.</p>
              </form>

              {/* Scarcity */}
              <div className="mt-6 pt-5 border-t border-card-border text-center">
                <p className="text-cream-50 text-xs sm:text-sm font-nav uppercase tracking-wider">
                  ⚡ We only accept <span className="text-gold font-bold">10 new clients per month</span> to ensure quality of service
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </SectionWrapper>
  )
}

// ─── References ───
const REFERENCES = [
  { id: 1, text: 'BDO. (2025, September 30). Expanded Depreciation Expensing Under the OBBBA.' },
  { id: 2, text: 'Internal Revenue Service. (2026, January 14). Treasury, IRS issue guidance on the additional first year depreciation deduction.' },
  { id: 3, text: 'Internal Revenue Service. (2025, December 5). Additional First Year Depreciation Deduction (Bonus) - FAQ.' },
  { id: 4, text: 'Bradford Tax Institute. Internal Revenue Code Section 168.' },
  { id: 5, text: 'Morrel, R.B. Jr. (2019). Chapter 13: Coin Operated Amusements.' },
  { id: 6, text: 'Bradford Tax Institute. Revenue Procedure 87-56.' },
  { id: 7, text: 'Cornell Law School LII. 26 U.S. Code § 167 - Depreciation.' },
  { id: 8, text: 'Cornell Law School LII. 26 U.S. Code § 162 - Trade or business expenses.' },
  { id: 9, text: 'Revo Taxpayer Advocacy. (2025). Deducting Arcade and Pinball Machines in Non-Entertainment Industries.' },
  { id: 10, text: 'JAK CPA. 50 Shades of Gray: The Story of Business Tax Deduction.' },
  { id: 11, text: 'Internal Revenue Service. (2023). Entertainment, Gift, and Car Expenses (Publication 463).' },
  { id: 12, text: 'Internal Revenue Service. (2024). How to Depreciate Property (Publication 946).' },
  { id: 13, text: 'Internal Revenue Service. (2024). Business Expenses (Publication 535).' },
  { id: 14, text: 'Internal Revenue Service. Listed Property (IRC § 280F).' },
  { id: 15, text: 'Thomson Reuters. (2025). Section 168(k) Bonus Depreciation After the OBBBA.' },
]

function References() {
  return (
    <SectionWrapper id="references">
      <div className="text-center mb-6">
        <SectionLabel>Sources</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">References</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">Primary authorities and resources cited throughout this guide.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-3">
          {REFERENCES.map((ref) => (
            <div key={ref.id} className="flex gap-4 p-3 rounded-lg bg-card-bg border border-card-border">
              <span className="text-gold font-mono font-bold text-sm shrink-0 w-8 text-right">[{ref.id}]</span>
              <p className="text-cream-70 text-sm leading-relaxed">{ref.text}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ─── Home Page ───
export default function HomePage() {
  return (
    <>
      <Hero />
      <Overview />
      <SavingsCTA />
      <Gallery />
      <FAQ />
      <Glossary />
      <CPAEmail />
      <BookCall />
      <References />
    </>
  )
}
