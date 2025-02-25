import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { LocationsHeader } from '@/components/locations/LocationsHeader'
import { LocationCard } from '@/components/locations/LocationCard'
import { LocationMap } from '@/components/locations/LocationMap'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Location, NewLocation } from '@/types/locations'
import { LocationForm } from '@/components/locations/LocationForm'
import { LocationDetailsDialog } from '@/components/locations/LocationDetailsDialog'
import { EditLocationForm } from '@/components/locations/EditLocationForm'

export const Route = createFileRoute('/dashboard/locations')({
  component: LocationsPage,
})

const mockLocations: Location[] = [
  {
    id: 1,
    name: 'Center of Cats Care',
    description: 'Here we have cats that are abandoned by some persons and we care for them. Our dedicated team provides food, shelter, and medical care for all our feline friends.',
    itemCount: 25,
    address: '123 Care Avenue',
    city: 'New York',
    country: 'USA',
    status: 'Active',
    lat: 40.7128,
    lng: -74.0060
  },
  {
    id: 2,
    name: 'Dog Shelter Haven',
    description: 'A safe space for abandoned and rescued dogs. We provide rehabilitation, training, and lots of love until they find their forever homes.',
    itemCount: 32,
    address: '456 Rescue Street',
    city: 'San Francisco',
    country: 'USA',
    status: 'Active',
    lat: 37.7749,
    lng: -122.4194
  },
  {
    id: 3,
    name: 'Wildlife Rescue Center',
    description: 'Dedicated to the rescue and rehabilitation of injured wildlife. Our facility handles everything from small birds to medium-sized mammals.',
    itemCount: 18,
    address: '789 Nature Road',
    city: 'London',
    country: 'UK',
    status: 'Active',
    lat: 51.5074,
    lng: -0.1278
  }
]

function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)
  const [tempMarker, setTempMarker] = useState<[number, number] | null>(null)

  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location)
  }

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location)
  }

  const handleUpdateLocation = (updatedLocation: Location) => {
    setLocations(locations.map(loc => 
      loc.id === updatedLocation.id ? updatedLocation : loc
    ))
    setEditingLocation(null)
  }

  const handleAddLocation = (newLocation: NewLocation) => {
    const location: Location = {
      id: Math.max(...locations.map(l => l.id)) + 1,
      ...newLocation,
      status: 'Active'
    }

    setLocations([...locations, location])
    setTempMarker(null)
    setIsAddModalOpen(false)
  }

  const handleDeleteLocation = (id: number) => {
    setLocations(locations.filter(location => location.id !== id))
    setSelectedLocation(null)
    setEditingLocation(null)
  }

  const handleMapClick = (lat: number, lng: number) => {
    setTempMarker([lat, lng])
    setIsAddModalOpen(true)
  }

  return (
    <ProtectedRoute>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Care Centers</h1>
          <p className="text-muted-foreground">Manage our animal care locations</p>
        </div>

        <div className="space-y-6">
          <LocationsHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showMap={showMap}
            onViewChange={setShowMap}
            isAddModalOpen={isAddModalOpen}
            onAddModalChange={setIsAddModalOpen}
            onAddLocation={handleAddLocation}
          />

          {showMap ? (
            <LocationMap
              locations={filteredLocations}
              selectedLocation={selectedLocation}
              tempMarker={tempMarker}
              onLocationClick={handleLocationClick}
              onMapClick={handleMapClick}
              onDeleteLocation={handleDeleteLocation}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  onViewMap={handleLocationClick}
                  onDelete={handleDeleteLocation}
                  onEdit={handleEditLocation}
                />
              ))}
            </div>
          )}
        </div>

        {selectedLocation && !showMap && (
          <LocationDetailsDialog
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
            onDelete={handleDeleteLocation}
          />
        )}

        {editingLocation && (
          <Dialog open={!!editingLocation} onOpenChange={() => setEditingLocation(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Care Center</DialogTitle>
                <DialogDescription>
                  Update the care center details.
                </DialogDescription>
              </DialogHeader>
              <EditLocationForm
                location={editingLocation}
                onSubmit={handleUpdateLocation}
                onCancel={() => setEditingLocation(null)}
              />
            </DialogContent>
          </Dialog>
        )}

        {showMap && (
          <Dialog open={isAddModalOpen} onOpenChange={(open) => {
            setIsAddModalOpen(open)
            if (!open) {
              setTempMarker(null)
            }
          }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Care Center</DialogTitle>
                <DialogDescription>
                  Add details for the selected location.
                </DialogDescription>
              </DialogHeader>
              <LocationForm
                initialData={tempMarker ? { lat: tempMarker[0], lng: tempMarker[1] } : undefined}
                onSubmit={handleAddLocation}
                onCancel={() => {
                  setIsAddModalOpen(false)
                  setTempMarker(null)
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ProtectedRoute>
  )
}