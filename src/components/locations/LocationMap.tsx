import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { Button } from '@/components/ui/button'
import { Trash2, Pencil } from 'lucide-react'
import { Location } from '@/types/locations'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'


delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Bucharest coordinates
const BUCHAREST_CENTER: [number, number] = [44.4268, 26.1025]

interface LocationMapProps {
  locations: Location[]
  selectedLocation: Location | null
  tempMarker: [number, number] | null
  onLocationClick: (location: Location) => void
  onMapClick: (lat: number, lng: number) => void
  onDeleteLocation: (id: number) => void
  onEditLocation: (location: Location) => void
}

// Component to center map on selected location or Bucharest
function MapCenter({ location }: { location: Location | null }) {
  const map = useMap()
  
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 13)
    } else {
      map.setView(BUCHAREST_CENTER, 12)
    }
  }, [location, map])
  
  return null
}

// Component to handle map clicks
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng
      onMapClick(lat, lng)
    }
  })
  return null
}

export function LocationMap({
  locations,
  selectedLocation,
  tempMarker,
  onLocationClick,
  onMapClick,
  onDeleteLocation,
  onEditLocation,
}: LocationMapProps) {
  return (
    <div className="h-[600px] relative bg-white rounded-lg shadow">
      <MapContainer
        center={BUCHAREST_CENTER}
        zoom={12}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={onMapClick} />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            eventHandlers={{
              click: () => onLocationClick(location),
            }}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{location.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                <p className="text-sm font-medium">Animals: {location.itemCount}</p>
                <p className="text-sm text-gray-600 mb-4">{location.address}</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onEditLocation(location)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => onDeleteLocation(location.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {tempMarker && (
          <Marker position={tempMarker}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">New Location</h3>
                <p className="text-sm text-gray-600">Click to add details</p>
              </div>
            </Popup>
          </Marker>
        )}
        <MapCenter location={selectedLocation} />
      </MapContainer>
    </div>
  )
}