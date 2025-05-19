"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ArrPerFteChartProps {
  companyData: {
    arrScale: string
    arrPerFte: number
  }
}

export default function ArrPerFteChart({ companyData }: ArrPerFteChartProps) {
  // Data based on the PDF chart "Growth Efficiency | Headcount Productivity vs. Headcount Efficiency"
  const data = [
    { quarter: 0, topQuartile: 100000, median: 80000, bottomQuartile: 60000, yourCompany: companyData.arrPerFte },
    { quarter: 1, topQuartile: 110000, median: 85000, bottomQuartile: 65000, yourCompany: companyData.arrPerFte },
    { quarter: 2, topQuartile: 120000, median: 90000, bottomQuartile: 70000, yourCompany: companyData.arrPerFte },
    { quarter: 3, topQuartile: 130000, median: 95000, bottomQuartile: 75000, yourCompany: companyData.arrPerFte },
    { quarter: 4, topQuartile: 140000, median: 100000, bottomQuartile: 80000, yourCompany: companyData.arrPerFte },
    { quarter: 5, topQuartile: 150000, median: 105000, bottomQuartile: 85000, yourCompany: companyData.arrPerFte },
    { quarter: 6, topQuartile: 160000, median: 110000, bottomQuartile: 90000, yourCompany: companyData.arrPerFte },
    { quarter: 7, topQuartile: 170000, median: 115000, bottomQuartile: 95000, yourCompany: companyData.arrPerFte },
    { quarter: 8, topQuartile: 180000, median: 120000, bottomQuartile: 100000, yourCompany: companyData.arrPerFte },
    { quarter: 9, topQuartile: 190000, median: 125000, bottomQuartile: 105000, yourCompany: companyData.arrPerFte },
    { quarter: 10, topQuartile: 200000, median: 130000, bottomQuartile: 110000, yourCompany: companyData.arrPerFte },
    { quarter: 11, topQuartile: 210000, median: 135000, bottomQuartile: 115000, yourCompany: companyData.arrPerFte },
    { quarter: 12, topQuartile: 220000, median: 140000, bottomQuartile: 120000, yourCompany: companyData.arrPerFte },
    { quarter: 13, topQuartile: 230000, median: 145000, bottomQuartile: 125000, yourCompany: companyData.arrPerFte },
    { quarter: 14, topQuartile: 240000, median: 150000, bottomQuartile: 130000, yourCompany: companyData.arrPerFte },
    { quarter: 15, topQuartile: 250000, median: 155000, bottomQuartile: 135000, yourCompany: companyData.arrPerFte },
    { quarter: 16, topQuartile: 260000, median: 160000, bottomQuartile: 140000, yourCompany: companyData.arrPerFte },
    { quarter: 17, topQuartile: 270000, median: 165000, bottomQuartile: 145000, yourCompany: companyData.arrPerFte },
    { quarter: 18, topQuartile: 280000, median: 170000, bottomQuartile: 150000, yourCompany: companyData.arrPerFte },
    { quarter: 19, topQuartile: 290000, median: 175000, bottomQuartile: 155000, yourCompany: companyData.arrPerFte },
    { quarter: 20, topQuartile: 300000, median: 180000, bottomQuartile: 160000, yourCompany: companyData.arrPerFte },
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
          <YAxis
            label={{ value: "ARR per FTE ($)", angle: -90, position: "insideLeft" }}
            domain={[50000, 350000]}
            tickFormatter={(value) => `$${value / 1000}K`}
          />
          <ChartTooltip
            content={<ChartTooltipContent indicator="dashed" />}
            formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, ""]}
          />
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
