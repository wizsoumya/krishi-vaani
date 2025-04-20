"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

function NotFoundContent() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || "/"

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Button asChild></Button>
        <Link href={from} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Go back
        </Link>
      </Button>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense>
      <NotFoundContent />
    </Suspense>
  )
}