import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button }     from '../components/Button'
import { Select }     from '../components/Select'
import { Tabs }       from '../components/Tabs'
import { Pagination } from '../components/Pagination'

const ALL_PRODUCTS = [
  { name: 'ENLIST™ One Herbicide', cat: 'Herbicide', ai: 'Enlist One',      conc: '3.33 lb ae/gal', price: '$42.50' },
  { name: 'Acadia™ 2 SC',          cat: 'Fungicide', ai: 'Azoxystrobin',    conc: '2 lb/gal',       price: '$38.00' },
  { name: 'Ally® XP',              cat: 'Herbicide', ai: 'Metsulfuron',     conc: '60%',            price: '$28.75' },
  { name: 'Ammonium Sulfate',      cat: 'Fertilizer',ai: 'N/A',             conc: '21-0-0',         price: '$18.00' },
  { name: 'Warrant® Ultra',        cat: 'Herbicide', ai: 'Acetochlor',      conc: '3 lb/gal',       price: '$34.50' },
  { name: 'Stratego® YLD',         cat: 'Fungicide', ai: 'Trifloxystrobin', conc: '1.56 lb/gal',    price: '$55.00' },
  { name: 'Roundup PowerMAX®',     cat: 'Herbicide', ai: 'Glyphosate',      conc: '4.5 lb ae/gal',  price: '$22.00' },
  { name: 'Delaro® 325 SC',        cat: 'Fungicide', ai: 'Prothioconazole', conc: '3.12 lb/gal',    price: '$48.00' },
  { name: 'Urea 46-0-0',           cat: 'Fertilizer',ai: 'N/A',             conc: '46%',            price: '$25.00' },
]

const CAT_OPTIONS = [
  { id: 'all',        label: 'All Categories' },
  { id: 'herbicide',  label: 'Herbicide'      },
  { id: 'fungicide',  label: 'Fungicide'      },
  { id: 'fertilizer', label: 'Fertilizer'     },
]

export function Products() {
  const [cat, setCat]   = useState('all')
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const filtered = ALL_PRODUCTS.filter(
    (p) => cat === 'all' || p.cat.toLowerCase() === cat,
  )

  const tabContent = (label: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((product) => (
        <div key={product.name} className="bg-white rounded-xl border border-divider p-5 flex flex-col">
          <span className="text-xs font-medium text-white bg-tags rounded-full px-2.5 py-0.5 self-start mb-3">
            {product.cat}
          </span>
          <h3 className="font-semibold text-text-dark mb-1">{product.name}</h3>
          <p className="text-sm text-text-light">AI: {product.ai}</p>
          <p className="text-sm text-text-light mb-3">{product.conc}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-primary">{product.price}</span>
            <Button size="sm" onPress={() => navigate('/product-offers')}>Offers</Button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-text-dark">Products</h1>
          <Select
            options={CAT_OPTIONS}
            placeholder="All Categories"
            className="w-52"
            onSelectionChange={(k) => { setCat(k as string); setPage(1) }}
          />
        </div>

        <Tabs
          tabs={[
            { id: 'all',    label: 'All',      content: tabContent('all')    },
            { id: 'offers', label: 'On Offer', content: tabContent('offers') },
          ]}
        />

        <div className="flex justify-center mt-8">
          <Pagination page={page} total={filtered.length * 3} pageSize={9} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}
