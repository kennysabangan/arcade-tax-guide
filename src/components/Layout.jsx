import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Tax Guide', to: '/tax-guide' },
  { label: 'Calculator', to: '/calculator' },
  { label: 'Financials', to: '/financials' },
  { label: 'Retirement Planning', to: '/retirement' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  const linkClass = ({ isActive }) =>
    `px-3 py-1.5 text-sm landscape:px-2 landscape:py-1 landscape:text-xs rounded-md transition-colors cursor-pointer ${
      isActive
        ? 'text-gold bg-gold-20'
        : 'text-cream-70 hover:text-cream hover:bg-white/5'
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 font-nav border-b transition-all duration-300 ${
        scrolled ? 'bg-body/95 backdrop-blur-md border-gold-20' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <span
            className="text-gold text-lg leading-none"
            style={{ textShadow: '0 0 8px rgba(219,177,85,0.7)' }}
          >
            ◈
          </span>
          <span
            className="font-heading font-bold text-lg landscape:text-base tracking-wide text-gold transition-all duration-200 group-hover:opacity-80"
            style={{ textShadow: '0 0 10px rgba(219,177,85,0.4)' }}
          >
            Arcade Tax Guide
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
          <a
            href="/#book-a-call"
            className="ml-3 px-4 py-1.5 text-sm bg-gold text-dark font-semibold rounded-md hover:bg-gold/90 hover:shadow-[0_0_14px_rgba(219,177,85,0.4)] transition-all duration-200 cursor-pointer"
          >
            Book a Call
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cream p-2 cursor-pointer hover:text-gold transition-colors duration-200 rounded-md hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-body/98 backdrop-blur-md border-t border-gold-20 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 flex flex-col gap-1 landscape:py-2 landscape:gap-0.5">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={close} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
            <a
              href="/#book-a-call"
              onClick={close}
              className="mt-2 px-4 py-2.5 text-sm landscape:mt-1 landscape:py-1.5 landscape:text-xs bg-gold text-dark font-semibold rounded-md text-center hover:bg-gold/90 transition-colors duration-200 cursor-pointer"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-gold-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link to="/" className="font-heading text-gold font-bold text-lg hover:opacity-80 transition-opacity">
              Arcade Tax Guide
            </Link>
            <p className="text-cream-50 text-sm mt-1">IRC Section 168(k) Tax Strategy Resource</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-cream-60">
            <Link to="/tax-guide" className="hover:text-gold transition-colors">Tax Guide</Link>
            <Link to="/calculator" className="hover:text-gold transition-colors">Calculator</Link>
            <Link to="/financials" className="hover:text-gold transition-colors">Financials</Link>
            <Link to="/retirement" className="hover:text-gold transition-colors">Retirement</Link>
            <a href="/#book-a-call" className="hover:text-gold transition-colors">Book a Call</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gold-20 text-center text-cream-40 text-xs">
          <p>
            This guide is for informational purposes only and does not constitute tax, legal, or financial advice.
            Consult with a qualified CPA or tax professional before making any tax-related decisions.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Arcade Tax Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export function FloatingCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <a
      href="/#book-a-call"
      className={`fixed bottom-6 right-6 z-40 px-5 py-3 bg-gold text-dark font-semibold text-sm rounded-full shadow-lg cursor-pointer hover:bg-gold/90 hover:shadow-[0_0_20px_rgba(219,177,85,0.5)] active:scale-95 transition-all duration-200 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      Book a Discovery Call
    </a>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div className="min-h-screen bg-body text-cream">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}

export function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-gold-20 bg-gold-20/10">
      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] font-nav text-gold whitespace-nowrap">
        {children}
      </span>
    </div>
  )
}

export function SectionWrapper({ children, id, className = '' }) {
  return (
    <section id={id} className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`relative p-6 bg-card-bg border border-card-border rounded-lg hover:bg-card-bg-hover transition-colors ${className}`}>
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold rounded-tl-sm" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold rounded-tr-sm" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold rounded-bl-sm" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold rounded-br-sm" />
      {children}
    </div>
  )
}

export function CTAButton({ href, to, onClick, children, variant = 'filled', className = '' }) {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm transition-all duration-200 cursor-pointer ${
    variant === 'filled'
      ? 'bg-gold text-dark font-semibold hover:bg-gold/90 hover:shadow-[0_0_18px_rgba(219,177,85,0.55)] active:scale-[0.98]'
      : 'border border-gold/60 text-gold font-medium hover:border-gold hover:bg-gold-20 hover:shadow-[0_0_14px_rgba(219,177,85,0.3)] active:scale-[0.98]'
  } ${className}`

  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}

export function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const ref = useRef(null)
  const [height, setHeight] = useState(defaultOpen ? undefined : 0)

  useEffect(() => {
    setHeight(open ? ref.current?.scrollHeight : 0)
  }, [open])

  return (
    <div className="border border-card-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-card-bg hover:bg-card-bg-hover transition-colors"
      >
        <span className="text-cream font-medium pr-4">{title}</span>
        <svg
          className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        style={{ height: height === undefined ? 'auto' : `${height}px` }}
        className="transition-[height] duration-300 ease-in-out overflow-hidden"
      >
        <div ref={ref} className="px-5 py-4 text-cream-70 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export function StatBox({ icon, label, value, sublabel }) {
  return (
    <div
      className="relative rounded-sm p-5 text-center overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(219,177,85,0.2)',
        boxShadow: '0 0 20px rgba(219,177,85,0.05), inset 0 1px 0 rgba(219,177,85,0.1)',
      }}
    >
      <div
        className="absolute top-0 left-4 right-4 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(219,177,85,0.4), transparent)' }}
      />
      {icon && <div className="text-gold mb-2 flex justify-center">{icon}</div>}
      <div className="text-cream-50 text-xs uppercase tracking-[0.2em] mb-2 font-nav">{label}</div>
      <div
        className="text-gold font-mono text-3xl font-black tracking-tight"
        style={{ textShadow: '0 0 16px rgba(219,177,85,0.6), 0 0 32px rgba(219,177,85,0.2)' }}
      >
        {value}
      </div>
      {sublabel && (
        <div className="text-cyan text-xs mt-1.5 font-mono tracking-widest uppercase opacity-70">{sublabel}</div>
      )}
    </div>
  )
}
