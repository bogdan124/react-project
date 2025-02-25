import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Location } from '@/types/locations'

interface LocationDetailsDialogProps {
  location: Location | null
  onClose: () => void
  onDelete: (id: number) => void
}

export function LocationDetailsDialog({ location, onClose, onDelete }: LocationDetailsDialogProps) {
  if (!location) return null

  return (
    <Dialog open={!!location} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{location.name}</DialogTitle>
          <DialogDescription>Care Center Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Description</Label>
            <p className="text-sm text-gray-600">{location.description}</p>
          </div>
          <div>
            <Label>Number of Animals</Label>
            <p className="text-sm text-gray-600">{location.itemCount}</p>
          </div>
          <div>
            <Label>Address</Label>
            <p className="text-sm text-gray-600">{location.address}</p>
          </div>
          
          <div>
            <Label>Status</Label>
            <p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${location.status === 'Active' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-muted text-muted-foreground'
                }`}>
                {location.status}
              </span>
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(location.id)
              }}
            >
              Delete Location
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}