import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")
  const commodity = searchParams.get("commodity")
  const market = searchParams.get("market")

  try {
    let query = supabase.client.from("market_prices").select("*")

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (commodity) {
      query = query.ilike("commodity", `%${commodity}%`)
    }

    if (market) {
      query = query.ilike("market", `%${market}%`)
    }

    const { data, error } = await query.order("last_updated", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching market prices:", error)
    return NextResponse.json({ error: "Failed to fetch market prices" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const authHeader = request.headers.get("authorization")

    // Check if user is authenticated and has admin role
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const {
      data: { user },
    } = await supabase.client.auth.getUser(token)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase.client.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Process the request
    const body = await request.json()

    const { data, error } = await supabase.client.from("market_prices").insert(body).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in POST market prices:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
