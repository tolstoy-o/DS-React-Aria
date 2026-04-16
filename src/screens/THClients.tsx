import { useState } from 'react'
import { Table }      from '../components/Table'
import { Button }     from '../components/Button'
import { Pagination } from '../components/Pagination'

const COLUMNS = [
  { id: 'rank',        name: '#',           width: 'w-12' },
  { id: 'name',        name: 'Client Name', isRowHeader: true, allowsSorting: true },
  { id: 'location',    name: 'Location',    allowsSorting: true },
  { id: 'orders',      name: 'Orders',      allowsSorting: true },
  { id: 'revenue',     name: 'Revenue',     allowsSorting: true },
  { id: 'status',      name: 'Status' },
  { id: 'actions',     name: '' },
]

const STATES = ['Iowa', 'Illinois', 'Indiana', 'Nebraska', 'Kansas']

const CLIENTS = Array.from({ length: 10 }, (_, i) => ({
  rank:     i + 1,
  name:     `${['Sunrise', 'Heartland', 'Prairie', 'Green Acres', 'River Bend', 'Summit', 'Horizon', 'Valley', 'Meadow', 'Crest'][i]} Farm`,
  location: STATES[i % 5],
  orders:   Math.floor(Math.random() * 50 + 5),
  revenue:  '$' + (Math.random() * 95000 + 5000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  status:   (
    <span className={['text-xs font-semibold px-2 py-0.5 rounded-full', i % 4 === 0 ? 'bg-fail/10 text-fail' : 'bg-success/10 text-success'].join(' ')}>
      {i % 4 === 0 ? 'Inactive' : 'Active'}
    </span>
  ),
  actions: <Button size="sm" variant="secondary">View</Button>,
}))

const NAV_ITEMS = ['Dashboard', 'Clients', 'Orders', 'Reports', 'Settings']

export function THClients() {
  const [page, setPage] = useState(1)

  return (
    <div className="flex h-[calc(100vh-48px)]">
      {/* TH Sidebar */}
      <aside
        className="w-48 text-white flex flex-col pt-8 px-3 flex-shrink-0"
        style={{ background: 'var(--color-th-nav)' }}
      >
        <div className="font-bold text-base px-3 mb-8 tracking-wide">TH Portal</div>
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item}
            className={[
              'text-left px-3 py-2 rounded-lg text-sm mb-1 transition-colors',
              i === 1 ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:bg-white/10 hover:text-white',
            ].join(' ')}
          >
            {item}
          </button>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto bg-bg-base p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-dark">Clients</h1>
            <p className="text-text-light text-sm mt-0.5">4,308 total clients</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Export CSV</Button>
            <Button>+ Add Client</Button>
          </div>
        </div>

        <Table columns={COLUMNS} rows={CLIENTS} />

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-text-light">Showing 1–10 of 4,308</p>
          <Pagination page={page} total={4308} onChange={setPage} />
        </div>
      </main>
    </div>
  )
}
