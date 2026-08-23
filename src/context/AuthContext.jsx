import React, { createContext, useContext, useState, useEffect } from 'react'
import { isFirebaseConfigured, auth, googleProvider } from '../config/firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [firebaseReady, setFirebaseReady] = useState(isFirebaseConfigured())

  // Admin user IDs (ganti dengan email admin sebenarnya)
  const adminEmails = ['admin@example.com', 'mhmdjefr@gmail.com']

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false)
      return
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        if (currentUser) {
          setIsAdmin(adminEmails.includes(currentUser.email))
        } else {
          setIsAdmin(false)
        }
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (error) {
      console.error('Auth state change error:', error)
      setLoading(false)
    }
  }, [firebaseReady])

  const loginWithGoogle = async () => {
    if (!firebaseReady) {
      throw new Error('Firebase belum dikonfigurasi. Silakan setup Firebase credentials di .env.local')
    }

    try {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      if (firebaseReady) {
        await signOut(auth)
      }
      setUser(null)
      setIsAdmin(false)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, loginWithGoogle, logout, firebaseReady }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
