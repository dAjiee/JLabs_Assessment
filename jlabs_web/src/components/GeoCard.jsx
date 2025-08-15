export default function GeoCard({ data }) {
  const rows = [
    ['IP', data.ip], ['City', data.city], ['Region', data.region],
    ['Country', data.country], ['Org', data.org], ['Postal', data.postal],
    ['Timezone', data.timezone], ['Loc (lat,lng)', data.loc]
  ]
  return (
    <div style={{background:'#fff', padding:16, borderRadius:16, boxShadow:'0 6px 24px rgba(0,0,0,0.08)'}}>
      <h2 style={{fontWeight:600, marginBottom:8}}>Details</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
        {rows.map(([k,v]) => <div key={k} style={{fontSize:14}}><b>{k}:</b> {v ?? '—'}</div>)}
      </div>
    </div>
  )
}
