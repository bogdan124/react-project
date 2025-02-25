import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Location } from '@/types/locations'
import { useState } from 'react'

interface EditLocationFormProps {
  location: Location
  onSubmit: (location: Location) => void
  onCancel: () => void
}

export function EditLocationForm({ location, onSubmit, onCancel }: EditLocationFormProps) {
  const [formData, setFormData] = useState<Location>(location)

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
        <Label htmlFor="address">Address</Label>
        <Input 
          id="address" 
          placeholder="Enter street address" 
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required 
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            placeholder="Enter city" 
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required 
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input 
            id="country" 
            placeholder="Enter country" 
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required 
          />
        </div>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
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
          Save Changes
        </Button>
      </div>
    </form>
  )
}