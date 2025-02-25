import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useUsers } from '@/lib/users'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const { users } = useUsers()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' })
    }
  }, [isAuthenticated, navigate])

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      try {
        await login(email, password)
        return true
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      navigate({ to: '/dashboard' })
    },
    onError: (error) => {
      setError('Invalid credentials. Please try again.')
    }
  })

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ email, password })
  }

  return (
    <div className="min-h-screen w-full flex">
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center bg-white">
        <Card className="w-full max-w-lg border-none shadow-none">
          <CardHeader className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary mb-4">
              <div className="w-full h-full rounded-xl bg-white/95 flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SL
                </span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in with your account credentials
            </CardDescription>
            
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSignIn}>
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12"
                />
              </div>
              <Button 
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90
                         transition-all duration-300"
              >
                {loginMutation.isPending ? 'Signing in...' : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center space-y-6">
            <h2 className="text-4xl font-bold">
              Start Your Journey
            </h2>
            <p className="text-xl text-white/90">
              Join a community of passionate students and unlock your potential in technology and innovation.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                "24/7 Learning Support",
                "Industry Mentorship",
                "Hands-on Projects",
                "Career Guidance"
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl
                           border border-white/20 text-sm font-medium"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}