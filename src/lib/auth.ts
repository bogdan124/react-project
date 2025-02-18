import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useUsers } from './users'
import Cookies from 'js-cookie'

interface User {
  id: number
  email: string
  name: string
  role: string
  status: 'Active' | 'Inactive'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => boolean
}

const COOKIE_NAME = 'auth_token'
const COOKIE_EXPIRY = 7 // days

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const { users, verifyPassword } = useUsers.getState()
        const user = users.find(u => u.email === email)
        
        if (user) {
          // Verify the password
          const isValid = await verifyPassword(password, user.password)
          
          if (isValid) {
            const token = btoa(JSON.stringify({ 
              id: user.id, 
              email: user.email,
              timestamp: new Date().getTime() 
            }))
            
            // Set cookie
            Cookies.set(COOKIE_NAME, token, { 
              expires: COOKIE_EXPIRY,
              secure: true,
              sameSite: 'strict'
            })
            
            set({
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                status: user.status
              },
              isAuthenticated: true
            })
          } else {
            throw new Error('Invalid credentials')
          }
        } else {
          throw new Error('Invalid credentials')
        }
      },
      logout: () => {
        // Remove cookie
        Cookies.remove(COOKIE_NAME)
        set({ user: null, isAuthenticated: false })
      },
      checkAuth: () => {
        const token = Cookies.get(COOKIE_NAME)
        const currentState = get()
        
        // If we have a token and we're not authenticated, try to restore the session
        if (token && !currentState.isAuthenticated) {
          try {
            const { id, timestamp } = JSON.parse(atob(token))
            const tokenAge = Date.now() - timestamp
            
            // Token expired (7 days)
            if (tokenAge > COOKIE_EXPIRY * 24 * 60 * 60 * 1000) {
              Cookies.remove(COOKIE_NAME)
              set({ user: null, isAuthenticated: false })
              return false
            }
            
            // Find user
            const { users } = useUsers.getState()
            const user = users.find(u => u.id === id)
            
            if (user) {
              set({
                user: {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  role: user.role,
                  status: user.status
                },
                isAuthenticated: true
              })
              return true
            }
          } catch (error) {
            Cookies.remove(COOKIE_NAME)
          }
        }
        
        return currentState.isAuthenticated
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)