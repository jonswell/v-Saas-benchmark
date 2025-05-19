"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ReferenceLine, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface RuleOf40ChartProps {
  companyData: {
    arrScale: string
    arrGrowth: number
    fcfMargin: number
  }
}

export default function RuleOf40Chart({ companyData }: RuleOf40ChartProps) {
  // Data based on the PDF chart "Growth Efficiency | Growth vs. Profitability"
  const getScaleIndex = () => {
    switch (companyData.arrScale) {
      case "<$10M":
        return 0
      case "$10M-$25M":
        return 1
      case "$25M-$50M":
        return 2
      case "$50M-$100M":
        return 3
      case "$100M-$200M":
        return 4
      case "$200M+":
        return 5
      default:
        return 1
    }
  }

  const scaleIndex = getScaleIndex()
  const yourCompanyValue = companyData.arrGrowth + companyData.fcfMargin

  const data = [
    {
      name: "<$10M",
      topQuartileGrowth: 180,
      topQuartileFCF: -40,
      medianGrowth: 120,
      medianFCF: -60,
      bottomQuartileGrowth: 80,
      bottomQuartileFCF: -80,
      yourCompanyGrowth: scaleIndex === 0 ? companyData.arrGrowth : 0,
      yourCompanyFCF: scaleIndex === 0 ? companyData.fcfMargin : 0,
    },
    {
      name: "$10M-$25M",
      topQuartileGrowth: 160,
      topQuartileFCF: -30,
      medianGrowth: 100,
      medianFCF: -50,
      bottomQuartileGrowth: 70,
      bottomQuartileFCF: -70,
      yourCompanyGrowth: scaleIndex === 1 ? companyData.arrGrowth : 0,
      yourCompanyFCF: scaleIndex === 1 ? companyData.fcfMargin : 0,
    },
    {
      name: "$25M-$50M",
      topQuartileGrowth: 140,
      topQuartileFCF: -20,
      medianGrowth: 90,
      medianFCF: -40,
      bottomQuartileGrowth: 60,
      bottomQuartileFCF: -60,
      yourCompanyGrowth: scaleIndex === 2 ? companyData.arrGrowth : 0,
      yourCompanyFCF: scaleIndex === 2 ? companyData.fcfMargin : 0,
    },
    {
      name: "$50M-$100M",
      topQuartileGrowth: 120,
      topQuartileFCF: -10,
      medianGrowth: 80,
      medianFCF: -30,
      bottomQuartileGrowth: 50,
      bottomQuartileFCF: -50,
      yourCompanyGrowth: scaleIndex === 3 ? companyData.arrGrowth : 0,
      yourCompanyFCF: scaleIndex === 3 ? companyData.fcfMargin : 0,
    },
    {
      name: "$100M-$200M",
      topQuartileGrowth: 100,
      topQuartileFCF: 0,
      medianGrowth: 70,
      medianFCF: -20,
      bottomQuartileGrowth: 40,
      bottomQuartileFCF: -40,
      yourCompanyGrowth: scaleIndex === 4 ? companyData.arrGrowth : 0,
      yourCompanyFCF: scaleIndex === 4 ? companyData.fcfMargin : 0,
    },
    {
      name: "$200M+",
      topQuartileGrowth: 80,
      topQuartileFCF: 10,
      medianGrowth: 60,
      medianFCF: -10,
      bottomQuartileGrowth: 30,
      bottomQuartileFCF: -30,
      yourCompanyGrowth: scaleIndex === 5 ? companyData.arrGrowth : 0,
      yourCompanyFCF: scaleIndex === 5 ? companyData.fcfMargin : 0,
    },
  ]

  // Calculate Rule of 40 for each category
  data.forEach((item) => {
    item.topQuartileRule40 = item.topQuartileGrowth + item.topQuartileFCF
    item.medianRule40 = item.medianGrowth + item.medianFCF
    item.bottomQuartileRule40 = item.bottomQuartileGrowth + item.bottomQuartileFCF
    item.yourCompanyRule40 = item.yourCompanyGrowth + item.yourCompanyFCF
  })

  return (
    <ChartContainer
      config={{
        topQuartileRule40: {
          label: "Top Quartile",
          color: "hsl(var(--chart-1))",
        },
        medianRule40: {
          label: "Median",
          color: "hsl(var(--chart-2))",
        },
        bottomQuartileRule40: {
          label: "Bottom Quartile",
          color: "hsl(var(--chart-3))",
        },
        yourCompanyRule40: {
          label: "Your Company",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
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
          <YAxis label={{ value: "Rule of 40 (%)", angle: -90, position: "insideLeft" }} domain={[0, 150]} />
          <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
          <Legend />
          <ReferenceLine y={40} stroke="#666" strokeDasharray="3 3" label="Rule of 40" />
          <Bar dataKey="topQuartileRule40" fill="var(--color-topQuartileRule40)" />
          <Bar dataKey="medianRule40" fill="var(--color-medianRule40)" />
          <Bar dataKey="bottomQuartileRule40" fill="var(--color-bottomQuartileRule40)" />
          <Bar dataKey="yourCompanyRule40" fill="var(--color-yourCompanyRule40)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
