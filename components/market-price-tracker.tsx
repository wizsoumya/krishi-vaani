"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Search, TrendingDown, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types for market data
interface MarketPrice {
  id: number
  commodity: string
  category: string
  market: string
  price: number
  unit: string
  priceChange: number
  lastUpdated: string
}

export default function MarketPriceTracker() {
  // Sample market data - in a real app, this would come from an API
  const marketData: MarketPrice[] = [
    {
      id: 1,
      commodity: "Rice (Basmati)",
      category: "Cereals",
      market: "Delhi",
      price: 3800,
      unit: "quintal",
      priceChange: 2.5,
      lastUpdated: "2025-04-15",
    },
    {
      id: 2,
      commodity: "Wheat",
      category: "Cereals",
      market: "Punjab",
      price: 2200,
      unit: "quintal",
      priceChange: -1.2,
      lastUpdated: "2025-04-15",
    },
    {
      id: 3,
      commodity: "Soybean",
      category: "Oilseeds",
      market: "Madhya Pradesh",
      price: 4500,
      unit: "quintal",
      priceChange: 3.7,
      lastUpdated: "2025-04-15",
    },
    {
      id: 4,
      commodity: "Cotton",
      category: "Fibers",
      market: "Gujarat",
      price: 6200,
      unit: "quintal",
      priceChange: 0.8,
      lastUpdated: "2025-04-15",
    },
    {
      id: 5,
      commodity: "Potato",
      category: "Vegetables",
      market: "Uttar Pradesh",
      price: 1200,
      unit: "quintal",
      priceChange: -2.3,
      lastUpdated: "2025-04-15",
    },
    {
      id: 6,
      commodity: "Onion",
      category: "Vegetables",
      market: "Maharashtra",
      price: 1800,
      unit: "quintal",
      priceChange: 5.6,
      lastUpdated: "2025-04-15",
    },
    {
      id: 7,
      commodity: "Tomato",
      category: "Vegetables",
      market: "Karnataka",
      price: 1500,
      unit: "quintal",
      priceChange: -3.1,
      lastUpdated: "2025-04-15",
    },
    {
      id: 8,
      commodity: "Sugarcane",
      category: "Cash Crops",
      market: "Uttar Pradesh",
      price: 350,
      unit: "quintal",
      priceChange: 0.5,
      lastUpdated: "2025-04-15",
    },
    {
      id: 9,
      commodity: "Maize",
      category: "Cereals",
      market: "Bihar",
      price: 1950,
      unit: "quintal",
      priceChange: 1.8,
      lastUpdated: "2025-04-15",
    },
    {
      id: 10,
      commodity: "Groundnut",
      category: "Oilseeds",
      market: "Andhra Pradesh",
      price: 5800,
      unit: "quintal",
      priceChange: 2.2,
      lastUpdated: "2025-04-15",
    },
    {
      id: 11,
      commodity: "Mustard",
      category: "Oilseeds",
      market: "Rajasthan",
      price: 5200,
      unit: "quintal",
      priceChange: 1.5,
      lastUpdated: "2025-04-15",
    },
    {
      id: 12,
      commodity: "Turmeric",
      category: "Spices",
      market: "Telangana",
      price: 7500,
      unit: "quintal",
      priceChange: 4.2,
      lastUpdated: "2025-04-15",
    },
  ]

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(marketData.map((item) => item.category))]

  // Filter data based on search term and category
  const filteredData = marketData.filter((item) => {
    const matchesSearch =
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort data based on sort configuration
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0

    if (sortConfig.key === "price") {
      return sortConfig.direction === "ascending" ? a.price - b.price : b.price - a.price
    }

    if (sortConfig.key === "commodity") {
      return sortConfig.direction === "ascending"
        ? a.commodity.localeCompare(b.commodity)
        : b.commodity.localeCompare(a.commodity)
    }

    if (sortConfig.key === "priceChange") {
      return sortConfig.direction === "ascending" ? a.priceChange - b.priceChange : b.priceChange - a.priceChange
    }

    return 0
  })

  // Handle sorting when a column header is clicked
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Get the current sort direction for a column
  const getSortDirection = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null
    return sortConfig.direction
  }

  // Group data by category for the card view
  const groupedByCategory = categories
    .filter((category) => category !== "all")
    .map((category) => ({
      category,
      items: marketData.filter((item) => item.category === category).slice(0, 3),
    }))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-green-800">Agricultural Market Prices</CardTitle>
        <CardDescription>
          Current market prices for agricultural commodities across major markets in India
        </CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search commodity or market..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => requestSort("commodity")}>
                      <div className="flex items-center gap-1">
                        Commodity
                        {getSortDirection("commodity") === "ascending" && <ArrowUp className="h-3 w-3" />}
                        {getSortDirection("commodity") === "descending" && <ArrowDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead
                      className="text-right cursor-pointer hover:bg-muted/50"
                      onClick={() => requestSort("price")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Price (₹)
                        {getSortDirection("price") === "ascending" && <ArrowUp className="h-3 w-3" />}
                        {getSortDirection("price") === "descending" && <ArrowDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-right cursor-pointer hover:bg-muted/50"
                      onClick={() => requestSort("priceChange")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Change
                        {getSortDirection("priceChange") === "ascending" && <ArrowUp className="h-3 w-3" />}
                        {getSortDirection("priceChange") === "descending" && <ArrowDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.length > 0 ? (
                    sortedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.commodity}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.market}</TableCell>
                        <TableCell className="text-right">
                          ₹{item.price}/{item.unit}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`flex items-center justify-end ${
                              item.priceChange > 0 ? "text-green-600" : item.priceChange < 0 ? "text-red-600" : ""
                            }`}
                          >
                            {item.priceChange > 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : item.priceChange < 0 ? (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            ) : null}
                            {item.priceChange > 0 ? "+" : ""}
                            {item.priceChange}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No results found. Try adjusting your search or filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              Last updated: April 15, 2025 | Source: Agricultural Market Information System
            </div>
          </TabsContent>

          <TabsContent value="cards">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groupedByCategory.map(({ category, items }) => (
                <Card key={category} className="overflow-hidden">
                  <CardHeader className="bg-green-50 pb-2">
                    <CardTitle className="text-lg text-green-800">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commodity</TableHead>
                          <TableHead className="text-right">Price (₹)</TableHead>
                          <TableHead className="text-right w-20">Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.commodity}
                              <div className="text-xs text-muted-foreground">{item.market}</div>
                            </TableCell>
                            <TableCell className="text-right">
                              ₹{item.price}/{item.unit}
                            </TableCell>
                            <TableCell className="text-right">
                              <span
                                className={`flex items-center justify-end ${
                                  item.priceChange > 0 ? "text-green-600" : item.priceChange < 0 ? "text-red-600" : ""
                                }`}
                              >
                                {item.priceChange > 0 ? (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                ) : item.priceChange < 0 ? (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                ) : null}
                                {item.priceChange > 0 ? "+" : ""}
                                {item.priceChange}%
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                View All Prices
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
