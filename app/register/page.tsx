"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    farmerType: "",
    location: "",
    agreeTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { signUp } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))

    // Clear error when user checks
    if (errors.agreeTerms) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.agreeTerms
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone number is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.farmerType) newErrors.farmerType = "Please select farmer type"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const { error } = await signUp(formData.email, formData.password, {
        full_name: `${formData.firstName} ${formData.lastName}`,
        phone_number: formData.phone,
        farmer_type: formData.farmerType,
        location: formData.location,
      })

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
          variant: "default",
        })
        router.push("/login")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <Card className="w-full max-w-md border-green-100">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-green-800">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create a Farmer&apos;s Portal account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Mohan"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
                {errors.firstName && (
                  <p id="firstName-error" className="text-xs text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Patel"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
                {errors.lastName && (
                  <p id="lastName-error" className="text-xs text-red-500">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="m.patel@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-xs text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p id="password-error" className="text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Village/City, District, State"
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? "location-error" : undefined}
              />
              {errors.location && (
                <p id="location-error" className="text-xs text-red-500">
                  {errors.location}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmer-type">Farmer type</Label>
              <Select value={formData.farmerType} onValueChange={(value) => handleSelectChange("farmerType", value)}>
                <SelectTrigger
                  id="farmer-type"
                  aria-invalid={!!errors.farmerType}
                  aria-describedby={errors.farmerType ? "farmerType-error" : undefined}
                >
                  <SelectValue placeholder="Select farmer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small Farmer (&lt; 2 hectares)</SelectItem>
                  <SelectItem value="medium">Medium Farmer (2-10 hectares)</SelectItem>
                  <SelectItem value="large">Large Farmer (&gt; 10 hectares)</SelectItem>
                  <SelectItem value="cooperative">Farmer Cooperative</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.farmerType && (
                <p id="farmerType-error" className="text-xs text-red-500">
                  {errors.farmerType}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={handleCheckboxChange}
                aria-invalid={!!errors.agreeTerms}
                aria-describedby={errors.agreeTerms ? "agreeTerms-error" : undefined}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-green-600 hover:text-green-700">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-600 hover:text-green-700">
                  privacy policy
                </Link>
              </label>
            </div>
            {errors.agreeTerms && (
              <p id="agreeTerms-error" className="text-xs text-red-500">
                {errors.agreeTerms}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
