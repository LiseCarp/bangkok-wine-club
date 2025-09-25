import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Wine, Lock, User, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    const success = login(username, password)

    if (!success) {
      setError('Invalid username or password')
      setPassword('') // Clear password on failed attempt
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-wine flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-wine-gold/20 rounded-full">
              <Wine className="h-8 w-8 text-wine-gold" />
            </div>
          </div>
          <CardTitle className="text-2xl font-serif">Bangkok Wine Club</CardTitle>
          <p className="text-muted-foreground">Admin Panel Access</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Default Credentials:</strong><br />
              Username: admin<br />
              Password: wine2024
            </p>
            <p className="text-xs text-muted-foreground text-center mt-2">
              💡 Set VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD environment variables to customize
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
