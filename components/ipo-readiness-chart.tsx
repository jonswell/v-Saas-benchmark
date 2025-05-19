"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface IpoReadinessChartProps {
  companyData: {
    arrScale: string
    arrGrowth: number
    netRetention: number
    fcfMargin: number
    grossMargin: number
    magicNumber: number
    arrPerFte: number
    runway: number
  }
}

export default function IpoReadinessChart({ companyData }: IpoReadinessChartProps) {
  // Calculate IPO readiness scores (0-100) for each metric
  const getArrScaleScore = () => {
    switch (companyData.arrScale) {
      case "<$10M":
        return 10
      case "$10M-$25M":
        return 20
      case "$25M-$50M":
        return 40
      case "$50M-$100M":
        return 60
      case "$100M-$200M":
        return 80
      case "$200M+":
        return 100
      default:
        return 0
    }
  }

  const getArrGrowthScore = () => {
    if (companyData.arrGrowth >= 100) return 100
    if (companyData.arrGrowth >= 80) return 80
    if (companyData.arrGrowth >= 60) return 60
    if (companyData.arrGrowth >= 40) return 40
    if (companyData.arrGrowth >= 20) return 20
    return 0
  }

  const getNetRetentionScore = () => {
    if (companyData.netRetention >= 130) return 100
    if (companyData.netRetention >= 120) return 80
    if (companyData.netRetention >= 110) return 60
    if (companyData.netRetention >= 100) return 40
    if (companyData.netRetention >= 90) return 20
    return 0
  }

  const getFcfMarginScore = () => {
    if (companyData.fcfMargin >= 10) return 100
    if (companyData.fcfMargin >= 0) return 80
    if (companyData.fcfMargin >= -10) return 60
    if (companyData.fcfMargin >= -20) return 40
    if (companyData.fcfMargin >= -30) return 20
    return 0
  }

  const getGrossMarginScore = () => {
    if (companyData.grossMargin >= 80) return 100
    if (companyData.grossMargin >= 75) return 80
    if (companyData.grossMargin >= 70) return 60
    if (companyData.grossMargin >= 65) return 40
    if (companyData.grossMargin >= 60) return 20
    return 0
  }

  const getMagicNumberScore = () => {
    if (companyData.magicNumber >= 1.5) return 100
    if (companyData.magicNumber >= 1.2) return 80
    if (companyData.magicNumber >= 1.0) return 60
    if (companyData.magicNumber >= 0.8) return 40
    if (companyData.magicNumber >= 0.5) return 20
    return 0
  }

  const getArrPerFteScore = () => {
    if (companyData.arrPerFte >= 250000) return 100
    if (companyData.arrPerFte >= 200000) return 80
    if (companyData.arrPerFte >= 150000) return 60
    if (companyData.arrPerFte >= 100000) return 40
    if (companyData.arrPerFte >= 50000) return 20
    return 0
  }

  const getRunwayScore = () => {
    if (companyData.runway >= 36) return 100
    if (companyData.runway >= 24) return 80
    if (companyData.runway >= 18) return 60
    if (companyData.runway >= 12) return 40
    if (companyData.runway >= 6) return 20
    return 0
  }

  // Calculate overall IPO readiness score (weighted average)
  const calculateOverallScore = () => {
    const weights = {
      arrScale: 0.25,
      arrGrowth: 0.15,
      netRetention: 0.15,
      fcfMargin: 0.15,
      grossMargin: 0.1,
      magicNumber: 0.05,
      arrPerFte: 0.05,
      runway: 0.1,
    }

    return Math.round(
      getArrScaleScore() * weights.arrScale +
        getArrGrowthScore() * weights.arrGrowth +
        getNetRetentionScore() * weights.netRetention +
        getFcfMarginScore() * weights.fcfMargin +
        getGrossMarginScore() * weights.grossMargin +
        getMagicNumberScore() * weights.magicNumber +
        getArrPerFteScore() * weights.arrPerFte +
        getRunwayScore() * weights.runway,
    )
  }

  const overallScore = calculateOverallScore()

  // Data for the bar chart
  const barData = [
    { name: "ARR Scale", score: getArrScaleScore(), benchmark: 80 },
    { name: "ARR Growth", score: getArrGrowthScore(), benchmark: 80 },
    { name: "Net Retention", score: getNetRetentionScore(), benchmark: 80 },
    { name: "FCF Margin", score: getFcfMarginScore(), benchmark: 60 },
    { name: "Gross Margin", score: getGrossMarginScore(), benchmark: 80 },
    { name: "Magic Number", score: getMagicNumberScore(), benchmark: 60 },
    { name: "ARR per FTE", score: getArrPerFteScore(), benchmark: 60 },
    { name: "Runway", score: getRunwayScore(), benchmark: 80 },
  ]

  // Data for the radar chart
  const radarData = [
    { subject: "ARR Scale", A: getArrScaleScore(), B: 80, fullMark: 100 },
    { subject: "ARR Growth", A: getArrGrowthScore(), B: 80, fullMark: 100 },
    { subject: "Net Retention", A: getNetRetentionScore(), B: 80, fullMark: 100 },
    { subject: "FCF Margin", A: getFcfMarginScore(), B: 60, fullMark: 100 },
    { subject: "Gross Margin", A: getGrossMarginScore(), B: 80, fullMark: 100 },
    { subject: "Magic Number", A: getMagicNumberScore(), B: 60, fullMark: 100 },
    { subject: "ARR per FTE", A: getArrPerFteScore(), B: 60, fullMark: 100 },
    { subject: "Runway", A: getRunwayScore(), B: 80, fullMark: 100 },
  ]

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "hsl(var(--success))"
    if (score >= 60) return "hsl(var(--warning))"
    return "hsl(var(--destructive))"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-4">
          <div className="text-lg font-medium">IPO Readiness Score</div>
          <div className="text-6xl font-bold mt-2" style={{ color: getScoreColor(overallScore) }}>
            {overallScore}%
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {overallScore >= 80
              ? "IPO Ready"
              : overallScore >= 60
                ? "Getting Close"
                : overallScore >= 40
                  ? "On the Right Track"
                  : "Early Stage"}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Your Company"
              dataKey="A"
              stroke="hsl(var(--chart-4))"
              fill="hsl(var(--chart-4))"
              fillOpacity={0.6}
            />
            <Radar
              name="IPO Benchmark"
              dataKey="B"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <ChartContainer
        config={{
          score: {
            label: "Your Score",
            color: "hsl(var(--chart-4))",
          },
          benchmark: {
            label: "IPO Benchmark",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-full w-full"
      >
        <div className="font-medium mb-2">IPO Readiness by Metric</div>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={barData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 80,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="name" />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Bar dataKey="benchmark" fill="var(--color-benchmark)" />
            <Bar dataKey="score" fill="var(--color-score)">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
