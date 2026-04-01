import { useState, useEffect } from 'react'
import { SectionLabel, SectionWrapper, Card, StatBox } from '../components/Layout'

const PASSWORD = 'admin'

function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw === PASSWORD) {
      sessionStorage.setItem('analytics_auth', 'true')
      onAuth()
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className="min-h-screen bg-body flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-gold text-3xl" style={{ textShadow: '0 0 10px rgba(219,177,85,0.7)' }}>◈</span>
          <h1 className="font-heading text-gold text-2xl font-bold mt-3">Analytics Dashboard</h1>
          <p className="text-cream-60 text-sm mt-2">Enter password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError('') }}
            placeholder="Password"
            autoFocus
            className="w-full bg-body border border-card-border rounded-md px-4 py-3 text-cream placeholder-cream-40 focus:border-gold focus:outline-none transition-colors"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gold text-dark font-semibold rounded-sm hover:bg-gold/90 hover:shadow-[0_0_18px_rgba(219,177,85,0.55)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}

function LeadsTable({ leads }) {
  if (!leads || leads.length === 0) {
    return <p className="text-cream-50 text-sm">No leads found.</p>
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-card-border">
            <th className="text-left py-3 px-4 text-cream-50 font-nav uppercase tracking-wider text-xs">Name</th>
            <th className="text-left py-3 px-4 text-cream-50 font-nav uppercase tracking-wider text-xs">Email</th>
            <th className="text-left py-3 px-4 text-cream-50 font-nav uppercase tracking-wider text-xs">Phone</th>
            <th className="text-left py-3 px-4 text-cream-50 font-nav uppercase tracking-wider text-xs">Date Added</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr key={i} className="border-b border-card-border/50 hover:bg-card-bg transition-colors">
              <td className="py-3 px-4 text-cream">{lead.name}</td>
              <td className="py-3 px-4 text-cream-70">{lead.email || '—'}</td>
              <td className="py-3 px-4 text-cream-70">{lead.phone || '—'}</td>
              <td className="py-3 px-4 text-cream-60">{formatDate(lead.dateAdded)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const RECOMMENDATIONS = [
  'Add blog content targeting "arcade game tax deduction" keywords',
  'Optimize meta descriptions on all pages',
  'Set up Google Search Console and submit sitemap',
  'Share the site on social media for referral traffic',
  'A/B test the hero headline for better conversion',
]

export default function AnalyticsPage() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('analytics_auth') === 'true') {
      setAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (!authed) { setLoading(false); return }

    setLoading(true)
    fetch('/api/analytics')
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error)
        setData(d)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [authed])

  if (!authed) {
    return <PasswordGate onAuth={() => setAuthed(true)} />
  }

  return (
    <div className="min-h-screen bg-body text-cream pt-16 pb-16">
      <SectionWrapper>
        <div className="mb-10">
          <SectionLabel>Analytics</SectionLabel>
          <h1 className="font-heading text-gold text-3xl sm:text-4xl font-bold mt-4">Dashboard</h1>
        </div>

        {loading && <p className="text-cream-50">Loading analytics data...</p>}
        {error && <p className="text-red-400">Error: {error}</p>}

        {!loading && !error && (
          <div className="space-y-16">
            {/* Lead Generation */}
            <div>
              <h2 className="text-cream font-heading text-2xl font-semibold mb-6">Lead Generation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatBox label="Total Leads" value={data?.totalLeads ?? '---'} />
                <StatBox label="Leads This Week" value={data?.thisWeekLeads ?? '---'} />
              </div>
            </div>

            {/* Recent Leads */}
            <div>
              <h2 className="text-cream font-heading text-xl font-semibold mb-6">Recent Leads</h2>
              <Card className="!p-0">
                <LeadsTable leads={data?.recentLeads} />
              </Card>
            </div>

            {/* Weekly Recommendations */}
            <div>
              <h2 className="text-cream font-heading text-xl font-semibold mb-6">Weekly Recommendations</h2>
              <Card>
                <ul className="space-y-3">
                  {RECOMMENDATIONS.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-cream-70 text-sm leading-relaxed">
                      <span className="text-gold mt-0.5 flex-shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        )}
      </SectionWrapper>
    </div>
  )
}
