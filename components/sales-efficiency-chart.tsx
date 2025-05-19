"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, Bar, BarChart } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SalesEfficiencyChartProps {
  companyData: {
    arrScale: string
    magicNumber: number
    growthMotion: string
  }
}

export default function SalesEfficiencyChart({ companyData }: SalesEfficiencyChartProps) {
  // Calculate CAC payback period based on magic number
  const calculateCacPayback = (magicNumber: number) => {
    // CAC payback in months = 12 / magic number
    return Math.round(12 / magicNumber)
  }

  // Calculate LTV/CAC ratio based on magic number and growth motion
  const calculateLtvCac = (magicNumber: number, growthMotion: string) => {
    // Base LTV/CAC ratio
    let ltvCac = magicNumber * 5

    // Adjust based on growth motion
    if (growthMotion === "Product-led Growth") {
      ltvCac *= 1.3
    }

    return Math.round(ltvCac * 10) / 10
  }

  const cacPayback = calculateCacPayback(companyData.magicNumber)
  const ltvCac = calculateLtvCac(companyData.magicNumber, companyData.growthMotion)

  // Generate data for CAC payback by ARR scale
  const cacPaybackData = [
    {
      scale: "<$10M",
      topQuartile: 6,
      median: 12,
      bottomQuartile: 18,
      yourCompany: companyData.arrScale === "<$10M" ? cacPayback : null,
    },
    {
      scale: "$10M-$25M",
      topQuartile: 8,
      median: 14,
      bottomQuartile: 20,
      yourCompany: companyData.arrScale === "$10M-$25M" ? cacPayback : null,
    },
    {
      scale: "$25M-$50M",
      topQuartile: 10,
      median: 16,
      bottomQuartile: 22,
      yourCompany: companyData.arrScale === "$25M-$50M" ? cacPayback : null,
    },
    {
      scale: "$50M-$100M",
      topQuartile: 12,
      median: 18,
      bottomQuartile: 24,
      yourCompany: companyData.arrScale === "$50M-$100M" ? cacPayback : null,
    },
    {
      scale: "$100M-$200M",
      topQuartile: 14,
      median: 20,
      bottomQuartile: 26,
      yourCompany: companyData.arrScale === "$100M-$200M" ? cacPayback : null,
    },
    {
      scale: "$200M+",
      topQuartile: 16,
      median: 22,
      bottomQuartile: 28,
      yourCompany: companyData.arrScale === "$200M+" ? cacPayback : null,
    },
  ]

  // Generate data for LTV/CAC by growth motion
  const ltvCacData = [
    {
      motion: "Sales-led Growth",
      topQuartile: 5,
      median: 3,
      bottomQuartile: 2,
      yourCompany: companyData.growthMotion === "Sales-led Growth" ? ltvCac : null,
    },
    {
      motion: "Product-led Growth",
      topQuartile: 8,
      median: 5,
      bottomQuartile: 3,
      yourCompany: companyData.growthMotion === "Product-led Growth" ? ltvCac : null,
    },
    {
      motion: "Hybrid",
      topQuartile: 6,
      median: 4,
      bottomQuartile: 2.5,
      yourCompany: companyData.growthMotion === "Hybrid" ? ltvCac : null,
    },
  ]

  // Generate data for sales efficiency metrics comparison
  const efficiencyComparisonData = [
    { metric: "Magic Number", value: companyData.magicNumber, benchmark: 1.0 },
    { metric: "CAC Payback (months)", value: cacPayback, benchmark: 12, inverted: true },
    { metric: "LTV/CAC Ratio", value: ltvCac, benchmark: 3 },
    { metric: "Sales Efficiency", value: companyData.magicNumber * 0.8, benchmark: 0.8 },
    { metric: "Gross Margin Adjusted CAC Ratio", value: companyData.magicNumber * 0.75, benchmark: 0.75 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <ChartContainer
        config={{
          topQuartile: {
            label: "Top Quartile",
            color: "hsl(var(--chart-1))",
          },
          median: {
            label: "Median",
            color: "hsl(var(--chart-2))",
          },
          bottomQuartile: {
            label: "Bottom Quartile",
            color: "hsl(var(--chart-3))",
          },
          yourCompany: {
            label: "Your Company",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">CAC Payback Period by ARR Scale (Months)</div>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={cacPaybackData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="scale" />
            <YAxis label={{ value: "Months", angle: -90, position: "insideLeft" }} domain={[0, 30]} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Line type="monotone" dataKey="topQuartile" stroke="var(--color-topQuartile)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="median" stroke="var(--color-median)" strokeWidth={2} dot={false} />
            <Line
              type="monotone"
              dataKey="bottomQuartile"
              stroke="var(--color-bottomQuartile)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="yourCompany"
              stroke="var(--color-yourCompany)"
              strokeWidth={3}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer
        config={{
          topQuartile: {
            label: "Top Quartile",
            color: "hsl(var(--chart-1))",
          },
          median: {
            label: "Median",
            color: "hsl(var(--chart-2))",
          },
          bottomQuartile: {
            label: "Bottom Quartile",
            color: "hsl(var(--chart-3))",
          },
          yourCompany: {
            label: "Your Company",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">LTV/CAC Ratio by Growth Motion</div>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={ltvCacData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="motion" />
            <YAxis label={{ value: "LTV/CAC Ratio", angle: -90, position: "insideLeft" }} domain={[0, 10]} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Bar dataKey="topQuartile" fill="var(--color-topQuartile)" />
            <Bar dataKey="median" fill="var(--color-median)" />
            <Bar dataKey="bottomQuartile" fill="var(--color-bottomQuartile)" />
            <Bar dataKey="yourCompany" fill="var(--color-yourCompany)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer
        config={{
          value: {
            label: "Your Company",
            color: "hsl(var(--chart-4))",
          },
          benchmark: {
            label: "Benchmark",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-full w-full md:col-span-2"
      >
        <div className="font-medium mb-2">Sales Efficiency Metrics Comparison</div>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={efficiencyComparisonData}
            margin={{
              top: 20,
              right: 30,
              left: 80,
              bottom: 10,
            }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="metric" />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Bar dataKey="benchmark" fill="var(--color-benchmark)" />
            <Bar dataKey="value" fill="var(--color-value)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
