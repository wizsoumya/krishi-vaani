"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Types for crop calendar data
interface CropActivity {
  id: number
  crop: string
  activity: string
  startMonth: number
  endMonth: number
  description: string
  color: string
}

export default function CropCalendarPreview() {
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  // Sample crop calendar data - in a real app, this would come from an API
  const cropActivities: CropActivity[] = [
    {
      id: 1,
      crop: "Rice",
      activity: "Land Preparation",
      startMonth: 4, // May
      endMonth: 5, // June
      description: "Plowing, harrowing, and leveling the field",
      color: "bg-amber-100 border-amber-300 text-amber-800",
    },
    {
      id: 2,
      crop: "Rice",
      activity: "Sowing/Transplanting",
      startMonth: 5, // June
      endMonth: 6, // July
      description: "Transplanting rice seedlings to the main field",
      color: "bg-green-100 border-green-300 text-green-800",
    },
    {
      id: 3,
      crop: "Rice",
      activity: "Harvesting",
      startMonth: 9, // October
      endMonth: 10, // November
      description: "Harvesting mature rice crops",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    },
    {
      id: 4,
      crop: "Wheat",
      activity: "Sowing",
      startMonth: 10, // November
      endMonth: 11, // December
      description: "Sowing wheat seeds",
      color: "bg-green-100 border-green-300 text-green-800",
    },
    {
      id: 5,
      crop: "Wheat",
      activity: "Harvesting",
      startMonth: 3, // April
      endMonth: 4, // May
      description: "Harvesting mature wheat crops",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    },
    {
      id: 6,
      crop: "Cotton",
      activity: "Sowing",
      startMonth: 3, // April
      endMonth: 5, // June
      description: "Sowing cotton seeds",
      color: "bg-green-100 border-green-300 text-green-800",
    },
    {
      id: 7,
      crop: "Cotton",
      activity: "Harvesting",
      startMonth: 9, // October
      endMonth: 11, // December
      description: "Picking cotton bolls",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    },
  ]

  // Get unique crops for filter dropdown
  const crops = ["all", ...new Set(cropActivities.map((item) => item.crop))]

  // Filter activities based on selected crop
  const filteredActivities = cropActivities.filter(
    (activity) => selectedCrop === "all" || activity.crop === selectedCrop,
  )

  // Get activities for the current month
  const currentMonthActivities = filteredActivities.filter(
    (activity) => activity.startMonth <= currentMonth && activity.endMonth >= currentMonth,
  )

  // Month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
  }

  return (
    <Card className="w-full border-green-100">
      <CardHeader>
        <CardTitle className="text-2xl text-green-800">Crop Calendar</CardTitle>
        <CardDescription>Plan your farming activities throughout the year</CardDescription>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-lg font-medium w-32 text-center">{months[currentMonth]}</div>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Crops</SelectLabel>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop === "all" ? "All Crops" : crop}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentMonthActivities.length > 0 ? (
            currentMonthActivities.map((activity) => (
              <div
                key={activity.id}
                className={`p-4 rounded-lg border ${activity.color} flex flex-col sm:flex-row sm:items-center gap-4`}
              >
                <div className="sm:w-1/4">
                  <div className="font-medium">{activity.crop}</div>
                  <div className="text-sm">
                    {months[activity.startMonth]} - {months[activity.endMonth]}
                  </div>
                </div>
                <div className="sm:w-3/4">
                  <div className="font-medium">{activity.activity}</div>
                  <div className="text-sm">{activity.description}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No farming activities for {months[currentMonth]} with the selected crop.</p>
              <p className="text-sm">Try selecting a different crop or month.</p>
            </div>
          )}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-green-100 border border-green-300 text-green-800 text-center">
            <div className="font-medium">Sowing/Planting</div>
          </div>
          <div className="p-3 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 text-center">
            <div className="font-medium">Land Preparation</div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-100 border border-yellow-300 text-yellow-800 text-center">
            <div className="font-medium">Harvesting</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
