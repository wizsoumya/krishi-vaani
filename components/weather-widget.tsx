"use client"

import { useState } from "react"
import { Cloud, CloudDrizzle, CloudRain, Droplets, Sun, Wind } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function WeatherWidget() {
  const [location, setLocation] = useState("New Delhi")

  // This would be replaced with actual API data in a real implementation
  const weatherData = {
    current: {
      temperature: 32,
      condition: "Sunny",
      humidity: 45,
      windSpeed: 12,
      icon: <Sun className="h-8 w-8 text-amber-500" />,
    },
    forecast: [
      {
        day: "Tomorrow",
        temperature: 33,
        condition: "Partly Cloudy",
        icon: <Cloud className="h-6 w-6 text-gray-500" />,
      },
      { day: "Wednesday", temperature: 30, condition: "Rain", icon: <CloudRain className="h-6 w-6 text-blue-500" /> },
      {
        day: "Thursday",
        temperature: 29,
        condition: "Drizzle",
        icon: <CloudDrizzle className="h-6 w-6 text-blue-400" />,
      },
      { day: "Friday", temperature: 31, condition: "Sunny", icon: <Sun className="h-6 w-6 text-amber-500" /> },
      { day: "Saturday", temperature: 30, condition: "Windy", icon: <Wind className="h-6 w-6 text-gray-500" /> },
    ],
  }

  return (
    <Card className="w-full border-green-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-800">{location}</CardTitle>
          <Button
            onClick={() => setLocation(location === "New Delhi" ? "Mumbai" : "New Delhi")}
            variant="ghost"
            className="text-sm text-green-600 hover:text-green-700 hover:bg-green-50 p-0"
          >
            Change Location
          </Button>
        </div>
        <CardDescription>Current weather conditions and forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="space-y-4">
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-4">
                {weatherData.current.icon}
                <div>
                  <p className="text-3xl font-bold">{weatherData.current.temperature}°C</p>
                  <p className="text-muted-foreground">{weatherData.current.condition}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>Humidity: {weatherData.current.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  <span>Wind: {weatherData.current.windSpeed} km/h</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-green-50 p-4 border border-green-100">
              <h4 className="font-medium text-green-800">Farming Tip</h4>
              <p className="text-sm text-green-700 mt-1">
                Current conditions are suitable for irrigation. Consider watering your crops in the evening.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="forecast">
            <div className="grid gap-2 pt-4">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-2">
                    {day.icon}
                    <span>{day.day}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{day.condition}</span>
                    <span className="font-medium">{day.temperature}°C</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
