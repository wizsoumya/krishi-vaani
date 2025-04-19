"use client"

import { useState } from "react"
import { Check, ChevronDown, Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LanguageSelector() {
  const [language, setLanguage] = useState("English")

  const languages = [
    "English",
    "हिन्दी (Hindi)",
    "मराठी (Marathi)",
    "తెలుగు (Telugu)",
    "தமிழ் (Tamil)",
    "ਪੰਜਾਬੀ (Punjabi)",
    "ગુજરાતી (Gujarati)",
    "ಕನ್ನಡ (Kannada)",
    "বাংলা (Bengali)",
    "ଓଡ଼ିଆ (Odia)",
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1 border-green-200">
          <Languages className="h-4 w-4 text-green-600" />
          <span className="hidden md:inline">{language}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => setLanguage(lang.split(" ")[0])}
              className="flex items-center justify-between"
            >
              {lang}
              {language === lang.split(" ")[0] && <Check className="h-4 w-4 text-green-600" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
