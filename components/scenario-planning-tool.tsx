"use client"

import { useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Save } from "lucide-react"

interface ScenarioPlanningToolProps {
  initialData: {
    arrScale: string
    arrGrowth: number
    netRetention: number
    fcfMargin: number
    magicNumber: number
    arrPerFte: number
    grossMargin: number
    burnMultiple: number
    runway: number
  }
}

export default function ScenarioPlanningTool({ initialData }: ScenarioPlanningToolProps) {
  const [baselineData, setBaselineData] = useState(initialData)
  const [scenarioData, setScenarioData] = useState(initialData)
  const [scenarioName, setScenarioName] = useState("Growth Acceleration")

  // Calculate derived metrics
  const calculateRuleOf40 = (growth: number, fcfMargin: number) => growth + fcfMargin
  const calculateCacPayback = (magicNumber: number) => Math.round(12 / magicNumber)
  const calculateLtvCac = (netRetention: number, grossMargin: number) => {
    const retentionRate = netRetention / 100
    const margin = grossMargin / 100
    // Simplified LTV/CAC calculation
    return Math.round(((margin * retentionRate) / (1 - retentionRate)) * 10) / 10
  }

  // Generate projection data for 3 years
  const generateProjectionData = (data: typeof initialData) => {
    const projections = []
    let currentArr = Number.parseFloat(data.arrScale.replace(/[^0-9.-]+/g, "")) * 1000000 || 10000000

    for (let year = 0; year <= 3; year++) {
      const yearlyGrowth = data.arrGrowth / 100
      const yearlyBurn = currentArr * (data.fcfMargin < 0 ? Math.abs(data.fcfMargin) / 100 : 0)
      const newArr = year === 0 ? currentArr : currentArr * (1 + yearlyGrowth)

      projections.push({
        year,
        arr: Math.round(newArr / 1000000),
        burn: Math.round(yearlyBurn / 1000000),
        ruleOf40: calculateRuleOf40(data.arrGrowth, data.fcfMargin),
        netRetention: data.netRetention,
        runway: data.runway - year * 12 * (data.fcfMargin < 0 ? 1 : 0),
      })

      currentArr = newArr
    }

    return projections
  }

  const baselineProjections = generateProjectionData(baselineData)
  const scenarioProjections = generateProjectionData(scenarioData)

  // Combine projections for comparison
  const combinedProjections = baselineProjections.map((baseline, index) => {
    const scenario = scenarioProjections[index]
    return {
      year: baseline.year,
      baselineArr: baseline.arr,
      scenarioArr: scenario.arr,
      baselineBurn: baseline.burn,
      scenarioBurn: scenario.burn,
      baselineRuleOf40: baseline.ruleOf40,
      scenarioRuleOf40: scenario.ruleOf40,
      baselineRunway: baseline.runway,
      scenarioRunway: scenario.runway,
    }
  })

  const handleScenarioChange = (field: string, value: number) => {
    setScenarioData({ ...scenarioData, [field]: value })
  }

  const predefinedScenarios = [
    {
      name: "Growth Acceleration",
      arrGrowth: baselineData.arrGrowth + 20,
      fcfMargin: baselineData.fcfMargin - 10,
      netRetention: baselineData.netRetention + 5,
      magicNumber: baselineData.magicNumber - 0.2,
    },
    {
      name: "Efficiency Focus",
      arrGrowth: baselineData.arrGrowth - 10,
      fcfMargin: baselineData.fcfMargin + 15,
      netRetention: baselineData.netRetention,
      magicNumber: baselineData.magicNumber + 0.3,
    },
    {
      name: "Balanced Growth",
      arrGrowth: baselineData.arrGrowth + 10,
      fcfMargin: baselineData.fcfMargin + 5,
      netRetention: baselineData.netRetention + 3,
      magicNumber: baselineData.magicNumber + 0.1,
    },
  ]

  const applyScenario = (scenario: any) => {
    setScenarioName(scenario.name)
    setScenarioData({
      ...scenarioData,
      arrGrowth: scenario.arrGrowth,
      fcfMargin: scenario.fcfMargin,
      netRetention: scenario.netRetention,
      magicNumber: scenario.magicNumber,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Scenario Parameters</CardTitle>
            <CardDescription>Adjust metrics to model different scenarios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="arr-growth">ARR Growth (%)</Label>
                <span>{scenarioData.arrGrowth}%</span>
              </div>
              <Slider
                id="arr-growth"
                min={0}
                max={200}
                step={1}
                value={[scenarioData.arrGrowth]}
                onValueChange={(value) => handleScenarioChange("arrGrowth", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="fcf-margin">FCF Margin (%)</Label>
                <span>{scenarioData.fcfMargin}%</span>
              </div>
              <Slider
                id="fcf-margin"
                min={-100}
                max={50}
                step={1}
                value={[scenarioData.fcfMargin]}
                onValueChange={(value) => handleScenarioChange("fcfMargin", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="net-retention">Net Retention (%)</Label>
                <span>{scenarioData.netRetention}%</span>
              </div>
              <Slider
                id="net-retention"
                min={50}
                max={150}
                step={1}
                value={[scenarioData.netRetention]}
                onValueChange={(value) => handleScenarioChange("netRetention", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="magic-number">Magic Number</Label>
                <span>{scenarioData.magicNumber}x</span>
              </div>
              <Slider
                id="magic-number"
                min={0}
                max={3}
                step={0.1}
                value={[scenarioData.magicNumber]}
                onValueChange={(value) => handleScenarioChange("magicNumber", value[0])}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm font-medium mb-2">Predefined Scenarios</div>
            <div className="flex flex-col space-y-2 w-full">
              {predefinedScenarios.map((scenario) => (
                <Button
                  key={scenario.name}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => applyScenario(scenario)}
                >
                  {scenario.name}
                </Button>
              ))}
            </div>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>3-Year Projection: {scenarioName} vs. Baseline</CardTitle>
            <CardDescription>Projected ARR growth based on scenario parameters</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                baselineArr: {
                  label: "Baseline ARR ($M)",
                  color: "hsl(var(--chart-1))",
                },
                scenarioArr: {
                  label: `${scenarioName} ARR ($M)`,
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={combinedProjections}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "ARR ($M)", angle: -90, position: "insideLeft" }} />
                  <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
                  <Legend />
                  <Line type="monotone" dataKey="baselineArr" stroke="var(--color-baselineArr)" strokeWidth={2} />
                  <Line type="monotone" dataKey="scenarioArr" stroke="var(--color-scenarioArr)" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics Comparison</CardTitle>
            <CardDescription>Year 3 projected metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Baseline</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">ARR</div>
                      <div className="text-xl font-bold">${baselineProjections[3].arr}M</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">Rule of 40</div>
                      <div className="text-xl font-bold">{baselineProjections[3].ruleOf40}%</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">LTV/CAC</div>
                      <div className="text-xl font-bold">
                        {calculateLtvCac(baselineData.netRetention, baselineData.grossMargin)}x
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">CAC Payback</div>
                      <div className="text-xl font-bold">{calculateCacPayback(baselineData.magicNumber)} mo</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">{scenarioName}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">ARR</div>
                      <div className="text-xl font-bold">${scenarioProjections[3].arr}M</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">Rule of 40</div>
                      <div className="text-xl font-bold">{scenarioProjections[3].ruleOf40}%</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">LTV/CAC</div>
                      <div className="text-xl font-bold">
                        {calculateLtvCac(scenarioData.netRetention, scenarioData.grossMargin)}x
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">CAC Payback</div>
                      <div className="text-xl font-bold">{calculateCacPayback(scenarioData.magicNumber)} mo</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm font-medium mb-2">Impact Analysis</div>
                <div className="text-sm">
                  <p>
                    The {scenarioName} scenario would result in
                    <span className="font-medium"> ${scenarioProjections[3].arr - baselineProjections[3].arr}M </span>
                    {scenarioProjections[3].arr > baselineProjections[3].arr ? "higher" : "lower"} ARR after 3 years (
                    {Math.round((scenarioProjections[3].arr / baselineProjections[3].arr - 1) * 100)}%{" "}
                    {scenarioProjections[3].arr > baselineProjections[3].arr ? "increase" : "decrease"}).
                  </p>
                  <p className="mt-2">
                    This would require
                    <span className="font-medium">
                      {" "}
                      $
                      {Math.abs(
                        scenarioProjections.reduce((sum, p) => sum + p.burn, 0) -
                          baselineProjections.reduce((sum, p) => sum + p.burn, 0),
                      )}
                      M{" "}
                    </span>
                    {scenarioProjections.reduce((sum, p) => sum + p.burn, 0) >
                    baselineProjections.reduce((sum, p) => sum + p.burn, 0)
                      ? "additional"
                      : "less"}{" "}
                    burn over 3 years.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Strategic insights based on scenario analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scenarioData.arrGrowth > baselineData.arrGrowth && scenarioData.fcfMargin < baselineData.fcfMargin && (
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Growth Investment Strategy</div>
                  <p className="text-sm mt-1">
                    Investing in growth could yield significantly higher ARR, but ensure you have sufficient runway.
                    Consider raising additional capital if runway drops below 18 months.
                  </p>
                </div>
              )}

              {scenarioData.arrGrowth < baselineData.arrGrowth && scenarioData.fcfMargin > baselineData.fcfMargin && (
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Efficiency Optimization Strategy</div>
                  <p className="text-sm mt-1">
                    Focusing on efficiency will improve your Rule of 40 score and extend runway, but may limit long-term
                    growth potential. Consider balancing with targeted growth investments.
                  </p>
                </div>
              )}

              {scenarioData.netRetention > baselineData.netRetention && (
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Customer Success Focus</div>
                  <p className="text-sm mt-1">
                    Improving net retention from {baselineData.netRetention}% to {scenarioData.netRetention}% would
                    significantly improve LTV/CAC ratio and long-term growth sustainability.
                  </p>
                </div>
              )}

              {scenarioData.magicNumber > baselineData.magicNumber && (
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Sales Efficiency Improvement</div>
                  <p className="text-sm mt-1">
                    Improving your magic number from {baselineData.magicNumber}x to {scenarioData.magicNumber}x would
                    reduce CAC payback from {calculateCacPayback(baselineData.magicNumber)} to{" "}
                    {calculateCacPayback(scenarioData.magicNumber)} months.
                  </p>
                </div>
              )}

              <div className="rounded-lg border p-3">
                <div className="font-medium">Key Actions</div>
                <ul className="text-sm mt-1 space-y-1 list-disc pl-4">
                  <li>Review your growth vs. efficiency balance quarterly</li>
                  <li>Monitor burn multiple and adjust spending if exceeding 2.0x</li>
                  <li>Prioritize initiatives that improve net retention</li>
                  <li>Consider your position relative to fundraising windows</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save Scenario
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
