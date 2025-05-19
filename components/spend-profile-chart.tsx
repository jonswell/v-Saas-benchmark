"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SpendProfileChartProps {
  companyData: {
    arrScale: string
    salesMarketingPercent: number
    rdPercent: number
    gaPercent: number
  }
}

export default function SpendProfileChart({ companyData }: SpendProfileChartProps) {
  // Data based on the PDF chart "Spend Profile | Operational Expenses"
  const benchmarkData = {
    "<$10M": { sm: 45, rd: 40, ga: 15 },
    "$10M-$25M": { sm: 48, rd: 37, ga: 15 },
    "$25M-$50M": { sm: 50, rd: 35, ga: 15 },
    "$50M-$100M": { sm: 52, rd: 33, ga: 15 },
    "$100M-$200M": { sm: 54, rd: 31, ga: 15 },
    "$200M+": { sm: 56, rd: 29, ga: 15 },
  }

  const scaleKey = companyData.arrScale as keyof typeof benchmarkData
  const benchmark = benchmarkData[scaleKey] || benchmarkData["$10M-$25M"]

  const data = [
    {
      name: "Sales & Marketing",
      benchmark: benchmark.sm,
      yourCompany: companyData.salesMarketingPercent,
    },
    {
      name: "R&D",
      benchmark: benchmark.rd,
      yourCompany: companyData.rdPercent,
    },
    {
      name: "G&A",
      benchmark: benchmark.ga,
      yourCompany: companyData.gaPercent,
    },
  ]

  return (
    <ChartContainer
      config={{
        benchmark: {
          label: "Industry Benchmark",
          color: "hsl(var(--chart-1))",
        },
        yourCompany: {
          label: "Your Company",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
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
          <YAxis label={{ value: "Percentage of OpEx (%)", angle: -90, position: "insideLeft" }} domain={[0, 80]} />
          <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
          <Legend />
          <Bar dataKey="benchmark" fill="var(--color-benchmark)" />
          <Bar dataKey="yourCompany" fill="var(--color-yourCompany)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
