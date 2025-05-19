"use client"

import { useState } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

interface CompetitivePositioningMapProps {
  companyData: {
    arrScale: string
    arrGrowth: number
    netRetention: number
    fcfMargin: number
    magicNumber: number
    arrPerFte: number
    grossMargin: number
    burnMultiple: number
    targetCustomer: string
    growthMotion: string
  }
}

export default function CompetitivePositioningMap({ companyData }: CompetitivePositioningMapProps) {
  // Define the metrics available for X and Y axis
  const metrics = [
    { id: "arrGrowth", name: "ARR Growth", unit: "%", domain: [0, 200] },
    { id: "netRetention", name: "Net Retention", unit: "%", domain: [50, 150] },
    { id: "fcfMargin", name: "FCF Margin", unit: "%", domain: [-100, 50] },
    { id: "magicNumber", name: "Magic Number", unit: "x", domain: [0, 3] },
    { id: "arrPerFte", name: "ARR per FTE", unit: "K", domain: [0, 350], divider: 1000 },
    { id: "grossMargin", name: "Gross Margin", unit: "%", domain: [40, 100] },
    { id: "burnMultiple", name: "Burn Multiple", unit: "x", domain: [0, 5] },
  ]

  // State for selected metrics
  const [xMetric, setXMetric] = useState("arrGrowth")
  const [yMetric, setYMetric] = useState("fcfMargin")

  // Get the metric details
  const getMetricDetails = (id: string) => metrics.find((m) => m.id === id) || metrics[0]
  const xMetricDetails = getMetricDetails(xMetric)
  const yMetricDetails = getMetricDetails(yMetric)

  // Generate peer companies data based on the company's scale and growth motion
  const generatePeerCompanies = () => {
    // Define peer company archetypes based on user's company characteristics
    const archetypes = [
      // High-growth, low profitability
      {
        name: "High-Growth Focus",
        arrGrowth: companyData.arrGrowth * 1.3,
        netRetention: companyData.netRetention * 1.1,
        fcfMargin: companyData.fcfMargin - 15,
        magicNumber: companyData.magicNumber * 0.9,
        arrPerFte: companyData.arrPerFte * 0.85,
        grossMargin: companyData.grossMargin - 5,
        burnMultiple: companyData.burnMultiple * 1.3,
      },
      // Balanced approach
      {
        name: "Balanced Growth",
        arrGrowth: companyData.arrGrowth * 0.9,
        netRetention: companyData.netRetention * 1.05,
        fcfMargin: companyData.fcfMargin + 10,
        magicNumber: companyData.magicNumber * 1.1,
        arrPerFte: companyData.arrPerFte * 1.1,
        grossMargin: companyData.grossMargin + 3,
        burnMultiple: companyData.burnMultiple * 0.8,
      },
      // Efficiency focused
      {
        name: "Efficiency Focus",
        arrGrowth: companyData.arrGrowth * 0.7,
        netRetention: companyData.netRetention * 0.95,
        fcfMargin: companyData.fcfMargin + 25,
        magicNumber: companyData.magicNumber * 1.3,
        arrPerFte: companyData.arrPerFte * 1.3,
        grossMargin: companyData.grossMargin + 7,
        burnMultiple: companyData.burnMultiple * 0.6,
      },
      // Customer retention focus
      {
        name: "Retention Focus",
        arrGrowth: companyData.arrGrowth * 0.85,
        netRetention: companyData.netRetention * 1.2,
        fcfMargin: companyData.fcfMargin + 5,
        magicNumber: companyData.magicNumber * 1.15,
        arrPerFte: companyData.arrPerFte * 1.05,
        grossMargin: companyData.grossMargin + 2,
        burnMultiple: companyData.burnMultiple * 0.9,
      },
      // Similar to the company profile
      {
        name: "Similar Profile",
        arrGrowth: companyData.arrGrowth * (0.9 + Math.random() * 0.2),
        netRetention: companyData.netRetention * (0.95 + Math.random() * 0.1),
        fcfMargin: companyData.fcfMargin * (0.9 + Math.random() * 0.2),
        magicNumber: companyData.magicNumber * (0.9 + Math.random() * 0.2),
        arrPerFte: companyData.arrPerFte * (0.9 + Math.random() * 0.2),
        grossMargin: companyData.grossMargin * (0.95 + Math.random() * 0.1),
        burnMultiple: companyData.burnMultiple * (0.9 + Math.random() * 0.2),
      },
    ]

    // Generate peers based on archetypes with some randomization
    return archetypes.map((archetype, i) => {
      // Add randomization factor to make each peer unique
      const randFactor = 0.9 + Math.random() * 0.2

      // Handle the special case for FCF Margin which can be negative
      let fcfMargin = archetype.fcfMargin
      if (fcfMargin < 0) {
        fcfMargin *= randFactor
      } else {
        fcfMargin *= randFactor
      }

      return {
        name: `Peer ${i + 1} (${archetype.name})`,
        arrGrowth: Math.round(archetype.arrGrowth * randFactor),
        netRetention: Math.round(archetype.netRetention * randFactor),
        fcfMargin: Math.round(fcfMargin),
        magicNumber: Math.round(archetype.magicNumber * randFactor * 10) / 10,
        arrPerFte: Math.round(archetype.arrPerFte * randFactor),
        grossMargin: Math.round(archetype.grossMargin * randFactor),
        burnMultiple: Math.round(archetype.burnMultiple * randFactor * 10) / 10,
        z: 80, // Size of the dot for peers
      }
    })
  }

  // Prep chart data
  const peerCompanies = generatePeerCompanies()
  const chartData = [
    ...peerCompanies,
    {
      name: "Your Company",
      arrGrowth: companyData.arrGrowth,
      netRetention: companyData.netRetention,
      fcfMargin: companyData.fcfMargin,
      magicNumber: companyData.magicNumber,
      arrPerFte: companyData.arrPerFte,
      grossMargin: companyData.grossMargin,
      burnMultiple: companyData.burnMultiple,
      z: 120, // Larger size for your company
    },
  ]

  // Get coordinates for the Rule of 40 line (if growth vs. profitability is selected)
  const getRuleOf40Line = () => {
    if (xMetric === "arrGrowth" && yMetric === "fcfMargin") {
      return [
        { x: 0, y: 40 },
        { x: 40, y: 0 },
      ]
    }
    return []
  }

  // Function to format tooltip values based on the metric
  const formatMetricValue = (value: number, metricId: string) => {
    const metric = getMetricDetails(metricId)

    if (metric.id === "arrPerFte") {
      return `$${Math.round(value / 1000)}K`
    }

    if (metric.unit === "%" || metric.unit === "x") {
      return `${value}${metric.unit}`
    }

    return value
  }

  // Custom tooltip component to display company name and metric values
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 rounded-md shadow-md border border-gray-200 text-sm">
          <p className="font-medium">{data.name}</p>
          <p>{`${xMetricDetails.name}: ${formatMetricValue(data[xMetric], xMetric)}`}</p>
          <p>{`${yMetricDetails.name}: ${formatMetricValue(data[yMetric], yMetric)}`}</p>
        </div>
      )
    }
    return null
  }

  // Determine the appropriate quadrant descriptions based on metrics
  const getQuadrantDescriptions = () => {
    if (xMetric === "arrGrowth" && yMetric === "fcfMargin") {
      return {
        topRight: "High Growth & Profitable",
        topLeft: "Efficient but Slower Growth",
        bottomRight: "High Growth but Unprofitable",
        bottomLeft: "Challenged Position",
      }
    }

    if (xMetric === "arrGrowth" && yMetric === "netRetention") {
      return {
        topRight: "Strong Growth & Retention",
        topLeft: "Strong Retention, Lower Growth",
        bottomRight: "High Growth but Retention Issues",
        bottomLeft: "Challenging Position",
      }
    }

    if (xMetric === "magicNumber" && yMetric === "burnMultiple") {
      return {
        topRight: "Inefficient Capital Usage",
        topLeft: "Sales Efficient but Capital Inefficient",
        bottomRight: "Sales Inefficient but Capital Efficient",
        bottomLeft: "Capital & Sales Efficient",
      }
    }

    // Default descriptions
    return {
      topRight: "Leading Position",
      topLeft: "Strong in Y-axis",
      bottomRight: "Strong in X-axis",
      bottomLeft: "Lagging Position",
    }
  }

  const quadrantDescriptions = getQuadrantDescriptions()

  // Determine if a metric is better when higher or lower
  const isHigherBetter = (metricId: string) => {
    return metricId !== "burnMultiple" // Only burnMultiple is better when lower
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Competitive Positioning Map</CardTitle>
        <CardDescription>Compare your position relative to peer companies across different metrics</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">X-Axis Metric</label>
            <Select value={xMetric} onValueChange={setXMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Select X-Axis Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {metrics.map((metric) => (
                    <SelectItem key={`x-${metric.id}`} value={metric.id}>
                      {metric.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Y-Axis Metric</label>
            <Select value={yMetric} onValueChange={setYMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Select Y-Axis Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {metrics.map((metric) => (
                    <SelectItem key={`y-${metric.id}`} value={metric.id}>
                      {metric.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[450px]">
        <div className="relative h-full">
          <ChartContainer className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey={xMetric}
                  name={xMetricDetails.name}
                  domain={xMetricDetails.domain}
                  label={{
                    value: `${xMetricDetails.name} (${xMetricDetails.unit})`,
                    position: "bottom",
                    offset: 0,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey={yMetric}
                  name={yMetricDetails.name}
                  domain={yMetricDetails.domain}
                  label={{
                    value: `${yMetricDetails.name} (${yMetricDetails.unit})`,
                    angle: -90,
                    position: "left",
                  }}
                />
                <ZAxis type="number" dataKey="z" range={[60, 120]} />
                <Tooltip content={<CustomTooltip />} />
                <Scatter
                  name="Companies"
                  data={chartData}
                  fill="#8884d8"
                  fillOpacity={0.7}
                  strokeWidth={1}
                  stroke="#fff"
                />
              </ScatterChart>
            </ResponsiveContainer>

            {/* Add quadrant labels */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {quadrantDescriptions.topLeft}
            </div>
            <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {quadrantDescriptions.topRight}
            </div>
            <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 text-xs text-muted-foreground">
              {quadrantDescriptions.bottomLeft}
            </div>
            <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 text-xs text-muted-foreground">
              {quadrantDescriptions.bottomRight}
            </div>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          <p>
            The positioning map shows where your company stands relative to peer companies with similar characteristics.
          </p>
          <p className="mt-1">
            Each peer represents a different strategic focus: growth, efficiency, retention, or a balanced approach.
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
