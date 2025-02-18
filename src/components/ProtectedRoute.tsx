import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { isAuthenticated, checkAuth } = useAuth()

  useEffect(() => {
    const isValid = checkAuth()
    if (!isValid) {
      navigate({ to: '/login' })
    }
  }, [checkAuth, navigate])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}