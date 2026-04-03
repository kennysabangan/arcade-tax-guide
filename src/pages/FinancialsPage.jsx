import { SectionLabel, SectionWrapper, Card, CTAButton } from '../components/Layout'

function Placeholder({ title, description }) {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>Coming Soon</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">{title}</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">{description}</p>
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
    debt10: 1830,
    debt15: 1350,
    total10: 4905,
    total15: 4425,
    net10: 95,
    net15: 575,
  },
  {
    name: 'Higher Volume',
    income: 14600,
    payout: 4380,
    venue: 1533,
    software: 3066,
    debt10: 1830,
    debt15: 1350,
    total10: 10809,
    total15: 10329,
    net10: 3791,
    net15: 4271,
  },
]

function fmt(n) {
  return '$' + n.toLocaleString()
}

function RevenueTable({ scenario }) {
  const rows = [
    ['Gross Income', scenario.income, scenario.income],
    ['Payout to Customers (30%)*', scenario.payout, scenario.payout],
    ['Venue Operator / Host (15%)*', scenario.venue, scenario.venue],
    ['Software / Tech / Maint / Repairs (30%)*', scenario.software, scenario.software],
    ['Debt Service ($175K Loan)#', scenario.debt10, scenario.debt15],
  ]
  const totalRow = ['Total Expenses', scenario.total10, scenario.total15]
  const netRow = ['Net Operating Income', scenario.net10, scenario.net15]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gold-20">
            <th className="text-left text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Item</th>
            <th className="text-right text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">10-Year Note</th>
            <th className="text-right text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">15-Year Note</th>
          </tr>
        </thead>
        <tbody className="text-cream-70">
          {rows.map(([label, v10, v15], i) => (
            <tr key={i} className="border-b border-card-border">
              <td className="py-2 px-4">{label}</td>
              <td className="text-right py-2 px-4 font-mono">{fmt(v10)}</td>
              <td className="text-right py-2 px-4 font-mono">{fmt(v15)}</td>
            </tr>
          ))}
          {/* Divider before totals */}
          <tr className="border-b border-card-border">
            <td colSpan={3} className="py-1" />
          </tr>
          <tr className="border-b border-card-border">
            <td className="py-2 px-4">{totalRow[0]}</td>
            <td className="text-right py-2 px-4 font-mono">{fmt(totalRow[1])}</td>
            <td className="text-right py-2 px-4 font-mono">{fmt(totalRow[2])}</td>
          </tr>
          <tr className="border-b border-card-border">
            <td className="py-2.5 px-4 text-gold font-semibold">{netRow[0]}</td>
            <td className="text-right py-2.5 px-4 font-mono text-gold font-bold">{fmt(netRow[1])}</td>
            <td className="text-right py-2.5 px-4 font-mono text-gold font-bold">{fmt(netRow[2])}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function RevenueModel() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>Revenue Projections</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Monthly Revenue Model Per Machine</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          Side-by-side comparison of conservative and higher-volume projections across two financing terms.
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
            <RevenueTable scenario={s} />
          </Card>
        ))}
      </div>
      <div className="max-w-5xl mx-auto mt-6 text-cream-50 text-xs space-y-1 px-4">
        <p>* Percentage is applied after "Payout to Customer"</p>
        <p># May vary depending on interest rate at time of loan</p>
      </div>
    </SectionWrapper>
  )
}

function Amortization() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>Loan Schedule</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Amortization Schedule</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          Sample amortization for a $200,000 arcade game purchase with financing.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-20">
                <th className="text-left text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Item</th>
                <th className="text-right text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">10-Year Note</th>
                <th className="text-right text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">15-Year Note</th>
              </tr>
            </thead>
            <tbody className="text-cream-70">
              {[
                ['Purchase Price', '$200,000', '$200,000'],
                ['Down Payment', '$25,000', '$25,000'],
                ['Financed Amount', '$175,000', '$175,000'],
                ['Monthly Payment', '$1,830', '$1,350'],
              ].map(([label, val10, val15], i) => (
                <tr key={i} className="border-b border-card-border">
                  <td className="py-2 px-4">{label}</td>
                  <td className="text-right py-2 px-4 font-mono">{val10}</td>
                  <td className="text-right py-2 px-4 font-mono">{val15}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  )
}

function TaxSavingsExample() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>Tax Savings</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Example of Tax Savings</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          Below is a sample of a single and a married taxpayer earning $215K on a W2, using the standard deduction. The tax savings is more than the initial investment.
        </p>
        <div className="mt-8">
          <a href="/book-a-call" className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-5 text-lg sm:text-2xl font-heading font-bold rounded-sm bg-gold text-dark hover:bg-gold/90 hover:shadow-[0_0_32px_rgba(219,177,85,0.6)] active:scale-[0.98] transition-all duration-200">
            Book My Discovery Call Now
          </a>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-20">
                <th className="text-left text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Item</th>
                <th className="text-right text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Single Taxpayer</th>
                <th className="text-right text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Married Taxpayer</th>
              </tr>
            </thead>
            <tbody className="text-cream-70">
              {/* Section 1: Without Bonus Depreciation */}
              <tr className="border-b border-card-border">
                <td colSpan={3} className="pt-4 pb-2 px-4 text-gold font-semibold font-nav uppercase tracking-wider text-xs">Without Bonus Depreciation</td>
              </tr>
              {[
                ['W2 Income', '$215,000', '$215,000'],
                ['Standard Deduction', '($16,100)', '($32,200)'],
                ['Taxable Income', '$198,900', '$182,800'],
                ['Federal Tax', '$40,334', '$29,640'],
              ].map(([label, s, m], i) => (
                <tr key={`w1-${i}`} className="border-b border-card-border">
                  <td className="py-2 px-4">{label}</td>
                  <td className="text-right py-2 px-4 font-mono">{s}</td>
                  <td className="text-right py-2 px-4 font-mono">{m}</td>
                </tr>
              ))}
              {/* Section 2: With Bonus Depreciation */}
              <tr className="border-b border-card-border">
                <td colSpan={3} className="pt-4 pb-2 px-4 text-gold font-semibold font-nav uppercase tracking-wider text-xs">With Bonus Depreciation</td>
              </tr>
              {[
                ['W2 Income', '$215,000', '$215,000'],
                ['Bonus Depreciation Deduction', '($200,000)', '($200,000)'],
                ['Standard Deduction', '($16,100)', '($32,200)'],
                ['Taxable Income', '$0', '$0'],
                ['Tax', '$0', '$0'],
              ].map(([label, s, m], i) => (
                <tr key={`w2-${i}`} className="border-b border-card-border">
                  <td className="py-2 px-4">{label}</td>
                  <td className="text-right py-2 px-4 font-mono">{s}</td>
                  <td className="text-right py-2 px-4 font-mono">{m}</td>
                </tr>
              ))}
              {/* Total Savings */}
              <tr>
                <td className="py-3 px-4 text-gold font-bold">Total Tax Strategy Savings</td>
                <td className="text-right py-3 px-4 font-mono text-gold font-bold text-lg">$40,334</td>
                <td className="text-right py-3 px-4 font-mono text-gold font-bold text-lg">$29,640</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default function FinancialsPage() {
  return (
    <div className="pt-16">
      <TaxSavingsExample />
      <RevenueModel />
      <Amortization />
    </div>
  )
}
