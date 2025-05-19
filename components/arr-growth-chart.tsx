"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ArrGrowthChartProps {
  companyData: {
    arrScale: string
    arrGrowth: number
  }
}

export default function ArrGrowthChart({ companyData }: ArrGrowthChartProps) {
  // Data based on the PDF chart "Topline Health | ARR Growth from $10M to IPO"
  const data = [
    { quarter: 0, topQuartile: 170, median: 100, bottomQuartile: 60, yourCompany: companyData.arrGrowth },
    { quarter: 1, topQuartile: 175, median: 105, bottomQuartile: 65, yourCompany: companyData.arrGrowth },
    { quarter: 2, topQuartile: 180, median: 110, bottomQuartile: 70, yourCompany: companyData.arrGrowth },
    { quarter: 3, topQuartile: 185, median: 115, bottomQuartile: 75, yourCompany: companyData.arrGrowth },
    { quarter: 4, topQuartile: 190, median: 120, bottomQuartile: 80, yourCompany: companyData.arrGrowth },
    { quarter: 5, topQuartile: 185, median: 115, bottomQuartile: 75, yourCompany: companyData.arrGrowth },
    { quarter: 6, topQuartile: 180, median: 110, bottomQuartile: 70, yourCompany: companyData.arrGrowth },
    { quarter: 7, topQuartile: 175, median: 105, bottomQuartile: 65, yourCompany: companyData.arrGrowth },
    { quarter: 8, topQuartile: 170, median: 100, bottomQuartile: 60, yourCompany: companyData.arrGrowth },
    { quarter: 9, topQuartile: 165, median: 95, bottomQuartile: 55, yourCompany: companyData.arrGrowth },
    { quarter: 10, topQuartile: 160, median: 90, bottomQuartile: 50, yourCompany: companyData.arrGrowth },
    { quarter: 11, topQuartile: 155, median: 85, bottomQuartile: 45, yourCompany: companyData.arrGrowth },
    { quarter: 12, topQuartile: 150, median: 80, bottomQuartile: 40, yourCompany: companyData.arrGrowth },
    { quarter: 13, topQuartile: 145, median: 75, bottomQuartile: 35, yourCompany: companyData.arrGrowth },
    { quarter: 14, topQuartile: 140, median: 70, bottomQuartile: 30, yourCompany: companyData.arrGrowth },
    { quarter: 15, topQuartile: 135, median: 65, bottomQuartile: 25, yourCompany: companyData.arrGrowth },
    { quarter: 16, topQuartile: 130, median: 60, bottomQuartile: 20, yourCompany: companyData.arrGrowth },
    { quarter: 17, topQuartile: 125, median: 55, bottomQuartile: 15, yourCompany: companyData.arrGrowth },
    { quarter: 18, topQuartile: 120, median: 50, bottomQuartile: 10, yourCompany: companyData.arrGrowth },
    { quarter: 19, topQuartile: 115, median: 45, bottomQuartile: 5, yourCompany: companyData.arrGrowth },
    { quarter: 20, topQuartile: 110, median: 40, bottomQuartile: 0, yourCompany: companyData.arrGrowth },
  ]

  return (
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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="quarter"
            label={{ value: "Quarters after $10M ARR", position: "insideBottom", offset: -5 }}
            tickFormatter={(value) => `Q${value}`}
          />
          <YAxis label={{ value: "YoY ARR Growth (%)", angle: -90, position: "insideLeft" }} domain={[0, 200]} />
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
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
