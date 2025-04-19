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

// Declare google as a global variable
declare global {
  interface Window {
    google: any
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

  const mapRef = useRef<google.maps.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<google.maps.Marker[]>([])

  // Initialize the map
  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current || !window.google || !window.google.maps) return

    const defaultLocation = { lat: 20.5937, lng: 78.9629 } // Center of India
    const mapOptions: google.maps.MapOptions = {
      center: userLocation || defaultLocation,
      zoom: userLocation ? 10 : 5,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    }

    mapRef.current = new window.google.maps.Map(mapContainerRef.current, mapOptions)
    setMapLoaded(true)
  }, [userLocation])

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

  // Initialize map when Google Maps API is loaded
  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap()
    } else {
      const checkGoogleMapsLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMapsLoaded)
          initializeMap()
        }
      }, 100)

      return () => clearInterval(checkGoogleMapsLoaded)
    }
  }, [initializeMap])

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
    if (!mapRef.current || !mapLoaded || offices.length === 0) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // Add user location marker if available
    if (userLocation) {
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map: mapRef.current,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new window.google.maps.Size(32, 32),
        },
        title: "Your Location",
      })

      // Add info window for user location
      const userInfoWindow = new window.google.maps.InfoWindow({
        content: "<div><strong>Your Location</strong></div>",
      })

      // Add office markers
      offices.forEach((office) => {
        const marker = new window.google.maps.Marker({
          position: { lat: office.latitude, lng: office.longitude },
          map: mapRef.current,
          title: office.name,
          icon: {
            url: getMarkerIconByType(office.type),
            scaledSize: new window.google.maps.Size(32, 32),
          },
        })

        markersRef.current.push(marker)

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 200px;">
              <h3 style="margin: 0; font-size: 16px;">${office.name}</h3>
              <p style="margin: 5px 0; font-size: 12px;">${office.type}</p>
              <p style="margin: 5px 0; font-size: 12px;">${office.address}</p>
              ${office.distance ? `<p style="margin: 5px 0; font-size: 12px;">Distance: ${office.distance.toFixed(1)} km</p>` : ""}
            </div>
          `,
        })

        marker.addListener("click", () => {
          // Close any open info windows
          markersRef.current.forEach((m) => {
            if (m !== marker) {
              infoWindow.close()
            }
          })

          infoWindow.open(mapRef.current, marker)
          setSelectedOffice(office)
        })
      })

      // Fit bounds to include all markers if we have offices
      if (offices.length > 0) {
        const bounds = new window.google.maps.LatLngBounds()

        if (userLocation) {
          bounds.extend(userLocation)
        }

        offices.forEach((office) => {
          bounds.extend({ lat: office.latitude, lng: office.longitude })
        })

        mapRef.current.fitBounds(bounds)

        // Don't zoom in too far
        const listener = window.google.maps.event.addListener(mapRef.current, "idle", () => {
          if (mapRef.current!.getZoom()! > 15) {
            mapRef.current!.setZoom(15)
          }
          window.google.maps.event.removeListener(listener)
        })
      }
    }
  }, [offices, mapLoaded, userLocation])

  // Helper function to get marker icon based on office type
  const getMarkerIconByType = (type: string) => {
    switch (type.toLowerCase()) {
      case "extension center":
        return "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
      case "research station":
        return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
      case "government office":
        return "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
      case "cooperative":
        return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png"
      default:
        return "https://maps.google.com/mapfiles/ms/icons/orange-dot.png"
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

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${office.latitude},${office.longitude}&travelmode=driving`
    window.open(url, "_blank")
  }

  return (
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
                            // Center map on selected office
                            if (mapRef.current) {
                              mapRef.current.setCenter({ lat: office.latitude, lng: office.longitude })
                              mapRef.current.setZoom(15)
                            }
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
  )
}
