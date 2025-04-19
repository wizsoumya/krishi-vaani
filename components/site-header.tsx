"use client"

import Link from "next/link"
import { Leaf, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSelector from "@/components/language-selector"
import AccessibilityMenu from "@/components/accessibility-menu"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

export default function SiteHeader() {
  const { user, signOut, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" aria-label="Farmer's Portal Home">
            <Leaf className="h-6 w-6 text-green-600" aria-hidden="true" />
            <span className="text-xl font-bold text-green-800">Farmer's Portal</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm" aria-label="Main Navigation">
          <Link href="/#weather" className="font-medium transition-colors hover:text-green-600">
            Weather
          </Link>
          <Link href="/#schemes" className="font-medium transition-colors hover:text-green-600">
            Schemes
          </Link>
          <Link href="/#market-prices" className="font-medium transition-colors hover:text-green-600">
            Market Prices
          </Link>
          <Link href="/#crop-calendar" className="font-medium transition-colors hover:text-green-600">
            Crop Calendar
          </Link>
          <Link href="/#loans" className="font-medium transition-colors hover:text-green-600">
            Loans
          </Link>
          <Link href="/blog" className="font-medium transition-colors hover:text-green-600">
            Blog
          </Link>
          <Link href="/calculators" className="font-medium transition-colors hover:text-green-600">
            Calculators
          </Link>
          <Link href="/agricultural-offices" className="font-medium transition-colors hover:text-green-600">
            Offices
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <AccessibilityMenu />
          <LanguageSelector />

          {loading ? (
            <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="User menu">
                  <Avatar className="h-10 w-10 border border-green-200">
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {user.full_name ? getInitials(user.full_name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer w-full flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer w-full flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </>
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/#weather"
                className="px-2 py-1 rounded hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Weather
              </Link>
              <Link
                href="/#schemes"
                className="px-2 py-1 rounded hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Schemes
              </Link>
              <Link
                href="/#market-prices"
                className="px-2 py-1 rounded hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Market Prices
              </Link>
              <Link
                href="/#crop-calendar"
                className="px-2 py-1 rounded hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Crop Calendar
              </Link>
              <Link
                href="/#loans"
                className="px-2 py-1 rounded hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Loans
              </Link>
              <Link
                href="/blog"
                className="px-2 py-1 rounded hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/calculators"
                className="px-2 py-1 rounded hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculators
              </Link>
              <Link
                href="/agricultural-offices"
                className="px-2 py-1 rounded hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Offices
              </Link>
            </nav>

            {!user && (
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 flex-1" asChild>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
