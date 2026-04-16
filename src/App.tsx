import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { ColorExtractor } from './screens/ColorExtractor'
import { SignIn }          from './screens/SignIn'
import { Homepage }        from './screens/Homepage'
import { Products }        from './screens/Products'
import { ProductOffers }   from './screens/ProductOffers'
import { THClients }       from './screens/THClients'
import { About }           from './screens/About'
import { SkinSwitcher }    from './components/SkinSwitcher'

const NAV_ITEMS = [
  { path: '/',                label: 'Home'      },
  { path: '/products',        label: 'Products'  },
  { path: '/product-offers',  label: 'Offers'    },
  { path: '/about',           label: 'About'     },
  { path: '/th-clients',      label: 'TH Clients'},
  { path: '/sign-in',         label: 'Sign In'   },
  { path: '/color-extractor', label: '🎨 Extractor', accent: true },
]

function DemoNav() {
  const { pathname } = useLocation()
  return (
    <nav className="bg-white border-b border-divider px-5 py-2.5 flex items-center gap-1 sticky top-0 z-40 shadow-sm flex-wrap">
      <span className="text-[10px] font-bold text-text-light uppercase tracking-widest mr-3 select-none">
        Demo
      </span>
      {NAV_ITEMS.map(({ path, label, accent }) => (
        <Link
          key={path}
          to={path}
          className={[
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
            pathname === path
              ? 'bg-primary/10 text-primary'
              : accent
              ? 'text-primary hover:bg-primary/5'
              : 'text-text-base hover:bg-bg-base',
          ].join(' ')}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <DemoNav />
      <Routes>
        <Route path="/"                element={<Homepage />}        />
        <Route path="/sign-in"         element={<SignIn />}           />
        <Route path="/products"        element={<Products />}         />
        <Route path="/product-offers"  element={<ProductOffers />}    />
        <Route path="/about"           element={<About />}            />
        <Route path="/th-clients"      element={<THClients />}        />
        <Route path="/color-extractor" element={<ColorExtractor />}   />
      </Routes>
      <SkinSwitcher />
    </BrowserRouter>
  )
}
