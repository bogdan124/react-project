export interface Location {
  id: number
  name: string
  description: string
  itemCount: number
  address: string
  city: string
  country: string
  status: 'Active' | 'Inactive'
  lat: number
  lng: number
}

export interface NewLocation {
  name: string
  description: string
  itemCount: number
  address: string
  city: string
  country: string
  lat: number
  lng: number
}