"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ValuationMultiplesChartProps {
  companyData: {
    arrScale: string
    arrGrowth: number
    fcfMargin: number
    netRetention: number
  }
}

export default function ValuationMultiplesChart({ companyData }: ValuationMultiplesChartProps) {
  // Safely get values with defaults to prevent null/undefined errors
  const arrScale = companyData?.arrScale || "$10M-$25M"
  const arrGrowth = typeof companyData?.arrGrowth === "number" ? companyData.arrGrowth : 0
  const fcfMargin = typeof companyData?.fcfMargin === "number" ? companyData.fcfMargin : 0

  // Data based on the PDF chart "Valuation Multiples by Growth Rate and Scale"
  const getMultipleByGrowthAndScale = (growth: number, scale: string) => {
    // Base multiple based on growth rate
    let multiple = 0

    if (growth < 30) multiple = 4
    else if (growth < 50) multiple = 8
    else if (growth < 75) multiple = 12
    else if (growth < 100) multiple = 16
    else if (growth < 125) multiple = 20
    else if (growth < 150) multiple = 24
    else multiple = 28

    // Adjust for scale
    if (scale === "<$10M") {
      multiple *= 0.7
    } else if (scale === "$10M-$25M") {
      multiple *= 0.8
    } else if (scale === "$25M-$50M") {
      multiple *= 0.9
    } else if (scale === "$50M-$100M") {
      multiple *= 1.0
    } else if (scale === "$100M-$200M") {
      multiple *= 1.1
    } else if (scale === "$200M+") {
      multiple *= 1.2
    } else {
      // Default case
      multiple *= 1.0
    }

    // Adjust for profitability (FCF margin)
    if (fcfMargin > 0) {
      multiple *= 1.2
    } else if (fcfMargin < -30) {
      multiple *= 0.8
    }

    return multiple
  }

  // Generate data for the growth vs. multiple line chart
  const growthMultipleData = []
  for (let growth = 20; growth <= 200; growth += 10) {
    const yourCompanyValue =
      growth === Math.round(arrGrowth / 10) * 10 ? getMultipleByGrowthAndScale(arrGrowth, arrScale) : null

    growthMultipleData.push({
      growth,
      multiple: getMultipleByGrowthAndScale(growth, arrScale),
      yourCompany: yourCompanyValue,
    })
  }

  return (
    <div className="grid grid-cols-1 gap-4 h-full">
      <ChartContainer
        config={{
          multiple: {
            label: "Revenue Multiple",
            color: "hsl(var(--chart-1))",
          },
          yourCompany: {
            label: "Your Company",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">Revenue Multiple by Growth Rate</div>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={growthMultipleData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="growth"
              label={{ value: "YoY ARR Growth (%)", position: "insideBottom", offset: -5 }}
              domain={[0, 200]}
            />
            <YAxis label={{ value: "Revenue Multiple", angle: -90, position: "insideLeft" }} domain={[0, 30]} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Line type="monotone" dataKey="multiple" stroke="var(--color-multiple)" strokeWidth={2} dot={false} />
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

      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-medium mb-4">Peer Comparison</h3>
        <p>
          Based on your growth rate of {arrGrowth}%, your company's estimated revenue multiple would be approximately{" "}
          <strong>{getMultipleByGrowthAndScale(arrGrowth, arrScale).toFixed(1)}x</strong>.
        </p>
        <p className="mt-2">
          Companies with similar growth rates typically have multiples ranging from{" "}
          <strong>{(getMultipleByGrowthAndScale(arrGrowth, arrScale) * 0.8).toFixed(1)}x</strong> to{" "}
          <strong>{(getMultipleByGrowthAndScale(arrGrowth, arrScale) * 1.2).toFixed(1)}x</strong> depending on other
          factors like net retention, gross margins, and market position.
        </p>
      </div>
    </div>
  )
}
