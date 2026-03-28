import { SectionLabel, SectionWrapper, StatBox, Card } from '../components/Layout'

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}

function Scenario15M() {
  const totalPurchase = 1500000
  const downPayment = 150000
  const taxSavings = Math.round(totalPurchase * 0.37)
  const monthlyPayment = 5000

  return (
    <SectionWrapper id="scenario">
      <div className="text-center mb-12">
        <SectionLabel>Detailed Walkthrough</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">$1.5M Scenario Analysis</h2>
        <p className="text-cream-70 text-lg max-w-3xl mx-auto">
          A detailed walkthrough of a real-world scenario: purchasing 10 commercial arcade games at $100,000 each with 10% down and 0% seller financing.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatBox label="Total Purchase" value={fmt(totalPurchase)} />
          <StatBox label="Down Payment" value={fmt(downPayment)} sublabel="10%" />
          <StatBox label="Tax Savings" value={fmt(taxSavings)} sublabel="at 37%" />
          <StatBox label="Net Monthly" value={`+${fmt(10000)}`} sublabel="per month" />
        </div>

        <Card className="mb-8">
          <h3 className="text-gold font-heading font-bold text-xl mb-4">Investment Structure</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="text-cream-70">
                {[
                  ['10 Commercial Arcade Games', fmt(totalPurchase)],
                  ['Down Payment (10%)', fmt(downPayment)],
                  ['Seller Financing (90%, 0% interest, 15yr)', fmt(900000)],
                  ['Monthly Loan Payment', fmt(monthlyPayment)],
                  ['100% Bonus Depreciation (OBBBA)', fmt(1000000)],
                ].map(([label, val], i) => (
                  <tr key={i} className={`border-b ${i === 4 ? 'border-gold-20' : 'border-card-border'}`}>
                    <td className={`py-2 px-3 ${i === 4 ? 'font-semibold text-cream' : ''}`}>{label}</td>
                    <td className={`text-right py-2 px-3 font-mono ${i === 4 ? 'text-gold font-bold' : ''}`}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="mb-8">
          <h3 className="text-gold font-heading font-bold text-xl mb-4">Tax Impact</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold-20">
                  <th className="text-left text-gold py-2 px-3 font-nav uppercase tracking-wider text-xs">Item</th>
                  <th className="text-right text-gold py-2 px-3 font-nav uppercase tracking-wider text-xs">Without Depreciation</th>
                  <th className="text-right text-gold py-2 px-3 font-nav uppercase tracking-wider text-xs">With Depreciation</th>
                </tr>
              </thead>
              <tbody className="text-cream-70">
                {[
                  ['W-2 / Business Income', '$1,000,000', '$1,000,000'],
                  ['Bonus Depreciation Deduction', '$0', '($1,000,000)'],
                  ['Adjusted Taxable Income', '$1,000,000', '$0'],
                  ['Filing Status', 'MFJ', 'MFJ'],
                  ['Federal Tax Owed', '$294,062', '$0'],
                ].map(([label, without, withDed], i) => (
                  <tr key={i} className={`border-b ${i === 4 ? '' : 'border-card-border'}`}>
                    <td className={`py-2 px-3 ${i >= 2 ? 'font-semibold text-cream' : ''}`}>{label}</td>
                    <td className={`text-right py-2 px-3 font-mono ${i >= 2 ? 'font-semibold' : ''}`}>{without}</td>
                    <td className={`text-right py-2 px-3 font-mono ${i >= 2 ? 'font-semibold text-gold' : ''}`}>{withDed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-gold-20/20 rounded-lg p-4 text-center border border-gold-20">
            <div className="text-cream-60 text-xs uppercase tracking-wider font-nav mb-1">Federal Tax Savings</div>
            <div className="text-gold font-heading text-3xl font-bold">$294,062</div>
          </div>
        </Card>

        <Card>
          <h3 className="text-gold font-heading font-bold text-xl mb-4">Combined Federal + State Tax Savings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { state: 'California (13.3%)', stateSavings: '$133,000', total: '$427,062' },
              { state: 'New York (10.9%)', stateSavings: '$109,000', total: '$403,062' },
              { state: 'Sample State (5%)', stateSavings: '$50,000', total: '$344,062' },
            ].map((item, i) => (
              <div key={i} className="bg-card-bg border border-card-border rounded-lg p-4 text-center">
                <div className="text-cream-60 text-xs uppercase font-nav mb-1">{item.state}</div>
                <div className="text-cream-50 text-sm mb-1">State savings: {item.stateSavings}</div>
                <div className="text-gold font-heading text-xl font-bold">{item.total}</div>
                <div className="text-cream-50 text-xs">combined savings</div>
              </div>
            ))}
          </div>
          <p className="text-cream-40 text-xs mt-4 text-center">
            State tax estimates use simplified top marginal rates applied to full income. Actual state taxes vary by bracket structure, deductions, and residency rules.
          </p>
        </Card>
      </div>
    </SectionWrapper>
  )
}

function RothConversion() {
  return (
    <SectionWrapper id="scenario-roth">
      <div className="text-center mb-12">
        <SectionLabel>Advanced Strategy</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Tax-Free Roth Conversion Strategy</h2>
        <p className="text-cream-70 text-lg max-w-3xl mx-auto">
          How $1M in bonus depreciation can offset a $1M Roth IRA conversion, creating a tax-free wealth transfer from pre-tax to post-tax retirement savings.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <h3 className="text-gold font-heading font-bold text-xl mb-4">The Strategy</h3>
          <p className="text-cream-70 leading-relaxed mb-4">
            A taxpayer with $1,000,000 in a traditional IRA can convert to a Roth IRA. Normally, the full conversion amount
            is taxable as ordinary income. However, by timing the conversion with a $1,000,000 bonus depreciation deduction
            from arcade game purchases, the depreciation completely offsets the conversion income.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gold-20">
                  <th className="text-left text-gold py-2 px-3 font-nav uppercase tracking-wider text-xs">Item</th>
                  <th className="text-right text-gold py-2 px-3 font-nav uppercase tracking-wider text-xs">Without Depreciation</th>
                  <th className="text-right text-gold py-2 px-3 font-nav uppercase tracking-wider text-xs">With Depreciation</th>
                </tr>
              </thead>
              <tbody className="text-cream-70">
                {[
                  ['W-2 / Business Income', '$1,000,000', '$1,000,000'],
                  ['Roth Conversion Income', '$1,000,000', '$1,000,000'],
                  ['Bonus Depreciation Deduction', '$0', '($1,000,000)'],
                  ['Adjusted Taxable Income', '$1,000,000', '$0'],
                  ['Federal Tax Owed', '$294,062', '$0'],
                ].map(([label, without, withDed], i) => (
                  <tr key={i} className={`border-b ${i === 3 ? 'border-gold-20' : i < 4 ? 'border-card-border' : ''}`}>
                    <td className={`py-2 px-3 ${i >= 3 ? 'font-semibold text-cream' : ''}`}>{label}</td>
                    <td className={`text-right py-2 px-3 font-mono ${i >= 3 ? 'font-semibold text-cream' : ''}`}>{without}</td>
                    <td className={`text-right py-2 px-3 font-mono ${i >= 3 ? 'font-semibold text-gold' : ''}`}>{withDed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatBox label="Tax on Conversion" value="$0" sublabel="Tax-Free Roth Conversion" />
          <StatBox label="ROI on Down Payment" value="294%" sublabel="$100K generates $294K savings" />
          <StatBox label="Net Cash Benefit" value="$194,062" sublabel="Savings exceed down payment" />
        </div>

        <div className="text-center">
          <p className="text-cream-40 text-xs">
            This scenario is for illustrative purposes only. Roth conversion strategies involve complex tax considerations. Consult a qualified CPA or tax professional for personalized advice.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default function ScenariosPage() {
  return (
    <div className="pt-20">
      <Scenario15M />
      <RothConversion />
    </div>
  )
}
