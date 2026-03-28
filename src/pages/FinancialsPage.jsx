import { SectionLabel, SectionWrapper, StatBox, Card } from '../components/Layout'

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

function RevenueModel() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>Revenue Projections</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Revenue Model</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          Projected revenue from coin-operated arcade game deployments across different venue types.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatBox label="Avg Revenue/Machine/Month" value="$500" sublabel="Conservative" />
        <StatBox label="Payback Period" value="20 Mo" sublabel="At $500/mo" />
        <StatBox label="5-Year ROI" value="200%" sublabel="Excl. tax savings" />
      </div>
    </SectionWrapper>
  )
}

function Breakeven() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <SectionLabel>Analysis</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Breakeven Analysis</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          Calculate how quickly your arcade game investment pays for itself when combining revenue and tax savings.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Card className="text-center">
          <div className="text-cream-60 text-xs uppercase tracking-wider font-nav mb-2">Combined Breakeven</div>
          <div className="text-gold font-heading text-5xl font-bold mb-2">~6 Months</div>
          <p className="text-cream-70 text-sm leading-relaxed max-w-lg mx-auto">
            When combining 100% first-year bonus depreciation tax savings with monthly revenue, most arcade game investments
            achieve breakeven within the first 6-12 months.
          </p>
        </Card>
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
          Sample amortization for a $100,000 arcade game purchase with 10% down and 0% seller financing over 15 years.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-20">
                <th className="text-left text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Item</th>
                <th className="text-right text-gold font-semibold py-3 px-4 font-nav uppercase tracking-wider text-xs">Amount</th>
              </tr>
            </thead>
            <tbody className="text-cream-70">
              {[
                ['Purchase Price', '$100,000'],
                ['Down Payment (10%)', '$10,000'],
                ['Financed Amount (0%)', '$90,000'],
                ['Monthly Payment', '$500'],
                ['Total Interest', '$0'],
                ['Total Cost', '$100,000'],
              ].map(([label, val], i) => (
                <tr key={i} className="border-b border-card-border">
                  <td className="py-2 px-4">{label}</td>
                  <td className="text-right py-2 px-4 font-mono">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default function FinancialsPage() {
  return (
    <div className="pt-20">
      <RevenueModel />
      <Breakeven />
      <Amortization />
    </div>
  )
}
