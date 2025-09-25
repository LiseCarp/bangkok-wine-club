import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  user: { username: string; role: string } | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Default admin credentials - in production, these should be environment variables
const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'wine2024',
  role: 'admin'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('bwc_auth')
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        // Check if session is still valid (24 hours)
        const sessionAge = Date.now() - authData.timestamp
        if (sessionAge < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true)
          setUser({ username: authData.username, role: authData.role })
        } else {
          localStorage.removeItem('bwc_auth')
        }
      } catch (error) {
        localStorage.removeItem('bwc_auth')
      }
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    // Simple credential check - in production, this would be an API call
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const authData = {
        username,
        role: ADMIN_CREDENTIALS.role,
        timestamp: Date.now()
      }

      localStorage.setItem('bwc_auth', JSON.stringify(authData))
      setIsAuthenticated(true)
      setUser({ username, role: ADMIN_CREDENTIALS.role })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('bwc_auth')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
