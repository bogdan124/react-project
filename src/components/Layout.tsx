import { Link, Outlet, useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from './ui/sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu'
import { useAuth } from '@/lib/auth'

export function Layout() {
  const navigate = useNavigate()
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  const menuItems = isAuthenticated
    ? [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Users', path: '/dashboard/users' },
        { label: 'Locations', path: '/dashboard/locations' },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'Login', path: '/login' },
      ]

  const isActive = (path: string) => {
    return router.state.location.pathname === path
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="font-bold text-xl gradient-text hover-lift">
              Student League
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link to={item.path}>
                      <Button 
                        variant="ghost" 
                        className={`hover:bg-primary/10 hover:text-primary transition-colors ${
                          isActive(item.path) ? 'bg-primary/10 text-primary' : ''
                        }`}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Button 
                  onClick={handleLogout}
                  className="hidden md:inline-flex"
                  variant="outline"
                >
                  Logout
                </Button>
              ) : (
                <Button className="hidden md:inline-flex button-gradient">
                  Join Now
                </Button>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <div className="flex flex-col space-y-4 mt-8">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`text-lg font-medium hover:text-primary ${
                          isActive(item.path) ? 'text-primary' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {isAuthenticated && (
                      <Button 
                        onClick={handleLogout}
                        variant="outline"
                        className="mt-4"
                      >
                        Logout
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}