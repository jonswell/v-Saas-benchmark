"use client"

import { useState } from "react"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface IndustryBenchmarksProps {
  companyData: {
    arrScale: string
    arrGrowth: number
    netRetention: number
    fcfMargin: number
    magicNumber: number
    grossMargin: number
  }
}

export default function IndustryBenchmarks({ companyData }: IndustryBenchmarksProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("all")

  // Define industry verticals
  const industries = [
    { id: "all", name: "All Industries" },
    { id: "security", name: "Security & Infrastructure" },
    { id: "backoffice", name: "Back Office & Operations" },
    { id: "vertical", name: "Vertical SaaS" },
    { id: "collaboration", name: "Collaboration & Workflow" },
    { id: "salesmarketing", name: "Sales & Marketing" },
    { id: "data", name: "Data & Analytics" },
    { id: "fintech", name: "Enterprise Fintech" },
  ]

  // Metrics to benchmark
  const metrics = [
    { id: "arrGrowth", name: "ARR Growth", unit: "%" },
    { id: "netRetention", name: "Net Retention", unit: "%" },
    { id: "grossMargin", name: "Gross Margin", unit: "%" },
    { id: "magicNumber", name: "Magic Number", unit: "x" },
    { id: "fcfMargin", name: "FCF Margin", unit: "%" },
  ]

  // Define benchmark data for each industry and metric
  const getBenchmarkData = (industry: string, metric: string) => {
    // Base benchmarks (all industries)
    const baseBenchmarks = {
      arrGrowth: { topQuartile: 135, median: 100, bottomQuartile: 70 },
      netRetention: { topQuartile: 125, median: 110, bottomQuartile: 95 },
      grossMargin: { topQuartile: 85, median: 75, bottomQuartile: 65 },
      magicNumber: { topQuartile: 1.5, median: 1.0, bottomQuartile: 0.6 },
      fcfMargin: { topQuartile: 10, median: -10, bottomQuartile: -30 },
    }

    // Industry-specific adjustments
    const industryAdjustments: Record<string, Partial<Record<string, any>>> = {
      security: {
        arrGrowth: { topQuartile: 145, median: 110, bottomQuartile: 75 },
        grossMargin: { topQuartile: 87, median: 78, bottomQuartile: 68 },
      },
      backoffice: {
        netRetention: { topQuartile: 120, median: 108, bottomQuartile: 90 },
        magicNumber: { topQuartile: 1.3, median: 0.9, bottomQuartile: 0.5 },
      },
      vertical: {
        arrGrowth: { topQuartile: 120, median: 90, bottomQuartile: 65 },
        netRetention: { topQuartile: 130, median: 115, bottomQuartile: 100 },
      },
      collaboration: {
        arrGrowth: { topQuartile: 150, median: 120, bottomQuartile: 80 },
        grossMargin: { topQuartile: 90, median: 82, bottomQuartile: 70 },
      },
      salesmarketing: {
        magicNumber: { topQuartile: 1.7, median: 1.2, bottomQuartile: 0.7 },
        fcfMargin: { topQuartile: 5, median: -15, bottomQuartile: -35 },
      },
      data: {
        arrGrowth: { topQuartile: 140, median: 105, bottomQuartile: 75 },
        grossMargin: { topQuartile: 85, median: 78, bottomQuartile: 68 },
      },
      fintech: {
        arrGrowth: { topQuartile: 125, median: 95, bottomQuartile: 65 },
        netRetention: { topQuartile: 135, median: 120, bottomQuartile: 105 },
        fcfMargin: { topQuartile: 15, median: -5, bottomQuartile: -25 },
      },
    }

    // Return industry-specific benchmarks or base benchmarks
    const metricKey = metric as keyof typeof baseBenchmarks
    if (industry === "all" || !industryAdjustments[industry]?.[metricKey]) {
      return baseBenchmarks[metricKey]
    }
    return industryAdjustments[industry][metricKey]
  }

  // Generate data for bar charts
  const generateBarChartData = (metric: string) => {
    const benchmarks = getBenchmarkData(selectedIndustry, metric)
    const metricValue = companyData[metric as keyof typeof companyData]

    return [
      {
        name: "Top Quartile",
        value: benchmarks.topQuartile,
        fill: "#22c55e", // Green
      },
      {
        name: "Median",
        value: benchmarks.median,
        fill: "#3b82f6", // Blue
      },
      {
        name: "Bottom Quartile",
        value: benchmarks.bottomQuartile,
        fill: "#9ca3af", // Gray
      },
      {
        name: "Your Company",
        value: metricValue,
        fill: "#f97316", // Orange
      },
    ]
  }

  // Generate data for comparison across all industries
  const generateIndustryComparisonData = (metric: string) => {
    const metricValue = companyData[metric as keyof typeof companyData]

    return industries.slice(1).map((industry) => {
      const benchmarks = getBenchmarkData(industry.id, metric)
      return {
        name: industry.name,
        topQuartile: benchmarks.topQuartile,
        median: benchmarks.median,
        bottomQuartile: benchmarks.bottomQuartile,
        yourCompany: industry.id === selectedIndustry ? metricValue : null,
      }
    })
  }

  // Get industry name from ID
  const getIndustryName = (id: string) => {
    return industries.find((industry) => industry.id === id)?.name || id
  }

  // Get appropriate unit for a metric
  const getMetricUnit = (metric: string) => {
    return metrics.find((m) => m.id === metric)?.unit || ""
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium">Industry Benchmarks</h2>
          <p className="text-sm text-muted-foreground">Compare your performance against industry-specific benchmarks</p>
        </div>
        <div className="w-full sm:w-64">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {industries.map((industry) => (
                  <SelectItem key={industry.id} value={industry.id}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="arrGrowth">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          {metrics.map((metric) => (
            <TabsTrigger key={metric.id} value={metric.id}>
              {metric.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {metrics.map((metric) => (
          <TabsContent key={metric.id} value={metric.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{metric.name} Benchmarks</CardTitle>
                  <CardDescription>
                    {selectedIndustry === "all"
                      ? "Across all SaaS verticals"
                      : `For ${getIndustryName(selectedIndustry)} companies`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ChartContainer className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={generateBarChartData(metric.id)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                          label={{
                            value: metric.name + (metric.unit ? ` (${metric.unit})` : ""),
                            angle: -90,
                            position: "left",
                          }}
                        />
                        <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
                        <Bar
                          dataKey="value"
                          name={metric.name}
                          fill="#8884d8"
                          fillOpacity={0.8}
                          // Use the fill color from the data
                          isAnimationActive={false}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{metric.name} Across Verticals</CardTitle>
                  <CardDescription>Median benchmarks across different SaaS verticals</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ChartContainer
                    config={{
                      topQuartile: { label: "Top Quartile", color: "hsl(var(--chart-1))" },
                      median: { label: "Median", color: "hsl(var(--chart-2))" },
                      bottomQuartile: { label: "Bottom Quartile", color: "hsl(var(--chart-3))" },
                      yourCompany: { label: "Your Company", color: "hsl(var(--chart-4))" },
                    }}
                    className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={generateIndustryComparisonData(metric.id)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                        <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
                        <Legend />
                        <Bar dataKey="median" name="Median" fill="var(--color-median)" />
                        <Bar dataKey="yourCompany" name="Your Company" fill="var(--color-yourCompany)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Industry Insights for {metric.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metric.id === "arrGrowth" && (
                    <>
                      <p>
                        Growth rates vary significantly across SaaS verticals based on market maturity and competitive
                        dynamics:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Security & Infrastructure</strong> and <strong>Collaboration Tools</strong> typically
                          show the highest growth rates, often exceeding 140% for top performers.
                        </li>
                        <li>
                          <strong>Vertical SaaS</strong> solutions tend to have more moderate but consistent growth,
                          with top performers achieving 120%+ YoY growth.
                        </li>
                        <li>
                          <strong>Enterprise Fintech</strong> companies face more regulatory hurdles but can achieve
                          steady growth with strong retention.
                        </li>
                      </ul>
                    </>
                  )}

                  {metric.id === "netRetention" && (
                    <>
                      <p>Net dollar retention shows distinctive patterns across different SaaS verticals:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Enterprise Fintech</strong> and <strong>Vertical SaaS</strong> solutions typically
                          achieve the highest retention rates (130%+) due to deep workflow integration.
                        </li>
                        <li>
                          <strong>Back Office</strong> solutions often face more competition and switching, resulting in
                          lower retention benchmarks.
                        </li>
                        <li>
                          Companies with consumption-based pricing models tend to show higher variability in retention
                          across all verticals.
                        </li>
                      </ul>
                    </>
                  )}

                  {metric.id === "grossMargin" && (
                    <>
                      <p>Gross margins reveal the underlying cost structure differences between SaaS verticals:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Collaboration</strong> and <strong>Data & Analytics</strong> companies typically
                          achieve the highest gross margins (85-90%).
                        </li>
                        <li>
                          <strong>Security</strong> products can achieve high margins but often require more
                          professional services in enterprise deployments.
                        </li>
                        <li>
                          Verticals requiring significant customer success support or professional services tend to have
                          lower gross margins.
                        </li>
                      </ul>
                    </>
                  )}

                  {metric.id === "magicNumber" && (
                    <>
                      <p>
                        Sales efficiency varies significantly by vertical based on sales motion and deal complexity:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Sales & Marketing</strong> tools often have the highest magic numbers due to natural
                          product-led growth motions.
                        </li>
                        <li>
                          <strong>Security & Infrastructure</strong> companies typically have longer sales cycles but
                          can achieve strong efficiency with technical sales teams.
                        </li>
                        <li>
                          Companies with product-led growth motions across all verticals tend to outperform on this
                          metric.
                        </li>
                      </ul>
                    </>
                  )}

                  {metric.id === "fcfMargin" && (
                    <>
                      <p>
                        Cash flow profiles differ across SaaS verticals based on growth patterns and capital
                        requirements:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Enterprise Fintech</strong> companies tend to reach profitability earlier due to
                          higher-value contracts.
                        </li>
                        <li>
                          <strong>Data & Analytics</strong> companies can achieve strong margins with scalable
                          infrastructure.
                        </li>
                        <li>
                          Companies across all verticals typically prioritize growth over profitability until reaching
                          $100M+ in ARR.
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
