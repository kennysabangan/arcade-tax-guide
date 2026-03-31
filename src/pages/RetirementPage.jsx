import { SectionLabel, SectionWrapper, Card } from '../components/Layout'

function RetirementHero() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>Retirement Strategy</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">
          Let the IRS Help Fund Your Retirement
        </h2>
        <p className="text-cream-70 text-lg max-w-3xl mx-auto leading-relaxed">
          Nearly two-thirds of Americans approaching age 65 are financially unprepared for retirement.
        </p>
        <p className="text-cream-70 text-lg max-w-3xl mx-auto leading-relaxed mt-4">
          Our strategy changes that conversation.
        </p>
      </div>
    </SectionWrapper>
  )
}

function StrategyDetails() {
  const paragraphs = [
    'Instead of simply paying taxes, you can redirect a portion of those tax dollars into income-producing business assets that may continue generating cash flow long after the debt is paid off.',
    'Using the tax savings from this strategy to acquire just one machine per year for the next five years can create a powerful long-term retirement income stream.',
    'Instead of sending those tax dollars to the IRS, you can redirect a portion of them into income-producing business assets that may continue generating monthly cash flow long after the debt is paid off.',
    'That means taxes you would have paid anyway can be transformed into a scalable retirement income business!',
  ]

  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>The Strategy</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">
          Transform Tax Dollars Into Retirement Income
        </h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        {paragraphs.map((text, i) => (
          <Card key={i}>
            <p className="text-cream-70 text-base leading-relaxed">{text}</p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}

function AfterDebtService() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>Projections</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">
          After Debt Service
        </h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          Projected monthly cash flow once financing is fully paid off.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Card className="text-center">
          <div className="text-cream-60 text-xs uppercase tracking-wider font-nav mb-2">Retirement Income Projections</div>
          <div className="text-gold font-heading text-3xl font-bold mb-2">Spreadsheet data coming soon</div>
          <p className="text-cream-70 text-sm leading-relaxed max-w-lg mx-auto">
            Detailed projections showing monthly passive income from arcade game assets after debt service is complete.
          </p>
        </Card>
      </div>
    </SectionWrapper>
  )
}

export default function RetirementPage() {
  return (
    <div className="pt-20">
      <RetirementHero />
      <StrategyDetails />
      <AfterDebtService />
    </div>
  )
}
