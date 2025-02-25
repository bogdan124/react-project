import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Trash2, Pencil } from 'lucide-react'
import { Location } from '@/types/locations'

interface LocationCardProps {
  location: Location
  onViewMap: (location: Location) => void
  onDelete: (id: number) => void
  onEdit: (location: Location) => void
}

export function LocationCard({ location, onViewMap, onDelete, onEdit }: LocationCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onEdit(location)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{location.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onViewMap(location)
              }}
            >
              <MapPin className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(location.id)
              }}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">{location.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {location.city}, {location.country}
          </div>
          <div className="text-sm font-medium">
            Animals: {location.itemCount}
          </div>
        </div>
        <div className="pt-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${location.status === 'Active' 
              ? 'bg-success/10 text-success' 
              : 'bg-muted text-muted-foreground'
            }`}>
            {location.status}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}