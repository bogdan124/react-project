export interface Location {
  id: number
  name: string
  description: string
  itemCount: number
  address: string
  status: 'Active' | 'Inactive'
  lat: number
  lng: number
}

export interface NewLocation {
  name: string
  description: string
  itemCount: number
  address: string
  lat: number
  lng: number
}