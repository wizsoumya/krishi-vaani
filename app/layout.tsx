import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { AccessibilityProvider } from "@/components/accessibility-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Farmer's Portal - Agricultural Information Hub",
  description:
    "Complete resource for agricultural information, weather updates, government schemes, and expert advice.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AccessibilityProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
