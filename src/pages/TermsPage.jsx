import { useNavigate } from 'react-router-dom'

function ArrowBackIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  )
}

function TermsHeader() {
  const navigate = useNavigate()
  return (
    <header style={{ background: '#0a0a0f' }} className="border-b border-[#dbb155]/20 py-3 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-[#dbb155] text-lg leading-none" style={{ textShadow: '0 0 8px rgba(219,177,85,0.7)' }}>◈</span>
          <span className="font-['Playfair_Display',serif] font-bold text-lg text-[#dbb155] group-hover:opacity-80 transition-opacity" style={{ textShadow: '0 0 10px rgba(219,177,85,0.4)' }}>
            Arcade Tax Guide
          </span>
        </a>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-white/50 hover:text-[#dbb155] text-xs font-['Inter',sans-serif] transition-colors cursor-pointer bg-transparent border-none"
        >
          <ArrowBackIcon />
          Back
        </button>
      </div>
    </header>
  )
}

function TermsFooter() {
  return (
    <footer style={{ background: '#0a0a0f' }} className="border-t border-[#dbb155]/20 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-white/40 text-sm mb-1">© {new Date().getFullYear()} Arcade Tax Guide. All rights reserved.</p>
        <p className="text-xs text-white/25">Not tax advice. Consult your CPA.</p>
      </div>
    </footer>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="font-['Playfair_Display',serif] text-[#dbb155] text-xl font-bold mb-4">{title}</h2>
      <div className="text-cream-70 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  )
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      <TermsHeader />

      <div className="flex-1 px-4 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#dbb155]/20 bg-[#dbb155]/5 mb-4">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] font-['Inter',sans-serif] text-[#dbb155]">Legal</span>
            </span>
            <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-[#dbb155] mb-3" style={{ textShadow: '0 0 12px rgba(219,177,85,0.3)' }}>
              Terms of Service
            </h1>
            <p className="text-white/40 text-sm font-['Inter',sans-serif]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="bg-white/[0.03] border border-[#dbb155]/10 rounded-2xl p-8 sm:p-10">
            <Section title="1. Agreement to Terms">
              <p>
                By accessing or purchasing from Arcade Tax Guide ("Company," "we," "us," or "our"), you agree to be bound
                by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
              <p>
                These Terms of Service apply to all purchases made through our website, including but not limited to our
                arcade machine tax deduction education and consultation services.
              </p>
            </Section>

            <Section title="2. Services Description">
              <p>
                Arcade Tax Guide provides educational resources and consultation services related to arcade machine tax
                deduction strategies. Our services include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Educational materials and guides on tax-advantaged arcade machine acquisition</li>
                <li>One-on-one consultation and onboarding sessions</li>
                <li>Entity and compliance documentation guidance</li>
                <li>Revenue-share program enrollment assistance</li>
                <li>Ongoing advisor access</li>
              </ul>
              <p className="mt-3">
                <strong className="text-white/80">Important:</strong> Arcade Tax Guide does not provide legal or certified
                tax advice. All strategies and recommendations are for educational purposes. Consult your CPA or tax
                professional before implementing any tax strategy.
              </p>
            </Section>

            <Section title="3. Pricing & Payment Terms">
              <p>Our current pricing structure is as follows:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-white/80">Single Unit Package:</strong> $28,650 — includes arcade game deposit,
                  administration fee, and convenience fee.
                </li>
                <li>
                  <strong className="text-white/80">Two Unit Package:</strong> $57,300 — includes two arcade game deposits,
                  administration fees, and convenience fees.
                </li>
              </ul>
              <p className="mt-3">
                All payments are processed securely through SwissPay. Prices are listed in United States Dollars (USD)
                and are subject to change at any time without prior notice. Pricing in effect at the time of purchase
                will apply to your order.
              </p>
              <p>
                Payment is due in full at the time of purchase. By submitting your payment information, you authorize
                us to charge the full amount for the selected package.
              </p>
            </Section>

            <Section title="4. Refund Policy">
              <p>
                Because our services are digital and consultation-based, we maintain a limited refund policy:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-white/80">Cancellation within 7 days:</strong> You may cancel your purchase
                  within 7 calendar days of the transaction date, provided that your onboarding session has not yet
                  begun. Refunds issued under this policy will be subject to a deduction of all processing fees
                  (including SwissPay transaction fees, typically 2.9% + $0.30).
                </li>
                <li>
                  <strong className="text-white/80">After onboarding begins:</strong> All sales are final once your
                  onboarding session has commenced. No refunds, partial or full, will be issued.
                </li>
                <li>
                  <strong className="text-white/80">No returns:</strong> As a digital service product, there are no
                  physical returns. All services are non-refundable after the cancellation window or after services
                  have begun.
                </li>
              </ul>
              <p className="mt-3">
                To request a cancellation within the eligible window, contact us at{' '}
                <a href="mailto:hello@scalesolving.com" className="text-[#dbb155] hover:underline">hello@scalesolving.com</a>.
                Refund requests must be submitted in writing via email.
              </p>
            </Section>

            <Section title="5. Intellectual Property">
              <p>
                All content provided through Arcade Tax Guide, including but not limited to educational materials,
                guides, templates, documents, videos, and digital resources, is the exclusive intellectual property
                of Arcade Tax Guide.
              </p>
              <p>You are granted a limited, non-exclusive, non-transferable license to access and use this content for your personal, non-commercial use in connection with your purchase. You may not:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Copy, reproduce, distribute, or publish any materials without written permission</li>
                <li>Share, sell, or sublicense access to our content or services</li>
                <li>Modify, adapt, or create derivative works from our materials</li>
                <li>Use our content for any commercial purpose outside your own tax strategy implementation</li>
              </ul>
              <p className="mt-3">
                Unauthorized use of our intellectual property may result in legal action and termination of your access
                without refund.
              </p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, Arcade Tax Guide, its officers, employees, agents,
                and affiliates shall not be liable for any:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Tax liabilities, penalties, or interest resulting from the use or misuse of our services</li>
                <li>Errors, omissions, or inaccuracies in the educational materials provided</li>
              </ul>
              <p className="mt-3">
                Our total liability to you for any claim arising from or relating to these terms or our services shall
                not exceed the amount you paid for the specific package purchased.
              </p>
            </Section>

            <Section title="7. No Tax Advice Disclaimer">
              <p>
                Arcade Tax Guide provides educational information and strategy consultation. We are not a certified
                public accounting firm, tax attorney practice, or licensed financial advisory service. Nothing on our
                website or in our consultations constitutes professional tax advice.
              </p>
              <p>
                Tax laws vary by jurisdiction and are subject to change. You are strongly encouraged to consult with a
                qualified tax professional before making any financial decisions based on our educational content.
              </p>
            </Section>

            <Section title="8. Modifications to Terms">
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
                upon posting to our website. Your continued use of our services after any modifications indicates your
                acceptance of the updated terms.
              </p>
              <p>
                It is your responsibility to review these Terms of Service periodically for any changes. We will make
                reasonable efforts to notify users of material changes.
              </p>
            </Section>

            <Section title="9. Governing Law">
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of
                Delaware, without regard to its conflict of law provisions. Any disputes arising under these terms
                shall be resolved exclusively in the courts of Delaware.
              </p>
            </Section>

            <Section title="10. Contact Information">
              <p>
                For questions, concerns, or refund requests, please contact us:
              </p>
              <p className="mt-2">
                Email:{' '}
                <a href="mailto:hello@scalesolving.com" className="text-[#dbb155] hover:underline">hello@scalesolving.com</a>
              </p>
            </Section>
          </div>
        </div>
      </div>

      <TermsFooter />
    </div>
  )
}