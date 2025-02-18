import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useUsers } from '@/lib/users'

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { users, updateUser } = useUsers()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    // Find user with the provided email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

    if (user) {

      setStatus('success')
    } else {
      setStatus('error')
      setError('No account found with that email address')
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center bg-white">
        <Card className="w-full max-w-lg border-none shadow-none">
          <CardHeader className="space-y-2">
            <Button
              variant="ghost"
              className="w-fit -ml-4 mb-2"
              onClick={() => navigate({ to: '/login' })}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Button>
            <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you instructions to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === 'success' ? (
              <div className="space-y-4">
                <div className="p-4 text-sm text-emerald-600 bg-emerald-50 rounded-md">
                  If an account exists with that email address, you will receive password reset instructions shortly.
                </div>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => navigate({ to: '/login' })}
                >
                  Return to login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90
                           transition-all duration-300"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send reset instructions'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center space-y-6">
            <h2 className="text-4xl font-bold">
              Password Recovery
            </h2>
            <p className="text-xl text-white/90">
              Don't worry! We'll help you get back into your account safely and securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}