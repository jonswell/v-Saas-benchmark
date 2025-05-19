"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ReferenceLine, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MagicNumberChartProps {
  companyData: {
    arrScale: string
    magicNumber: number
  }
}

export default function MagicNumberChart({ companyData }: MagicNumberChartProps) {
  // Data based on the PDF chart "Growth Efficiency | Go-to-market Efficiency"
  const data = [
    { quarter: 0, grossMagicNumber: 2.3, netMagicNumber: 1.8, yourCompany: companyData.magicNumber },
    { quarter: 1, grossMagicNumber: 2.2, netMagicNumber: 1.7, yourCompany: companyData.magicNumber },
    { quarter: 2, grossMagicNumber: 2.1, netMagicNumber: 1.6, yourCompany: companyData.magicNumber },
    { quarter: 3, grossMagicNumber: 2.0, netMagicNumber: 1.5, yourCompany: companyData.magicNumber },
    { quarter: 4, grossMagicNumber: 1.9, netMagicNumber: 1.4, yourCompany: companyData.magicNumber },
    { quarter: 5, grossMagicNumber: 1.8, netMagicNumber: 1.3, yourCompany: companyData.magicNumber },
    { quarter: 6, grossMagicNumber: 1.7, netMagicNumber: 1.2, yourCompany: companyData.magicNumber },
    { quarter: 7, grossMagicNumber: 1.6, netMagicNumber: 1.1, yourCompany: companyData.magicNumber },
    { quarter: 8, grossMagicNumber: 1.5, netMagicNumber: 1.0, yourCompany: companyData.magicNumber },
    { quarter: 9, grossMagicNumber: 1.4, netMagicNumber: 0.9, yourCompany: companyData.magicNumber },
    { quarter: 10, grossMagicNumber: 1.3, netMagicNumber: 0.8, yourCompany: companyData.magicNumber },
    { quarter: 11, grossMagicNumber: 1.2, netMagicNumber: 0.7, yourCompany: companyData.magicNumber },
    { quarter: 12, grossMagicNumber: 1.1, netMagicNumber: 0.6, yourCompany: companyData.magicNumber },
    { quarter: 13, grossMagicNumber: 1.0, netMagicNumber: 0.5, yourCompany: companyData.magicNumber },
    { quarter: 14, grossMagicNumber: 0.9, netMagicNumber: 0.4, yourCompany: companyData.magicNumber },
    { quarter: 15, grossMagicNumber: 0.8, netMagicNumber: 0.3, yourCompany: companyData.magicNumber },
    { quarter: 16, grossMagicNumber: 0.7, netMagicNumber: 0.2, yourCompany: companyData.magicNumber },
  ]

  return (
    <ChartContainer
      config={{
        grossMagicNumber: {
          label: "Gross Magic Number",
          color: "hsl(var(--chart-1))",
        },
        netMagicNumber: {
          label: "Net Magic Number",
          color: "hsl(var(--chart-2))",
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
          <YAxis label={{ value: "Magic Number", angle: -90, position: "insideLeft" }} domain={[0, 2.5]} />
          <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
          <Legend />
          <ReferenceLine y={1.0} stroke="#666" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="grossMagicNumber"
            stroke="var(--color-grossMagicNumber)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="netMagicNumber"
            stroke="var(--color-netMagicNumber)"
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
