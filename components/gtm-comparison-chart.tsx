"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface GtmComparisonChartProps {
  companyData: {
    arrScale: string
    growthMotion: string
    magicNumber: number
  }
}

export default function GtmComparisonChart({ companyData }: GtmComparisonChartProps) {
  // Data based on the PDF chart "Growth Efficiency | Go-to-market Efficiency for PLG Companies"
  const getScaleData = () => {
    const salesLedData = {
      "<$10M": { grossMagicNumber: 2.3, netMagicNumber: 1.8 },
      "$10M-$25M": { grossMagicNumber: 1.5, netMagicNumber: 1.2 },
      "$25M-$50M": { grossMagicNumber: 1.5, netMagicNumber: 1.2 },
      "$50M-$100M": { grossMagicNumber: 1.5, netMagicNumber: 1.2 },
      "$100M-$200M": { grossMagicNumber: 1.2, netMagicNumber: 0.9 },
      "$200M+": { grossMagicNumber: 1.1, netMagicNumber: 0.8 },
    }

    const plgData = {
      "<$10M": { grossMagicNumber: 4.5, netMagicNumber: 3.5 },
      "$10M-$25M": { grossMagicNumber: 4.0, netMagicNumber: 3.0 },
      "$25M-$50M": { grossMagicNumber: 3.5, netMagicNumber: 2.5 },
      "$50M-$100M": { grossMagicNumber: 3.0, netMagicNumber: 2.0 },
      "$100M-$200M": { grossMagicNumber: 2.5, netMagicNumber: 1.5 },
      "$200M+": { grossMagicNumber: 2.0, netMagicNumber: 1.0 },
    }

    return {
      salesLed: salesLedData[companyData.arrScale as keyof typeof salesLedData] || salesLedData["$10M-$25M"],
      plg: plgData[companyData.arrScale as keyof typeof plgData] || plgData["$10M-$25M"],
    }
  }

  const scaleData = getScaleData()

  const data = [
    {
      name: "Gross Magic Number",
      salesLed: scaleData.salesLed.grossMagicNumber,
      plg: scaleData.plg.grossMagicNumber,
      yourCompany: companyData.magicNumber * 1.2, // Approximating gross from net
    },
    {
      name: "Net Magic Number",
      salesLed: scaleData.salesLed.netMagicNumber,
      plg: scaleData.plg.netMagicNumber,
      yourCompany: companyData.magicNumber,
    },
  ]

  // Data for OpEx distribution comparison
  const opexData = [
    {
      name: "Sales & Marketing",
      salesLed: 55,
      plg: 45,
    },
    {
      name: "R&D",
      salesLed: 30,
      plg: 40,
    },
    {
      name: "G&A",
      salesLed: 15,
      plg: 15,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <ChartContainer
        config={{
          salesLed: {
            label: "Sales-led Growth",
            color: "hsl(var(--chart-1))",
          },
          plg: {
            label: "Product-led Growth",
            color: "hsl(var(--chart-2))",
          },
          yourCompany: {
            label: "Your Company",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">Magic Number Comparison</div>
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
            <YAxis label={{ value: "Magic Number", angle: -90, position: "insideLeft" }} domain={[0, 5]} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Bar dataKey="salesLed" fill="var(--color-salesLed)" />
            <Bar dataKey="plg" fill="var(--color-plg)" />
            <Bar dataKey="yourCompany" fill="var(--color-yourCompany)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer
        config={{
          salesLed: {
            label: "Sales-led Growth",
            color: "hsl(var(--chart-1))",
          },
          plg: {
            label: "Product-led Growth",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">OpEx Distribution Comparison</div>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={opexData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: "Percentage (%)", angle: -90, position: "insideLeft" }} domain={[0, 60]} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Bar dataKey="salesLed" fill="var(--color-salesLed)" />
            <Bar dataKey="plg" fill="var(--color-plg)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
