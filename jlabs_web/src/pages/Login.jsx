import { useState } from 'react'
import { api } from '../api'
import { saveToken } from '../auth'

export default function Login() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('P@ssw0rd!')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { data } = await api.post('/login', { email, password })
      saveToken(data.token)
      window.location.href = '/'
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        background: '#fff',
        padding: 24,
        borderRadius: 16,
        boxShadow: '0 6px 24px rgba(0,0,0,0.08)'
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12, textAlign: 'center' }}>
        Login
      </h1>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 420, margin: '0 auto' }}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          style={{ border: '1px solid #ddd', padding: 10, borderRadius: 8 }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={{ border: '1px solid #ddd', padding: 10, borderRadius: 8 }}
        />
        {error && <div style={{ color: '#c00', fontSize: 13, textAlign: 'center' }}>{error}</div>}
        <button disabled={loading} style={{ background: '#111', color: '#fff', padding: 10, borderRadius: 8 }}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
