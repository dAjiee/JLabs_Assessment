import { useEffect, useMemo, useState, useCallback } from 'react'
import { isIP as isIp } from 'is-ip'
import { geo } from '../api'
import GeoCard from '../components/GeoCard'
import HistoryList from '../components/HistoryList'
import MapView from '../components/MapView'

const HISTORY_KEY = 'ip_history'
const getHistory = () => JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
const setHistory = (arr) => localStorage.setItem(HISTORY_KEY, JSON.stringify(arr.slice(0, 50)))

export default function Home() {
  const [current, setCurrent] = useState(null)
  const [ip, setIp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistoryState] = useState(getHistory())

  const fetchGeo = useCallback(async (ipAddress) => {
    setLoading(true); setError('')
    try {
      const { data } = await geo.get(`https://ipinfo.io/${ipAddress}/geo`)
      setCurrent(data)
    } catch {
      setError('Failed to fetch geolocation')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchSelf = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const { data: ipRes } = await geo.get('https://api.ipify.org?format=json')
      await fetchGeo(ipRes.ip)
    } catch {
      setError('Unable to determine your public IP')
    } finally {
      setLoading(false)
    }
  }, [fetchGeo])

  useEffect(() => { fetchSelf() }, [fetchSelf])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!isIp(ip)) {
      setError('Please enter a valid IPv4 or IPv6 address.')
      return
    }
    await fetchGeo(ip)
    const next = [{ ip, ts: Date.now() }, ...history.filter(h => h.ip !== ip)]
    setHistory(next); setHistoryState(next)
    setIp('')
  }

  const clearToSelf = async () => { await fetchSelf() }
  const onSelectHistory = async (ipSel) => { setIp(ipSel); await fetchGeo(ipSel) }
  const onDeleteHistory = (ips) => {
    const next = history.filter(h => !ips.includes(h.ip))
    setHistory(next); setHistoryState(next)
  }

  const latLng = useMemo(() => {
    if (!current?.loc) return null
    const [lat, lng] = current.loc.split(',').map(Number)
    return { lat, lng }
  }, [current])

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, textAlign: 'center' }}>IP Geolocation</h1>

      <form onSubmit={submit} style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 720, justifyContent: 'center' }}>
        <input
          value={ip}
          onChange={e => setIp(e.target.value)}
          placeholder="Enter IP address"
          style={{ flex: 1, border: '1px solid #ddd', padding: 10, borderRadius: 8, maxWidth: 420 }}
        />
        <button style={{ background: '#111', color: '#fff', padding: '10px 16px', borderRadius: 8 }}>Search</button>
        <button
          type="button"
          onClick={clearToSelf}
          style={{ border: '1px solid #ddd', padding: '10px 16px', borderRadius: 8, background: '#fff' }}
        >
          Revert to my IP
        </button>
      </form>

      {error && <div style={{ color: '#c00', fontSize: 13, textAlign: 'center' }}>{error}</div>}
      {loading && <div style={{ fontSize: 13, textAlign: 'center' }}>Loading…</div>}

      {current && (
        <div style={{ width: '100%', maxWidth: 720 }}>
          <GeoCard data={current} />
        </div>
      )}

      {latLng && (
        <div style={{ width: '100%', maxWidth: 720 }}>
          <MapView lat={latLng.lat} lng={latLng.lng} />
        </div>
      )}

      <div style={{ width: '100%', maxWidth: 720 }}>
        <HistoryList items={history} onSelect={onSelectHistory} onDelete={onDeleteHistory} />
      </div>
    </div>
  )
}
