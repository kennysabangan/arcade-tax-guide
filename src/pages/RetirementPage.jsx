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

const scenarios = [
  {
    name: 'Conservative',
    income: 5000,
    payout: 1500,
    venue: 525,
    software: 1050,
    debt: 0,
    total: 3075,
    net: 1925,
    annual: 23100,
  },
  {
    name: 'Higher Volume',
    income: 14600,
    payout: 4380,
    venue: 1533,
    software: 3066,
    debt: 0,
    total: 8979,
    net: 5621,
    annual: 67452,
  },
]

function fmt(n) {
  return '$' + n.toLocaleString()
}

function RetirementTable({ scenario }) {
  const rows = [
    ['Gross Income', scenario.income],
    ['Payout to Customers (30%)*', scenario.payout],
    ['Venue Operator / Host (15%)*', scenario.venue],
    ['Software / Tech / Maint / Repairs (30%)*', scenario.software],
    ['Debt Service', scenario.debt],
  ]
  const totalRow = ['Total Expenses', scenario.total]
  const netRow = ['Net Operating Income', scenario.net]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gold-20">
            <th className="text-left text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Item</th>
            <th className="text-right text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Monthly</th>
          </tr>
        </thead>
        <tbody className="text-cream-70">
          {rows.map(([label, val], i) => (
            <tr key={i} className="border-b border-card-border">
              <td className="py-2 px-4">{label}</td>
              <td className="text-right py-2 px-4 font-mono">{fmt(val)}</td>
            </tr>
          ))}
          <tr className="border-b border-card-border">
            <td colSpan={2} className="py-1" />
          </tr>
          <tr className="border-b border-card-border">
            <td className="py-2 px-4">{totalRow[0]}</td>
            <td className="text-right py-2 px-4 font-mono">{fmt(totalRow[1])}</td>
          </tr>
          <tr className="border-b border-card-border">
            <td className="py-2.5 px-4 text-gold font-semibold">{netRow[0]}</td>
            <td className="text-right py-2.5 px-4 font-mono text-gold font-bold">{fmt(netRow[1])}</td>
          </tr>
          <tr>
            <td className="py-2.5 px-4 text-gold font-semibold">Annual Income</td>
            <td className="text-right py-2.5 px-4 font-mono text-gold font-bold">{fmt(scenario.annual)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function AfterDebtService() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>After Debt Service — Loan Paid Off</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-6">
          Your Monthly Retirement Income
        </h2>
        <p className="text-cream-70 text-lg max-w-3xl mx-auto leading-relaxed">
          Once the loan is fully paid off, <strong className="text-cream">debt service drops to $0</strong> — all net income becomes pure passive retirement cash flow to you, the game owner.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenarios.map((s) => (
          <Card key={s.name} className="overflow-hidden">
            <div className="text-center mb-4">
              <div className="text-xs uppercase tracking-widest font-nav text-cream-60 mb-1">
                {s.name} Scenario
              </div>
              <div className="text-gold font-heading text-xl font-bold">{fmt(s.income)}/mo gross</div>
            </div>
            <RetirementTable scenario={s} />
          </Card>
        ))}
      </div>
      <div className="max-w-5xl mx-auto mt-6 text-cream-50 text-xs space-y-1 px-4">
        <p>* Percentage is applied after "Payout to Customer"</p>
        <p>Debt service is $0 — the loan has been fully paid off.</p>
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
