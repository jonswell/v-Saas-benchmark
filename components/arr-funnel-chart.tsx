"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ArrFunnelChartProps {
  companyData: {
    arrScale: string
    newLogoPercent: number
    expansionPercent: number
    churnRate: number
  }
}

export default function ArrFunnelChart({ companyData }: ArrFunnelChartProps) {
  // Data based on the PDF chart "Topline Health | Drivers of ARR Growth"
  const getScaleData = () => {
    switch (companyData.arrScale) {
      case "<$10M":
        return { newLogo: 80, expansion: 20, churn: 8 }
      case "$10M-$25M":
        return { newLogo: 75, expansion: 25, churn: 10 }
      case "$25M-$50M":
        return { newLogo: 70, expansion: 30, churn: 9 }
      case "$50M-$100M":
        return { newLogo: 65, expansion: 35, churn: 11 }
      case "$100M-$200M":
        return { newLogo: 55, expansion: 45, churn: 9 }
      case "$200M+":
        return { newLogo: 45, expansion: 55, churn: 10 }
      default:
        return { newLogo: 70, expansion: 30, churn: 10 }
    }
  }

  const benchmarkData = getScaleData()

  // Create data for the stacked bar chart
  const data = [
    {
      name: "Benchmark",
      newLogo: benchmarkData.newLogo,
      expansion: benchmarkData.expansion,
      churn: benchmarkData.churn,
    },
    {
      name: "Your Company",
      newLogo: companyData.newLogoPercent,
      expansion: companyData.expansionPercent,
      churn: companyData.churnRate,
    },
  ]

  // Create data for the funnel visualization
  const funnelData = [
    {
      name: "Beginning ARR",
      benchmark: 100,
      yourCompany: 100,
    },
    {
      name: "+ New Logo",
      benchmark: benchmarkData.newLogo,
      yourCompany: companyData.newLogoPercent,
    },
    {
      name: "+ Expansion",
      benchmark: benchmarkData.expansion,
      yourCompany: companyData.expansionPercent,
    },
    {
      name: "- Churn",
      benchmark: -benchmarkData.churn,
      yourCompany: -companyData.churnRate,
    },
    {
      name: "= Ending ARR",
      benchmark: 100 + benchmarkData.newLogo + benchmarkData.expansion - benchmarkData.churn,
      yourCompany: 100 + companyData.newLogoPercent + companyData.expansionPercent - companyData.churnRate,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <ChartContainer
        config={{
          newLogo: {
            label: "New Logo",
            color: "hsl(var(--chart-1))",
          },
          expansion: {
            label: "Expansion",
            color: "hsl(var(--chart-2))",
          },
          churn: {
            label: "Churn",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">ARR Composition (%)</div>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: "Percentage (%)", angle: -90, position: "insideLeft" }} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Bar dataKey="newLogo" stackId="a" fill="var(--color-newLogo)" name="New Logo" />
            <Bar dataKey="expansion" stackId="a" fill="var(--color-expansion)" name="Expansion" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer
        config={{
          benchmark: {
            label: "Benchmark",
            color: "hsl(var(--chart-1))",
          },
          yourCompany: {
            label: "Your Company",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">ARR Funnel</div>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={funnelData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[-20, 200]} />
            <YAxis dataKey="name" type="category" />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Bar dataKey="benchmark" fill="var(--color-benchmark)" />
            <Bar dataKey="yourCompany" fill="var(--color-yourCompany)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
