import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

const FEATURED = [
  { name: 'ENLIST™ One Herbicide', cat: 'Herbicide', price: '$42.50/gal', savings: 'Save $11.13/gal' },
  { name: 'Acadia™ 2 SC',          cat: 'Fungicide', price: '$38.00/gal', savings: 'Save $5.00/gal'  },
  { name: 'Ally® XP',              cat: 'Herbicide', price: '$28.75/lb',  savings: null               },
]

export function Homepage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Hero */}
      <section
        className="py-24 px-8 text-center text-white"
        style={{ background: 'var(--color-cp-nav)' }}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to your online store</h1>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Browse our full product catalog, check current offers, and place orders online.
        </p>
        <div className="flex gap-3 justify-center">
          <Button size="lg" onPress={() => navigate('/products')}>Shop Products</Button>
          <Button size="lg" variant="secondary" onPress={() => navigate('/product-offers')}>View Offers</Button>
        </div>
      </section>

      {/* Dashboard stats */}
      <section className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Active Offers',     value: '24',    color: 'text-primary'   },
            { label: 'Pending Orders',    value: '3',     color: 'text-link'      },
            { label: 'Saved This Season', value: '$1,840',color: 'text-success'   },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-divider p-5">
              <p className="text-sm text-text-light mb-1">{label}</p>
              <p className={['text-2xl font-bold', color].join(' ')}>{value}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-text-dark mb-4">Featured Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED.map((p) => (
            <div key={p.name} className="bg-white rounded-xl border border-divider p-5 flex flex-col">
              <span className="text-xs font-medium text-white bg-tags rounded-full px-2.5 py-0.5 self-start">
                {p.cat}
              </span>
              <h3 className="font-semibold text-text-dark mt-3 mb-1">{p.name}</h3>
              <div className="text-xl font-bold text-primary">{p.price}</div>
              {p.savings && <div className="text-sm text-success font-medium mt-1">{p.savings}</div>}
              <Button className="mt-4" size="sm" onPress={() => navigate('/product-offers')}>
                View Offer
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
