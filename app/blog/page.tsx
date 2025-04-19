import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="container px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800 mb-2">
              Agricultural Insights
            </h1>
            <p className="text-gray-600 max-w-[900px]">
              Stay updated with the latest farming techniques, success stories,
              and agricultural innovations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fertilizers">Fertilizers</SelectItem>
                  <SelectItem value="seeds">Seeds</SelectItem>
                  <SelectItem value="crop-protection">
                    Crop Protection
                  </SelectItem>
                  <SelectItem value="water-management">
                    Water Management
                  </SelectItem>
                  <SelectItem value="success-stories">
                    Success Stories
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> More Filters
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
              <TabsTrigger value="seeds">Seeds</TabsTrigger>
              <TabsTrigger value="crop-protection">Crop Protection</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Featured Article */}
                <Card className="col-span-full overflow-hidden border-green-100">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Image
                      src="/farming.jpg?height=400&width=600"
                      width={600}
                      height={400}
                      alt="Sustainable farming practices"
                      className="w-full h-full object-cover"
                    />
                    <div className="flex flex-col p-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Featured
                        </div>
                        <span className="text-xs text-muted-foreground">
                          April 10, 2025
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-green-800 mb-2">
                        <Link
                          href="/blog/sustainable-farming"
                          className="hover:underline"
                        >
                          Sustainable Farming Practices for 2025
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4 flex-grow">
                        Discover eco-friendly farming methods that can increase
                        yield while preserving soil health. This comprehensive
                        guide covers organic fertilizers, crop rotation,
                        integrated pest management, and water conservation
                        techniques.
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-sm text-muted-foreground">
                          By Dr. Rajesh Kumar
                        </span>
                        <Button
                          variant="outline"
                          className="text-green-600 border-green-200"
                          asChild
                        >
                          <Link href="/blog/sustainable-farming">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Regular Articles */}
                <Card className="overflow-hidden border-green-100">
                  <Image
                    src="/watering.jpg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Water conservation techniques"
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        Water Management
                      </div>
                      <span className="text-xs text-muted-foreground">
                        April 8, 2025
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mt-2">
                      <Link
                        href="/blog/water-conservation"
                        className="hover:underline"
                      >
                        Water Conservation Techniques for Summer
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Learn effective water management strategies to protect
                      your crops during the hot summer months.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      By Priya Singh
                    </span>
                    <Link
                      href="/blog/water-conservation"
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-green-100">
                  <Image
                    src="/farming.jpg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Organic farming success story"
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                        Success Story
                      </div>
                      <span className="text-xs text-muted-foreground">
                        April 5, 2025
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mt-2">
                      <Link
                        href="/blog/organic-farming-success"
                        className="hover:underline"
                      >
                        Success Story: Organic Farming in Maharashtra
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      How a small-scale farmer transformed his land and
                      increased profits through organic farming methods.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      By Amit Patel
                    </span>
                    <Link
                      href="/blog/organic-farming-success"
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-green-100">
                  <Image
                    src="/farming.jpg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Pest management techniques"
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Crop Protection
                      </div>
                      <span className="text-xs text-muted-foreground">
                        April 3, 2025
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mt-2">
                      <Link
                        href="/blog/pest-management"
                        className="hover:underline"
                      >
                        Integrated Pest Management for Cotton
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Effective strategies to manage pests in cotton crops while
                      minimizing chemical pesticide use.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      By Dr. Suresh Verma
                    </span>
                    <Link
                      href="/blog/pest-management"
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-green-100">
                  <Image
                    src="/farming.jpg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Soil health management"
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Fertilizers
                      </div>
                      <span className="text-xs text-muted-foreground">
                        April 1, 2025
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mt-2">
                      <Link
                        href="/blog/soil-health"
                        className="hover:underline"
                      >
                        Improving Soil Health with Organic Amendments
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Learn how to use compost, green manures, and other organic
                      amendments to improve soil fertility.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      By Neha Sharma
                    </span>
                    <Link
                      href="/blog/soil-health"
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-green-100">
                  <Image
                    src="/farming.jpg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Seed selection guide"
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        Seeds
                      </div>
                      <span className="text-xs text-muted-foreground">
                        March 28, 2025
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mt-2">
                      <Link
                        href="/blog/seed-selection"
                        className="hover:underline"
                      >
                        Selecting the Right Wheat Varieties for Your Region
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      A comprehensive guide to choosing wheat varieties based on
                      your climate, soil type, and farming goals.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      By Dr. Anand Mishra
                    </span>
                    <Link
                      href="/blog/seed-selection"
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-50"
                >
                  Load More Articles
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="fertilizers">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden border-green-100">
                  <Image
                    src="/farming.jpg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Soil health management"
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Fertilizers
                      </div>
                      <span className="text-xs text-muted-foreground">
                        April 1, 2025
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mt-2">
                      <Link
                        href="/blog/soil-health"
                        className="hover:underline"
                      >
                        Improving Soil Health with Organic Amendments
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Learn how to use compost, green manures, and other organic
                      amendments to improve soil fertility.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      By Neha Sharma
                    </span>
                    <Link
                      href="/blog/soil-health"
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="seeds">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden border-green-100">
                  <Image
                    src="/farming.jpg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Seed selection guide"
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        Seeds
                      </div>
                      <span className="text-xs text-muted-foreground">
                        March 28, 2025
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mt-2">
                      <Link
                        href="/blog/seed-selection"
                        className="hover:underline"
                      >
                        Selecting the Right Wheat Varieties for Your Region
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      A comprehensive guide to choosing wheat varieties based on
                      your climate, soil type, and farming goals.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      By Dr. Anand Mishra
                    </span>
                    <Link
                      href="/blog/seed-selection"
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="crop-protection">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden border-green-100">
                  <Image
                    src="/farming.jpg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Pest management techniques"
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Crop Protection
                      </div>
                      <span className="text-xs text-muted-foreground">
                        April 3, 2025
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mt-2">
                      <Link
                        href="/blog/pest-management"
                        className="hover:underline"
                      >
                        Integrated Pest Management for Cotton
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Effective strategies to manage pests in cotton crops while
                      minimizing chemical pesticide use.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      By Dr. Suresh Verma
                    </span>
                    <Link
                      href="/blog/pest-management"
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
