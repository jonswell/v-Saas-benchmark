"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CohortAnalysisChartProps {
  companyData: {
    arrScale: string
    netRetention: number
    churnRate: number
  }
}

export default function CohortAnalysisChart({ companyData }: CohortAnalysisChartProps) {
  // Calculate retention curve based on company data
  const calculateRetentionCurve = (baseRetention: number, periods: number) => {
    const retentionRate = baseRetention / 100
    const curve = []

    for (let i = 0; i <= periods; i++) {
      // Retention declines over time but at a decreasing rate
      const periodRetention = i === 0 ? 100 : Math.round(100 * Math.pow(retentionRate, Math.sqrt(i)))
      curve.push(periodRetention)
    }

    return curve
  }

  // Calculate expansion curve based on company data
  const calculateExpansionCurve = (baseRetention: number, periods: number) => {
    const expansionFactor = (baseRetention - 100) / 100
    const curve = []

    for (let i = 0; i <= periods; i++) {
      // Expansion starts at 100% and increases over time
      const periodExpansion = i === 0 ? 100 : Math.round(100 * (1 + expansionFactor * Math.log(i + 1)))
      curve.push(periodExpansion)
    }

    return curve
  }

  // Generate cohort data for retention curve
  const retentionCurve = calculateRetentionCurve(100 - companyData.churnRate, 12)
  const expansionCurve = calculateExpansionCurve(companyData.netRetention, 12)

  const cohortRetentionData = retentionCurve.map((value, index) => ({
    month: index,
    retention: value,
    benchmark: index === 0 ? 100 : Math.round(100 * Math.pow(0.95, Math.sqrt(index))),
  }))

  // Generate cohort data for net dollar retention
  const cohortNdrData = expansionCurve.map((value, index) => ({
    month: index,
    ndr: value,
    benchmark: index === 0 ? 100 : Math.round(100 * (1 + 0.1 * Math.log(index + 1))),
  }))

  // Generate LTV data based on retention and expansion
  const ltvData = []
  let cumulativeLtv = 0
  let benchmarkLtv = 0

  for (let i = 0; i <= 36; i++) {
    const monthlyRetention = i === 0 ? 1 : Math.pow((100 - companyData.churnRate) / 100, Math.sqrt(i))
    const monthlyExpansion = i === 0 ? 1 : 1 + (((companyData.netRetention - 100) / 100) * Math.log(i + 1)) / 12

    const monthlyValue = monthlyRetention * monthlyExpansion
    cumulativeLtv += monthlyValue

    const benchmarkRetention = i === 0 ? 1 : Math.pow(0.95, Math.sqrt(i))
    const benchmarkExpansion = i === 0 ? 1 : 1 + (0.1 * Math.log(i + 1)) / 12

    const benchmarkValue = benchmarkRetention * benchmarkExpansion
    benchmarkLtv += benchmarkValue

    ltvData.push({
      month: i,
      ltv: Math.round(cumulativeLtv * 100) / 100,
      benchmark: Math.round(benchmarkLtv * 100) / 100,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <ChartContainer
        config={{
          retention: {
            label: "Your Retention",
            color: "hsl(var(--chart-4))",
          },
          benchmark: {
            label: "Benchmark",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">Logo Retention by Cohort Month</div>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={cohortRetentionData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: "Months After Acquisition", position: "insideBottom", offset: -5 }}
            />
            <YAxis label={{ value: "Retention (%)", angle: -90, position: "insideLeft" }} domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Line type="monotone" dataKey="retention" stroke="var(--color-retention)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="benchmark" stroke="var(--color-benchmark)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer
        config={{
          ndr: {
            label: "Your NDR",
            color: "hsl(var(--chart-4))",
          },
          benchmark: {
            label: "Benchmark",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">Net Dollar Retention by Cohort Month</div>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={cohortNdrData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: "Months After Acquisition", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{ value: "Net Dollar Retention (%)", angle: -90, position: "insideLeft" }}
              domain={[0, 200]}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Line type="monotone" dataKey="ndr" stroke="var(--color-ndr)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="benchmark" stroke="var(--color-benchmark)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer
        config={{
          ltv: {
            label: "Your LTV",
            color: "hsl(var(--chart-4))",
          },
          benchmark: {
            label: "Benchmark",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-full w-full md:col-span-2"
      >
        <div className="font-medium mb-2">Customer Lifetime Value (Multiple of Initial ACV)</div>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={ltvData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: "Months", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "LTV Multiple", angle: -90, position: "insideLeft" }} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Area type="monotone" dataKey="ltv" stroke="var(--color-ltv)" fill="var(--color-ltv)" fillOpacity={0.3} />
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="var(--color-benchmark)"
              fill="var(--color-benchmark)"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
