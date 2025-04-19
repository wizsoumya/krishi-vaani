"use client"
import { Accessibility, ChevronDown, Eye, Type, ZoomIn } from "lucide-react"
import { useAccessibility } from "./accessibility-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

export default function AccessibilityMenu() {
  const { highContrast, toggleHighContrast, fontSize, setFontSize, reducedMotion, toggleReducedMotion } =
    useAccessibility()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1 border-green-200">
          <Accessibility className="h-4 w-4 text-green-600" />
          <span className="hidden md:inline">Accessibility</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center justify-between cursor-default">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>High Contrast</span>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={toggleHighContrast}
              aria-label="Toggle high contrast mode"
            />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center justify-between cursor-default">
            <div className="flex items-center gap-2">
              <ZoomIn className="h-4 w-4" />
              <span>Reduced Motion</span>
            </div>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={toggleReducedMotion}
              aria-label="Toggle reduced motion"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-2">
          <Type className="h-4 w-4" />
          <span>Text Size</span>
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem
            className={`${fontSize === "normal" ? "bg-green-50 text-green-700" : ""}`}
            onClick={() => setFontSize("normal")}
          >
            Normal
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`${fontSize === "large" ? "bg-green-50 text-green-700" : ""}`}
            onClick={() => setFontSize("large")}
          >
            Large
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`${fontSize === "x-large" ? "bg-green-50 text-green-700" : ""}`}
            onClick={() => setFontSize("x-large")}
          >
            Extra Large
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
