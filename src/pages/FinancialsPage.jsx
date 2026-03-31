import { SectionLabel, SectionWrapper, StatBox } from '../components/Layout'

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
          Revenue projections based on per-machine monthly revenue.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatBox label="Avg Revenue/Machine/Month" value="See Spreadsheet" sublabel="Per machine" />
        <StatBox label="Payback Period" value="See Spreadsheet" sublabel="Varies" />
        <StatBox label="5-Year ROI" value="See Spreadsheet" sublabel="See Spreadsheet" />
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

export default function FinancialsPage() {
  return (
    <div className="pt-20">
      <RevenueModel />
      <Amortization />
    </div>
  )
}
