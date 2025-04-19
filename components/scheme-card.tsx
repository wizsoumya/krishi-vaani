import { CalendarClock } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SchemeCardProps {
  title: string
  description: string
  deadline: string
  link: string
}

export default function SchemeCard({ title, description, deadline, link }: SchemeCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-base text-gray-600">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 pt-0">
        <div className="flex items-center gap-1 text-sm text-amber-700">
          <CalendarClock className="h-4 w-4" />
          <span>{deadline}</span>
        </div>
        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
          <Link href={link}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
