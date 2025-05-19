"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface ResilienceScoreCardProps {
  companyData: {
    arrScale: string
    arrGrowth: number
    netRetention: number
    fcfMargin: number
    grossMargin: number
    burnMultiple: number
    runway: number
    magicNumber: number
  }
}

export default function ResilienceScoreCard({ companyData }: ResilienceScoreCardProps) {
  // Calculate resilience scores (0-100) for each metric based on the PDF's resilience framework
  const getToplineAttainmentScore = () => {
    // Based on ARR growth relative to plan (assuming 90% is the target)
    return 90 // Placeholder since we don't have plan data
  }

  const getNetNewArrScore = () => {
    // Based on YoY ARR growth
    if (companyData.arrGrowth >= 40) return 100
    if (companyData.arrGrowth >= 30) return 75
    if (companyData.arrGrowth >= 20) return 50
    return 25
  }

  const getYoyArrGrowthScore = () => {
    if (companyData.arrGrowth >= 75) return 100
    if (companyData.arrGrowth >= 50) return 75
    if (companyData.arrGrowth >= 30) return 50
    return 25
  }

  const getRunwayScore = () => {
    if (companyData.runway >= 24) return 100
    if (companyData.runway >= 18) return 75
    if (companyData.runway >= 12) return 50
    return 25
  }

  const getBottomlineAttainmentScore = () => {
    // Based on FCF margin relative to plan (assuming 90% is the target)
    return 85 // Placeholder since we don't have plan data
  }

  const getBurnMultipleScore = () => {
    if (companyData.burnMultiple <= 1.0) return 100
    if (companyData.burnMultiple <= 1.5) return 75
    if (companyData.burnMultiple <= 2.0) return 50
    return 25
  }

  const getNetRetentionScore = () => {
    if (companyData.netRetention >= 125) return 100
    if (companyData.netRetention >= 110) return 75
    if (companyData.netRetention >= 100) return 50
    return 25
  }

  // Calculate overall resilience score (weighted average based on the PDF's framework)
  const calculateOverallScore = () => {
    const weights = {
      toplineAttainment: 0.3,
      netNewArr: 0.3,
      yoyArrGrowth: 0.15,
      runway: 0.125,
      bottomlineAttainment: 0.125,
    }

    return Math.round(
      getToplineAttainmentScore() * weights.toplineAttainment +
        getNetNewArrScore() * weights.netNewArr +
        getYoyArrGrowthScore() * weights.yoyArrGrowth +
        getRunwayScore() * weights.runway +
        getBottomlineAttainmentScore() * weights.bottomlineAttainment,
    )
  }

  const overallScore = calculateOverallScore()

  // Get resilience category
  const getResilienceCategory = (score: number) => {
    if (score >= 85) return { label: "Highly Resilient", color: "bg-green-500" }
    if (score >= 70) return { label: "Resilient", color: "bg-emerald-500" }
    if (score >= 55) return { label: "Moderately Resilient", color: "bg-yellow-500" }
    return { label: "Needs Improvement", color: "bg-red-500" }
  }

  const resilienceCategory = getResilienceCategory(overallScore)

  // Data for radar chart
  const radarData = [
    { subject: "Topline Attainment", A: getToplineAttainmentScore(), fullMark: 100 },
    { subject: "Net New ARR", A: getNetNewArrScore(), fullMark: 100 },
    { subject: "YoY ARR Growth", A: getYoyArrGrowthScore(), fullMark: 100 },
    { subject: "Runway", A: getRunwayScore(), fullMark: 100 },
    { subject: "Bottomline Attainment", A: getBottomlineAttainmentScore(), fullMark: 100 },
    { subject: "Burn Multiple", A: getBurnMultipleScore(), fullMark: 100 },
    { subject: "Net Retention", A: getNetRetentionScore(), fullMark: 100 },
  ]

  // Resilience characteristics based on the PDF
  const resilientCharacteristics = [
    {
      metric: "Topline Attainment",
      score: getToplineAttainmentScore(),
      target: ">90%",
      actual: "90%",
      description: "Consistently meeting or exceeding ARR targets",
    },
    {
      metric: "Net New ARR",
      score: getNetNewArrScore(),
      target: ">40%",
      actual: `${companyData.arrGrowth}%`,
      description: "Strong new ARR growth year over year",
    },
    {
      metric: "YoY ARR Growth",
      score: getYoyArrGrowthScore(),
      target: ">75%",
      actual: `${companyData.arrGrowth}%`,
      description: "Maintaining high growth rate relative to scale",
    },
    {
      metric: "Runway",
      score: getRunwayScore(),
      target: ">2 years",
      actual: `${companyData.runway} months`,
      description: "Sufficient cash to weather market fluctuations",
    },
    {
      metric: "Bottomline Attainment",
      score: getBottomlineAttainmentScore(),
      target: ">90%",
      actual: "85%",
      description: "Meeting or exceeding profitability targets",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Company Resilience Score</CardTitle>
          <CardDescription>Based on ICONIQ Growth's resilience framework</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className={`${resilienceCategory.color.replace("bg-", "text-")}`}
                  strokeWidth="10"
                  strokeDasharray={`${(overallScore / 100) * 251.2} 251.2`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">{overallScore}</div>
                <div className="text-xs text-gray-500">out of 100</div>
              </div>
            </div>

            <Badge className={`${resilienceCategory.color} text-white px-3 py-1`}>{resilienceCategory.label}</Badge>

            <div className="w-full mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Resilience" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resilience Characteristics</CardTitle>
          <CardDescription>Key metrics that define resilient SaaS companies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {resilientCharacteristics.map((item) => (
              <div key={item.metric} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <span className="text-sm text-gray-500">
                    Target: {item.target} | Actual: {item.actual}
                  </span>
                </div>
                <Progress value={item.score} className="h-2" />
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}

            <div className="rounded-lg border p-4 mt-6">
              <h3 className="font-medium mb-2">What Makes a Resilient Company?</h3>
              <p className="text-sm">
                Based on ICONIQ Growth's research, resilient SaaS companies demonstrate strong performance across five
                key metrics even during market turbulence. They maintain high growth rates while efficiently managing
                burn, resulting in extended runway and consistent performance against targets.
              </p>
              <div className="mt-4">
                <h4 className="text-sm font-medium">Resilient Companies:</h4>
                <ul className="text-sm mt-1 space-y-1 list-disc pl-4">
                  <li>Achieve top quartile health scores across key metrics</li>
                  <li>Maintain strong net dollar retention (125%+)</li>
                  <li>Have burn multiples under 1.5x</li>
                  <li>Maintain 24+ months of runway</li>
                  <li>Consistently meet or exceed both topline and bottomline targets</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
