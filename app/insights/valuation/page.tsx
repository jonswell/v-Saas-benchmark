import Link from "next/link"
import { ArrowLeft, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ValuationInsights() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/insights" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-xl">Valuation Insights</span>
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
            <div className="flex items-center">
              <TrendingUp className="mr-3 h-8 w-8" />
              <h1 className="text-3xl font-bold tracking-tight">SaaS Valuation Multiples</h1>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Growth & Valuation Relationship</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Multiple Drivers</CardTitle>
                  <CardDescription>Key factors that influence SaaS valuation multiples</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    SaaS valuation multiples are primarily driven by growth rate, with scale, profitability, and
                    retention as secondary factors. The relationship between growth and valuation is non-linear, with
                    each incremental 10% of growth driving increasingly higher multiples.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Primary Drivers</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>
                          <strong>Growth Rate:</strong> The single most important factor, with a non-linear relationship
                        </li>
                        <li>
                          <strong>Scale:</strong> Larger companies typically command higher multiples at the same growth
                          rate
                        </li>
                        <li>
                          <strong>Rule of 40:</strong> Companies that balance growth and profitability see premium
                          valuations
                        </li>
                        <li>
                          <strong>Net Retention:</strong> Strong NDR &gt;120% signals product-market fit and future
                          growth
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Secondary Factors</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>
                          <strong>Gross Margin:</strong> Higher margins &gt;80% indicate scalable business models
                        </li>
                        <li>
                          <strong>TAM:</strong> Larger addressable markets support higher growth expectations
                        </li>
                        <li>
                          <strong>Capital Efficiency:</strong> Lower burn multiples and higher ARR per FTE
                        </li>
                        <li>
                          <strong>Growth Motion:</strong> PLG companies often receive premium multiples
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Valuation Multiples by Growth Rate</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Multiple Benchmarks</CardTitle>
                  <CardDescription>Typical revenue multiples by growth rate and scale</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">YoY Growth Rate</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">$10M-$50M ARR</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">$50M-$100M ARR</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">$100M+ ARR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm">150%+</td>
                          <td className="px-4 py-2 text-sm">20-25x</td>
                          <td className="px-4 py-2 text-sm">25-30x</td>
                          <td className="px-4 py-2 text-sm">30-35x+</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">100-150%</td>
                          <td className="px-4 py-2 text-sm">15-20x</td>
                          <td className="px-4 py-2 text-sm">20-25x</td>
                          <td className="px-4 py-2 text-sm">25-30x</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">75-100%</td>
                          <td className="px-4 py-2 text-sm">10-15x</td>
                          <td className="px-4 py-2 text-sm">15-20x</td>
                          <td className="px-4 py-2 text-sm">20-25x</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">50-75%</td>
                          <td className="px-4 py-2 text-sm">8-12x</td>
                          <td className="px-4 py-2 text-sm">10-15x</td>
                          <td className="px-4 py-2 text-sm">15-20x</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">30-50%</td>
                          <td className="px-4 py-2 text-sm">6-10x</td>
                          <td className="px-4 py-2 text-sm">8-12x</td>
                          <td className="px-4 py-2 text-sm">10-15x</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">&lt;30%</td>
                          <td className="px-4 py-2 text-sm">3-6x</td>
                          <td className="px-4 py-2 text-sm">5-8x</td>
                          <td className="px-4 py-2 text-sm">6-10x</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium">Key Insights:</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>
                        <strong>Growth Premium:</strong> Each additional 25% of growth typically adds 3-5x to revenue
                        multiples.
                      </li>
                      <li>
                        <strong>Scale Premium:</strong> At the same growth rate, companies with larger ARR typically
                        receive a 20-30% premium on revenue multiples.
                      </li>
                      <li>
                        <strong>Profitability Impact:</strong> Companies with positive FCF margins can receive a 20-40%
                        premium compared to unprofitable companies at the same growth rate.
                      </li>
                      <li>
                        <strong>Market Conditions:</strong> These multiples reflect typical ranges, but market
                        conditions can significantly impact valuations in both directions.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Valuation Optimization Strategies</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Maximizing Enterprise Value</CardTitle>
                  <CardDescription>Strategies to optimize valuation multiples</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    While growth is the primary driver of valuation, companies can implement several strategies to
                    maximize their enterprise value beyond just focusing on top-line growth.
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Growth Strategies</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>Focus on high-quality, sustainable growth</li>
                        <li>Prioritize expansion ARR from existing customers</li>
                        <li>Develop clear paths to new adjacent markets</li>
                        <li>Demonstrate predictable, recurring revenue streams</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Efficiency Strategies</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>Improve gross margins through operational excellence</li>
                        <li>Optimize sales efficiency (magic number &gt; 1.0)</li>
                        <li>Increase ARR per FTE through automation</li>
                        <li>Demonstrate clear path to profitability</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Strategic Positioning</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>Develop category leadership narrative</li>
                        <li>Highlight network effects and data moats</li>
                        <li>Demonstrate expansion into enterprise customers</li>
                        <li>Show clear product roadmap and vision</li>
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
