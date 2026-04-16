import { useState } from 'react'
import { Button }   from '../components/Button'
import { Tabs }     from '../components/Tabs'

const OFFERS = [
  {
    name:     'ENLIST™ One Herbicide',
    cat:      'Herbicide',
    ai:       'Enlist One  3.33 lb ae/gal',
    price:    '$42.50 / gal',
    rebate:   '$8.00 / gal manufacturer rebate',
    warranty: '110% price warranty',
    savings:  'Save $11.13 / gal',
    valid:    'Offer valid through Dec 31',
  },
  {
    name:     'Acadia™ 2 SC',
    cat:      'Fungicide',
    ai:       'Azoxystrobin  2 lb/gal',
    price:    '$38.00 / gal',
    rebate:   '$3.50 / gal manufacturer rebate',
    warranty: null,
    savings:  'Save $5.00 / gal',
    valid:    'Offer valid through Nov 30',
  },
  {
    name:     'Stratego® YLD',
    cat:      'Fungicide',
    ai:       'Trifloxystrobin  1.56 lb/gal',
    price:    '$55.00 / gal',
    rebate:   '$6.00 / gal manufacturer rebate',
    warranty: '100% price warranty',
    savings:  'Save $9.20 / gal',
    valid:    'Offer valid through Oct 15',
  },
]

function OfferCard({ offer }: { offer: typeof OFFERS[0] }) {
  return (
    <div className="bg-white rounded-xl border border-divider p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-medium text-white bg-tags rounded-full px-2.5 py-0.5">
            {offer.cat}
          </span>
          <h3 className="font-bold text-text-dark text-lg mt-2">{offer.name}</h3>
          <p className="text-sm text-text-light">{offer.ai}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{offer.price}</div>
          <div className="text-sm text-success font-semibold mt-0.5">{offer.savings}</div>
        </div>
      </div>

      <div className="space-y-1.5 mb-5 text-sm">
        <div className="flex items-center gap-2 text-text-base">
          <span className="text-success">●</span>
          {offer.rebate}
        </div>
        {offer.warranty && (
          <div className="flex items-center gap-2 text-text-base">
            <span className="text-link">●</span>
            {offer.warranty}
          </div>
        )}
        <div className="flex items-center gap-2 text-text-light text-xs">
          <span>📅</span>
          {offer.valid}
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1">Add to Order</Button>
        <Button variant="secondary">Request Quote</Button>
      </div>
    </div>
  )
}

export function ProductOffers() {
  return (
    <div className="min-h-screen bg-bg-base">
      <div className="max-w-5xl mx-auto px-8 py-8">
        <h1 className="text-2xl font-bold text-text-dark mb-6">Current Offers</h1>
        <Tabs
          tabs={[
            { id: 'all',       label: 'All Offers',   content: <div className="space-y-4">{OFFERS.map((o) => <OfferCard key={o.name} offer={o} />)}</div> },
            { id: 'herbicide', label: 'Herbicide',    content: <div className="space-y-4">{OFFERS.filter(o => o.cat === 'Herbicide').map((o) => <OfferCard key={o.name} offer={o} />)}</div> },
            { id: 'fungicide', label: 'Fungicide',    content: <div className="space-y-4">{OFFERS.filter(o => o.cat === 'Fungicide').map((o) => <OfferCard key={o.name} offer={o} />)}</div> },
          ]}
        />
      </div>
    </div>
  )
}
