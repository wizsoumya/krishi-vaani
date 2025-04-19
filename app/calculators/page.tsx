import Link from "next/link"
import { ArrowLeft, Calculator, DollarSign, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SiteHeader from "@/components/site-header"

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <SiteHeader />
      <div className="container px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link href="/" className="text-green-600 hover:text-green-700 inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800 mb-2">Farm Calculators</h1>
            <p className="text-gray-600 max-w-[900px]">
              Use our specialized calculators to make informed decisions about your farming operations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-green-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-green-700" />
                  </div>
                  <CardTitle className="text-green-800">Fertilizer Calculator</CardTitle>
                </div>
                <CardDescription>
                  Calculate the required amount of fertilizer based on crop type and plot size
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Our fertilizer calculator helps you determine the optimal amount of nitrogen, phosphorus, and
                  potassium needed for your crops, along with specific fertilizer recommendations.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800">N-P-K</div>
                    <div className="text-green-600">Ratios</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800">Soil Type</div>
                    <div className="text-green-600">Adjustments</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800">Application</div>
                    <div className="text-green-600">Guidelines</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/calculators/fertilizer">Calculate Fertilizer Needs</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-700" />
                  </div>
                  <CardTitle className="text-green-800">Revenue Calculator</CardTitle>
                </div>
                <CardDescription>
                  Estimate potential revenue based on crop type, plot size, and market prices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Our revenue calculator helps you project your farm income by estimating yields and calculating
                  potential revenue based on current market prices.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800">Yield</div>
                    <div className="text-green-600">Estimates</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800">Price</div>
                    <div className="text-green-600">Scenarios</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800">ROI</div>
                    <div className="text-green-600">Analysis</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/calculators/revenue">Calculate Potential Revenue</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-green-700" />
                  </div>
                  <CardTitle className="text-green-800">Water Calculator</CardTitle>
                </div>
                <CardDescription>
                  Calculate irrigation requirements based on crop type and weather conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Our water calculator helps you determine the optimal irrigation schedule and water requirements for
                  your crops based on local weather conditions.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800">Water</div>
                    <div className="text-green-600">Needs</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800">Schedule</div>
                    <div className="text-green-600">Planning</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800">Efficiency</div>
                    <div className="text-green-600">Tips</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4">Why Use Our Farm Calculators?</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <Calculator className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-medium text-green-800 mb-1">Precision Farming</h3>
                <p className="text-sm text-gray-600">
                  Make data-driven decisions to optimize your inputs and maximize your outputs.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <DollarSign className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-medium text-green-800 mb-1">Cost Savings</h3>
                <p className="text-sm text-gray-600">
                  Reduce waste and save money by applying only what your crops need.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <Leaf className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-medium text-green-800 mb-1">Sustainable Farming</h3>
                <p className="text-sm text-gray-600">
                  Protect the environment by optimizing resource use and reducing runoff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
