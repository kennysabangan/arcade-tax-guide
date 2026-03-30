import { useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { pdf, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
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

// ─── PDF Styles ───
const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 28,
    paddingHorizontal: 40,
  },
  headerTitle: {
    color: '#dbb155',
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  headerSub: {
    color: '#cccccc',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
  },
  headerDate: {
    color: '#999999',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 3,
  },
  body: {
    padding: 36,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    color: '#dbb155',
    fontFamily: 'Helvetica-Bold',
    fontSize: 13,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#dbb15533',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#555555',
    fontSize: 10,
  },
  value: {
    color: '#1a1a2e',
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  valueGold: {
    color: '#dbb155',
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  valueGreen: {
    color: '#22c55e',
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  dividerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#dbb15533',
    paddingTop: 6,
    marginTop: 6,
    marginBottom: 6,
  },
  highlightRow: {
    backgroundColor: '#dbb15518',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 6,
  },
  listItem: {
    color: '#1a1a2e',
    fontSize: 10,
    marginBottom: 4,
  },
  footer: {
    textAlign: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#dbb15533',
    marginTop: 10,
  },
  footerText: {
    color: '#999999',
    fontSize: 8,
    fontStyle: 'italic',
  },
  nolNote: {
    color: '#666666',
    fontSize: 9,
    marginTop: 8,
    lineHeight: 1.4,
  },
})

// ─── PDF Document Component ───
const ReportPDF = ({ data, name }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Header */}
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.headerTitle}>Your Personalized Tax Savings Report</Text>
        <Text style={pdfStyles.headerSub}>Prepared for: {name}</Text>
        <Text style={pdfStyles.headerDate}>
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </View>

      <View style={pdfStyles.body}>
        {/* Section 1: Tax Profile */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>1. Your Tax Profile</Text>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Anticipated Taxable Income</Text>
            <Text style={pdfStyles.value}>{fmt(data.income)}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Marginal Tax Rate (MFJ 2024)</Text>
            <Text style={pdfStyles.valueGold}>{(data.marginalRate * 100).toFixed(0)}%</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Est. Federal Tax (No Strategy)</Text>
            <Text style={pdfStyles.value}>{fmt(data.fedTaxNoStrategy)}</Text>
          </View>
        </View>

        {/* Section 2: Depreciation Strategy */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>2. Arcade Game Bonus Depreciation Strategy</Text>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Recommended Investment</Text>
            <Text style={pdfStyles.value}>{fmt(data.purchasePrice)}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Bonus Depreciation (100%)</Text>
            <Text style={pdfStyles.value}>{fmt(data.bonusDepreciation)}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Regular MACRS Year 1 (14.29% of remaining)</Text>
            <Text style={pdfStyles.value}>{fmt(data.macrsYear1)}</Text>
          </View>
          <View style={pdfStyles.dividerRow}>
            <Text style={[pdfStyles.value, { color: '#1a1a2e' }]}>Total First-Year Deduction</Text>
            <Text style={pdfStyles.valueGold}>{fmt(data.totalDeduction)}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Tax Savings</Text>
            <Text style={pdfStyles.valueGreen}>{fmt(data.taxSavings)}</Text>
          </View>
          <View style={pdfStyles.highlightRow}>
            <Text style={pdfStyles.valueGold}>Effective Cost After Tax</Text>
            <Text style={[pdfStyles.valueGold, { fontSize: 12 }]}>{fmt(data.effectiveCost)}</Text>
          </View>
        </View>

        {/* Section 3: NOL Impact */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>3. Net Operating Loss Impact</Text>
          {data.nol > 0 ? (
            <>
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Net Operating Loss (NOL)</Text>
                <Text style={pdfStyles.valueGold}>{fmt(data.nol)}</Text>
              </View>
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Future Income Offset Potential (80%)</Text>
                <Text style={pdfStyles.valueGreen}>{fmt(data.nol * 0.8)}</Text>
              </View>
              <Text style={pdfStyles.nolNote}>
                Your deduction exceeds your income, generating a Net Operating Loss that can offset up to 80% of future taxable income.
              </Text>
            </>
          ) : (
            <Text style={pdfStyles.label}>
              Your deduction does not exceed your income, so no NOL is generated. Consider a larger investment to unlock NOL carryforward benefits.
            </Text>
          )}
        </View>

        {/* Section 4: Next Steps */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>4. Next Steps</Text>
          <Text style={pdfStyles.listItem}>1. Consult with your CPA about this strategy</Text>
          <Text style={pdfStyles.listItem}>2. Identify qualifying arcade game assets</Text>
          <Text style={pdfStyles.listItem}>3. Purchase and place in service before year-end</Text>
          <Text style={pdfStyles.listItem}>4. File IRS Form 4562 with your tax return</Text>
        </View>

        {/* Footer */}
        <View style={pdfStyles.footer}>
          <Text style={pdfStyles.footerText}>
            This report is for informational purposes only. Consult a qualified tax professional.
          </Text>
          <Text style={[pdfStyles.footerText, { marginTop: 3 }]}>
            Generated by Arcade Tax Guide | arcade-tax-guide.vercel.app
          </Text>
        </View>
      </View>
    </Page>
  </Document>
)

export default function ReportPage() {
  const [params] = useSearchParams()
  const name = params.get('name') || 'Valued Client'
  const email = params.get('email') || ''
  const income = Number(params.get('income')) || 0
  const reportRef = useRef(null)

  const data = computeReport(income)

  const downloadPDF = async () => {
    const blob = await pdf(<ReportPDF data={data} name={name} />).toBlob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Tax-Savings-Report.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div ref={reportRef} className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" style={{ backgroundColor: '#0a0a0f' }}>
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
          onClick={downloadPDF}
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
