import { Button } from '../components/Button'

const BENEFITS = [
  'Access current pricing and manufacturer offers',
  'Order anytime, from anywhere',
  'Track your purchase history',
  'Earn rebates automatically',
  'Get early access to pre-season pricing',
]

export function About() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Hero */}
      <section
        className="py-16 px-8 text-white text-center"
        style={{ background: 'var(--color-cp-nav)' }}
      >
        <h1 className="text-3xl font-bold mb-3">About Us</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          Your trusted agricultural partner, now online.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-8 py-12 space-y-6">
        <div className="bg-white rounded-xl border border-divider p-8">
          <h2 className="text-xl font-bold text-text-dark mb-3">Our Story</h2>
          <p className="text-text-base leading-relaxed">
            We are a trusted agricultural retailer serving farmers across the region.
            Our online platform makes it easy to browse products, compare offers, and
            place orders from anywhere — whether you're in the field or at the office.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-divider p-8">
          <h2 className="text-xl font-bold text-text-dark mb-4">Why Shop Online?</h2>
          <ul className="space-y-3">
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-base">
                <span className="text-success mt-0.5 text-base leading-none">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-divider p-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-dark mb-1">Get in touch</h2>
            <p className="text-text-light text-sm">Our team is here to help with orders and questions.</p>
          </div>
          <Button size="lg">Contact Us</Button>
        </div>

        <p className="text-center text-xs text-text-light pt-4">
          Built with{' '}
          <a href="https://agvend.com" className="text-link hover:underline" target="_blank" rel="noreferrer">
            AgVend
          </a>
        </p>
      </div>
    </div>
  )
}
