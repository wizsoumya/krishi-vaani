"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, MapPin, Phone, Mail, Globe, Navigation } from "lucide-react"
import type { AgriculturalOffice } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { env } from "@/lib/env"
import Script from "next/script"

// Define Ola Maps types
declare global {
  interface Window {
    OlaMaps: {
      Map: new (container: HTMLElement, options: any) => any
      Marker: new (options: any) => any
      Popup: new (options: any) => any
      LngLatBounds: new () => any
      NavigationControl: new () => any
      GeolocateControl: new (options: any) => any
    }
  }
}

export default function AgriculturalOfficesMap() {
  const [offices, setOffices] = useState<(AgriculturalOffice & { distance?: number })[]>([])
  const [selectedOffice, setSelectedOffice] = useState<AgriculturalOffice | null>(null)
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [officeType, setOfficeType] = useState("all")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<any[]>([])
  const popupsRef = useRef<any[]>([])

  // Initialize the map
  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current || !scriptLoaded || !window.OlaMaps) return

    const defaultLocation = { lat: 20.5937, lng: 78.9629 } // Center of India
    const center = userLocation || defaultLocation

    // Initialize Ola Maps
    mapRef.current = new window.OlaMaps.Map(mapContainerRef.current, {
      accessToken: env.OLA_MAPS_ACCESS_TOKEN,
      center: [center.lng, center.lat],
      zoom: userLocation ? 10 : 5,
      style: "streets", // Assuming Ola Maps has style options similar to other map providers
    })

    // Add navigation controls
    mapRef.current.addControl(new window.OlaMaps.NavigationControl(), "top-right")

    // Add geolocate control
    mapRef.current.addControl(
      new window.OlaMaps.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    )

    mapRef.current.on("load", () => {
      setMapLoaded(true)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [userLocation, scriptLoaded])

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  // Initialize map when script is loaded
  useEffect(() => {
    if (scriptLoaded) {
      initializeMap()
    }
  }, [initializeMap, scriptLoaded])

  // Fetch agricultural offices
  useEffect(() => {
    const fetchOffices = async () => {
      setLoading(true)
      try {
        const url = "/api/agricultural-offices"
        const params = new URLSearchParams()

        if (userLocation) {
          params.append("lat", userLocation.lat.toString())
          params.append("lng", userLocation.lng.toString())
          params.append("radius", "100") // 100km radius
        }

        if (officeType !== "all") {
          params.append("type", officeType)
        }

        const response = await fetch(`${url}?${params.toString()}`)
        if (!response.ok) throw new Error("Failed to fetch offices")

        const data = await response.json()
        setOffices(data)
      } catch (error) {
        console.error("Error fetching agricultural offices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOffices()
  }, [userLocation, officeType])

  // Update markers when offices or map changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || offices.length === 0 || !window.OlaMaps) return

    // Clear existing markers and popups
    markersRef.current.forEach((marker) => marker.remove())
    popupsRef.current.forEach((popup) => popup.remove())
    markersRef.current = []
    popupsRef.current = []

    // Add user location marker if available
    if (userLocation) {
      // Create a custom marker element for user location
      const userMarkerElement = document.createElement("div")
      userMarkerElement.className = "user-marker"
      userMarkerElement.style.width = "20px"
      userMarkerElement.style.height = "20px"
      userMarkerElement.style.borderRadius = "50%"
      userMarkerElement.style.backgroundColor = "#4285F4"
      userMarkerElement.style.border = "2px solid white"

      // Create and add user marker
      const userMarker = new window.OlaMaps.Marker({
        element: userMarkerElement,
        anchor: "center",
      })
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(mapRef.current)

      // Create and add popup for user location
      const userPopup = new window.OlaMaps.Popup({ offset: 25 })
        .setHTML("<strong>Your Location</strong>")
        .setLngLat([userLocation.lng, userLocation.lat])

      userMarkerElement.addEventListener("click", () => {
        userPopup.addTo(mapRef.current)
      })
    }

    // Create bounds object to fit all markers
    const bounds = new window.OlaMaps.LngLatBounds()

    if (userLocation) {
      bounds.extend([userLocation.lng, userLocation.lat])
    }

    // Add office markers
    offices.forEach((office) => {
      // Create custom marker element based on office type
      const markerElement = document.createElement("div")
      markerElement.className = "office-marker"
      markerElement.style.width = "30px"
      markerElement.style.height = "30px"
      markerElement.style.backgroundSize = "cover"
      markerElement.style.cursor = "pointer"

      // Set marker color based on office type
      const markerColor = getMarkerColorByType(office.type)
      markerElement.style.backgroundColor = markerColor
      markerElement.style.borderRadius = "50%"
      markerElement.style.border = "2px solid white"
      markerElement.style.display = "flex"
      markerElement.style.alignItems = "center"
      markerElement.style.justifyContent = "center"

      // Add icon
      const iconElement = document.createElement("span")
      iconElement.innerHTML = "🏢"
      iconElement.style.fontSize = "14px"
      markerElement.appendChild(iconElement)

      // Create popup with office info
      const popup = new window.OlaMaps.Popup({ offset: 25 }).setHTML(`
        <div style="max-width: 200px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${office.name}</h3>
          <p style="margin: 5px 0; font-size: 12px;">${office.type}</p>
          <p style="margin: 5px 0; font-size: 12px;">${office.address}</p>
          ${office.distance ? `<p style="margin: 5px 0; font-size: 12px;">Distance: ${office.distance.toFixed(1)} km</p>` : ""}
        </div>
      `)

      // Create and add marker
      const marker = new window.OlaMaps.Marker({
        element: markerElement,
        anchor: "center",
      })
        .setLngLat([office.longitude, office.latitude])
        .addTo(mapRef.current)

      // Store references
      markersRef.current.push(marker)
      popupsRef.current.push(popup)

      // Add click event
      markerElement.addEventListener("click", () => {
        // Close all popups
        popupsRef.current.forEach((p) => p.remove())

        // Open this popup
        popup.setLngLat([office.longitude, office.latitude]).addTo(mapRef.current)

        // Update selected office
        setSelectedOffice(office)
      })

      // Extend bounds to include this marker
      bounds.extend([office.longitude, office.latitude])
    })

    // Fit bounds to include all markers if we have offices
    if (offices.length > 0) {
      mapRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      })
    }
  }, [offices, mapLoaded, userLocation, scriptLoaded])

  // Helper function to get marker color based on office type
  const getMarkerColorByType = (type: string) => {
    switch (type.toLowerCase()) {
      case "extension center":
        return "#4CAF50" // Green
      case "research station":
        return "#FFC107" // Yellow
      case "government office":
        return "#F44336" // Red
      case "cooperative":
        return "#9C27B0" // Purple
      default:
        return "#FF9800" // Orange
    }
  }

  // Filter offices based on search query
  const filteredOffices = offices.filter(
    (office) =>
      office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Get directions to selected office
  const getDirections = (office: AgriculturalOffice) => {
    if (!userLocation) return

    // Open directions in Ola Maps (or fallback to Google Maps if Ola doesn't have a directions URL)
    window.open(
      `https://maps.ola.com/directions/?start=${userLocation.lng},${userLocation.lat}&end=${office.longitude},${office.latitude}`,
      "_blank",
    )
  }

  // Center map on selected office
  const centerMapOnOffice = (office: AgriculturalOffice) => {
    if (!mapRef.current) return

    mapRef.current.flyTo({
      center: [office.longitude, office.latitude],
      zoom: 15,
      essential: true,
    })

    // Find and open the popup for this office
    markersRef.current.forEach((marker, index) => {
      const markerLngLat = marker.getLngLat()
      if (markerLngLat.lng === office.longitude && markerLngLat.lat === office.latitude) {
        popupsRef.current[index].setLngLat([office.longitude, office.latitude]).addTo(mapRef.current)
      }
    })
  }

  return (
    <>
      {/* Load Ola Maps Script */}
      <Script
        src={`https://maps.ola.com/api/js?access_token=${env.OLA_MAPS_ACCESS_TOKEN}`}
        onLoad={() => setScriptLoaded(true)}
      />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <Card className="border-green-100 h-[500px] md:h-[600px]">
              <CardHeader className="p-4">
                <CardTitle className="text-green-800">Agricultural Offices Near You</CardTitle>
                <CardDescription>
                  Find agricultural extension centers, research stations, and government offices
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 relative h-[400px] md:h-[500px]">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                    <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
                  </div>
                )}
                <div ref={mapContainerRef} className="w-full h-full" />
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-1/3">
            <Card className="border-green-100 h-[500px] md:h-[600px]">
              <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-green-800">Office Directory</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {filteredOffices.length} Offices
                  </Badge>
                </div>
                <div className="space-y-2 mt-2">
                  <Input
                    placeholder="Search offices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  <Select value={officeType} onValueChange={setOfficeType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="extension center">Extension Centers</SelectItem>
                      <SelectItem value="research station">Research Stations</SelectItem>
                      <SelectItem value="government office">Government Offices</SelectItem>
                      <SelectItem value="cooperative">Cooperatives</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-auto h-[350px] md:h-[450px]">
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 px-4">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="list" className="p-4 pt-2">
                    {filteredOffices.length > 0 ? (
                      <div className="space-y-2">
                        {filteredOffices.map((office) => (
                          <div
                            key={office.id}
                            className={`p-3 border rounded-md cursor-pointer transition-colors ${
                              selectedOffice?.id === office.id ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              setSelectedOffice(office)
                              centerMapOnOffice(office)
                            }}
                          >
                            <div className="flex justify-between">
                              <h3 className="font-medium text-green-800">{office.name}</h3>
                              {office.distance && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                  {office.distance.toFixed(1)} km
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{office.type}</p>
                            <p className="text-xs text-gray-600 mt-1 truncate">{office.address}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-center">
                        <MapPin className="h-8 w-8 text-gray-300 mb-2" />
                        <p className="text-gray-500">No offices found matching your criteria</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="details" className="p-4">
                    {selectedOffice ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-green-800">{selectedOffice.name}</h3>
                          <p className="text-sm text-gray-600">{selectedOffice.type}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-green-600 mt-1" />
                            <p className="text-sm">{selectedOffice.address}</p>
                          </div>

                          {selectedOffice.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-green-600" />
                              <p className="text-sm">{selectedOffice.phone}</p>
                            </div>
                          )}

                          {selectedOffice.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-green-600" />
                              <p className="text-sm">{selectedOffice.email}</p>
                            </div>
                          )}

                          {selectedOffice.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-green-600" />
                              <a
                                href={selectedOffice.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                Visit Website
                              </a>
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-1">Services Offered:</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedOffice.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {userLocation && (
                          <Button
                            onClick={() => getDirections(selectedOffice)}
                            className="w-full bg-green-600 hover:bg-green-700 mt-4"
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-center">
                        <MapPin className="h-8 w-8 text-gray-300 mb-2" />
                        <p className="text-gray-500">Select an office to view details</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
