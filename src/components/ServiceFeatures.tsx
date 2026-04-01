import { SectionLabel, SectionWrapper, Card, CTAButton } from '../components/Layout'

const SERVICE_FEATURES = [
  {
    icon: "🎨",
    title: "Bookkeeping",
    description: "We keep your books clean so you can focus on growth. Monthly reconciliations, categorizations, and reports you can actually understand.",
    action: "Start Bookkeeping",
    actionColor: "bg-purple-500",
  },
  {
    icon: "📱",
    title: "Payroll Services",
    description: "Pay your team on time, every time. We handle payroll processing, tax withholdings, and filings so nothing slips through.",
    action: "Get Payroll",
    actionColor: "bg-teal-500",
  },
  {
    icon: "💡",
    title: "Business Advisory",
    description: "Beyond the numbers — we help you make smart decisions. Cash flow planning, growth strategy, and financial forecasting.",
    action: "Get Advice",
    actionColor: "bg-amber-500",
  },
  {
    icon: "🔔",
    title: "IRS Representation",
    description: "Audits, notices, collections — we handle the IRS so you don't have to. Full representation and peace of mind.",
    action: "Handle IRS",
    actionColor: "bg-rose-500",
  },
]

function ServiceCard({ icon, title, description, action, actionColor }) {
  return (
    <Card className="flex flex-col h-full group">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-gold font-heading font-bold text-xl mb-3">{title}</h3>
      <p className="text-cream-70 text-sm leading-relaxed flex-grow">{description}</p>
      <div className="mt-4 pt-4 border-t border-card-border">
        <CTAButton href="/#book-a-call" variant="outline" className="w-full text-sm">
          {action}
        </CTAButton>
      </div>
    </Card>
  )
}

export default function ServiceFeatures() {
  return (
    <SectionWrapper id="services">
      <div className="text-center mb-12">
        <SectionLabel>Our Services</SectionLabel>
        <h2 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4 mb-4">Full-Service Tax & Accounting</h2>
        <p className="text-cream-70 text-lg max-w-2xl mx-auto">
          From bookkeeping to IRS representation — we handle every financial detail so you can run your business.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICE_FEATURES.map((feature, i) => (
          <ServiceCard key={i} {...feature} />
        ))}
      </div>
    </SectionWrapper>
  )
}
