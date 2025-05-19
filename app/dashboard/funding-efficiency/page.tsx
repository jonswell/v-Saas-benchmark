"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FundingEfficiencyPage() {
  // User's company data - this would normally come from state or context
  const [companyData, setCompanyData] = useState({
    totalCapitalRaised: 50, // in $M
    currentArr: 10, // in $M
    totalArr: 15, // in $M (lifetime ARR generated)
    foundingYear: 2020,
    firstFundingYear: 2021,
    fundingRounds: [
      { year: 2021, amount: 5, arrAtTime: 1, valuation: 20 },
      { year: 2022, amount: 20, arrAtTime: 4, valuation: 80 },
      { year: 2023, amount: 25, arrAtTime: 8, valuation: 160 },
    ],
  })

  // Update company data when inputs change
  const handleInputChange = (field: string, value: string | number) => {
    if (field === "totalCapitalRaised" || field === "currentArr" || field === "totalArr") {
      const numValue = typeof value === "string" ? Number.parseFloat(value) : value
      setCompanyData((prev) => ({ ...prev, [field]: isNaN(numValue) ? 0 : numValue }))
    } else {
      setCompanyData((prev) => ({ ...prev, [field]: value }))
    }
  }

  // Calculate funding efficiency metrics
  const calculateMetrics = () => {
    // Ensure we have valid numbers to avoid division by zero
    const totalCapitalRaised = companyData.totalCapitalRaised || 1 // Default to 1 to avoid division by zero
    const currentArr = companyData.currentArr || 0
    const totalArr = companyData.totalArr || 0
    const foundingYear = companyData.foundingYear || new Date().getFullYear()
    const firstFundingYear = companyData.firstFundingYear || new Date().getFullYear()
    const firstRoundArr =
      companyData.fundingRounds && companyData.fundingRounds.length > 0
        ? companyData.fundingRounds[0].arrAtTime || 0.1
        : 0.1 // Default to 0.1 to avoid division by zero

    // Capital efficiency ratio: Current ARR / Total capital raised
    const capitalEfficiencyRatio = currentArr / totalCapitalRaised

    // ARR generation multiple: Total ARR generated / Total capital raised
    const arrGenerationMultiple = totalArr / totalCapitalRaised

    // Years from founding
    const yearsFromFounding = new Date().getFullYear() - foundingYear

    // Years from first funding
    const yearsFromFunding = new Date().getFullYear() - firstFundingYear

    // ARR CAGR
    const cagr = yearsFromFunding > 0 ? Math.pow(currentArr / firstRoundArr, 1 / yearsFromFunding) - 1 : 0

    // Amount raised per $1 of ARR
    const amountRaisedPerArr = currentArr > 0 ? totalCapitalRaised / currentArr : totalCapitalRaised

    return {
      capitalEfficiencyRatio,
      arrGenerationMultiple,
      yearsFromFounding,
      yearsFromFunding,
      cagr: cagr * 100, // Convert to percentage
      amountRaisedPerArr,
    }
  }

  const metrics = calculateMetrics()

  // Industry benchmark data
  const getBenchmarksByScale = (arr: number) => {
    // Ensure arr is a number
    const safeArr = typeof arr === "number" && !isNaN(arr) ? arr : 0

    if (safeArr < 5) {
      return {
        capitalEfficiencyRatio: { top: 0.3, median: 0.2, bottom: 0.1 },
        arrGenerationMultiple: { top: 0.4, median: 0.25, bottom: 0.15 },
        amountRaisedPerArr: { top: 3, median: 5, bottom: 10 },
      }
    } else if (safeArr < 10) {
      return {
        capitalEfficiencyRatio: { top: 0.4, median: 0.25, bottom: 0.15 },
        arrGenerationMultiple: { top: 0.5, median: 0.35, bottom: 0.2 },
        amountRaisedPerArr: { top: 2.5, median: 4, bottom: 7 },
      }
    } else if (safeArr < 50) {
      return {
        capitalEfficiencyRatio: { top: 0.45, median: 0.3, bottom: 0.2 },
        arrGenerationMultiple: { top: 0.6, median: 0.4, bottom: 0.25 },
        amountRaisedPerArr: { top: 2, median: 3.5, bottom: 5 },
      }
    } else {
      return {
        capitalEfficiencyRatio: { top: 0.5, median: 0.35, bottom: 0.25 },
        arrGenerationMultiple: { top: 0.7, median: 0.5, bottom: 0.3 },
        amountRaisedPerArr: { top: 1.5, median: 3, bottom: 4.5 },
      }
    }
  }

  const benchmarks = getBenchmarksByScale(companyData.currentArr)

  // Chart data for comparisons - simplified version
  const capitalEfficiencyChartData = [
    {
      name: "Capital Efficiency",
      company: metrics.capitalEfficiencyRatio,
      top: benchmarks.capitalEfficiencyRatio.top,
      median: benchmarks.capitalEfficiencyRatio.median,
      bottom: benchmarks.capitalEfficiencyRatio.bottom,
    },
    {
      name: "ARR Generation",
      company: metrics.arrGenerationMultiple,
      top: benchmarks.arrGenerationMultiple.top,
      median: benchmarks.arrGenerationMultiple.median,
      bottom: benchmarks.arrGenerationMultiple.bottom,
    },
  ]

  // Simplified valuation chart data
  const valuationChartData = (companyData.fundingRounds || []).map((round) => ({
    year: round.year || 0,
    valuation: round.valuation || 0,
    arr: round.arrAtTime || 0,
    multiple: round.arrAtTime > 0 ? (round.valuation || 0) / round.arrAtTime : 0,
  }))

  // Simplified peer comparison data
  const peerComparisonData = [
    { name: "Top Quartile", value: benchmarks.amountRaisedPerArr.top, fill: "#22c55e" },
    { name: "Median", value: benchmarks.amountRaisedPerArr.median, fill: "#3b82f6" },
    { name: "Bottom Quartile", value: benchmarks.amountRaisedPerArr.bottom, fill: "#9ca3af" },
    { name: "Your Company", value: metrics.amountRaisedPerArr, fill: "#f97316" },
  ]

  // Get qualitative assessment based on metrics
  const getCapitalEfficiencyAssessment = () => {
    const { capitalEfficiencyRatio } = metrics
    const benchmark = benchmarks.capitalEfficiencyRatio

    if (capitalEfficiencyRatio >= benchmark.top) {
      return {
        rating: "Exceptional",
        description:
          "Your company demonstrates exceptional capital efficiency, generating ARR at a significantly higher rate than most SaaS companies at your scale.",
        advice:
          "Consider leveraging your efficient growth model to potentially raise less capital or accelerate growth without additional funding.",
      }
    } else if (capitalEfficiencyRatio >= benchmark.median) {
      return {
        rating: "Above Average",
        description:
          "Your company is more capital efficient than most SaaS companies at your scale, with solid ARR generation relative to capital raised.",
        advice:
          "There's room to further optimize your capital efficiency by focusing on improving unit economics or expanding with minimal cost.",
      }
    } else if (capitalEfficiencyRatio >= benchmark.bottom) {
      return {
        rating: "Below Average",
        description:
          "Your company is generating less ARR per dollar raised compared to industry benchmarks at your scale.",
        advice:
          "Consider evaluating your go-to-market strategy, pricing, or cost structure to improve capital efficiency.",
      }
    } else {
      return {
        rating: "Needs Improvement",
        description:
          "Your capital efficiency is significantly below industry benchmarks, which may impact your ability to raise future funding at favorable terms.",
        advice: "Focus on improving unit economics, reducing burn, and identifying more efficient growth channels.",
      }
    }
  }

  const efficiencyAssessment = getCapitalEfficiencyAssessment()

  // Define colors for chart elements
  const chartColors = {
    company: "#f97316",
    top: "#22c55e",
    median: "#3b82f6",
    bottom: "#9ca3af",
    valuation: "#8b5cf6",
    arr: "#10b981",
    multiple: "#f97316",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-xl">Funding Efficiency Analysis</span>
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
              <h1 className="text-3xl font-bold tracking-tight">Funding Efficiency Analysis</h1>
              <p className="text-muted-foreground mt-2">
                Analyze how efficiently your company converts capital into recurring revenue compared to industry
                benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Company Funding Data</CardTitle>
                  <CardDescription>Enter your funding and revenue data</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalCapitalRaised">Total Capital Raised ($M)</Label>
                      <Input
                        id="totalCapitalRaised"
                        type="number"
                        value={companyData.totalCapitalRaised}
                        onChange={(e) => handleInputChange("totalCapitalRaised", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentArr">Current ARR ($M)</Label>
                      <Input
                        id="currentArr"
                        type="number"
                        value={companyData.currentArr}
                        onChange={(e) => handleInputChange("currentArr", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalArr">Total ARR Generated ($M)</Label>
                      <Input
                        id="totalArr"
                        type="number"
                        value={companyData.totalArr}
                        onChange={(e) => handleInputChange("totalArr", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foundingYear">Founding Year</Label>
                      <Input
                        id="foundingYear"
                        type="number"
                        value={companyData.foundingYear}
                        onChange={(e) => handleInputChange("foundingYear", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstFundingYear">First Funding Year</Label>
                      <Input
                        id="firstFundingYear"
                        type="number"
                        value={companyData.firstFundingYear}
                        onChange={(e) => handleInputChange("firstFundingYear", e.target.value)}
                      />
                    </div>
                    <Button className="w-full" type="button">
                      Update Analysis
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Funding Efficiency Metrics</CardTitle>
                  <CardDescription>
                    Key metrics measuring how efficiently your company converts capital into ARR
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Capital Efficiency Ratio</div>
                      <div className="text-2xl font-bold">{metrics.capitalEfficiencyRatio.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">
                        ARR : Capital Raised ({Number.parseFloat(metrics.capitalEfficiencyRatio.toFixed(2))} : 1)
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">ARR Generation Multiple</div>
                      <div className="text-2xl font-bold">{metrics.arrGenerationMultiple.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Total ARR Generated : Capital Raised</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Amount Raised Per $1 ARR</div>
                      <div className="text-2xl font-bold">${metrics.amountRaisedPerArr.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">
                        Capital Raised : ARR (${Number.parseFloat(metrics.amountRaisedPerArr.toFixed(2))} : 1)
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">ARR CAGR</div>
                      <div className="text-2xl font-bold">{metrics.cagr.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">
                        Since first funding ({metrics.yearsFromFunding} years)
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Years From Founding</div>
                      <div className="text-2xl font-bold">{metrics.yearsFromFounding}</div>
                      <div className="text-xs text-muted-foreground">Company age in years</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Capital Efficiency Rating</div>
                      <div className="text-2xl font-bold">{efficiencyAssessment.rating}</div>
                      <div className="text-xs text-muted-foreground">Based on industry benchmarks</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="comparisons">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="comparisons">Benchmark Comparisons</TabsTrigger>
                <TabsTrigger value="valuation">Valuation Analysis</TabsTrigger>
                <TabsTrigger value="insights">Insights & Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="comparisons" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Efficiency Metrics Comparison</CardTitle>
                      <CardDescription>Your company compared to industry benchmarks</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={capitalEfficiencyChartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis
                            label={{ value: "Ratio", angle: -90, position: "insideLeft" }}
                            domain={[
                              0,
                              Math.max(
                                benchmarks.capitalEfficiencyRatio.top * 1.5,
                                benchmarks.arrGenerationMultiple.top * 1.5,
                                metrics.capitalEfficiencyRatio * 1.5,
                                metrics.arrGenerationMultiple * 1.5,
                              ),
                            ]}
                          />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="company" name="Your Company" fill={chartColors.company} />
                          <Bar dataKey="top" name="Top Quartile" fill={chartColors.top} />
                          <Bar dataKey="median" name="Median" fill={chartColors.median} />
                          <Bar dataKey="bottom" name="Bottom Quartile" fill={chartColors.bottom} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Capital Raised Per $1 ARR</CardTitle>
                      <CardDescription>Amount of capital required to generate $1 of ARR</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={peerComparisonData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            type="number"
                            label={{ value: "Dollars Raised Per $1 ARR", position: "insideBottom" }}
                          />
                          <YAxis dataKey="name" type="category" width={120} />
                          <Tooltip formatter={(value) => [`$${value}`, "Amount Raised Per $1 ARR"]} />
                          <Bar dataKey="value">
                            {peerComparisonData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Benchmark Analysis by ARR Scale</CardTitle>
                    <CardDescription>
                      How capital efficiency metrics compare across different SaaS company sizes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Company Scale</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                              Capital Efficiency Ratio (Top Quartile)
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                              ARR Generation Multiple (Top Quartile)
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                              $ Raised Per $1 ARR (Top Quartile)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-2 text-sm">&lt;$5M ARR</td>
                            <td className="px-4 py-2 text-sm">0.3x</td>
                            <td className="px-4 py-2 text-sm">0.4x</td>
                            <td className="px-4 py-2 text-sm">$3.0</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm">$5M-$10M ARR</td>
                            <td className="px-4 py-2 text-sm">0.4x</td>
                            <td className="px-4 py-2 text-sm">0.5x</td>
                            <td className="px-4 py-2 text-sm">$2.5</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm">$10M-$50M ARR</td>
                            <td className="px-4 py-2 text-sm">0.45x</td>
                            <td className="px-4 py-2 text-sm">0.6x</td>
                            <td className="px-4 py-2 text-sm">$2.0</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm">$50M+ ARR</td>
                            <td className="px-4 py-2 text-sm">0.5x</td>
                            <td className="px-4 py-2 text-sm">0.7x</td>
                            <td className="px-4 py-2 text-sm">$1.5</td>
                          </tr>
                          <tr className="bg-muted/50">
                            <td className="px-4 py-2 text-sm font-medium">Your Company</td>
                            <td className="px-4 py-2 text-sm font-medium">
                              {metrics.capitalEfficiencyRatio.toFixed(2)}x
                            </td>
                            <td className="px-4 py-2 text-sm font-medium">
                              {metrics.arrGenerationMultiple.toFixed(2)}x
                            </td>
                            <td className="px-4 py-2 text-sm font-medium">${metrics.amountRaisedPerArr.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="valuation" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Valuation Multiple Analysis</CardTitle>
                    <CardDescription>Track your valuation multiples across funding rounds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      {valuationChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={valuationChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis
                              yAxisId="left"
                              orientation="left"
                              label={{ value: "Amount ($M)", angle: -90, position: "insideLeft" }}
                            />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              label={{ value: "Multiple (x)", angle: 90, position: "insideRight" }}
                            />
                            <Tooltip />
                            <Legend />
                            <Bar
                              yAxisId="left"
                              dataKey="valuation"
                              name="Valuation ($M)"
                              fill={chartColors.valuation}
                            />
                            <Bar yAxisId="left" dataKey="arr" name="ARR ($M)" fill={chartColors.arr} />
                            <Bar yAxisId="right" dataKey="multiple" name="Multiple (x)" fill={chartColors.multiple} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-muted-foreground">No funding round data available</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Funding Round History</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Year</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                Round Amount ($M)
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                ARR at Time ($M)
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Valuation ($M)</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Multiple (x)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {(companyData.fundingRounds || []).map((round, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm">{round.year}</td>
                                <td className="px-4 py-2 text-sm">${round.amount}M</td>
                                <td className="px-4 py-2 text-sm">${round.arrAtTime}M</td>
                                <td className="px-4 py-2 text-sm">${round.valuation}M</td>
                                <td className="px-4 py-2 text-sm">
                                  {round.arrAtTime > 0 ? (round.valuation / round.arrAtTime).toFixed(1) : "N/A"}x
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Capital Efficiency Assessment</CardTitle>
                    <CardDescription>Analysis of your company's funding efficiency and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Overall Assessment: {efficiencyAssessment.rating}</h3>
                        <p className="mt-2">{efficiencyAssessment.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="font-medium">Key Strengths</h3>
                          <ul className="mt-2 space-y-1 list-disc pl-5">
                            {metrics.capitalEfficiencyRatio >= benchmarks.capitalEfficiencyRatio.median && (
                              <li>Strong capital efficiency ratio compared to peers</li>
                            )}
                            {metrics.arrGenerationMultiple >= benchmarks.arrGenerationMultiple.median && (
                              <li>Effective conversion of capital into ARR over time</li>
                            )}
                            {metrics.amountRaisedPerArr <= benchmarks.amountRaisedPerArr.median && (
                              <li>Efficient use of capital with lower dollars raised per ARR dollar</li>
                            )}
                            {metrics.cagr >= 80 && (
                              <li>Impressive ARR growth rate of {metrics.cagr.toFixed(1)}% since first funding</li>
                            )}
                          </ul>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h3 className="font-medium">Areas for Improvement</h3>
                          <ul className="mt-2 space-y-1 list-disc pl-5">
                            {metrics.capitalEfficiencyRatio < benchmarks.capitalEfficiencyRatio.median && (
                              <li>Capital efficiency ratio below industry median for your scale</li>
                            )}
                            {metrics.arrGenerationMultiple < benchmarks.arrGenerationMultiple.median && (
                              <li>Total ARR generation relative to capital is below benchmarks</li>
                            )}
                            {metrics.amountRaisedPerArr > benchmarks.amountRaisedPerArr.median && (
                              <li>Higher than median capital requirements per dollar of ARR</li>
                            )}
                            {metrics.cagr < 50 && (
                              <li>
                                ARR growth rate of {metrics.cagr.toFixed(1)}% indicates potential for acceleration
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Strategic Recommendations</h3>
                        <div className="mt-2 space-y-3">
                          <p>{efficiencyAssessment.advice}</p>
                          <p>Based on your metrics, consider the following strategies:</p>
                          <ul className="space-y-1 list-disc pl-5">
                            <li>
                              Focus on improving your net retention rate to generate more ARR from existing customers
                              with minimal additional capital.
                            </li>
                            <li>
                              Analyze your customer acquisition costs across different channels to identify the most
                              capital-efficient growth avenues.
                            </li>
                            <li>
                              Consider optimizing your pricing strategy to improve your ARR to capital ratio without
                              significant additional investment.
                            </li>
                            <li>
                              Benchmark your operational expenses against peers to identify potential areas for
                              efficiency improvements.
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Capital Efficiency by Industry</h3>
                        <p className="mt-2">Capital efficiency metrics vary significantly across SaaS verticals:</p>
                        <ul className="mt-2 space-y-1 list-disc pl-5">
                          <li>
                            <strong>Product-led Growth (PLG) Companies:</strong> Typically achieve the highest capital
                            efficiency with top performers generating $0.50+ of ARR per dollar raised.
                          </li>
                          <li>
                            <strong>Infrastructure & Security:</strong> Often less capital-efficient initially due to
                            complex product development, but can scale efficiently post-product-market fit.
                          </li>
                          <li>
                            <strong>Vertical SaaS:</strong> Moderate capital efficiency with focused GTM strategies,
                            typically achieving $0.30-$0.45 of ARR per dollar raised.
                          </li>
                          <li>
                            <strong>Enterprise-focused Companies:</strong> Require more capital for longer sales cycles
                            but can achieve strong efficiency at scale.
                          </li>
                        </ul>
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
