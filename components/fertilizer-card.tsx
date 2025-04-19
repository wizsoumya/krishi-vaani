import Image from "next/image"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FertilizerCardProps {
  name: string
  nutrientContent: string
  bestFor: string[]
  applicationTips: string
  image: string
}

export default function FertilizerCard({
  name,
  nutrientContent,
  bestFor,
  applicationTips,
  image,
}: FertilizerCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center gap-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={150}
          height={150}
          className="w-16 h-16 object-contain rounded-md"
        />
        <div>
          <CardTitle className="text-green-800">{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{nutrientContent}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <h4 className="font-medium text-sm">Best For:</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {bestFor.map((crop, index) => (
              <span key={index} className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                {crop}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm">Application Tips:</h4>
          <p className="text-sm text-gray-600">{applicationTips}</p>
        </div>
      </CardContent>
    </Card>
  )
}
