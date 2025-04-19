import Image from "next/image"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SeedAdviceCardProps {
  cropName: string
  varieties: string[]
  suitableRegions: string
  sowingTime: string
  specialFeatures: string
  image: string
}

export default function SeedAdviceCard({
  cropName,
  varieties,
  suitableRegions,
  sowingTime,
  specialFeatures,
  image,
}: SeedAdviceCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center gap-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={cropName}
          width={150}
          height={150}
          className="w-16 h-16 object-contain rounded-md"
        />
        <div>
          <CardTitle className="text-green-800">{cropName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <h4 className="font-medium text-sm">Recommended Varieties:</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {varieties.map((variety, index) => (
              <span key={index} className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                {variety}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <h4 className="font-medium">Suitable Regions:</h4>
            <p className="text-gray-600">{suitableRegions}</p>
          </div>
          <div>
            <h4 className="font-medium">Sowing Time:</h4>
            <p className="text-gray-600">{sowingTime}</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm">Special Features:</h4>
          <p className="text-sm text-gray-600">{specialFeatures}</p>
        </div>
      </CardContent>
    </Card>
  )
}
