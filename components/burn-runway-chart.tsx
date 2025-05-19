"use client"

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BurnRunwayChartProps {
  companyData: {
    arrScale: string
    burnMultiple: number
    runway: number
  }
}

export default function BurnRunwayChart({ companyData }: BurnRunwayChartProps) {
  // Data based on the PDF chart "Growth Efficiency | Burn vs. Net New ARR"
  const burnMultipleData = [
    { scale: "<$10M", topQuartile: 1.0, median: 2.0, bottomQuartile: 3.0, yourCompany: companyData.burnMultiple },
    { scale: "$10M-$25M", topQuartile: 0.9, median: 1.8, bottomQuartile: 2.8, yourCompany: companyData.burnMultiple },
    { scale: "$25M-$50M", topQuartile: 0.8, median: 1.6, bottomQuartile: 2.6, yourCompany: companyData.burnMultiple },
    { scale: "$50M-$100M", topQuartile: 0.7, median: 1.4, bottomQuartile: 2.4, yourCompany: companyData.burnMultiple },
    { scale: "$100M-$200M", topQuartile: 0.6, median: 1.2, bottomQuartile: 2.2, yourCompany: companyData.burnMultiple },
    { scale: "$200M+", topQuartile: 0.5, median: 1.0, bottomQuartile: 2.0, yourCompany: companyData.burnMultiple },
  ]

  // Data based on the PDF chart "Spend Profile | Cash Balance & Runway"
  const runwayData = [
    { scale: "<$10M", topQuartile: 36, median: 24, bottomQuartile: 12, yourCompany: companyData.runway },
    { scale: "$10M-$25M", topQuartile: 38, median: 26, bottomQuartile: 14, yourCompany: companyData.runway },
    { scale: "$25M-$50M", topQuartile: 40, median: 28, bottomQuartile: 16, yourCompany: companyData.runway },
    { scale: "$50M-$100M", topQuartile: 42, median: 30, bottomQuartile: 18, yourCompany: companyData.runway },
    { scale: "$100M-$200M", topQuartile: 44, median: 32, bottomQuartile: 20, yourCompany: companyData.runway },
    { scale: "$200M+", topQuartile: 46, median: 34, bottomQuartile: 22, yourCompany: companyData.runway },
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
        <div className="font-medium mb-2">Burn Multiple by ARR Scale</div>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={burnMultipleData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="scale" />
            <YAxis label={{ value: "Burn Multiple", angle: -90, position: "insideLeft" }} domain={[0, 4]} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <ReferenceLine y={2.0} stroke="#666" strokeDasharray="3 3" label="Target Max" />
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
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
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
        <div className="font-medium mb-2">Runway by ARR Scale (Months)</div>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={runwayData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="scale" />
            <YAxis label={{ value: "Months", angle: -90, position: "insideLeft" }} domain={[0, 50]} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <ReferenceLine y={24} stroke="#666" strokeDasharray="3 3" label="Recommended Min" />
            <Bar dataKey="topQuartile" fill="var(--color-topQuartile)" />
            <Bar dataKey="median" fill="var(--color-median)" />
            <Bar dataKey="bottomQuartile" fill="var(--color-bottomQuartile)" />
            <Bar dataKey="yourCompany" fill="var(--color-yourCompany)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
