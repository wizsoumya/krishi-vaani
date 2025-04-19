import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SiteHeader from "@/components/site-header"
import AgriculturalOfficesMap from "@/components/agricultural-offices-map"

export default function AgriculturalOfficesPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800 mb-2">
              Agricultural Offices
            </h1>
            <p className="text-gray-600 max-w-[900px]">
              Find agricultural extension centers, research stations, and government offices near you to get in-person
              assistance and services.
            </p>
          </div>

          <AgriculturalOfficesMap />
        </div>
      </div>
    </div>
  )
}
