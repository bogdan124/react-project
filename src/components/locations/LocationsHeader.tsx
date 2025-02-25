import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Search, Map } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LocationForm } from './LocationForm'
import { NewLocation } from '@/types/locations'

interface LocationsHeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  showMap: boolean
  onViewChange: (value: boolean) => void
  isAddModalOpen: boolean
  onAddModalChange: (value: boolean) => void
  onAddLocation: (location: NewLocation) => void
}

export function LocationsHeader({
  searchTerm,
  onSearchChange,
  showMap,
  onViewChange,
  isAddModalOpen,
  onAddModalChange,
  onAddLocation,
}: LocationsHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search care centers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${!showMap ? 'text-primary' : 'text-gray-400'}`}>List</span>
            <Switch
              checked={showMap}
              onCheckedChange={onViewChange}
              id="view-mode"
            />
            <Map className={`w-4 h-4 ${showMap ? 'text-primary' : 'text-gray-400'}`} />
          </div>
          {!showMap && (
            <Dialog open={isAddModalOpen} onOpenChange={onAddModalChange}>
              <DialogTrigger asChild>
          
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Care Center</DialogTitle>
                  <DialogDescription>
                    Add a new animal care center to our network.
                  </DialogDescription>
                </DialogHeader>
                <LocationForm onSubmit={onAddLocation} onCancel={() => onAddModalChange(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  )
}