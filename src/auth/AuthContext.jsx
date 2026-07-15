import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // ponytail: auth fake pro protótipo. login() vira POST /auth/login quando o backend chegar.
  const login = async () => setUser({ name: 'Ana', initials: 'AR' })
  const logout = () => setUser(null)
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
