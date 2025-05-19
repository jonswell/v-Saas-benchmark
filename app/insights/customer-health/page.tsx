import Link from "next/link"
import { ArrowLeft, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CustomerHealthInsights() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/insights" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-xl">Customer Health Insights</span>
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
              <Users className="mr-3 h-8 w-8" />
              <h1 className="text-3xl font-bold tracking-tight">Customer Health Deep Dive</h1>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Net Dollar Retention</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Net Dollar Retention Benchmarks</CardTitle>
                  <CardDescription>Key metrics by ARR scale</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Net dollar retention (NDR) is one of the strongest indicators of long-term success for B2B SaaS
                    companies. It measures both the efficiency and predictability of a company's revenue generation by
                    accounting for customer expansion, contraction, and churn.
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Early Stage ($1M-$10M ARR)</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>Top Quartile: 130-150%</li>
                        <li>Median: 110-120%</li>
                        <li>Bottom Quartile: 90-100%</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Growth Stage ($10M-$100M ARR)</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>Top Quartile: 125-135%</li>
                        <li>Median: 110-115%</li>
                        <li>Bottom Quartile: 90-95%</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Scale Stage ($100M+ ARR)</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>Top Quartile: 120-130%</li>
                        <li>Median: 105-110%</li>
                        <li>Bottom Quartile: 85-90%</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium">Key Insights:</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>
                        <strong>Growth Motion Impact:</strong> Companies with product-led growth (PLG) and those
                        targeting mid-market to enterprise customers tend to have higher Net Dollar Retention due to
                        heavier reliance on customer expansion ARR.
                      </li>
                      <li>
                        <strong>Resilient Companies:</strong> While experiencing higher-than-normal churn rates through
                        fluctuating demand over the last few years, resilient companies have been able to meaningfully
                        upsell healthy customers and achieve ~125% net dollar retention.
                      </li>
                      <li>
                        <strong>Public Companies:</strong> The public SaaS companies in this dataset are able to
                        maintain strong net dollar retention as they scale to IPO, with top-performing companies
                        achieving 130-150% NDR in the periods surrounding IPO.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">ARR Funnel Composition</h2>
              <Card>
                <CardHeader>
                  <CardTitle>New Logo vs. Expansion</CardTitle>
                  <CardDescription>How ARR composition changes as companies scale</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The composition of ARR growth changes significantly as SaaS companies scale, with a gradual shift
                    from new logo acquisition to customer expansion.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">ARR Scale</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">New Logo %</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Expansion %</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Churn Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm">&lt;$10M</td>
                          <td className="px-4 py-2 text-sm">80%</td>
                          <td className="px-4 py-2 text-sm">20%</td>
                          <td className="px-4 py-2 text-sm">8%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">$10M-$25M</td>
                          <td className="px-4 py-2 text-sm">75%</td>
                          <td className="px-4 py-2 text-sm">25%</td>
                          <td className="px-4 py-2 text-sm">10%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">$25M-$50M</td>
                          <td className="px-4 py-2 text-sm">70%</td>
                          <td className="px-4 py-2 text-sm">30%</td>
                          <td className="px-4 py-2 text-sm">9%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">$50M-$100M</td>
                          <td className="px-4 py-2 text-sm">65%</td>
                          <td className="px-4 py-2 text-sm">35%</td>
                          <td className="px-4 py-2 text-sm">11%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">$100M-$200M</td>
                          <td className="px-4 py-2 text-sm">55%</td>
                          <td className="px-4 py-2 text-sm">45%</td>
                          <td className="px-4 py-2 text-sm">9%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">$200M+</td>
                          <td className="px-4 py-2 text-sm">45%</td>
                          <td className="px-4 py-2 text-sm">55%</td>
                          <td className="px-4 py-2 text-sm">10%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium">Key Insights:</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>
                        <strong>New Logo Dominance:</strong> New logos are the primary driver of ARR growth until SaaS
                        companies reach ~$200M ARR, when ARR from customer expansion begins to make up more than 50% of
                        new ARR.
                      </li>
                      <li>
                        <strong>Growth Motion Impact:</strong> Companies with a product-led growth (PLG) motion and
                        those targeting mid-market to enterprise customers rely more heavily on customer expansion to
                        drive ARR growth.
                      </li>
                      <li>
                        <strong>Churn Composition:</strong> As existing customers make up an increasing proportion of
                        new ARR, customer downsell also makes up a larger share of churn. However, SaaS companies
                        maintain average annual churn rate below 15% regardless of scale.
                      </li>
                      <li>
                        <strong>Pricing Model Impact:</strong> A company's proportion of downsell churn is largely
                        correlated with their pricing model, with consumption and seat-based models more susceptible to
                        downsell over logo churn.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Moving Up-Market</h2>
              <Card>
                <CardHeader>
                  <CardTitle>ARR per Customer</CardTitle>
                  <CardDescription>How deal sizes change as companies scale</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Another strong indicator of topline health is a company's ability to move up-market when closing new
                    logo deals. As SaaS companies prove themselves to be market leaders, they're able to land larger
                    deals with higher ACV, in turn increasing total ARR per customer.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">New Logo ARR per New Customer</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>&lt;$10M ARR: $15K-$25K</li>
                        <li>$10M-$25M ARR: $25K-$40K</li>
                        <li>$25M-$50M ARR: $40K-$60K</li>
                        <li>$50M-$100M ARR: $60K-$90K</li>
                        <li>$100M+ ARR: $90K-$150K+</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Total ARR per Customer</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>&lt;$10M ARR: $20K-$35K</li>
                        <li>$10M-$25M ARR: $35K-$55K</li>
                        <li>$25M-$50M ARR: $55K-$80K</li>
                        <li>$50M-$100M ARR: $80K-$120K</li>
                        <li>$100M+ ARR: $120K-$200K+</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium">Key Insights:</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>
                        <strong>Customer Base Growth:</strong> As companies scale to $20M, we see a 3x average increase
                        in the customer base, which can temporarily decrease total ARR per customer.
                      </li>
                      <li>
                        <strong>Enterprise Deals:</strong> Companies targeting mid-market to enterprise customers
                        typically see higher ARR per customer, with top performers achieving $150K+ per customer at
                        scale.
                      </li>
                      <li>
                        <strong>Concentration Risk:</strong> While landing larger deals is generally a positive
                        indication of topline health and product market fit, early stage companies should guard against
                        risk associated with an overly-concentrated customer base.
                      </li>
                      <li>
                        <strong>Expansion Opportunity:</strong> Higher ARR per customer creates more opportunity for
                        expansion, contributing to the shift in ARR composition as companies scale.
                      </li>
                    </ul>
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
