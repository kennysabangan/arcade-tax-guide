import { SectionLabel, SectionWrapper, Card, StatBox } from '../components/Layout'

// ─── Bonus Depreciation ───
const QUALIFICATION = [
  { title: 'Property Type', description: 'Must be MACRS property with a recovery period of 20 years or less, MACRS water utility property, qualified computer software, or qualified film/television/live theatrical production property.' },
  { title: 'Acquisition Date', description: 'The property must have been acquired by the taxpayer after September 27, 2017. There was no requirement that there be no binding written contract in effect before that date.' },
  { title: 'Placed in Service', description: 'The property must be placed in service by the taxpayer during the applicable tax year. "Placed in service" means the property is in a condition or state of readiness and availability for its specific use.' },
  { title: 'Original or Used Property', description: 'Both new and used property qualify, provided the used property was not previously used by the taxpayer or a related party. This was a significant expansion from the original bonus depreciation rules.' },
]

const PHASE_DOWN = [
  { period: '2017–2022', rate: '100%' },
  { period: '2023', rate: '80%' },
  { period: '2024', rate: '60%' },
  { period: '2025 (pre-OBBBA)', rate: '40%' },
  { period: '2026', rate: '20%' },
  { period: 'Post Jan 19, 2025 (OBBBA)', rate: '100%', highlight: true },
]

function BonusDepreciation() {
  return (
    <SectionWrapper id="bonus-depreciation">
      <div className="text-center mb-12">
        <SectionLabel>Section 168(k)</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">Understanding Bonus Depreciation</h2>
        <p className="text-cream-70 text-lg max-w-3xl mx-auto leading-relaxed">
          The Tax Cuts and Jobs Act (TCJA) of 2017 enhanced bonus depreciation to allow 100% first-year deduction for
          qualifying property. The One Big Beautiful Bill Act (OBBBA) of 2025 made this 100% rate permanent for property
          acquired and placed in service after January 19, 2025.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {QUALIFICATION.map((item, i) => (
          <Card key={i}>
            <h3 className="text-gold font-heading font-bold text-xl mb-3">{item.title}</h3>
            <p className="text-cream-70 text-sm leading-relaxed">{item.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="font-heading text-gold text-2xl font-bold text-center mb-6">Bonus Depreciation Phase-Down &amp; Restoration</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-20">
                <th className="text-left text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Placed in Service Period</th>
                <th className="text-right text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Bonus %</th>
              </tr>
            </thead>
            <tbody>
              {PHASE_DOWN.map((row, i) => (
                <tr key={i} className={`border-b border-card-border ${row.highlight ? 'bg-gold-20/20' : ''}`}>
                  <td className="py-3 px-4 text-cream-70">{row.period}</td>
                  <td className={`py-3 px-4 text-right font-mono font-bold ${row.highlight ? 'text-gold' : 'text-cream'}`}>{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-cream-40 text-xs mt-4 text-center">Source: IRC § 168(k)(6), One Big Beautiful Bill Act of 2025</p>
      </div>

      <div className="mt-12">
        <h3 className="font-heading text-gold text-xl font-bold text-center mb-8">Visual Timeline</h3>
        <div className="flex flex-wrap items-end justify-center gap-3">
          {PHASE_DOWN.map((row, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-xs text-cream-60 font-mono">{row.rate}</span>
              <div
                className={`w-14 rounded-t-md transition-all ${row.highlight ? 'bg-gold' : 'bg-gold-dim'}`}
                style={{ height: `${parseInt(row.rate) * 1.5}px` }}
              />
              <span className="text-xs text-cream-50 text-center max-w-[70px]">{row.period.split('(')[0].trim()}</span>
              {row.highlight && <span className="text-[10px] text-gold font-bold uppercase">Permanent</span>}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ─── MACRS Property ───
function MACRSProperty() {
  return (
    <SectionWrapper id="macrs-property">
      <div className="text-center mb-12">
        <SectionLabel>Asset Classification</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">Arcade Games as Qualified MACRS Property</h2>
        <p className="text-cream-70 text-lg max-w-3xl mx-auto leading-relaxed">
          How coin-operated amusement devices are classified under the IRS depreciation system.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="text-cream-70 leading-relaxed mb-8">
          An arcade game is considered tangible personal property, which is a primary category of assets eligible for bonus
          depreciation. Under the MACRS framework, assets are assigned to specific classes which determine their depreciable
          life, or "recovery period."
        </p>
        <p className="text-cream-70 leading-relaxed mb-8">
          According to IRS guidance, coin-operated amusement devices — including video games and pinball machines — fall
          under <strong className="text-cream">Asset Class 79.0</strong>, titled "Recreation". This asset class has a class
          life of 10 years and a MACRS recovery period of <strong className="text-cream">7 years</strong> under the General
          Depreciation System (GDS).
        </p>
        <Card className="max-w-md mx-auto text-center">
          <div className="text-cream-60 text-xs uppercase tracking-wider font-nav mb-2">IRS Asset Classification</div>
          <div className="text-gold font-heading text-3xl font-bold mb-1">Asset Class 79.0</div>
          <div className="text-cream font-semibold text-lg mb-3">Recreation</div>
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <span className="text-cream-50">Class Life:</span>{' '}
              <span className="text-cream font-semibold">10 Years</span>
            </div>
            <div>
              <span className="text-cream-50">Recovery Period:</span>{' '}
              <span className="text-gold font-semibold">7 Years (GDS)</span>
            </div>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  )
}

// ─── Business Use ───
const USE_CASES = [
  {
    title: 'Enhancing Customer Experience',
    description: 'In service-based businesses like medical offices, law firms, or repair shops, an arcade game in a waiting area can entertain clients, reduce perceived wait times, and improve overall customer satisfaction.',
    examples: ['Dental offices with family-friendly waiting rooms', 'Auto repair shops with customer lounges', 'Veterinary clinics with entertaining waiting areas'],
  },
  {
    title: 'Boosting Employee Morale & Retention',
    description: 'Providing recreational amenities like arcade games is a recognized business strategy to improve employee morale, reduce stress, and increase retention.',
    examples: ['Employee break rooms in corporate offices', 'Tech company recreation areas', 'Call center stress-relief zones'],
  },
  {
    title: 'Direct Revenue Generation',
    description: 'Arcade games can be placed in venues like restaurants, bars, laundromats, and entertainment centers to generate direct coin-operated or card-operated revenue.',
    examples: ['Restaurants and bars with entertainment areas', 'Laundromats and coin-operated businesses', 'Hotels and resorts with game rooms'],
  },
]

function BusinessUse() {
  return (
    <SectionWrapper id="business-use">
      <div className="text-center mb-12">
        <SectionLabel>Trade or Business</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">The "Used in a Trade or Business" Requirement</h2>
        <p className="text-cream-70 text-lg max-w-3xl mx-auto leading-relaxed">
          Depreciation deductions, including bonus depreciation, are only permitted for property that is used in a taxpayer's
          trade or business or held for the production of income. For an activity to be considered a trade or business, the
          primary motive must be for income or profit.
        </p>
      </div>
      <p className="text-cream-70 leading-relaxed max-w-3xl mx-auto mb-10 text-center">
        To claim depreciation on an arcade game, a business must demonstrate a clear and legitimate business purpose. This
        purpose does not have to be direct revenue generation. An expense is considered "ordinary and necessary" under IRC §
        162 if it is common and accepted in the trade or business and is helpful and appropriate.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {USE_CASES.map((item, i) => (
          <Card key={i}>
            <h3 className="text-gold font-heading font-bold text-xl mb-3">{item.title}</h3>
            <p className="text-cream-70 text-sm leading-relaxed mb-4">{item.description}</p>
            <div className="border-t border-card-border pt-3">
              <div className="text-cream-60 text-xs uppercase tracking-wider font-nav mb-2">Examples</div>
              <ul className="space-y-1">
                {item.examples.map((ex, j) => (
                  <li key={j} className="text-cream-50 text-sm flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}

// ─── Listed Property ───
function ListedProperty() {
  return (
    <SectionWrapper id="listed-property">
      <div className="text-center mb-12">
        <SectionLabel>IRC § 280F</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">Listed Property Requirements</h2>
        <p className="text-cream-70 text-lg max-w-3xl mx-auto leading-relaxed">
          Arcade games and other entertainment assets are classified as "listed property" under IRC § 280F. This
          classification imposes additional substantiation requirements and a critical business use threshold.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="text-center">
          <div className="text-cream-60 text-xs uppercase tracking-wider font-nav mb-2">Business Use Threshold</div>
          <div className="text-gold font-heading text-5xl font-bold mb-2">&gt;50%</div>
          <p className="text-cream-70 text-sm leading-relaxed max-w-lg mx-auto">
            Listed property must be used more than 50% for business purposes in the tax year it is placed in service to
            qualify for bonus depreciation. If business use falls to 50% or below in any subsequent year, previously claimed
            bonus depreciation must be recaptured.
          </p>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card-bg border border-card-border rounded-lg p-5">
            <h3 className="text-gold font-heading font-bold text-lg mb-3">Substantiation Requirements</h3>
            <ul className="space-y-2 text-cream-70 text-sm">
              {['Amount of each business use', 'Date of each use', 'Business purpose for each use', 'Contemporaneous records (kept at or near the time of use)'].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card-bg border border-card-border rounded-lg p-5">
            <h3 className="text-gold font-heading font-bold text-lg mb-3">Recapture Rules</h3>
            <p className="text-cream-70 text-sm leading-relaxed mb-3">
              If business use drops to 50% or below in any year during the MACRS recovery period, the taxpayer must:
            </p>
            <ul className="space-y-2 text-cream-70 text-sm">
              {['Recapture excess depreciation as ordinary income', 'Switch to ADS straight-line depreciation', 'Use the longer ADS recovery period going forward'].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-cream-60 text-sm leading-relaxed text-center">
          For a game in an employee break room, its availability to employees during work hours is considered its business use.
          The key is maintaining contemporaneous records that clearly delineate business from personal use.
        </p>
      </div>
    </SectionWrapper>
  )
}

export default function TaxGuidePage() {
  return (
    <div className="pt-20">
      <BonusDepreciation />
      <MACRSProperty />
      <BusinessUse />
      <ListedProperty />
    </div>
  )
}
