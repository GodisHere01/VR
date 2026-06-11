import { useState } from 'react'
import { supabase } from './supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit() {
    setLoading(true)
    setError('')
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email for a confirmation link before logging in.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          background: '#FFD700',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          color: '#0a0a0a'
        }}>S</div>
        <span style={{ color: 'white', fontWeight: '600', fontSize: '20px', letterSpacing: '-0.02em' }}>
          SpaceView
        </span>
      </div>

      {/* Card */}
      <div style={{
        background: '#111',
        border: '1px solid #1a1a1a',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '380px',
      }}>
        <h2 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 6px',
          letterSpacing: '-0.02em'
        }}>
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h2>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>
          {isSignUp ? 'Start your free trial today' : 'Sign in to your SpaceView account'}
        </p>

        {/* Email */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '10px 12px',
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Error / Message */}
        {error && (
          <div style={{
            background: '#2a0a0a',
            border: '1px solid #5a1a1a',
            borderRadius: '8px',
            padding: '10px 12px',
            color: '#ff6b6b',
            fontSize: '13px',
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}
        {message && (
          <div style={{
            background: '#0a2a0a',
            border: '1px solid #1a5a1a',
            borderRadius: '8px',
            padding: '10px 12px',
            color: '#6bff6b',
            fontSize: '13px',
            marginBottom: '16px',
          }}>
            {message}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: loading ? '#888' : '#FFD700',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '16px',
          }}
        >
          {loading ? 'Please wait...' : isSignUp ? 'Create account' : 'Sign in'}
        </button>

        {/* Toggle */}
        <p style={{ color: '#666', fontSize: '13px', textAlign: 'center', margin: 0 }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          {' '}
          <span
            onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage('') }}
            style={{ color: '#FFD700', cursor: 'pointer' }}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  )
}