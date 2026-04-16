import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button }    from '../components/Button'
import { TextField } from '../components/TextField'

export function SignIn() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base">
      <div className="bg-white rounded-2xl shadow-sm border border-divider p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary mx-auto mb-4 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-9H20M4 12H3m15.07 5.07l-.71-.71M6.34 6.34l-.71-.71m12.02 0l-.71.71M6.34 17.66l-.71.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-dark">Welcome back</h1>
          <p className="text-text-light text-sm mt-1">Sign in to your account</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/') }}>
          <TextField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
          />
          <TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
          />
          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[var(--color-primary)] w-4 h-4 rounded" />
              <span className="text-text-base">Remember me</span>
            </label>
            <a href="#" className="text-link hover:underline">Forgot password?</a>
          </div>
          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-text-light mt-6">
          Don't have an account?{' '}
          <a href="#" className="text-link hover:underline font-medium">
            Contact your retailer
          </a>
        </p>
      </div>
    </div>
  )
}
