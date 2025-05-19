"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface HeadcountDistributionChartProps {
  companyData: {
    arrScale: string
    salesMarketingPercent: number
    rdPercent: number
    gaPercent: number
    growthMotion: string
  }
}

export default function HeadcountDistributionChart({ companyData }: HeadcountDistributionChartProps) {
  // Data based on the PDF chart "Spend Profile | Headcount Distribution"
  const getScaleData = () => {
    if (companyData.growthMotion === "Product-led Growth") {
      switch (companyData.arrScale) {
        case "<$10M":
          return { sm: 40, rd: 45, ga: 15 }
        case "$10M-$25M":
          return { sm: 42, rd: 43, ga: 15 }
        case "$25M-$50M":
          return { sm: 44, rd: 41, ga: 15 }
        case "$50M-$100M":
          return { sm: 46, rd: 39, ga: 15 }
        case "$100M-$200M":
          return { sm: 48, rd: 37, ga: 15 }
        case "$200M+":
          return { sm: 50, rd: 35, ga: 15 }
        default:
          return { sm: 44, rd: 41, ga: 15 }
      }
    } else {
      switch (companyData.arrScale) {
        case "<$10M":
          return { sm: 45, rd: 40, ga: 15 }
        case "$10M-$25M":
          return { sm: 48, rd: 37, ga: 15 }
        case "$25M-$50M":
          return { sm: 50, rd: 35, ga: 15 }
        case "$50M-$100M":
          return { sm: 52, rd: 33, ga: 15 }
        case "$100M-$200M":
          return { sm: 54, rd: 31, ga: 15 }
        case "$200M+":
          return { sm: 56, rd: 29, ga: 15 }
        default:
          return { sm: 50, rd: 35, ga: 15 }
      }
    }
  }

  const benchmarkData = getScaleData()

  const benchmarkPieData = [
    { name: "Sales & Marketing", value: benchmarkData.sm, color: "hsl(var(--chart-1))" },
    { name: "R&D", value: benchmarkData.rd, color: "hsl(var(--chart-2))" },
    { name: "G&A", value: benchmarkData.ga, color: "hsl(var(--chart-3))" },
  ]

  const companyPieData = [
    { name: "Sales & Marketing", value: companyData.salesMarketingPercent, color: "hsl(var(--chart-4))" },
    { name: "R&D", value: companyData.rdPercent, color: "hsl(var(--chart-5))" },
    { name: "G&A", value: companyData.gaPercent, color: "hsl(var(--chart-6))" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div>
        <div className="font-medium mb-2 text-center">Benchmark Headcount Distribution</div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={benchmarkPieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {benchmarkPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <div className="font-medium mb-2 text-center">Your Company Headcount Distribution</div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={companyPieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {companyPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
