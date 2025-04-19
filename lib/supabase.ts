import { createClient } from "@supabase/supabase-js"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Get the Supabase URL and anon key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a singleton instance for the browser
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or anon key is missing")
    throw new Error("Supabase URL and anon key are required")
  }

  // For server-side rendering, always create a new client
  if (!isBrowser) {
    return createClient(supabaseUrl, supabaseAnonKey)
  }

  // For client-side, reuse the instance
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseInstance
}

// Create a lazy-loaded client that only initializes when actually used
export const supabase = {
  get client() {
    return getSupabaseClient()
  },
}

// Database types based on our schema
export type User = {
  id: string
  email: string
  full_name: string
  phone_number: string
  farmer_type: string
  location: string
  created_at: string
}

export type MarketPrice = {
  id: number
  commodity: string
  category: string
  market: string
  price: number
  unit: string
  price_change: number
  last_updated: string
}

export type WeatherAlert = {
  id: number
  title: string
  description: string
  severity: "low" | "medium" | "high"
  location: string
  start_date: string
  end_date: string
}

export type AgriculturalOffice = {
  id: number
  name: string
  type: string
  address: string
  phone: string
  email: string
  website: string
  latitude: number
  longitude: number
  services: string[]
}

export type SchemeApplication = {
  id: number
  user_id: string
  scheme_id: number
  status: "pending" | "approved" | "rejected"
  application_date: string
  documents: string[]
  notes: string
}
