// Environment variables helper
export const env = {
  OLA_MAPS_ACCESS_TOKEN: process.env.NEXT_PUBLIC_OLA_MAPS_ACCESS_TOKEN || "",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || "",
}

// Validate required environment variables
export function validateEnv() {
  const requiredVars = [
    { key: "OLA_MAPS_ACCESS_TOKEN", value: env.OLA_MAPS_ACCESS_TOKEN },
    { key: "GEMINI_API_KEY", value: env.GEMINI_API_KEY },
    { key: "SUPABASE_URL", value: env.SUPABASE_URL },
    { key: "SUPABASE_ANON_KEY", value: env.SUPABASE_ANON_KEY },
  ]

  const missingVars = requiredVars.filter((v) => !v.value)

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.map((v) => v.key).join(", ")}`)
    return false
  }

  return true
}
