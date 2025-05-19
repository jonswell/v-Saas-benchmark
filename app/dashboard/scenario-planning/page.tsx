"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import ScenarioPlanningTool from "@/components/scenario-planning-tool"

export default function ScenarioPlanningPage() {
  const [companyData] = useState({
    arrScale: "$10M-$25M",
    arrGrowth: 80,
    netRetention: 110,
    fcfMargin: -20,
    magicNumber: 0.8,
    arrPerFte: 150000,
    salesMarketingPercent: 55,
    rdPercent: 30,
    gaPercent: 15,
    grossMargin: 75,
    burnMultiple: 1.5,
    newLogoPercent: 65,
    expansionPercent: 35,
    churnRate: 10,
    runway: 24,
    targetCustomer: "Mid-Market to Enterprise",
    growthMotion: "Sales-led Growth",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-xl">Scenario Planning</span>
            </Link>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/methodology" className="text-sm font-medium transition-colors hover:text-primary">
              Methodology
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Scenario Planning Tool</h1>
              <p className="text-muted-foreground mt-2">
                Model different growth scenarios and see how they impact your key metrics over time.
              </p>
            </div>

            <ScenarioPlanningTool initialData={companyData} />
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2023 SaaS Benchmarking Tool. All rights reserved. Based on ICONIQ Growth research.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
