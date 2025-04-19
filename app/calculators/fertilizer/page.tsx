"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator, Leaf } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SiteHeader from "@/components/site-header"

// Define crop types and their fertilizer requirements (N-P-K in kg/hectare)
const cropFertilizerData = {
  rice: { name: "Rice", nitrogen: 120, phosphorus: 60, potassium: 60, description: "Paddy/Rice cultivation" },
  wheat: { name: "Wheat", nitrogen: 120, phosphorus: 60, potassium: 40, description: "Wheat cultivation" },
  maize: { name: "Maize", nitrogen: 150, phosphorus: 75, potassium: 50, description: "Corn/Maize cultivation" },
  cotton: { name: "Cotton", nitrogen: 100, phosphorus: 50, potassium: 50, description: "Cotton cultivation" },
  sugarcane: { name: "Sugarcane", nitrogen: 150, phosphorus: 60, potassium: 60, description: "Sugarcane cultivation" },
  potato: { name: "Potato", nitrogen: 120, phosphorus: 100, potassium: 120, description: "Potato cultivation" },
  tomato: { name: "Tomato", nitrogen: 100, phosphorus: 90, potassium: 80, description: "Tomato cultivation" },
  onion: { name: "Onion", nitrogen: 80, phosphorus: 60, potassium: 80, description: "Onion cultivation" },
}

// Common fertilizer types and their nutrient content (%)
const fertilizerTypes = {
  urea: { name: "Urea", nitrogen: 46, phosphorus: 0, potassium: 0 },
  dap: { name: "DAP (Di-ammonium Phosphate)", nitrogen: 18, phosphorus: 46, potassium: 0 },
  mop: { name: "MOP (Muriate of Potash)", nitrogen: 0, phosphorus: 0, potassium: 60 },
  npk_complex: { name: "NPK Complex (10-26-26)", nitrogen: 10, phosphorus: 26, potassium: 26 },
  ssp: { name: "SSP (Single Super Phosphate)", nitrogen: 0, phosphorus: 16, potassium: 0 },
}

export default function FertilizerCalculatorPage() {
  const [cropType, setCropType] = useState<keyof typeof cropFertilizerData | "">("")
  const [plotSize, setPlotSize] = useState<number>(1)
  const [unit, setUnit] = useState<"hectare" | "acre">("hectare")
  const [soilType, setSoilType] = useState<"normal" | "sandy" | "clayey" | "loamy">("normal")
  const [results, setResults] = useState<null | {
    nitrogen: number
    phosphorus: number
    potassium: number
    fertilizers: {
      urea: number
      dap: number
      mop: number
      npk_complex: number
      ssp: number
    }
  }>(null)

  // Convert acres to hectares if needed
  const getAreaInHectares = () => {
    return unit === "acre" ? plotSize * 0.404686 : plotSize
  }

  // Adjust fertilizer based on soil type
  const getSoilFactor = (nutrient: "nitrogen" | "phosphorus" | "potassium") => {
    if (soilType === "sandy") {
      return nutrient === "nitrogen" ? 1.2 : nutrient === "potassium" ? 1.1 : 1
    } else if (soilType === "clayey") {
      return nutrient === "phosphorus" ? 1.2 : 1
    } else if (soilType === "loamy") {
      return 0.9 // Generally fertile soil requires less fertilizer
    }
    return 1 // Normal soil
  }

  const calculateFertilizer = () => {
    if (!cropType || plotSize <= 0) return

    const areaInHectares = getAreaInHectares()
    const crop = cropFertilizerData[cropType]

    // Calculate required nutrients in kg
    const nitrogenRequired = crop.nitrogen * areaInHectares * getSoilFactor("nitrogen")
    const phosphorusRequired = crop.phosphorus * areaInHectares * getSoilFactor("phosphorus")
    const potassiumRequired = crop.potassium * areaInHectares * getSoilFactor("potassium")

    // Calculate fertilizer quantities
    // This is a simplified calculation - in real applications, you'd need to account for more factors
    const ureaAmount = (nitrogenRequired / fertilizerTypes.urea.nitrogen) * 100
    const dapAmount = (phosphorusRequired / fertilizerTypes.dap.phosphorus) * 100
    const mopAmount = (potassiumRequired / fertilizerTypes.mop.potassium) * 100

    // NPK complex calculation (considering it provides all three nutrients)
    const npkAmount = Math.max(
      (nitrogenRequired / fertilizerTypes.npk_complex.nitrogen) * 100,
      (phosphorusRequired / fertilizerTypes.npk_complex.phosphorus) * 100,
      (potassiumRequired / fertilizerTypes.npk_complex.potassium) * 100,
    )

    // SSP calculation
    const sspAmount = (phosphorusRequired / fertilizerTypes.ssp.phosphorus) * 100

    setResults({
      nitrogen: nitrogenRequired,
      phosphorus: phosphorusRequired,
      potassium: potassiumRequired,
      fertilizers: {
        urea: ureaAmount,
        dap: dapAmount,
        mop: mopAmount,
        npk_complex: npkAmount,
        ssp: sspAmount,
      },
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
                    <CardTitle className="text-green-800">Fertilizer Calculator</CardTitle>
                    <CardDescription>Calculate required fertilizer based on crop and area</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <Select
                    value={cropType}
                    onValueChange={(value) => setCropType(value as keyof typeof cropFertilizerData)}
                  >
                    <SelectTrigger id="crop-type" aria-label="Select crop type">
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Crop Types</SelectLabel>
                        {Object.entries(cropFertilizerData).map(([key, crop]) => (
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
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Select
                    value={soilType}
                    onValueChange={(value) => setSoilType(value as "normal" | "sandy" | "clayey" | "loamy")}
                  >
                    <SelectTrigger id="soil-type" aria-label="Select soil type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal Soil</SelectItem>
                      <SelectItem value="sandy">Sandy Soil</SelectItem>
                      <SelectItem value="clayey">Clayey Soil</SelectItem>
                      <SelectItem value="loamy">Loamy Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={calculateFertilizer}
                  disabled={!cropType || plotSize <= 0}
                >
                  Calculate Fertilizer
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border-green-100 h-full">
              <CardHeader>
                <CardTitle className="text-green-800">Fertilizer Recommendations</CardTitle>
                <CardDescription>
                  {cropType
                    ? `Recommendations for ${cropFertilizerData[cropType as keyof typeof cropFertilizerData].name} cultivation on ${plotSize} ${unit}${plotSize > 1 ? "s" : ""}`
                    : "Select a crop type and enter plot size to see recommendations"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <Tabs defaultValue="nutrients">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="nutrients">Required Nutrients</TabsTrigger>
                      <TabsTrigger value="fertilizers">Fertilizer Options</TabsTrigger>
                    </TabsList>

                    <TabsContent value="nutrients" className="space-y-4 pt-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-center">
                          <div className="text-sm text-green-700 mb-1">Nitrogen (N)</div>
                          <div className="text-2xl font-bold text-green-800">{results.nitrogen.toFixed(2)} kg</div>
                          <div className="text-xs text-green-600 mt-1">Essential for leaf growth</div>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
                          <div className="text-sm text-blue-700 mb-1">Phosphorus (P)</div>
                          <div className="text-2xl font-bold text-blue-800">{results.phosphorus.toFixed(2)} kg</div>
                          <div className="text-xs text-blue-600 mt-1">Important for root development</div>
                        </div>
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg text-center">
                          <div className="text-sm text-amber-700 mb-1">Potassium (K)</div>
                          <div className="text-2xl font-bold text-amber-800">{results.potassium.toFixed(2)} kg</div>
                          <div className="text-xs text-amber-600 mt-1">Enhances overall plant health</div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-green-800 mb-2">Application Guidelines</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>
                              Apply nitrogen in multiple doses - 40% at planting, 30% during vegetative growth, and 30%
                              during reproductive stage.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>
                              Apply phosphorus entirely at the time of planting or land preparation for best results.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>
                              Apply potassium in two equal splits - at planting and during the flowering/fruiting stage.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="fertilizers" className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="p-4 bg-white border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">Urea</h3>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">46% N</span>
                            </div>
                            <div className="text-2xl font-bold text-green-800 mb-1">
                              {results.fertilizers.urea.toFixed(2)} kg
                            </div>
                            <p className="text-sm text-gray-600">
                              Best for providing nitrogen throughout the growing season
                            </p>
                          </div>

                          <div className="p-4 bg-white border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">DAP</h3>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                18% N, 46% P
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-green-800 mb-1">
                              {results.fertilizers.dap.toFixed(2)} kg
                            </div>
                            <p className="text-sm text-gray-600">Good source of phosphorus with some nitrogen</p>
                          </div>

                          <div className="p-4 bg-white border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">MOP</h3>
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">60% K</span>
                            </div>
                            <div className="text-2xl font-bold text-green-800 mb-1">
                              {results.fertilizers.mop.toFixed(2)} kg
                            </div>
                            <p className="text-sm text-gray-600">Primary source of potassium for crops</p>
                          </div>

                          <div className="p-4 bg-white border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">NPK Complex (10-26-26)</h3>
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                Balanced
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-green-800 mb-1">
                              {results.fertilizers.npk_complex.toFixed(2)} kg
                            </div>
                            <p className="text-sm text-gray-600">
                              Provides all three nutrients in a single application
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg">
                          <h3 className="font-medium text-green-800 mb-2">Recommendation</h3>
                          <p className="text-sm text-gray-700">
                            For {cropFertilizerData[cropType as keyof typeof cropFertilizerData].name} on {plotSize}{" "}
                            {unit}
                            {plotSize > 1 ? "s" : ""} of {soilType} soil, we recommend using either:
                          </p>
                          <ul className="mt-2 space-y-1 text-sm text-gray-700">
                            <li>
                              • {results.fertilizers.urea.toFixed(2)} kg of Urea + {results.fertilizers.dap.toFixed(2)}{" "}
                              kg of DAP + {results.fertilizers.mop.toFixed(2)} kg of MOP, or
                            </li>
                            <li>
                              • {results.fertilizers.npk_complex.toFixed(2)} kg of NPK Complex (10-26-26) with
                              additional {(results.fertilizers.urea - results.fertilizers.npk_complex * 0.1).toFixed(2)}{" "}
                              kg of Urea
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calculator className="h-16 w-16 text-green-200 mb-4" />
                    <h3 className="text-lg font-medium text-green-800 mb-2">No Calculations Yet</h3>
                    <p className="text-sm text-gray-600 max-w-md">
                      Select a crop type, enter your plot size, and click "Calculate Fertilizer" to see detailed
                      recommendations for your farm.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-xs text-gray-500 border-t pt-4">
                Note: These calculations are estimates based on general crop requirements. Actual needs may vary based
                on soil conditions, climate, and specific crop varieties. Consider soil testing for more accurate
                recommendations.
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
