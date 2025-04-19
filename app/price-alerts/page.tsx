"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, Check, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PriceAlertsPage() {
  const [phoneNumber, setPhoneNumber] = useState("+91 98765 43210")
  const [isActive, setIsActive] = useState(true)
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      commodity: "Rice (Basmati)",
      market: "Delhi",
      targetPrice: 4000,
      direction: "above",
      active: true,
    },
    {
      id: 2,
      commodity: "Wheat",
      market: "Punjab",
      targetPrice: 2300,
      direction: "below",
      active: true,
    },
    {
      id: 3,
      commodity: "Potato",
      market: "Uttar Pradesh",
      targetPrice: 1500,
      direction: "above",
      active: false,
    },
  ])

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const handleToggleAlert = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, active: !alert.active } : alert)))
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link href="/" className="text-green-600 hover:text-green-700 inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">SMS Price Alerts</CardTitle>
                <CardDescription>
                  Get notified when prices of your selected commodities reach your target price
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Button variant="link" className="p-0 h-auto text-green-600">
                      Verify
                    </Button>
                  </div>
                  <Input
                    id="phone-number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="active-alerts">Active Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive SMS notifications</p>
                  </div>
                  <Switch id="active-alerts" checked={isActive} onCheckedChange={setIsActive} />
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" /> Add New Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:w-2/3">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Your Price Alerts</CardTitle>
                <CardDescription>Manage your existing price alerts and add new ones</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="active">Active Alerts</TabsTrigger>
                    <TabsTrigger value="all">All Alerts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active" className="space-y-4 pt-4">
                    {alerts.filter((alert) => alert.active).length > 0 ? (
                      alerts
                        .filter((alert) => alert.active)
                        .map((alert) => (
                          <div
                            key={alert.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-white"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium">{alert.commodity}</div>
                                <div className="text-sm text-muted-foreground">
                                  {alert.market} • Alert when {alert.direction === "above" ? "above" : "below"} ₹
                                  {alert.targetPrice}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleToggleAlert(alert.id)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteAlert(alert.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No active alerts.</p>
                        <p className="text-sm">Create a new alert to get notified about price changes.</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="all" className="space-y-4 pt-4">
                    {alerts.length > 0 ? (
                      alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`flex items-center justify-between p-4 border rounded-lg ${
                            alert.active ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                alert.active ? "bg-green-100" : "bg-gray-100"
                              }`}
                            >
                              <Bell className={`h-5 w-5 ${alert.active ? "text-green-600" : "text-gray-400"}`} />
                            </div>
                            <div>
                              <div className={`font-medium ${!alert.active && "text-gray-500"}`}>{alert.commodity}</div>
                              <div className="text-sm text-muted-foreground">
                                {alert.market} • Alert when {alert.direction === "above" ? "above" : "below"} ₹
                                {alert.targetPrice}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleAlert(alert.id)}
                              className={`${
                                alert.active
                                  ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                                  : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                              }`}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteAlert(alert.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No alerts found.</p>
                        <p className="text-sm">Create a new alert to get notified about price changes.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  You will receive SMS notifications when prices reach your target. Standard SMS rates may apply.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
