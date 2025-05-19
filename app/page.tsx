import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">SaaS Benchmarking Tool</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/methodology" className="text-sm font-medium transition-colors hover:text-primary">
              Methodology
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Topline Growth & Operational Efficiency
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The data behind scaling a B2B SaaS business. Benchmark your company against industry standards and
                  discover insights to drive growth.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/dashboard">
                      Start Benchmarking <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/methodology">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder-f4xwe.png"
                  alt="SaaS Growth Metrics Dashboard"
                  className="rounded-lg object-cover shadow-lg"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Metrics</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the five key metrics that define successful B2B SaaS companies
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>YoY ARR Growth</CardTitle>
                  <CardDescription>Annual recurring revenue growth year over year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">75-135%</div>
                  <p className="text-sm text-gray-500 mt-2">Top quartile for $10M-$50M ARR</p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/arr-growth" className="text-sm text-blue-600 hover:underline">
                    View benchmarks →
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Net $ Retention</CardTitle>
                  <CardDescription>Revenue retained from existing customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">125-130%</div>
                  <p className="text-sm text-gray-500 mt-2">Top quartile across all stages</p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/retention" className="text-sm text-blue-600 hover:underline">
                    View benchmarks →
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Rule of 40</CardTitle>
                  <CardDescription>Growth rate + profit margin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">70-95%</div>
                  <p className="text-sm text-gray-500 mt-2">Top quartile for $25M+ ARR</p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/rule-of-40" className="text-sm text-blue-600 hover:underline">
                    View benchmarks →
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Net Magic Number</CardTitle>
                  <CardDescription>Sales efficiency metric</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">1.1-1.5x</div>
                  <p className="text-sm text-gray-500 mt-2">Top quartile for $10M+ ARR</p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/magic-number" className="text-sm text-blue-600 hover:underline">
                    View benchmarks →
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>ARR per FTE</CardTitle>
                  <CardDescription>Revenue efficiency per employee</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$195-285K</div>
                  <p className="text-sm text-gray-500 mt-2">Top quartile for $25M-$200M ARR</p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/arr-per-fte" className="text-sm text-blue-600 hover:underline">
                    View benchmarks →
                  </Link>
                </CardFooter>
              </Card>
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Start Benchmarking</CardTitle>
                  <CardDescription>Compare your metrics to industry standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Enter your company's data to see how you stack up against top-performing SaaS companies.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2023 SaaS Benchmarking Tool. All rights reserved. Based on ICONIQ Growth research.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
