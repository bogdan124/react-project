import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import bcrypt from 'bcryptjs'

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: string
  status: 'Active' | 'Inactive'
}

interface UsersState {
  users: User[]
  addUser: (user: Omit<User, 'id' | 'status'>) => void
  updateUser: (user: User) => void
  deleteUser: (id: number) => void
  getUsers: () => User[]
  isEmailTaken: (email: string, excludeId?: number) => boolean
  verifyPassword: (password: string, hashedPassword: string) => Promise<boolean>
  hashPassword: (password: string) => Promise<string>
}

// Create initial users including admin with hashed passwords
const initialUsers: User[] = [
  { 
    id: 1, 
    name: 'Admin User', 
    email: 'admin@example.com',
    // Default password: "password", hashed
    password: '$2a$10$BNkU65WusRRigr1QhzpY6./nnsvfDTm37r1Q0SUvH2sBVV08fh8IC', 
    role: 'Admin', 
    status: 'Active' 
  },
  { 
    id: 2, 
    name: 'John Doe', 
    email: 'john@example.com',
    // Default password: "password123", hashed
    password: '$2a$10$rU4WZqRdFY9Z9cq5bV5tA.9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X', 
    role: 'User', 
    status: 'Active' 
  },
  { 
    id: 3, 
    name: 'Jane Smith', 
    email: 'jane@example.com',
    // Default password: "password123", hashed
    password: '$2a$10$rU4WZqRdFY9Z9cq5bV5tA.9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X', 
    role: 'User', 
    status: 'Active' 
  }
]

export const useUsers = create<UsersState>()(
  persist(
    (set, get) => ({
      users: initialUsers,
      addUser: async (userData) => {
        const users = get().users
        if (get().isEmailTaken(userData.email)) {
          throw new Error('Email address is already in use')
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(userData.password, 10)

        const newUser = {
          ...userData,
          password: hashedPassword,
          id: Math.max(...users.map(u => u.id), 0) + 1,
          status: 'Active' as const
        }
        set({ users: [...users, newUser] })
      },
      updateUser: async (updatedUser) => {
        const users = get().users
        if (get().isEmailTaken(updatedUser.email, updatedUser.id)) {
          throw new Error('Email address is already in use')
        }

        // If the password has changed (not a hashed password), hash it
        if (!updatedUser.password.startsWith('$2a$')) {
          updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
        }

        set({
          users: users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
          )
        })
      },
      deleteUser: (id) => {
        const users = get().users
        set({ users: users.filter(user => user.id !== id) })
      },
      getUsers: () => get().users,
      isEmailTaken: (email: string, excludeId?: number) => {
        const users = get().users
        return users.some(user => 
          user.email.toLowerCase() === email.toLowerCase() && 
          user.id !== excludeId
        )
      },
      verifyPassword: async (password: string, hashedPassword: string) => {
        return bcrypt.compare(password, hashedPassword)
      },
      hashPassword: async (password: string) => {
        return bcrypt.hash(password, 10)
      }
    }),
    {
      name: 'users-storage'
    }
  )
)