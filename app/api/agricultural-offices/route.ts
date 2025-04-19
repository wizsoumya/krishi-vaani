import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const radius = searchParams.get("radius") || "50" // Default 50km radius
  const type = searchParams.get("type")

  try {
    let query = supabase.client.from("agricultural_offices").select("*")

    if (type) {
      query = query.eq("type", type)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // If lat and lng are provided, filter by distance
    if (lat && lng) {
      const userLat = Number.parseFloat(lat)
      const userLng = Number.parseFloat(lng)
      const maxRadius = Number.parseFloat(radius)

      // Calculate distance using Haversine formula
      const filteredData = data.filter((office) => {
        const officeLat = office.latitude
        const officeLng = office.longitude

        const R = 6371 // Earth's radius in km
        const dLat = ((officeLat - userLat) * Math.PI) / 180
        const dLng = ((officeLng - userLng) * Math.PI) / 180

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((userLat * Math.PI) / 180) *
            Math.cos((officeLat * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c

        // Add distance to the office object
        office.distance = distance

        return distance <= maxRadius
      })

      // Sort by distance
      filteredData.sort((a, b) => a.distance - b.distance)

      return NextResponse.json(filteredData)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching agricultural offices:", error)
    return NextResponse.json({ error: "Failed to fetch agricultural offices" }, { status: 500 })
  }
}
