import { useNavigate } from 'react-router-dom'

function ArrowBackIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  )
}

function PrivacyHeader() {
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

function PrivacyFooter() {
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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      <PrivacyHeader />

      <div className="flex-1 px-4 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#dbb155]/20 bg-[#dbb155]/5 mb-4">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] font-['Inter',sans-serif] text-[#dbb155]">Legal</span>
            </span>
            <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-[#dbb155] mb-3" style={{ textShadow: '0 0 12px rgba(219,177,85,0.3)' }}>
              Privacy Policy
            </h1>
            <p className="text-white/40 text-sm font-['Inter',sans-serif]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="bg-white/[0.03] border border-[#dbb155]/10 rounded-2xl p-8 sm:p-10">
            <Section title="1. Introduction">
              <p>
                Arcade Tax Guide ("Company," "we," "us," or "our") respects your privacy and is committed to protecting
                your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or purchase our services.
              </p>
              <p>
                By using our website and services, you consent to the practices described in this Privacy Policy. If
                you do not agree with our policies, please do not use our services.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We collect the following types of information when you use our services:</p>

              <h3 className="text-white/80 font-semibold mt-4 mb-2">Personal Information You Provide</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-white/80">Name:</strong> First and last name for order processing and communication</li>
                <li><strong className="text-white/80">Email Address:</strong> For order confirmation, service communication, and support</li>
                <li><strong className="text-white/80">Phone Number:</strong> For scheduling consultations and onboarding sessions</li>
                <li><strong className="text-white/80">Payment Information:</strong> Credit card details, billing address, and related financial information. All payment data is processed directly through SwissPay — we do not store full credit card numbers on our servers.</li>
                <li><strong className="text-white/80">Financial Information:</strong> Income, filing status, tax situation details as voluntarily provided during consultation.</li>
              </ul>

              <h3 className="text-white/80 font-semibold mt-4 mb-2">Information Collected Automatically</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Browser type and version</li>
                <li>Device information and operating system</li>
                <li>IP address and geographic location (approximate)</li>
                <li>Pages visited, time spent, and navigation patterns</li>
                <li>Referring website or source</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Processing and fulfilling your orders</li>
                <li>Communicating with you about your purchase and onboarding</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Delivering consultation services and educational materials</li>
                <li>Improving our website, services, and user experience</li>
                <li>Sending service-related communications (not marketing) regarding your account</li>
                <li>Complying with legal obligations and preventing fraud</li>
              </ul>
              <p className="mt-3">
                We will not use your personal information for purposes materially different than those described in this
                policy without obtaining your consent.
              </p>
            </Section>

            <Section title="4. Information Sharing & Disclosure">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We only share your data with
                trusted service providers who help us operate our business, under strict data protection agreements:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-white/80">SwissPay:</strong> We share payment information and transaction
                  details with SwissPay to securely process payments. SwissPay handles all credit card data in
                  compliance with PCI DSS standards. We recommend reviewing{' '}
                  <a href="https://swisspay.app/privacy" target="_blank" rel="noopener noreferrer" className="text-[#dbb155] hover:underline">SwissPay's Privacy Policy</a>.
                </li>
                <li>
                  <strong className="text-white/80">GoHighLevel (GHL):</strong> We use GoHighLevel as our CRM to manage
                  customer relationships, schedule consultations, and track communications. Your name, email, phone
                  number, and consultation notes may be stored in GHL.
                </li>
                <li>
                  <strong className="text-white/80">Vercel:</strong> Our website is hosted on Vercel, which may process
                  IP addresses and session data for analytics and security.
                </li>
                <li>
                  <strong className="text-white/80">Google Analytics:</strong> We use Google Analytics to understand
                  website usage patterns and improve our services. Analytics data is anonymized and aggregated where
                  possible.
                </li>
              </ul>
              <p className="mt-3">
                We may also disclose your information if required by law, court order, or governmental regulation, or
                to protect our rights, property, or safety.
              </p>
            </Section>

            <Section title="5. Data Retention">
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                Privacy Policy, or as required by applicable law. Specifically:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Order and payment records: 7 years (for tax and accounting compliance)</li>
                <li>CRM data: Duration of the customer relationship plus 2 years</li>
                <li>Analytics data: 26 months</li>
                <li>Email communications: Duration of communication thread plus 1 year</li>
              </ul>
              <p className="mt-3">
                When data is no longer needed, we securely delete or anonymize it.
              </p>
            </Section>

            <Section title="6. Your Rights & Choices">
              <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-white/80">Right to Access:</strong> Request a copy of the personal information
                  we hold about you.
                </li>
                <li>
                  <strong className="text-white/80">Right to Correction:</strong> Request correction of inaccurate or
                  incomplete data.
                </li>
                <li>
                  <strong className="text-white/80">Right to Deletion:</strong> Request deletion of your personal
                  information, subject to legal retention requirements.
                </li>
                <li>
                  <strong className="text-white/80">Right to Data Portability:</strong> Request a copy of your data in
                  a structured, machine-readable format.
                </li>
                <li>
                  <strong className="text-white/80">Right to Object:</strong> Object to the processing of your data for
                  direct marketing or legitimate interests.
                </li>
                <li>
                  <strong className="text-white/80">Right to Withdraw Consent:</strong> Withdraw consent at any time
                  where we rely on consent as the legal basis for processing.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:info@fastfundbusiness.com" className="text-[#dbb155] hover:underline">info@fastfundbusiness.com</a>.
                We will respond to your request within 30 days.
              </p>
            </Section>

            <Section title="7. Cookies & Tracking">
              <p>
                Our website uses cookies and similar tracking technologies to improve your experience, analyze usage,
                and support our analytics services. Types of cookies we use include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-white/80">Essential Cookies:</strong> Necessary for the website to function
                  properly. These cannot be disabled.
                </li>
                <li>
                  <strong className="text-white/80">Analytics Cookies:</strong> Help us understand how visitors interact
                  with our website (e.g., Google Analytics).
                </li>
                <li>
                  <strong className="text-white/80">Session Cookies:</strong> Temporary cookies that enable checkout
                  functionality and form state management.
                </li>
              </ul>
              <p className="mt-3">
                You can control cookie preferences through your browser settings. Disabling certain cookies may affect
                website functionality.
              </p>
            </Section>

            <Section title="8. Data Security">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information,
                including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>256-bit SSL/TLS encryption for all data transmitted to and from our website</li>
                <li>PCI-compliant payment processing through SwissPay</li>
                <li>Regular security assessments and monitoring</li>
                <li>Access controls limiting data access to authorized personnel only</li>
              </ul>
              <p className="mt-3">
                While we take reasonable precautions, no method of electronic storage or transmission is 100% secure.
                We cannot guarantee absolute security of your data.
              </p>
            </Section>

            <Section title="9. Third-Party Links">
              <p>
                Our website may contain links to third-party websites, including SwissPay and GoHighLevel. We are not
                responsible for the privacy practices of these external sites. We encourage you to review the privacy
                policies of any third-party services you interact with.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an
                updated "Last updated" date. Material changes will be communicated to active customers via email.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect
                your information.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                please contact us:
              </p>
              <p className="mt-2">
                Email:{' '}
                <a href="mailto:info@fastfundbusiness.com" className="text-[#dbb155] hover:underline">info@fastfundbusiness.com</a>
              </p>
            </Section>
          </div>
        </div>
      </div>

      <PrivacyFooter />
    </div>
  )
}