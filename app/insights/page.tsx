import Link from "next/link"
import { ArrowLeft, BarChart3, LineChart, PieChart, TrendingUp, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Insights() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-xl">SaaS Benchmarking Tool</span>
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
          <div className="mx-auto max-w-4xl space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Key Insights & Recommendations</h1>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Growth & Path to Profitability
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>ARR Growth Benchmarks</CardTitle>
                    <CardDescription>Key metrics for different growth stages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium">$10M-$50M ARR</h3>
                      <p className="text-sm text-gray-500">
                        Top-performing SaaS companies grow 2.0x-2.5x year over year until ~$100M ARR.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">$50M-$200M ARR</h3>
                      <p className="text-sm text-gray-500">
                        Growth typically slows to 1.3x-1.5x until IPO, with public companies IPO'ing within 4-6 years
                        after hitting $10M ARR.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Path to Profitability</h3>
                      <p className="text-sm text-gray-500">
                        On average, SaaS companies take 5+ years to breakeven after hitting $10M ARR, with public
                        companies achieving profitability within 1-2 years of IPO.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Rule of 40</CardTitle>
                    <CardDescription>Balancing growth and profitability</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Though rule of 40 (YoY ARR growth + FCF margin) tends to decline as companies scale and growth
                      slows, top performers exceed 40% regardless of scale, and achieve 50%+ in the years surrounding
                      IPO.
                    </p>
                    <div className="space-y-2">
                      <h3 className="font-medium">Resilient Companies</h3>
                      <p className="text-sm text-gray-500">
                        While average performance against rule of 40 suffered in turbulent markets, resilient companies
                        have been able to maintain 75%+ rule of 40 through these periods primarily by maintaining strong
                        ARR growth.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Spend & Burn
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Burn Multiple</CardTitle>
                    <CardDescription>Capital efficiency metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Net new ARR outpaces burn around ~$20M ARR for top-performing companies, and we typically
                      recommend companies maintain a burn multiple under 2.0x regardless of scale.
                    </p>
                    <div className="space-y-2">
                      <h3 className="font-medium">Customer Segment Impact</h3>
                      <p className="text-sm text-gray-500">
                        SaaS companies targeting SMB customers tend to get more leverage from operating costs, with
                        revenue outpacing spend around $150M ARR versus $250M+ ARR for those targeting enterprise
                        customers.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Gross Margin</CardTitle>
                    <CardDescription>Efficiency in service delivery</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Though gross margins (GM) can vary significantly by sector and operating model, GM should increase
                      as companies scale and operationalize services and support.
                    </p>
                    <div className="space-y-2">
                      <h3 className="font-medium">Benchmarks</h3>
                      <p className="text-sm text-gray-500">
                        Companies should aim for 70%+ during early stages, and 80%+ at scale. Companies with top
                        performance achieve 80-85% GM.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <LineChart className="mr-2 h-5 w-5" />
                GTM Efficiency
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Magic Number</CardTitle>
                    <CardDescription>Sales & marketing efficiency</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-500">
                      While go-to-market efficiency generally trends down as companies scale due to competitive dynamics
                      and shrinking headroom, a gross magic number &gt; 1.0x is a good long-term goal for companies with
                      sales-led growth.
                    </p>
                    <div className="space-y-2">
                      <h3 className="font-medium">Product-Led Growth</h3>
                      <p className="text-sm text-gray-500">
                        Driven primarily by lower S&M OpEx during growth stages (&lt;$200M ARR), companies with
                        product-led-growth tend to have higher go-to-market efficiency with top performance gross magic
                        number 2.5x-4.5x.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>FTE Efficiency</CardTitle>
                    <CardDescription>Headcount productivity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Incremental FTE efficiency is driven mostly by G&A and R&D orgs: S&M FTE efficiency tends to
                      decrease until stabilizing once companies reach ~$150M+ ARR.
                    </p>
                    <div className="space-y-2">
                      <h3 className="font-medium">ARR per FTE</h3>
                      <p className="text-sm text-gray-500">
                        Top-performing companies achieve $195K-$285K ARR per FTE at the $25M-$200M ARR scale.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Customer Health
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Net Dollar Retention</CardTitle>
                    <CardDescription>Customer expansion and churn</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Top-performing companies achieve 130-150% NDR from $1M to $10M ARR and maintain 120-130% NDR as
                      they scale towards IPO.
                    </p>
                    <div className="space-y-2">
                      <h3 className="font-medium">Resilient Companies</h3>
                      <p className="text-sm text-gray-500">
                        Resilient companies have been able to achieve ~125% net dollar retention through fluctuating
                        demand over the past few years, suggesting strong customer health and product market fit.
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link href="/insights/customer-health" className="text-sm text-blue-600 hover:underline">
                        View detailed customer health insights →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>ARR Composition</CardTitle>
                    <CardDescription>New logos vs. expansion</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-500">
                      New logos are the primary driver of ARR growth until SaaS companies reach ~$200M ARR, when ARR
                      from customer expansion begins to make up &gt;50% of new ARR.
                    </p>
                    <div className="space-y-2">
                      <h3 className="font-medium">Churn Management</h3>
                      <p className="text-sm text-gray-500">
                        As existing customers make up an increasing proportion of new ARR, customer downsell also makes
                        up a larger share of churn. However, SaaS companies maintain average annual churn rate below 15%
                        regardless of scale.
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link href="/insights/customer-health" className="text-sm text-blue-600 hover:underline">
                        View detailed ARR funnel insights →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Spend Profile
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle>Operational Expenses</CardTitle>
                  <CardDescription>OpEx distribution as companies scale</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-500">
                    R&D makes up an increasingly smaller proportion of operational spend as products mature and focus
                    shifts towards go-to-market, with S&M spend increasing to more than 50% of total OpEx—mostly driven
                    by Sales.
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <h3 className="font-medium">Early Stage (&lt;$25M ARR)</h3>
                      <ul className="mt-1 space-y-1 text-sm text-gray-500">
                        <li>R&D: 35-40%</li>
                        <li>S&M: 45-50%</li>
                        <li>G&A: 15%</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">Growth Stage ($25M-$100M ARR)</h3>
                      <ul className="mt-1 space-y-1 text-sm text-gray-500">
                        <li>R&D: 30-35%</li>
                        <li>S&M: 50-55%</li>
                        <li>G&A: 15%</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">Scale Stage ($100M+ ARR)</h3>
                      <ul className="mt-1 space-y-1 text-sm text-gray-500">
                        <li>R&D: 25-30%</li>
                        <li>S&M: 55-60%</li>
                        <li>G&A: 15%</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
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
