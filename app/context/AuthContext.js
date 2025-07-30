'use client'

import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (username, password) => {
    // ตรวจสอบ user แบบ mock
    if (username === 'admin' && password === '123456') {
      const userData = { username: 'admin', role: 'admin' }
      setUser(userData)
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
