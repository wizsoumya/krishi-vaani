import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Calendar,
  Calculator,
  Cloud,
  CreditCard,
  BarChart3,
  Leaf,
  SunMedium,
  Tractor,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import WeatherWidget from "@/components/weather-widget"
import MarketPricePreview from "@/components/market-price-preview"
import CropCalendarPreview from "@/components/crop-calendar-preview"
import LoanSchemePreview from "@/components/loan-scheme-preview"
import SiteHeader from "@/components/site-header"
import Chatbot from "@/components/chatbot"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-800">
                    Growing Better Futures Together
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Your complete resource for agricultural information, weather updates, market prices, and expert
                    advice.
                  </p>
                </div>
                {/* <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </div> */}
              </div>
              <Image
                src="/hero-image.png?height=550&width=550"
                width={550}
                height={550}
                alt="Farming landscape with green fields and modern agricultural equipment"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                  Everything You Need in One Place
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Our platform provides comprehensive tools and information to help you maximize your agricultural
                  productivity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <SunMedium className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-green-800">Weather Forecasts</CardTitle>
                  <CardDescription>Real-time weather updates specific to your location</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="#weather" className="text-green-600 hover:text-green-700 inline-flex items-center">
                    View Weather <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <BarChart3 className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-green-800">Market Prices</CardTitle>
                  <CardDescription>Current prices for agricultural products with SMS alerts</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="#market-prices" className="text-green-600 hover:text-green-700 inline-flex items-center">
                    Check Prices <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <Calendar className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-green-800">Crop Calendar</CardTitle>
                  <CardDescription>Plan your farming activities with our interactive calendar</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="#crop-calendar" className="text-green-600 hover:text-green-700 inline-flex items-center">
                    View Calendar <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <Tractor className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-green-800">Government Schemes</CardTitle>
                  <CardDescription>Information on agricultural programs and initiatives</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="#schemes" className="text-green-600 hover:text-green-700 inline-flex items-center">
                    Explore Schemes <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <CreditCard className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-green-800">Bank Loans</CardTitle>
                  <CardDescription>Compare agricultural loan schemes from different banks</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="#loans" className="text-green-600 hover:text-green-700 inline-flex items-center">
                    View Loans <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <Calculator className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-green-800">Farm Calculators</CardTitle>
                  <CardDescription>Calculate fertilizer needs and estimate crop revenue</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/calculators" className="text-green-600 hover:text-green-700 inline-flex items-center">
                    Use Calculators <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Weather Section */}
        <section id="weather" className="w-full py-12 md:py-24 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  <SunMedium className="mr-1 h-4 w-4" />
                  <span>Weather Updates</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                  Local Weather Forecast
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Stay informed about weather conditions to plan your farming activities effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <WeatherWidget />
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-800">Weather Alerts</h3>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-amber-600" />
                    <h4 className="font-semibold text-amber-800">Heavy Rain Alert</h4>
                  </div>
                  <p className="mt-2 text-sm text-amber-700">
                    Expected heavy rainfall in the next 48 hours. Consider postponing any outdoor activities.
                  </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Ideal Irrigation Period</h4>
                  </div>
                  <p className="mt-2 text-sm text-green-700">
                    The next 3 days will have moderate temperatures, ideal for irrigation activities.
                  </p>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Seasonal Forecast</h4>
                  </div>
                  <p className="mt-2 text-sm text-blue-700">
                    The monsoon is expected to arrive on schedule this year with normal rainfall predicted.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button className="bg-green-600 hover:bg-green-700">
                <Link href="/weather">View Detailed Forecast</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Farm Calculators Preview Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  <Calculator className="mr-1 h-4 w-4" />
                  <span>Farm Calculators</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                  Make Data-Driven Decisions
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Our specialized calculators help you optimize your farming operations and maximize profits.
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-6 py-12 md:grid-cols-2">
              <Card className="border-green-100">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <CardTitle className="text-green-800">Fertilizer Calculator</CardTitle>
                      <CardDescription>Calculate required fertilizer based on crop and area</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Our fertilizer calculator helps you determine the optimal amount of nitrogen, phosphorus, and
                    potassium needed for your crops, along with specific fertilizer recommendations.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
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
                      <BarChart3 className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <CardTitle className="text-green-800">Revenue Calculator</CardTitle>
                      <CardDescription>Estimate potential revenue from your crops</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Our revenue calculator helps you project your farm income by estimating yields and calculating
                    potential revenue based on current market prices.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
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
            </div>
            <div className="flex justify-center">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50" asChild>
                <Link href="/calculators">View All Calculators</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Market Prices Preview Section */}
        <section id="market-prices" className="w-full py-12 md:py-24 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  <BarChart3 className="mr-1 h-4 w-4" />
                  <span>Market Intelligence</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                  Agricultural Market Prices
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Stay updated with current market prices to make informed decisions about when and where to sell your
                  produce.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <MarketPricePreview />
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Card className="w-full sm:w-1/2 border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-800">Price Comparison Tool</CardTitle>
                    <CardDescription>Compare prices across different markets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Our market comparison tool allows you to compare prices of the same commodity across different
                      markets to find the best place to sell.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Link href="/market-comparison">Compare Markets</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-full sm:w-1/2 border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-800">SMS Price Alerts</CardTitle>
                    <CardDescription>Get notified when prices change</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Set up SMS alerts for your crops and get notified when prices reach your target or change
                      significantly.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Link href="/price-alerts">Set Up Alerts</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Crop Calendar Section */}
        <section id="crop-calendar" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Seasonal Planning</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Crop Calendar</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Plan your farming activities throughout the year with our interactive crop calendar.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <CropCalendarPreview />
              <div className="mt-8 flex justify-center">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Link href="/crop-calendar">View Full Calendar</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Government Schemes Section */}
        <section id="schemes" className="w-full py-12 md:py-24 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  <Tractor className="mr-1 h-4 w-4" />
                  <span>Government Support</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Agricultural Schemes</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Explore government initiatives designed to support farmers and enhance agricultural productivity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Scheme Cards */}
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-green-800">PM-KISAN</CardTitle>
                    <div className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Ongoing
                    </div>
                  </div>
                  <CardDescription>Income support scheme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Image
                      src="/pmkisan.jpg?height=80&width=80"
                      width={80}
                      height={80}
                      alt="PM-KISAN logo"
                      className="rounded-md object-cover"
                    />
                    <p className="text-sm text-gray-600">
                      Income support of ₹6,000 per year in three equal installments to all land holding farmer families.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Apply Now</Button>
                </CardFooter>
              </Card>

              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-green-800">Soil Health Card</CardTitle>
                    <div className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                      Deadline: June 30
                    </div>
                  </div>
                  <CardDescription>Soil testing and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Image
                      src="/soil.jpg?height=80&width=80"
                      width={80}
                      height={80}
                      alt="Soil Health Card logo"
                      className="rounded-md object-cover"
                    />
                    <p className="text-sm text-gray-600">
                      Provides information on soil health to help improve productivity through judicious use of inputs.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Apply Now</Button>
                </CardFooter>
              </Card>

              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-green-800">PM Fasal Bima Yojana</CardTitle>
                    <div className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                      Seasonal
                    </div>
                  </div>
                  <CardDescription>Crop insurance scheme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Image
                      src="/PMfasal.jpg?height=80&width=80"
                      width={80}
                      height={80}
                      alt="PM Fasal Bima Yojana logo"
                      className="rounded-md object-cover"
                    />
                    <p className="text-sm text-gray-600">
                      Provides financial support to farmers suffering crop loss/damage due to unforeseen events.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Apply Now</Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                <Link href="/schemes">View All Schemes</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Bank Loan Schemes Section */}
        <section id="loans" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  <CreditCard className="mr-1 h-4 w-4" />
                  <span>Financial Support</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Agricultural Loans</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Compare agricultural loan schemes from different banks to find the best option for your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <LoanSchemePreview />
              <div className="mt-8 flex justify-center">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Link href="/loan-comparison">Compare All Loan Schemes</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Agricultural Offices Section */}
        {/* <section className="w-full py-12 md:py-24 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>Local Resources</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Agricultural Offices</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Find agricultural extension centers, research stations, and government offices near you.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-800">Find Agricultural Services Near You</CardTitle>
                  <CardDescription>
                    Locate extension centers, research stations, and government offices that provide in-person
                    assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="aspect-video relative rounded-lg overflow-hidden border border-green-100">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      width={800}
                      height={400}
                      alt="Map showing agricultural offices"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                        <p className="text-sm">Find offices, get directions, and access contact information</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/agricultural-offices">Explore Agricultural Offices</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section> */}

        {/* Call to Action */}
        {/* <section className="w-full py-12 md:py-24 bg-gradient-to-br from-green-700 to-green-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Farming Community</h2>
                <p className="max-w-[900px] md:text-xl/relaxed">
                  Register to receive personalized agricultural advice, weather alerts, market price notifications, and
                  updates on government schemes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-green-700 hover:bg-gray-100">
                  <Link href="/register">Register Now</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-green-600">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <footer className="w-full border-t bg-green-800 text-white py-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">About Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:underline">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:underline">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="hover:underline">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:underline">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/guides" className="hover:underline">
                    Farming Guides
                  </Link>
                </li>
                <li>
                  <Link href="/market-prices" className="hover:underline">
                    Market Prices
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="hover:underline">
                    Training Programs
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="hover:underline">
                    Research Papers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/forum" className="hover:underline">
                    Community Forum
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://facebook.com" className="hover:underline">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com" className="hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://youtube.com" className="hover:underline">
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link href="https://whatsapp.com" className="hover:underline">
                    WhatsApp Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-green-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-green-100">© 2025 Farmer's Portal. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="/accessibility" className="text-sm text-green-100 hover:underline">
                Accessibility
              </Link>
              <Link href="/privacy" className="text-sm text-green-100 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-green-100 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
