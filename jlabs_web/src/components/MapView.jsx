import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'

function FlyToLocation({ lat, lng, zoom = 11 }) {
  const map = useMap()
  useEffect(() => {
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      map.flyTo([lat, lng], zoom, { duration: 0.8 })
    }
  }, [lat, lng, zoom, map])
  return null
}

export default function MapView({ lat, lng, zoom = 11 }) {
  const center = [lat, lng]
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 6px 24px rgba(0,0,0,0.08)', padding: 8 }}>
      <MapContainer center={center} zoom={zoom} style={{ height: 320, width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>{lat}, {lng}</Popup>
        </Marker>

        <FlyToLocation lat={lat} lng={lng} zoom={zoom} />
      </MapContainer>
    </div>
  )
}
