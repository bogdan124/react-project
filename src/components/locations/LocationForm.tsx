import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NewLocation } from '@/types/locations'
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import { MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Bucharest coordinates
const BUCHAREST_CENTER: [number, number] = [44.4268, 26.1025]

interface LocationFormProps {
  initialData?: Partial<NewLocation>
  onSubmit: (location: NewLocation) => void
  onCancel: () => void
}

function MapMarker({ position, setPosition }: { 
  position: [number, number]
  setPosition: (pos: [number, number]) => void 
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    },
  })

  return <Marker position={position} />
}

// Component to handle initial map center
function InitialMapView() {
  const map = useMap()
  useEffect(() => {
    map.setView(BUCHAREST_CENTER, 12)
  }, [map])
  return null
}

export function LocationForm({ initialData, onSubmit, onCancel }: LocationFormProps) {
  const [formData, setFormData] = useState<NewLocation>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    itemCount: initialData?.itemCount || 0,
    address: initialData?.address || '',
    lat: initialData?.lat || BUCHAREST_CENTER[0],
    lng: initialData?.lng || BUCHAREST_CENTER[1],
  })

  const [position, setPosition] = useState<[number, number]>([
    initialData?.lat || BUCHAREST_CENTER[0],
    initialData?.lng || BUCHAREST_CENTER[1]
  ])
  const [isAddressLoading, setIsAddressLoading] = useState(false)

  useEffect(() => {
    const fetchAddress = async () => {
      setIsAddressLoading(true)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`
        )
        const data = await response.json()
        
        if (data.display_name) {
          setFormData(prev => ({
            ...prev,
            address: data.display_name,
            lat: position[0],
            lng: position[1]
          }))
        }
      } catch (error) {
        console.error('Error fetching address:', error)
      } finally {
        setIsAddressLoading(false)
      }
    }

    fetchAddress()
  }, [position])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleItemCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value)
    setFormData({ ...formData, itemCount: value === '' ? 0 : value })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Center Name</Label>
        <Input 
          id="name" 
          placeholder="Enter center name" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required 
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <textarea 
          id="description"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Describe the care center (max 255 characters)"
          maxLength={255}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="itemCount">Number of Animals</Label>
        <Input 
          id="itemCount"
          type="number"
          min="0"
          placeholder="Enter number of animals"
          value={formData.itemCount || ''}
          onChange={handleItemCountChange}
          required
        />
      </div>
      <div>
        <Label>Location</Label>
        <div className="h-[300px] mt-2 rounded-md overflow-hidden border border-input">
          <MapContainer
            center={position}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarker position={position} setPosition={setPosition} />
            <InitialMapView />
          </MapContainer>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {isAddressLoading ? 'Fetching address...' : 'Click on the map to set the location'}
        </p>
        {formData.address && !isAddressLoading && (
          <p className="text-sm mt-1">
            <MapPin className="w-3 h-3 inline-block mr-1" />
            {formData.address}
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          type="button"
        >
          Cancel
        </Button>
        <Button type="submit">
          Add Location
        </Button>
      </div>
    </form>
  )
}