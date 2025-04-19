"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type AccessibilityContextType = {
  highContrast: boolean
  toggleHighContrast: () => void
  fontSize: "normal" | "large" | "x-large"
  setFontSize: (size: "normal" | "large" | "x-large") => void
  reducedMotion: boolean
  toggleReducedMotion: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<"normal" | "large" | "x-large">("normal")
  const [reducedMotion, setReducedMotion] = useState(false)

  // Check for user preferences on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setReducedMotion(true)
    }

    // Check for saved preferences
    const savedHighContrast = localStorage.getItem("highContrast") === "true"
    const savedFontSize = localStorage.getItem("fontSize") as "normal" | "large" | "x-large" | null
    const savedReducedMotion = localStorage.getItem("reducedMotion") === "true"

    if (savedHighContrast) setHighContrast(savedHighContrast)
    if (savedFontSize) setFontSize(savedFontSize)
    if (savedReducedMotion !== null) setReducedMotion(savedReducedMotion)
  }, [])

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem("highContrast", highContrast.toString())
    localStorage.setItem("fontSize", fontSize)
    localStorage.setItem("reducedMotion", reducedMotion.toString())

    // Apply classes to body
    const body = document.body

    // Handle high contrast
    if (highContrast) {
      body.classList.add("high-contrast")
    } else {
      body.classList.remove("high-contrast")
    }

    // Handle font size
    body.classList.remove("font-size-normal", "font-size-large", "font-size-x-large")
    body.classList.add(`font-size-${fontSize}`)

    // Handle reduced motion
    if (reducedMotion) {
      body.classList.add("reduced-motion")
    } else {
      body.classList.remove("reduced-motion")
    }
  }, [highContrast, fontSize, reducedMotion])

  const toggleHighContrast = () => setHighContrast((prev) => !prev)
  const toggleReducedMotion = () => setReducedMotion((prev) => !prev)

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        reducedMotion,
        toggleReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
