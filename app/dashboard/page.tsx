"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BarChart3, LineChart, PieChart, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ArrGrowthChart from "@/components/arr-growth-chart"
import CompanyInputForm from "@/components/company-input-form"
import NetRetentionChart from "@/components/net-retention-chart"
import RuleOf40Chart from "@/components/rule-of-40-chart"
import MagicNumberChart from "@/components/magic-number-chart"
import ArrPerFteChart from "@/components/arr-per-fte-chart"
import SpendProfileChart from "@/components/spend-profile-chart"
// Add imports for the new chart components
import ArrFunnelChart from "@/components/arr-funnel-chart"
import BurnRunwayChart from "@/components/burn-runway-chart"
import HeadcountDistributionChart from "@/components/headcount-distribution-chart"
import GtmComparisonChart from "@/components/gtm-comparison-chart"
// Add imports for the newest chart components
import ValuationMultiplesChart from "@/components/valuation-multiples-chart"
import IpoReadinessChart from "@/components/ipo-readiness-chart"
import CohortAnalysisChart from "@/components/cohort-analysis-chart"
import SalesEfficiencyChart from "@/components/sales-efficiency-chart"
import CompetitivePositioningMap from "@/components/competitive-positioning-map"
import IndustryBenchmarks from "@/components/industry-benchmarks"

export default function Dashboard() {
  const [companyData, setCompanyData] = useState({
    arrScale: "$10M-$25M",
    arrGrowth: 80,
    netRetention: 110,
    fcfMargin: -20,
    magicNumber: 0.8,
    arrPerFte: 150000,
    salesMarketingPercent: 55,
    rdPercent: 30,
    gaPercent: 15,
    // Add new fields
    grossMargin: 75,
    burnMultiple: 1.5,
    newLogoPercent: 65,
    expansionPercent: 35,
    churnRate: 10,
    runway: 24,
    targetCustomer: "Mid-Market to Enterprise",
    growthMotion: "Sales-led Growth",
  })

  const handleDataUpdate = (data: any) => {
    setCompanyData({ ...companyData, ...data })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-xl">SaaS Benchmarking Tool</span>
            </Link>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-primary transition-colors">
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
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Company Data</CardTitle>
                  <CardDescription>Enter your company metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyInputForm initialData={companyData} onDataUpdate={handleDataUpdate} />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Your Benchmarking Results</h1>
                <Button variant="outline" size="sm">
                  Export Report
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">YoY ARR Growth</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companyData.arrGrowth}%</div>
                    <p className="text-xs text-muted-foreground">
                      {companyData.arrGrowth >= 135
                        ? "Top Quartile"
                        : companyData.arrGrowth >= 100
                          ? "Above Average"
                          : "Below Average"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Net $ Retention</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companyData.netRetention}%</div>
                    <p className="text-xs text-muted-foreground">
                      {companyData.netRetention >= 125
                        ? "Top Quartile"
                        : companyData.netRetention >= 110
                          ? "Above Average"
                          : "Below Average"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rule of 40</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companyData.arrGrowth + companyData.fcfMargin}%</div>
                    <p className="text-xs text-muted-foreground">
                      {companyData.arrGrowth + companyData.fcfMargin >= 70
                        ? "Top Quartile"
                        : companyData.arrGrowth + companyData.fcfMargin >= 40
                          ? "Above Average"
                          : "Below Average"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Net Magic Number</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companyData.magicNumber}x</div>
                    <p className="text-xs text-muted-foreground">
                      {companyData.magicNumber >= 1.5
                        ? "Top Quartile"
                        : companyData.magicNumber >= 1.0
                          ? "Above Average"
                          : "Below Average"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">ARR per FTE</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${(companyData.arrPerFte / 1000).toFixed(0)}K</div>
                    <p className="text-xs text-muted-foreground">
                      {companyData.arrPerFte >= 195000
                        ? "Top Quartile"
                        : companyData.arrPerFte >= 150000
                          ? "Above Average"
                          : "Below Average"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gross Margin</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companyData.grossMargin}%</div>
                    <p className="text-xs text-muted-foreground">
                      {companyData.grossMargin >= 80
                        ? "Top Quartile"
                        : companyData.grossMargin >= 70
                          ? "Above Average"
                          : "Below Average"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Burn Multiple</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companyData.burnMultiple}x</div>
                    <p className="text-xs text-muted-foreground">
                      {companyData.burnMultiple <= 1.0
                        ? "Top Quartile"
                        : companyData.burnMultiple <= 2.0
                          ? "Above Average"
                          : "Below Average"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Runway</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companyData.runway} months</div>
                    <p className="text-xs text-muted-foreground">
                      {companyData.runway >= 24
                        ? "Top Quartile"
                        : companyData.runway >= 18
                          ? "Above Average"
                          : "Below Average"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companyData.churnRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      {companyData.churnRate <= 8
                        ? "Top Quartile"
                        : companyData.churnRate <= 12
                          ? "Above Average"
                          : "Below Average"}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Tabs defaultValue="arr-growth">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-12">
                  <TabsTrigger value="arr-growth">ARR Growth</TabsTrigger>
                  <TabsTrigger value="retention">Retention</TabsTrigger>
                  <TabsTrigger value="rule-of-40">Rule of 40</TabsTrigger>
                  <TabsTrigger value="magic-number">Magic Number</TabsTrigger>
                  <TabsTrigger value="arr-per-fte">ARR per FTE</TabsTrigger>
                  <TabsTrigger value="spend-profile">Spend Profile</TabsTrigger>
                  <TabsTrigger value="arr-funnel">ARR Funnel</TabsTrigger>
                  <TabsTrigger value="burn-runway">Burn & Runway</TabsTrigger>
                  <TabsTrigger value="valuation">Valuation</TabsTrigger>
                  <TabsTrigger value="ipo-readiness">IPO Readiness</TabsTrigger>
                  <TabsTrigger value="cohort-analysis">Cohort Analysis</TabsTrigger>
                  <TabsTrigger value="sales-efficiency">Sales Efficiency</TabsTrigger>
                  <TabsTrigger value="competitive-positioning">Competitive Map</TabsTrigger>
                  <TabsTrigger value="industry-benchmarks">Industry Benchmarks</TabsTrigger>
                </TabsList>
                <TabsContent value="arr-growth" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>YoY ARR Growth</CardTitle>
                      <CardDescription>
                        After reaching $10M ARR, top-performing SaaS companies grow 2.0x-2.5x year over year until
                        ~$100M ARR, followed by 1.3x-1.5x until IPO.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <ArrGrowthChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="retention" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Net Dollar Retention</CardTitle>
                      <CardDescription>
                        Top-performing companies achieve 130-150% NDR from $1M to $10M ARR and maintain 120-130% NDR as
                        they scale towards IPO.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <NetRetentionChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="rule-of-40" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Rule of 40</CardTitle>
                      <CardDescription>
                        Though rule of 40 tends to decline as companies scale and growth slows, top performers exceed
                        40% regardless of scale, and achieve 50%+ in the years surrounding IPO.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <RuleOf40Chart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="magic-number" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Net Magic Number</CardTitle>
                      <CardDescription>
                        While go-to-market efficiency generally trends down as companies scale due to competitive
                        dynamics and shrinking headroom, a gross magic number &gt; 1.0x is a good long-term goal.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <MagicNumberChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="arr-per-fte" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>ARR per FTE</CardTitle>
                      <CardDescription>
                        As SaaS companies scale, they are able to increase both FTE productivity and FTE efficiency,
                        with top performers achieving $195K-$285K ARR per FTE.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <ArrPerFteChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Add new tabs to the TabsContent section */}
                <TabsContent value="spend-profile" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Spend Profile</CardTitle>
                      <CardDescription>
                        R&D makes up an increasingly smaller proportion of operational spend as products mature and
                        focus shifts towards go-to-market, with S&M spend increasing to more than 50% of total OpEx.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <SpendProfileChart companyData={companyData} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Headcount Distribution</CardTitle>
                      <CardDescription>
                        As the major driver of operational expenses, headcount trends similarly to OpEx as SaaS
                        companies scale. As product maturity is achieved, R&D as a proportion of headcount decreases.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <HeadcountDistributionChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="arr-funnel" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>ARR Funnel</CardTitle>
                      <CardDescription>
                        New logos are the primary driver of ARR growth until SaaS companies reach ~$200M ARR, when ARR
                        from customer expansion begins to make up more than 50% of new ARR.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <ArrFunnelChart companyData={companyData} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Growth Motion Comparison</CardTitle>
                      <CardDescription>
                        SaaS companies with product-led growth (PLG) tend to invest more in R&D and Marketing than those
                        with traditional sales-led growth motions, resulting in different efficiency metrics.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <GtmComparisonChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="burn-runway" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Burn Multiple & Runway</CardTitle>
                      <CardDescription>
                        Net new ARR outpaces burn around ~$20M ARR for top-performing companies, and we typically
                        recommend companies maintain a burn multiple under 2.0x regardless of scale.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <BurnRunwayChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Add newest tabs */}
                <TabsContent value="valuation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Valuation Multiples</CardTitle>
                      <CardDescription>
                        SaaS valuation multiples are primarily driven by growth rate, with scale, profitability, and
                        retention as secondary factors. Top-performing companies can achieve 15-25x+ revenue multiples.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <ValuationMultiplesChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ipo-readiness" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>IPO Readiness Assessment</CardTitle>
                      <CardDescription>
                        Companies typically IPO at $100M-$200M ARR with 30-50% growth rates, positive or near-positive
                        FCF margins, and strong retention metrics. This assessment evaluates your readiness across key
                        metrics.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[500px]">
                      <IpoReadinessChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="cohort-analysis" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cohort Analysis</CardTitle>
                      <CardDescription>
                        Analyzing customer cohorts provides insights into retention, expansion, and lifetime value
                        patterns. Top-performing SaaS companies show strong retention curves and increasing NDR over
                        time.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[600px]">
                      <CohortAnalysisChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sales-efficiency" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Efficiency Metrics</CardTitle>
                      <CardDescription>
                        Beyond magic number, metrics like CAC payback period and LTV/CAC ratio provide additional
                        insights into sales efficiency. These metrics vary significantly by growth motion and target
                        customer.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[500px]">
                      <SalesEfficiencyChart companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="competitive-positioning" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Competitive Positioning Map</CardTitle>
                      <CardDescription>
                        See where your company stands relative to peers across different metrics. Compare growth vs.
                        profitability, efficiency vs. retention, and more by selecting different metrics for each axis.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[550px]">
                      <CompetitivePositioningMap companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="industry-benchmarks" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Industry-Specific Benchmarks</CardTitle>
                      <CardDescription>
                        Compare your performance against benchmarks for specific SaaS verticals including Security, Back
                        Office, Vertical SaaS, Collaboration, Sales & Marketing, Data Analytics, and Enterprise Fintech.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <IndustryBenchmarks companyData={companyData} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/scenario-planning">Scenario Planning</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/funding-efficiency">Funding Efficiency</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/resilience">Resilience Assessment</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/resources">Resources</Link>
                </Button>
                <Button asChild>
                  <Link href="/insights">
                    View Detailed Insights <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
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
