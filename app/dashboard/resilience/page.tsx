"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResilienceScoreCard from "@/components/resilience-score-card"

export default function ResiliencePage() {
  const [companyData] = useState({
    arrScale: "$10M-$25M",
    arrGrowth: 80,
    netRetention: 110,
    fcfMargin: -20,
    magicNumber: 0.8,
    arrPerFte: 150000,
    salesMarketingPercent: 55,
    rdPercent: 30,
    gaPercent: 15,
    grossMargin: 75,
    burnMultiple: 1.5,
    newLogoPercent: 65,
    expansionPercent: 35,
    churnRate: 10,
    runway: 24,
    targetCustomer: "Mid-Market to Enterprise",
    growthMotion: "Sales-led Growth",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-xl">Resilience Assessment</span>
            </Link>
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
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Company Resilience Assessment</h1>
              <p className="text-muted-foreground mt-2">
                Evaluate your company's ability to weather market turbulence based on ICONIQ Growth's resilience
                framework.
              </p>
            </div>

            <Tabs defaultValue="score">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="score">Resilience Score</TabsTrigger>
                <TabsTrigger value="framework">Resilience Framework</TabsTrigger>
              </TabsList>
              <TabsContent value="score" className="mt-6">
                <ResilienceScoreCard companyData={companyData} />
              </TabsContent>
              <TabsContent value="framework" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>ICONIQ Growth Resilience Framework</CardTitle>
                    <CardDescription>Understanding what makes a SaaS company resilient</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p>
                      Based on ICONIQ Growth's research, resilient SaaS companies demonstrate strong performance across
                      five key metrics even during market turbulence. This framework identifies companies that can
                      maintain growth while efficiently managing burn.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Resilience Metrics</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Topline attainment</span>
                            <span className="text-sm text-muted-foreground">30% weight</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Net new ARR</span>
                            <span className="text-sm text-muted-foreground">30% weight</span>
                          </li>
                          <li className="flex justify-between">
                            <span>YoY ARR growth</span>
                            <span className="text-sm text-muted-foreground">15% weight</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Runway</span>
                            <span className="text-sm text-muted-foreground">12.5% weight</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Bottomline attainment</span>
                            <span className="text-sm text-muted-foreground">12.5% weight</span>
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Resilient vs. Less Resilient</h3>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="font-medium">Metric</div>
                          <div className="font-medium">Healthy</div>
                          <div className="font-medium">Less Healthy</div>

                          <div>Topline attainment</div>
                          <div>&gt;90%</div>
                          <div>&lt;80%</div>

                          <div>Net new ARR</div>
                          <div>&gt;40%</div>
                          <div>&lt;20%</div>

                          <div>YoY ARR growth</div>
                          <div>&gt;75%</div>
                          <div>&lt;30%</div>

                          <div>Runway</div>
                          <div>&gt;2 years</div>
                          <div>&lt;1 year</div>

                          <div>Bottomline attainment</div>
                          <div>&gt;90%</div>
                          <div>&lt;80%</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4 mt-4">
                      <h3 className="font-medium mb-2">Characteristics of Resilient Companies</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium">Strong Customer Health</h4>
                          <p className="text-sm mt-1">
                            Resilient companies maintain ~125% net dollar retention through fluctuating demand,
                            suggesting strong customer health and product market fit.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Efficient Growth</h4>
                          <p className="text-sm mt-1">
                            They achieve efficient growth with burn multiples under 1.5x and maintain strong growth
                            rates even during market turbulence.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Financial Discipline</h4>
                          <p className="text-sm mt-1">
                            They maintain 24+ months of runway and consistently meet or exceed both topline and
                            bottomline targets.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Balanced Metrics</h4>
                          <p className="text-sm mt-1">
                            They balance growth and efficiency, achieving Rule of 40 scores of 75%+ even in challenging
                            market conditions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
