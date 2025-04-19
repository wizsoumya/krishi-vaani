import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface BlogPreviewProps {
  title: string
  excerpt: string
  author: string
  date: string
  image: string
  link: string
}

export default function BlogPreview({ title, excerpt, author, date, image, link }: BlogPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={link} className="block">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </Link>
      <CardHeader className="pb-2">
        <Link href={link} className="hover:underline">
          <h3 className="text-xl font-bold text-green-800">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{excerpt}</p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground flex justify-between">
        <span>{author}</span>
        <span>{date}</span>
      </CardFooter>
    </Card>
  )
}
