"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import SiteHeader from "@/components/site-header"

// Define crop types and their yield data (tons per hectare)
const cropYieldData = {
  rice: {
    name: "Rice",
    minYield: 3.5,
    maxYield: 6.0,
    avgYield: 4.5,
    unit: "quintal",
    basePrice: 2000, // Base price per quintal in INR
    priceVariation: 0.2, // Price can vary by ±20%
  },
  wheat: {
    name: "Wheat",
    minYield: 3.0,
    maxYield: 5.5,
    avgYield: 4.0,
    unit: "quintal",
    basePrice: 2200,
    priceVariation: 0.15,
  },
  maize: {
    name: "Maize",
    minYield: 4.0,
    maxYield: 8.0,
    avgYield: 5.5,
    unit: "quintal",
    basePrice: 1800,
    priceVariation: 0.25,
  },
  cotton: {
    name: "Cotton",
    minYield: 1.5,
    maxYield: 3.0,
    avgYield: 2.0,
    unit: "quintal",
    basePrice: 6000,
    priceVariation: 0.3,
  },
  sugarcane: {
    name: "Sugarcane",
    minYield: 60.0,
    maxYield: 100.0,
    avgYield: 80.0,
    unit: "ton",
    basePrice: 350,
    priceVariation: 0.1,
  },
  potato: {
    name: "Potato",
    minYield: 20.0,
    maxYield: 40.0,
    avgYield: 30.0,
    unit: "quintal",
    basePrice: 1200,
    priceVariation: 0.4, // Potatoes have high price volatility
  },
  tomato: {
    name: "Tomato",
    minYield: 25.0,
    maxYield: 60.0,
    avgYield: 40.0,
    unit: "quintal",
    basePrice: 1500,
    priceVariation: 0.5, // Tomatoes have very high price volatility
  },
  onion: {
    name: "Onion",
    minYield: 25.0,
    maxYield: 45.0,
    avgYield: 35.0,
    unit: "quintal",
    basePrice: 1800,
    priceVariation: 0.45,
  },
}

// Production cost estimates (INR per hectare)
const productionCosts = {
  rice: { min: 35000, avg: 45000, max: 60000 },
  wheat: { min: 30000, avg: 40000, max: 55000 },
  maize: { min: 25000, avg: 35000, max: 50000 },
  cotton: { min: 40000, avg: 55000, max: 70000 },
  sugarcane: { min: 60000, avg: 80000, max: 100000 },
  potato: { min: 70000, avg: 90000, max: 120000 },
  tomato: { min: 80000, avg: 100000, max: 150000 },
  onion: { min: 70000, avg: 90000, max: 120000 },
}

export default function RevenueCalculatorPage() {
  const [cropType, setCropType] = useState<keyof typeof cropYieldData | "">("")
  const [plotSize, setPlotSize] = useState<number>(1)
  const [unit, setUnit] = useState<"hectare" | "acre">("hectare")
  const [yieldLevel, setYieldLevel] = useState<number>(50) // 0-100 slider, 50 = average yield
  const [marketPrice, setMarketPrice] = useState<number>(0)
  const [marketScenario, setMarketScenario] = useState<"low" | "average" | "high">("average")

  const [results, setResults] = useState<null | {
    totalYield: number
    totalRevenue: number
    productionCost: number
    profit: number
    roi: number
  }>(null)

  // Update market price when crop type or market scenario changes
  useEffect(() => {
    if (!cropType) return

    const crop = cropYieldData[cropType]
    let priceMultiplier = 1

    switch (marketScenario) {
      case "low":
        priceMultiplier = 1 - crop.priceVariation
        break
      case "high":
        priceMultiplier = 1 + crop.priceVariation
        break
      default:
        priceMultiplier = 1
    }

    setMarketPrice(Math.round(crop.basePrice * priceMultiplier))
  }, [cropType, marketScenario])

  // Convert acres to hectares if needed
  const getAreaInHectares = () => {
    return unit === "acre" ? plotSize * 0.404686 : plotSize
  }

  // Calculate yield based on the yield level slider
  const calculateYield = (crop: (typeof cropYieldData)[keyof typeof cropYieldData], yieldPercentage: number) => {
    // Convert 0-100 slider to 0-1 range
    const yieldFactor = yieldPercentage / 100

    // Calculate yield between min and max based on the yield factor
    // When yieldFactor is 0.5 (slider at 50), yield will be avgYield
    if (yieldFactor < 0.5) {
      // Map 0-0.5 to minYield-avgYield
      return crop.minYield + (crop.avgYield - crop.minYield) * (yieldFactor * 2)
    } else {
      // Map 0.5-1 to avgYield-maxYield
      return crop.avgYield + (crop.maxYield - crop.avgYield) * ((yieldFactor - 0.5) * 2)
    }
  }

  // Calculate production cost based on the yield level
  const calculateProductionCost = (cropType: keyof typeof productionCosts, yieldPercentage: number) => {
    const costs = productionCosts[cropType]
    const yieldFactor = yieldPercentage / 100

    if (yieldFactor < 0.5) {
      // Lower yields generally have lower costs, but not proportionally
      return costs.min + (costs.avg - costs.min) * (yieldFactor * 2)
    } else {
      // Higher yields require more inputs, increasing costs
      return costs.avg + (costs.max - costs.avg) * ((yieldFactor - 0.5) * 2)
    }
  }

  const calculateRevenue = () => {
    if (!cropType || plotSize <= 0 || marketPrice <= 0) return

    const areaInHectares = getAreaInHectares()
    const crop = cropYieldData[cropType]

    // Calculate yield based on the yield level slider
    const yieldPerHectare = calculateYield(crop, yieldLevel)
    const totalYield = yieldPerHectare * areaInHectares

    // Calculate revenue
    const totalRevenue = totalYield * marketPrice

    // Calculate production cost
    const productionCostPerHectare = calculateProductionCost(cropType, yieldLevel)
    const totalProductionCost = productionCostPerHectare * areaInHectares

    // Calculate profit and ROI
    const profit = totalRevenue - totalProductionCost
    const roi = (profit / totalProductionCost) * 100

    setResults({
      totalYield,
      totalRevenue,
      productionCost: totalProductionCost,
      profit,
      roi,
    })
  }

  return (
    <div className="min-h-screen bg-green-50">
      <SiteHeader />
      <div className="container px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link href="/calculators" className="text-green-600 hover:text-green-700 inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculators
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="border-green-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <CardTitle className="text-green-800">Revenue Calculator</CardTitle>
                    <CardDescription>Estimate potential revenue from your crops</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <Select value={cropType} onValueChange={(value) => setCropType(value as keyof typeof cropYieldData)}>
                    <SelectTrigger id="crop-type" aria-label="Select crop type">
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Crop Types</SelectLabel>
                        {Object.entries(cropYieldData).map(([key, crop]) => (
                          <SelectItem key={key} value={key}>
                            {crop.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plot-size">Plot Size</Label>
                  <div className="flex gap-2">
                    <Input
                      id="plot-size"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={plotSize}
                      onChange={(e) => setPlotSize(Number.parseFloat(e.target.value) || 0)}
                      aria-label={`Plot size in ${unit}s`}
                    />
                    <Select value={unit} onValueChange={(value) => setUnit(value as "hectare" | "acre")}>
                      <SelectTrigger className="w-[120px]" aria-label="Select unit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hectare">Hectare</SelectItem>
                        <SelectItem value="acre">Acre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="yield-level">Expected Yield Level</Label>
                    <span className="text-sm text-gray-500">
                      {yieldLevel < 30 ? "Low" : yieldLevel < 70 ? "Average" : "High"}
                    </span>
                  </div>
                  <Slider
                    id="yield-level"
                    min={0}
                    max={100}
                    step={1}
                    value={[yieldLevel]}
                    onValueChange={(value) => setYieldLevel(value[0])}
                    aria-label="Select expected yield level"
                  />
                  {cropType && (
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {cropYieldData[cropType].minYield} {cropYieldData[cropType].unit}/ha
                      </span>
                      <span>
                        {cropYieldData[cropType].avgYield} {cropYieldData[cropType].unit}/ha
                      </span>
                      <span>
                        {cropYieldData[cropType].maxYield} {cropYieldData[cropType].unit}/ha
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="market-scenario">Market Price Scenario</Label>
                  <Select
                    value={marketScenario}
                    onValueChange={(value) => setMarketScenario(value as "low" | "average" | "high")}
                  >
                    <SelectTrigger id="market-scenario" aria-label="Select market scenario">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Price</SelectItem>
                      <SelectItem value="average">Average Price</SelectItem>
                      <SelectItem value="high">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="market-price">
                    Market Price (₹/{cropType ? cropYieldData[cropType].unit : "unit"})
                  </Label>
                  <Input
                    id="market-price"
                    type="number"
                    min="1"
                    value={marketPrice}
                    onChange={(e) => setMarketPrice(Number.parseInt(e.target.value) || 0)}
                    aria-label={`Market price in rupees per ${cropType ? cropYieldData[cropType].unit : "unit"}`}
                  />
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={calculateRevenue}
                  disabled={!cropType || plotSize <= 0 || marketPrice <= 0}
                >
                  Calculate Revenue
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border-green-100 h-full">
              <CardHeader>
                <CardTitle className="text-green-800">Revenue Projection</CardTitle>
                <CardDescription>
                  {cropType
                    ? `Estimated revenue for ${cropYieldData[cropType].name} cultivation on ${plotSize} ${unit}${plotSize > 1 ? "s" : ""}`
                    : "Select a crop type and enter details to see revenue projections"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-white border rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Total Yield</div>
                        <div className="text-2xl font-bold text-green-800">
                          {results.totalYield.toFixed(2)} {cropType && cropYieldData[cropType].unit}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Based on{" "}
                          {calculateYield(cropYieldData[cropType as keyof typeof cropYieldData], yieldLevel).toFixed(2)}{" "}
                          {cropType && cropYieldData[cropType].unit}/ha
                        </div>
                      </div>

                      <div className="p-4 bg-white border rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Market Price</div>
                        <div className="text-2xl font-bold text-green-800">
                          ₹{marketPrice}/{cropType && cropYieldData[cropType].unit}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {marketScenario === "low" ? "Low" : marketScenario === "high" ? "High" : "Average"} price
                          scenario
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-center">
                        <div className="text-sm text-green-700 mb-1">Gross Revenue</div>
                        <div className="text-2xl font-bold text-green-800">
                          ₹{results.totalRevenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-600 mt-1">Total sales value</div>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-center">
                        <div className="text-sm text-red-700 mb-1">Production Cost</div>
                        <div className="text-2xl font-bold text-red-800">
                          ₹{results.productionCost.toLocaleString()}
                        </div>
                        <div className="text-xs text-red-600 mt-1">Total input costs</div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
                        <div className="text-sm text-blue-700 mb-1">Net Profit</div>
                        <div className={`text-2xl font-bold ${results.profit >= 0 ? "text-blue-800" : "text-red-800"}`}>
                          ₹{results.profit.toLocaleString()}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">Revenue minus costs</div>
                      </div>
                    </div>

                    <div className="p-6 bg-white border rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <h3 className="font-medium text-green-800">Return on Investment (ROI)</h3>
                          <p className="text-sm text-gray-600">Profit as percentage of investment</p>
                        </div>
                      </div>

                      <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div
                          className={`absolute top-0 left-0 h-full ${
                            results.roi >= 30
                              ? "bg-green-500"
                              : results.roi >= 10
                                ? "bg-green-400"
                                : results.roi >= 0
                                  ? "bg-yellow-400"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${Math.max(0, Math.min(100, results.roi + 50))}%` }}
                        ></div>
                        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-300 -translate-x-1/2"></div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-red-600">Loss</span>
                        <span className="text-gray-600">Break-even</span>
                        <span className="text-green-600">Profit</span>
                      </div>

                      <div className="mt-4 text-center">
                        <span
                          className={`text-3xl font-bold ${
                            results.roi >= 30
                              ? "text-green-600"
                              : results.roi >= 10
                                ? "text-green-500"
                                : results.roi >= 0
                                  ? "text-yellow-600"
                                  : "text-red-600"
                          }`}
                        >
                          {results.roi.toFixed(1)}%
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          {results.roi >= 30
                            ? "Excellent return"
                            : results.roi >= 10
                              ? "Good return"
                              : results.roi >= 0
                                ? "Modest return"
                                : "Investment loss"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                      <h3 className="font-medium text-green-800 mb-2">Market Insights</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>
                            {results.profit >= 0
                              ? `This crop is projected to be profitable with a return of ${results.roi.toFixed(1)}% on your investment.`
                              : `This crop is projected to result in a loss of ${Math.abs(results.profit).toLocaleString()} rupees.`}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>
                            {`Break-even price: ₹${(results.productionCost / results.totalYield).toFixed(2)} per ${cropType && cropYieldData[cropType].unit}`}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>
                            {`Break-even yield: ${(results.productionCost / marketPrice).toFixed(2)} ${cropType && cropYieldData[cropType].unit} (${(results.productionCost / marketPrice / getAreaInHectares()).toFixed(2)} per hectare)`}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calculator className="h-16 w-16 text-green-200 mb-4" />
                    <h3 className="text-lg font-medium text-green-800 mb-2">No Calculations Yet</h3>
                    <p className="text-sm text-gray-600 max-w-md">
                      Select a crop type, enter your plot size and other details, then click "Calculate Revenue" to see
                      projected earnings from your farm.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-xs text-gray-500 border-t pt-4">
                Note: These calculations are estimates based on average yields and market prices. Actual results may
                vary based on weather conditions, farming practices, and market fluctuations.
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
