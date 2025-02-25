import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Location } from '@/types/locations'
import 'leaflet/dist/leaflet.css'

interface LocationMapProps {
  locations: Location[]
  selectedLocation: Location | null
  tempMarker: [number, number] | null
  onLocationClick: (location: Location) => void
  onMapClick: (lat: number, lng: number) => void
  onDeleteLocation: (id: number) => void
}

// Component to center map on selected location
function MapCenter({ location }: { location: Location | null }) {
  const map = useMap()
  if (location) {
    map.setView([location.lat, location.lng], 13)
  }
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
}: LocationMapProps) {
  return (
    <div className="h-[600px] relative bg-white rounded-lg shadow">
      <MapContainer
        center={[0, 0]}
        zoom={2}
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteLocation(location.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                <p className="text-sm font-medium">Animals: {location.itemCount}</p>
                <p className="text-sm text-gray-600">{location.address}</p>
                <p className="text-sm text-gray-600">{location.city}, {location.country}</p>
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