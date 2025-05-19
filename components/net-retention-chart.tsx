"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ReferenceLine, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface NetRetentionChartProps {
  companyData: {
    arrScale: string
    netRetention: number
  }
}

export default function NetRetentionChart({ companyData }: NetRetentionChartProps) {
  // Data based on the PDF chart "Topline Health | ARR Retention"
  const data = [
    { quarter: 0, topQuartile: 130, median: 110, bottomQuartile: 90, yourCompany: companyData.netRetention },
    { quarter: 1, topQuartile: 132, median: 112, bottomQuartile: 92, yourCompany: companyData.netRetention },
    { quarter: 2, topQuartile: 134, median: 114, bottomQuartile: 94, yourCompany: companyData.netRetention },
    { quarter: 3, topQuartile: 136, median: 116, bottomQuartile: 96, yourCompany: companyData.netRetention },
    { quarter: 4, topQuartile: 138, median: 118, bottomQuartile: 98, yourCompany: companyData.netRetention },
    { quarter: 5, topQuartile: 136, median: 116, bottomQuartile: 96, yourCompany: companyData.netRetention },
    { quarter: 6, topQuartile: 134, median: 114, bottomQuartile: 94, yourCompany: companyData.netRetention },
    { quarter: 7, topQuartile: 132, median: 112, bottomQuartile: 92, yourCompany: companyData.netRetention },
    { quarter: 8, topQuartile: 130, median: 110, bottomQuartile: 90, yourCompany: companyData.netRetention },
    { quarter: 9, topQuartile: 128, median: 108, bottomQuartile: 88, yourCompany: companyData.netRetention },
    { quarter: 10, topQuartile: 126, median: 106, bottomQuartile: 86, yourCompany: companyData.netRetention },
    { quarter: 11, topQuartile: 124, median: 104, bottomQuartile: 84, yourCompany: companyData.netRetention },
    { quarter: 12, topQuartile: 122, median: 102, bottomQuartile: 82, yourCompany: companyData.netRetention },
    { quarter: 13, topQuartile: 120, median: 100, bottomQuartile: 80, yourCompany: companyData.netRetention },
    { quarter: 14, topQuartile: 122, median: 102, bottomQuartile: 82, yourCompany: companyData.netRetention },
    { quarter: 15, topQuartile: 124, median: 104, bottomQuartile: 84, yourCompany: companyData.netRetention },
    { quarter: 16, topQuartile: 126, median: 106, bottomQuartile: 86, yourCompany: companyData.netRetention },
    { quarter: 17, topQuartile: 128, median: 108, bottomQuartile: 88, yourCompany: companyData.netRetention },
    { quarter: 18, topQuartile: 130, median: 110, bottomQuartile: 90, yourCompany: companyData.netRetention },
    { quarter: 19, topQuartile: 128, median: 108, bottomQuartile: 88, yourCompany: companyData.netRetention },
    { quarter: 20, topQuartile: 126, median: 106, bottomQuartile: 86, yourCompany: companyData.netRetention },
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
          <YAxis label={{ value: "Net Dollar Retention (%)", angle: -90, position: "insideLeft" }} domain={[70, 150]} />
          <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
          <Legend />
          <ReferenceLine y={100} stroke="#666" strokeDasharray="3 3" />
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
