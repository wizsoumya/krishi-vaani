"use client"

import { useState } from "react"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Types for loan scheme data
interface LoanScheme {
  id: number
  bank: string
  name: string
  interestRate: number
  maxAmount: number
  tenure: string
  eligibility: string
  features: string[]
  documents: string[]
}

export default function LoanSchemePreview() {
  const [maxInterestRate, setMaxInterestRate] = useState(12)

  // Sample loan scheme data - in a real app, this would come from an API
  const loanSchemes: LoanScheme[] = [
    {
      id: 1,
      bank: "State Bank of India",
      name: "Kisan Credit Card",
      interestRate: 7.0,
      maxAmount: 300000,
      tenure: "Up to 5 years",
      eligibility: "All farmers, tenant farmers, sharecroppers, and agricultural laborers",
      features: [
        "Revolving credit facility",
        "Interest subvention of 2% for prompt repayment",
        "Crop insurance coverage",
      ],
      documents: ["Land records", "Identity proof", "Address proof", "Passport size photographs"],
    },
    {
      id: 2,
      bank: "Punjab National Bank",
      name: "PNB Krishi Unnati Scheme",
      interestRate: 8.5,
      maxAmount: 500000,
      tenure: "Up to 7 years",
      eligibility: "Farmers with at least 2 acres of land",
      features: ["No collateral up to ₹1.6 lakh", "Flexible repayment options", "Quick processing within 7 days"],
      documents: ["Land ownership documents", "Identity proof", "Address proof", "Farm income details"],
    },
    {
      id: 3,
      bank: "HDFC Bank",
      name: "Kisan Gold Card",
      interestRate: 9.2,
      maxAmount: 750000,
      tenure: "Up to 6 years",
      eligibility: "All farmers with good credit history",
      features: [
        "Pre-approved loan facility",
        "Overdraft facility",
        "Free personal accident insurance",
        "ATM/Debit card facility",
      ],
      documents: ["Land records", "Identity proof", "Address proof", "Bank statements", "Credit history"],
    },
    {
      id: 4,
      bank: "NABARD",
      name: "Agricultural Investment Loan",
      interestRate: 6.5,
      maxAmount: 1000000,
      tenure: "Up to 10 years",
      eligibility: "Farmers, FPOs, and agricultural entrepreneurs",
      features: [
        "Lowest interest rates",
        "Long repayment period",
        "Grace period of up to 2 years",
        "Subsidy under various government schemes",
      ],
      documents: ["Detailed project report", "Land documents", "Identity proof", "Address proof", "Bank statements"],
    },
  ]

  // Filter schemes based on interest rate
  const filteredSchemes = loanSchemes.filter((scheme) => scheme.interestRate <= maxInterestRate)

  return (
    <Card className="w-full border-green-100">
      <CardHeader>
        <CardTitle className="text-2xl text-green-800">Agricultural Loan Schemes</CardTitle>
        <CardDescription>
          Compare loan schemes from different banks to find the best option for your needs
        </CardDescription>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Maximum Interest Rate: {maxInterestRate}%</label>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3 w-3" /> More Filters
              </Button>
            </div>
            <Slider
              value={[maxInterestRate]}
              min={5}
              max={15}
              step={0.5}
              onValueChange={(value) => setMaxInterestRate(value[0])}
              className="w-full"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank & Scheme</TableHead>
                <TableHead className="text-right">Interest Rate</TableHead>
                <TableHead className="text-right">Max Amount</TableHead>
                <TableHead className="text-right">Tenure</TableHead>
                <TableHead className="text-center">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchemes.length > 0 ? (
                filteredSchemes.map((scheme) => (
                  <TableRow key={scheme.id}>
                    <TableCell>
                      <div className="font-medium">{scheme.bank}</div>
                      <div className="text-sm text-muted-foreground">{scheme.name}</div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {scheme.interestRate}%
                      {scheme.interestRate < 7.5 && (
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Low Rate
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">₹{scheme.maxAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{scheme.tenure}</TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>{scheme.name}</DialogTitle>
                            <DialogDescription>{scheme.bank}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-sm mb-1">Interest Rate</h4>
                                <p>{scheme.interestRate}% per annum</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-1">Maximum Amount</h4>
                                <p>₹{scheme.maxAmount.toLocaleString()}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-1">Tenure</h4>
                                <p>{scheme.tenure}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-1">Eligibility</h4>
                                <p>{scheme.eligibility}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">Key Features</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                {scheme.features.map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">Required Documents</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                {scheme.documents.map((doc, index) => (
                                  <li key={index}>{doc}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button className="bg-green-600 hover:bg-green-700">Apply Now</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No loan schemes match your criteria. Try adjusting the interest rate filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
