import { Outlet } from 'react-router-dom'
import { isAuthed, clearToken } from './auth'

export default function App() {
  const onLogout = () => {
    clearToken()
    window.location.href = '/login'
  }

  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f7f7f8 100%)',
        padding: 24,
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 6px 32px 0 rgba(60,60,120,0.10), 0 1.5px 6px 0 rgba(60,60,120,0.06)',
          padding: '36px 32px 28px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isAuthed() && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
            <button
              onClick={onLogout}
              style={{
                border: 'none',
                padding: '8px 18px',
                borderRadius: 8,
                background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 1px 4px 0 rgba(60,60,120,0.08)',
                transition: 'background 0.2s',
              }}
            >
              Logout
            </button>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  )
}
