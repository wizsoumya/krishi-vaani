import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const location = searchParams.get("location")

  if (!lat || !lng) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
  }

  try {
    // Call external weather API (e.g., OpenWeatherMap)
    const apiKey = process.env.OPENWEATHER_API_KEY
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&units=metric&appid=${apiKey}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch weather data")
    }

    const data = await response.json()

    // Format the response
    const formattedData = {
      current: {
        temperature: data.current.temp,
        condition: data.current.weather[0].main,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        icon: data.current.weather[0].icon,
      },
      forecast: data.daily.slice(1, 6).map((day: any) => ({
        day: new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" }),
        temperature: day.temp.day,
        condition: day.weather[0].main,
        icon: day.weather[0].icon,
      })),
      location: location || "Unknown Location",
    }

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
