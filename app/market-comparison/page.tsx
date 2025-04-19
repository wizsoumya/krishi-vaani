"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Types for market data
interface MarketPrice {
  market: string
  price: number
  change: number
  distance: number
  transportCost: number
  netPrice: number
}

export default function MarketComparisonPage() {
  const [selectedCommodity, setSelectedCommodity] = useState("rice")
  const [selectedGrade, setSelectedGrade] = useState("a")

  // Sample commodities data
  const commodities = [
    { value: "rice", label: "Rice (Basmati)" },
    { value: "wheat", label: "Wheat" },
    { value: "cotton", label: "Cotton" },
    { value: "soybean", label: "Soybean" },
    { value: "potato", label: "Potato" },
    { value: "onion", label: "Onion" },
  ]

  // Sample grades data
  const grades = [
    { value: "a", label: "Grade A" },
    { value: "b", label: "Grade B" },
    { value: "c", label: "Grade C" },
  ]

  // Sample market comparison data
  const marketData: Record<string, Record<string, MarketPrice[]>> = {
    rice: {
      a: [
        {
          market: "Delhi",
          price: 3800,
          change: 2.5,
          distance: 0,
          transportCost: 0,
          netPrice: 3800,
        },
        {
          market: "Haryana",
          price: 3750,
          change: 1.8,
          distance: 120,
          transportCost: 150,
          netPrice: 3600,
        },
        {
          market: "Punjab",
          price: 3900,
          change: 3.2,
          distance: 250,
          transportCost: 300,
          netPrice: 3600,
        },
        {
          market: "Uttar Pradesh",
          price: 3650,
          change: -0.5,
          distance: 180,
          transportCost: 200,
          netPrice: 3450,
        },
        {
          market: "Rajasthan",
          price: 3700,
          change: 1.2,
          distance: 320,
          transportCost: 350,
          netPrice: 3350,
        },
      ],
      b: [
        {
          market: "Delhi",
          price: 3500,
          change: 1.5,
          distance: 0,
          transportCost: 0,
          netPrice: 3500,
        },
        {
          market: "Haryana",
          price: 3450,
          change: 0.8,
          distance: 120,
          transportCost: 150,
          netPrice: 3300,
        },
        {
          market: "Punjab",
          price: 3600,
          change: 2.2,
          distance: 250,
          transportCost: 300,
          netPrice: 3300,
        },
        {
          market: "Uttar Pradesh",
          price: 3350,
          change: -1.5,
          distance: 180,
          transportCost: 200,
          netPrice: 3150,
        },
        {
          market: "Rajasthan",
          price: 3400,
          change: 0.2,
          distance: 320,
          transportCost: 350,
          netPrice: 3050,
        },
      ],
      c: [
        {
          market: "Delhi",
          price: 3200,
          change: 0.5,
          distance: 0,
          transportCost: 0,
          netPrice: 3200,
        },
        {
          market: "Haryana",
          price: 3150,
          change: -0.2,
          distance: 120,
          transportCost: 150,
          netPrice: 3000,
        },
        {
          market: "Punjab",
          price: 3300,
          change: 1.2,
          distance: 250,
          transportCost: 300,
          netPrice: 3000,
        },
        {
          market: "Uttar Pradesh",
          price: 3050,
          change: -2.5,
          distance: 180,
          transportCost: 200,
          netPrice: 2850,
        },
        {
          market: "Rajasthan",
          price: 3100,
          change: -0.8,
          distance: 320,
          transportCost: 350,
          netPrice: 2750,
        },
      ],
    },
    wheat: {
      a: [
        {
          market: "Delhi",
          price: 2200,
          change: -1.2,
          distance: 0,
          transportCost: 0,
          netPrice: 2200,
        },
        {
          market: "Haryana",
          price: 2250,
          change: 0.8,
          distance: 120,
          transportCost: 150,
          netPrice: 2100,
        },
        {
          market: "Punjab",
          price: 2300,
          change: 1.5,
          distance: 250,
          transportCost: 300,
          netPrice: 2000,
        },
        {
          market: "Uttar Pradesh",
          price: 2150,
          change: -2.0,
          distance: 180,
          transportCost: 200,
          netPrice: 1950,
        },
        {
          market: "Rajasthan",
          price: 2180,
          change: -0.5,
          distance: 320,
          transportCost: 350,
          netPrice: 1830,
        },
      ],
      b: [],
      c: [],
    },
  }

  // Get the current market data based on selected commodity and grade
  const currentMarketData = marketData[selectedCommodity]?.[selectedGrade] || []

  // Sort market data by net price (descending)
  const sortedMarketData = [...currentMarketData].sort((a, b) => b.netPrice - a.netPrice)

  // Find the best market (highest net price)
  const bestMarket = sortedMarketData.length > 0 ? sortedMarketData[0] : null

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link href="/" className="text-green-600 hover:text-green-700 inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <div className="grid gap-6">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Market Price Comparison</CardTitle>
              <CardDescription>
                Compare prices across different markets to find the best place to sell your produce
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select commodity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Commodities</SelectLabel>
                        {commodities.map((commodity) => (
                          <SelectItem key={commodity.value} value={commodity.value}>
                            {commodity.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Grades</SelectLabel>
                        {grades.map((grade) => (
                          <SelectItem key={grade.value} value={grade.value}>
                            {grade.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search markets..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {bestMarket && (
                <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Best Market: {bestMarket.market}</h3>
                      <p className="text-sm text-green-700">Highest net price after transportation costs</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-green-700">Market Price</p>
                      <p className="font-medium text-green-800">₹{bestMarket.price}/quintal</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Transport Cost</p>
                      <p className="font-medium text-green-800">₹{bestMarket.transportCost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Net Price</p>
                      <p className="font-medium text-green-800">₹{bestMarket.netPrice}/quintal</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Market</TableHead>
                      <TableHead className="text-right">Price (₹/quintal)</TableHead>
                      <TableHead className="text-right">Price Change</TableHead>
                      <TableHead className="text-right">Distance (km)</TableHead>
                      <TableHead className="text-right">Transport Cost (₹)</TableHead>
                      <TableHead className="text-right">Net Price (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedMarketData.length > 0 ? (
                      sortedMarketData.map((market, index) => (
                        <TableRow key={index} className={index === 0 ? "bg-green-50" : ""}>
                          <TableCell className="font-medium">{market.market}</TableCell>
                          <TableCell className="text-right">₹{market.price}</TableCell>
                          <TableCell
                            className={`text-right ${
                              market.change > 0 ? "text-green-600" : market.change < 0 ? "text-red-600" : ""
                            }`}
                          >
                            {market.change > 0 ? "+" : ""}
                            {market.change}%
                          </TableCell>
                          <TableCell className="text-right">{market.distance}</TableCell>
                          <TableCell className="text-right">₹{market.transportCost}</TableCell>
                          <TableCell className="text-right font-medium">₹{market.netPrice}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No market data available for the selected commodity and grade.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  * Net Price = Market Price - Transport Cost. The table is sorted by Net Price to help you find the
                  most profitable market.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
