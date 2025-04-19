"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase, type User } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: any; user: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
  updateProfile: (data: Partial<User>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check active session and set user
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.client.auth.getSession()

        if (session) {
          const { data: userData } = await supabase.client
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          setUser(userData as User)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error checking session:", error)
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    try {
      const {
        data: { subscription },
      } = supabase.client.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const { data: userData } = await supabase.client
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          setUser(userData as User)
        } else if (event === "SIGNED_OUT") {
          setUser(null)
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Error setting up auth listener:", error)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.client.auth.signInWithPassword({ email, password })
      return { error }
    } catch (error) {
      console.error("Sign in error:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const { data, error } = await supabase.client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            phone_number: userData.phone_number,
            farmer_type: userData.farmer_type,
            location: userData.location,
          },
        },
      })

      if (!error && data.user) {
        // Create profile record
        await supabase.client.from("profiles").insert({
          id: data.user.id,
          ...userData,
          created_at: new Date().toISOString(),
        })
      }

      return { error, user: data.user }
    } catch (error) {
      console.error("Sign up error:", error)
      return { error, user: null }
    }
  }

  const signOut = async () => {
    try {
      await supabase.client.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      return { error }
    } catch (error) {
      console.error("Reset password error:", error)
      return { error }
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { error: new Error("Not authenticated") }

    try {
      const { error } = await supabase.client.from("profiles").update(data).eq("id", user.id)

      if (!error) {
        setUser({ ...user, ...data })
      }

      return { error }
    } catch (error) {
      console.error("Update profile error:", error)
      return { error }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
