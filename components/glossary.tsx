"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("")

  const glossaryItems = [
    {
      term: "Annual Recurring Revenue (ARR)",
      category: "Revenue",
      definition:
        "The annualized value of subscription revenue, calculated as Monthly Recurring Revenue (MRR) multiplied by 12.",
      formula: "ARR = MRR × 12",
      importance:
        "Primary metric for measuring the size and growth of a SaaS business. Provides a normalized view of revenue that eliminates seasonality and one-time payments.",
    },
    {
      term: "Net Dollar Retention (NDR)",
      category: "Retention",
      definition:
        "Measures the percentage of revenue retained from existing customers over a period, including expansions, contractions, and churn.",
      formula: "(Starting ARR + Expansions - Contractions - Churn) ÷ Starting ARR × 100",
      importance:
        "Indicates product-market fit and customer satisfaction. High NDR (>100%) means the company can grow even without acquiring new customers.",
    },
    {
      term: "Gross Dollar Retention (GDR)",
      category: "Retention",
      definition:
        "Measures the percentage of revenue retained from existing customers over a period, excluding expansions.",
      formula: "(Starting ARR - Contractions - Churn) ÷ Starting ARR × 100",
      importance:
        "Indicates the stickiness of the product and the base level of retention before upsells and cross-sells.",
    },
    {
      term: "Rule of 40",
      category: "Growth & Profitability",
      definition:
        "A principle that states a healthy SaaS company's combined growth rate and profit margin should exceed 40%.",
      formula: "YoY ARR Growth Rate (%) + FCF Margin (%)",
      importance: "Balances growth and profitability, providing a single metric to evaluate overall financial health.",
    },
    {
      term: "Magic Number",
      category: "Sales Efficiency",
      definition: "Measures the efficiency of sales and marketing spend in generating new ARR.",
      formula: "Net New ARR in Period ÷ S&M Spend in Prior Period",
      importance:
        "Indicates go-to-market efficiency. A magic number >1.0 generally indicates efficient customer acquisition.",
    },
    {
      term: "Burn Multiple",
      category: "Capital Efficiency",
      definition: "Measures how efficiently a company uses capital to generate growth.",
      formula: "Net Burn ÷ Net New ARR",
      importance: "Lower is better. Shows how much a company is burning to generate each dollar of new ARR.",
    },
    {
      term: "CAC Payback Period",
      category: "Sales Efficiency",
      definition:
        "The time it takes to recover the cost of acquiring a customer through gross margin-adjusted revenue.",
      formula: "CAC ÷ (ARPA × Gross Margin)",
      importance:
        "Indicates sales efficiency and time to ROI. Shorter payback periods (ideally <12 months) indicate more efficient customer acquisition.",
    },
    {
      term: "LTV/CAC Ratio",
      category: "Sales Efficiency",
      definition: "The ratio of customer lifetime value to customer acquisition cost.",
      formula: "LTV ÷ CAC",
      importance: "Measures the return on investment for acquiring customers. A ratio >3 is generally considered good.",
    },
    {
      term: "ARR per FTE",
      category: "Operational Efficiency",
      definition: "Annual recurring revenue divided by the number of full-time equivalent employees.",
      formula: "ARR ÷ Number of FTEs",
      importance:
        "Measures employee productivity and operational efficiency. Higher values indicate more efficient operations.",
    },
    {
      term: "Gross Margin",
      category: "Profitability",
      definition: "Revenue minus cost of goods sold (COGS), expressed as a percentage of revenue.",
      formula: "(Revenue - COGS) ÷ Revenue × 100",
      importance: "Indicates the efficiency of service delivery and the scalability of the business model.",
    },
    {
      term: "Free Cash Flow (FCF) Margin",
      category: "Profitability",
      definition: "Free cash flow as a percentage of revenue.",
      formula: "FCF ÷ Revenue × 100",
      importance: "Measures the company's ability to generate cash after accounting for capital expenditures.",
    },
    {
      term: "Runway",
      category: "Capital Efficiency",
      definition:
        "The amount of time a company can continue operating before running out of cash at the current burn rate.",
      formula: "Cash Balance ÷ Monthly Burn Rate",
      importance:
        "Indicates financial sustainability and the time available to reach profitability or raise additional capital.",
    },
    {
      term: "Expansion Revenue",
      category: "Revenue",
      definition:
        "Additional revenue generated from existing customers through upsells, cross-sells, or seat expansions.",
      formula: "Current Period Revenue from Existing Customers - Previous Period Revenue from Same Customers",
      importance:
        "Indicates product value and customer satisfaction. High expansion revenue suggests strong product-market fit.",
    },
    {
      term: "Churn Rate",
      category: "Retention",
      definition: "The percentage of customers or revenue lost over a period.",
      formula: "Lost Customers (or ARR) in Period ÷ Starting Customers (or ARR) × 100",
      importance:
        "Indicates customer satisfaction and product stickiness. Lower churn rates suggest stronger product-market fit.",
    },
    {
      term: "Customer Acquisition Cost (CAC)",
      category: "Sales Efficiency",
      definition: "The average cost to acquire a new customer.",
      formula: "S&M Spend in Period ÷ Number of New Customers Acquired in Period",
      importance:
        "Indicates the efficiency of go-to-market efforts. Lower CAC relative to customer value indicates more efficient acquisition.",
    },
  ]

  const filteredItems = glossaryItems.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const categories = Array.from(new Set(glossaryItems.map((item) => item.category)))

  return (
    <Card>
      <CardHeader>
        <CardTitle>SaaS Metrics Glossary</CardTitle>
        <CardDescription>Definitions and formulas for key SaaS benchmarking metrics</CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search metrics..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            {filteredItems.map((item) => (
              <div key={item.term} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{item.term}</h3>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">{item.category}</span>
                </div>
                <p className="text-sm mt-2">{item.definition}</p>
                {item.formula && (
                  <div className="mt-2 bg-muted p-2 rounded text-sm font-mono">
                    <strong>Formula:</strong> {item.formula}
                  </div>
                )}
                {item.importance && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    <strong>Why it matters:</strong> {item.importance}
                  </div>
                )}
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No metrics found matching your search.</div>
            )}
          </TabsContent>
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-4 space-y-4">
              {filteredItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div key={item.term} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.term}</h3>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">{item.category}</span>
                    </div>
                    <p className="text-sm mt-2">{item.definition}</p>
                    {item.formula && (
                      <div className="mt-2 bg-muted p-2 rounded text-sm font-mono">
                        <strong>Formula:</strong> {item.formula}
                      </div>
                    )}
                    {item.importance && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <strong>Why it matters:</strong> {item.importance}
                      </div>
                    )}
                  </div>
                ))}
              {filteredItems.filter((item) => item.category === category).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No metrics found matching your search.</div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
