import { useSearchParams, Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { Card } from '../components/Layout'

// 2024 MFJ tax brackets
const MFJ_BRACKETS = [
  { upTo: 23200, rate: 0.10 },
  { upTo: 94300, rate: 0.12 },
  { upTo: 201050, rate: 0.22 },
  { upTo: 383900, rate: 0.24 },
  { upTo: 487450, rate: 0.32 },
  { upTo: 731200, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
]

function getMarginalRate(income) {
  for (const b of MFJ_BRACKETS) {
    if (income <= b.upTo) return b.rate
  }
  return 0.37
}

function calcFederalTax(income) {
  let tax = 0
  let prev = 0
  for (const b of MFJ_BRACKETS) {
    const taxable = Math.min(income, b.upTo) - prev
    if (taxable <= 0) break
    tax += taxable * b.rate
    prev = b.upTo
  }
  return tax
}

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function computeReport(income) {
  const marginalRate = getMarginalRate(income)
  const fedTaxNoStrategy = calcFederalTax(income)
  const purchasePrice = Math.max(income * 0.5, 100000)
  const bonusDepreciation = purchasePrice // 100% year 1
  const macrsRemaining = 0 // bonus covers full purchase
  const macrsYear1 = 0
  const totalDeduction = bonusDepreciation + macrsYear1
  const taxSavings = totalDeduction * marginalRate
  const effectiveCost = purchasePrice - taxSavings
  const nol = totalDeduction > income ? totalDeduction - income : 0

  return {
    income,
    marginalRate,
    fedTaxNoStrategy,
    purchasePrice,
    bonusDepreciation,
    macrsYear1,
    totalDeduction,
    taxSavings,
    effectiveCost,
    nol,
  }
}

function generatePDF(data, name) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })
  const w = doc.internal.pageSize.getWidth()
  const gold = [219, 177, 85]
  const dark = [26, 26, 26]
  const lightGray = [200, 200, 200]
  const margin = 50
  let y = 60

  const drawGoldLine = (yy) => {
    doc.setDrawColor(...gold)
    doc.setLineWidth(1)
    doc.line(margin, yy, w - margin, yy)
  }

  // Header background
  doc.setFillColor(...dark)
  doc.rect(0, 0, w, 110, 'F')
  doc.setFillColor(...gold)
  doc.rect(0, 110, w, 2, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(...gold)
  doc.text('Your Personalized Tax Savings Report', w / 2, 50, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(...lightGray)
  doc.text(`Prepared for: ${name}`, w / 2, 75, { align: 'center' })
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, w / 2, 93, { align: 'center' })

  y = 140

  // Section helper
  const sectionTitle = (title) => {
    doc.setFillColor(...dark)
    doc.rect(margin - 5, y - 14, w - 2 * margin + 10, 24, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(...gold)
    doc.text(title, margin, y)
    y += 20
    drawGoldLine(y)
    y += 18
  }

  const row = (label, value) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(...lightGray)
    doc.text(label, margin, y)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(255, 255, 255)
    doc.text(String(value), w - margin, y, { align: 'right' })
    y += 20
  }

  // Section 1
  sectionTitle('1. Your Tax Profile')
  row('Anticipated Taxable Income:', fmt(data.income))
  row('Marginal Tax Rate:', `${(data.marginalRate * 100).toFixed(0)}%`)
  row('Est. Federal Tax (No Strategy):', fmt(data.fedTaxNoStrategy))
  y += 10

  // Section 2
  sectionTitle('2. Arcade Game Bonus Depreciation Strategy')
  row('Recommended Investment:', fmt(data.purchasePrice))
  row('Bonus Depreciation (100%):', fmt(data.bonusDepreciation))
  row('Regular MACRS Year 1 (14.29%):', fmt(data.macrsYear1))
  row('Total First-Year Deduction:', fmt(data.totalDeduction))
  row('Tax Savings:', fmt(data.taxSavings))
  row('Effective Cost After Tax:', fmt(data.effectiveCost))
  y += 10

  // Section 3
  sectionTitle('3. Net Operating Loss Impact')
  if (data.nol > 0) {
    row('Net Operating Loss (NOL):', fmt(data.nol))
    row('Future Offset Potential (80%):', fmt(data.nol * 0.8))
  } else {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(...lightGray)
    doc.text('Your deduction does not exceed your income — no NOL generated.', margin, y)
    y += 20
    doc.text('Consider a larger investment to create an NOL carryforward.', margin, y)
    y += 20
  }
  y += 10

  // Section 4
  sectionTitle('4. Next Steps')
  const steps = [
    'Consult with your CPA about this strategy',
    'Identify qualifying arcade game assets',
    'Purchase and place in service before year-end',
    'File IRS Form 4562 with your tax return',
  ]
  steps.forEach((s, i) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(...lightGray)
    doc.text(`${i + 1}. ${s}`, margin, y)
    y += 20
  })

  // Footer
  y = 700
  drawGoldLine(y)
  y += 15
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(140, 140, 140)
  doc.text('This report is for informational purposes only. Consult a qualified tax professional.', w / 2, y, { align: 'center' })
  y += 14
  doc.text('Generated by Arcade Tax Guide | arcade-tax-guide.vercel.app', w / 2, y, { align: 'center' })

  doc.save(`Arcade_Tax_Savings_Report_${name.replace(/\s+/g, '_')}.pdf`)
}

export default function ReportPage() {
  const [params] = useSearchParams()
  const name = params.get('name') || 'Valued Client'
  const email = params.get('email') || ''
  const income = Number(params.get('income')) || 0

  const data = computeReport(income)

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1
          className="font-heading text-3xl sm:text-4xl font-bold text-gold mb-2"
          style={{ textShadow: '0 0 20px rgba(219,177,85,0.4)' }}
        >
          Your Personalized Tax Savings Report
        </h1>
        <p className="text-cream-70 text-lg">Prepared for: <span className="text-cream font-semibold">{name}</span></p>
        <p className="text-cream-50 text-sm mt-1">
          Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => generatePDF(data, name)}
          className="px-8 py-3 bg-gold text-dark font-semibold rounded-sm text-sm hover:bg-gold/90 hover:shadow-[0_0_20px_rgba(219,177,85,0.5)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          Download PDF
        </button>
      </div>

      {!income ? (
        <Card className="text-center py-12">
          <p className="text-cream-70 text-lg">Missing income parameter. Please access this page with a valid link.</p>
          <p className="text-cream-50 text-sm mt-2">Example: /report?name=Kenneth&email=k@example.com&income=150000</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Section 1 */}
          <Card>
            <h2 className="font-heading text-xl font-bold text-gold mb-4 pb-3 border-b border-gold-20">
              1. Your Tax Profile
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-cream-70">Anticipated Taxable Income</span>
                <span className="text-cream font-mono font-bold">{fmt(data.income)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream-70">Marginal Tax Rate (MFJ 2024)</span>
                <span className="text-gold font-mono font-bold">{(data.marginalRate * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream-70">Est. Federal Tax (No Strategy)</span>
                <span className="text-cream font-mono font-bold">{fmt(data.fedTaxNoStrategy)}</span>
              </div>
            </div>
          </Card>

          {/* Section 2 */}
          <Card>
            <h2 className="font-heading text-xl font-bold text-gold mb-4 pb-3 border-b border-gold-20">
              2. Arcade Game Bonus Depreciation Strategy
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-cream-70">Recommended Investment</span>
                <span className="text-cream font-mono font-bold">{fmt(data.purchasePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream-70">Bonus Depreciation (100%)</span>
                <span className="text-cream font-mono font-bold">{fmt(data.bonusDepreciation)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream-70">Regular MACRS Year 1 (14.29% of remaining)</span>
                <span className="text-cream font-mono font-bold">{fmt(data.macrsYear1)}</span>
              </div>
              <div className="flex justify-between border-t border-gold-20 pt-3">
                <span className="text-cream font-semibold">Total First-Year Deduction</span>
                <span className="text-gold font-mono font-bold text-lg">{fmt(data.totalDeduction)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream-70">Tax Savings</span>
                <span className="text-green-400 font-mono font-bold text-lg">{fmt(data.taxSavings)}</span>
              </div>
              <div className="flex justify-between bg-gold/10 -mx-6 px-6 py-3 rounded-b-lg">
                <span className="text-gold font-semibold">Effective Cost After Tax</span>
                <span className="text-gold font-mono font-bold text-lg">{fmt(data.effectiveCost)}</span>
              </div>
            </div>
          </Card>

          {/* Section 3 */}
          <Card>
            <h2 className="font-heading text-xl font-bold text-gold mb-4 pb-3 border-b border-gold-20">
              3. Net Operating Loss Impact
            </h2>
            {data.nol > 0 ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-cream-70">Net Operating Loss (NOL)</span>
                  <span className="text-gold font-mono font-bold">{fmt(data.nol)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-70">Future Income Offset Potential (80%)</span>
                  <span className="text-green-400 font-mono font-bold">{fmt(data.nol * 0.8)}</span>
                </div>
                <p className="text-cream-50 text-sm pt-2">
                  Your deduction exceeds your income, generating a Net Operating Loss that can offset up to 80% of future taxable income.
                </p>
              </div>
            ) : (
              <p className="text-cream-70">
                Your deduction does not exceed your income, so no NOL is generated. Consider a larger investment to unlock NOL carryforward benefits.
              </p>
            )}
          </Card>

          {/* Section 4 */}
          <Card>
            <h2 className="font-heading text-xl font-bold text-gold mb-4 pb-3 border-b border-gold-20">
              4. Next Steps
            </h2>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-cream">Consult with your CPA about this strategy</li>
              <li className="text-cream">Identify qualifying arcade game assets</li>
              <li className="text-cream">Purchase and place in service before year-end</li>
              <li className="text-cream">File IRS Form 4562 with your tax return</li>
            </ol>
          </Card>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gold-20">
            <p className="text-cream-40 text-xs italic">
              This report is for informational purposes only. Consult a qualified tax professional.
            </p>
            <p className="text-cream-40 text-xs mt-1">
              Generated by Arcade Tax Guide | arcade-tax-guide.vercel.app
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
