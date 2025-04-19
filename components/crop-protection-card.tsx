import Image from "next/image"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CropProtectionCardProps {
  title: string
  type: "Disease" | "Insect"
  affectedCrops: string[]
  symptoms: string
  management: string
  image: string
}

export default function CropProtectionCard({
  title,
  type,
  affectedCrops,
  symptoms,
  management,
  image,
}: CropProtectionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center gap-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={150}
          height={150}
          className="w-16 h-16 object-contain rounded-md"
        />
        <div>
          <CardTitle className="text-green-800">{title}</CardTitle>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              type === "Disease" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
            }`}
          >
            {type}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <h4 className="font-medium text-sm">Affected Crops:</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {affectedCrops.map((crop, index) => (
              <span key={index} className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                {crop}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm">Symptoms:</h4>
          <p className="text-sm text-gray-600">{symptoms}</p>
        </div>
        <div>
          <h4 className="font-medium text-sm">Management:</h4>
          <p className="text-sm text-gray-600">{management}</p>
        </div>
      </CardContent>
    </Card>
  )
}
