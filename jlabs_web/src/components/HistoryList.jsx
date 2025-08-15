import { useState } from 'react'

export default function HistoryList({ items, onSelect, onDelete }) {
  const [checked, setChecked] = useState({})

  const selected = Object.entries(checked)
    .filter(([, v]) => v)
    .map(([k]) => k)

  const toggle = (ip) =>
    setChecked(prev => ({ ...prev, [ip]: !prev[ip] }))

  const deleteSelected = () => {
    if (!selected.length) return
    onDelete(selected)
    setChecked({})
  }

  const clearAll = () => {
    if (!items.length) return
    onDelete(items.map(i => i.ip))
    setChecked({})
  }

  if (!items.length) return null

  return (
    <div style={{ background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 6px 24px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <h2 style={{ fontWeight: 600, margin: 0 }}>History</h2>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button
            onClick={deleteSelected}
            disabled={!selected.length}
            style={{
              border: '1px solid #ddd',
              padding: '6px 10px',
              borderRadius: 8,
              background: '#fff',
              opacity: selected.length ? 1 : 0.5,
              cursor: selected.length ? 'pointer' : 'not-allowed'
            }}
          >
            Delete selected
          </button>
          <button
            onClick={clearAll}
            disabled={!items.length}
            style={{
              border: '1px solid #ddd',
              padding: '6px 10px',
              borderRadius: 8,
              background: '#fff',
              cursor: items.length ? 'pointer' : 'not-allowed'
            }}
          >
            Clear all
          </button>
        </div>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map(({ ip, ts }) => (
          <li
            key={ip}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderTop: '1px solid #eee' }}
          >
            <input type="checkbox" checked={!!checked[ip]} onChange={() => toggle(ip)} />
            <button
              onClick={() => onSelect(ip)}
              style={{ color: '#0a58ca', background: 'none', border: 'none', cursor: 'pointer' }}
              title="Load this IP's geo info"
            >
              {ip}
            </button>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: '#777' }}>
              {new Date(ts).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
