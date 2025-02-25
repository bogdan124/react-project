import { createFileRoute, useNavigate, Outlet } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { 
  Home, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  MapPin,
} from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

const sidebarLinks = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Users', href: '/dashboard/users' },
  { icon: MapPin, label: 'Locations', href: '/dashboard/locations' },
]

function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleSignOut = () => {
    logout()
    navigate({ to: '/login' })
  }

  const Sidebar = () => (
    <div className="p-6">
      <Button
        variant="ghost"
        className="w-full justify-start hover:bg-accent mb-6 p-3"
        onClick={() => navigate({ to: '/dashboard/profile' })}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
            {user?.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="text-left">
            <h3 className="font-medium">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </Button>
      
      <nav className="space-y-1">
        {sidebarLinks.map((link, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => navigate({ to: link.href })}
          >
            <link.icon className="w-5 h-5 mr-3" />
            <span>{link.label}</span>
          </Button>
        ))}
        
        <hr className="my-4 border-gray-100" />
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </nav>
    </div>
  )

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-gray-50">
        <div className="hidden md:block w-64 bg-white border-r">
          <Sidebar />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 md:hidden z-20"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b">
              <SheetTitle className="p-6">Dashboard Menu</SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  )
}