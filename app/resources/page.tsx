import Link from "next/link"
import { ArrowLeft, BookOpen, Download, FileText, Lightbulb, PieChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Glossary from "@/components/glossary"

export default function Resources() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-xl">SaaS Benchmarking Tool</span>
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
            <Link href="/resources" className="text-sm font-medium text-primary transition-colors">
              Resources
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <div className="mx-auto max-w-5xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Resources & Learning</h1>
              <p className="text-muted-foreground mt-2">
                Explore our collection of resources to deepen your understanding of SaaS metrics and benchmarks.
              </p>
            </div>

            <Tabs defaultValue="glossary">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="glossary">Metrics Glossary</TabsTrigger>
                <TabsTrigger value="downloads">Downloads</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
              </TabsList>
              <TabsContent value="glossary" className="mt-6">
                <Glossary />
              </TabsContent>
              <TabsContent value="downloads" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>SaaS Metrics Spreadsheet Template</CardTitle>
                      <CardDescription>
                        Track and calculate your key SaaS metrics with our pre-built Excel template.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <FileText className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">Excel Template</p>
                          <p className="text-xs text-muted-foreground">2.4 MB • Updated May 2023</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Download Template
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>SaaS Benchmarking Report PDF</CardTitle>
                      <CardDescription>
                        The complete ICONIQ Growth SaaS benchmarking report with detailed insights.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <FileText className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">PDF Report</p>
                          <p className="text-xs text-muted-foreground">8.7 MB • 2023 Edition</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Download Report
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Investor Pitch Deck Template</CardTitle>
                      <CardDescription>
                        A template for presenting your metrics to investors with benchmark comparisons.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <PieChart className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">PowerPoint Template</p>
                          <p className="text-xs text-muted-foreground">5.1 MB • Updated June 2023</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Download Template
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Board Meeting Dashboard Template</CardTitle>
                      <CardDescription>
                        A ready-to-use dashboard template for presenting metrics to your board.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <PieChart className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">PowerPoint Template</p>
                          <p className="text-xs text-muted-foreground">4.3 MB • Updated July 2023</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Download Template
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="guides" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>The Complete Guide to SaaS Metrics</CardTitle>
                      <CardDescription>
                        A comprehensive guide to understanding and using SaaS metrics effectively.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <BookOpen className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">15 min read</p>
                          <p className="text-xs text-muted-foreground">Updated May 2023</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Read Guide</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Optimizing Your Rule of 40</CardTitle>
                      <CardDescription>
                        Strategies for balancing growth and profitability to improve your Rule of 40 score.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <BookOpen className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">12 min read</p>
                          <p className="text-xs text-muted-foreground">Updated June 2023</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Read Guide</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Improving Net Dollar Retention</CardTitle>
                      <CardDescription>
                        Practical strategies for increasing customer retention and expansion revenue.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <BookOpen className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">10 min read</p>
                          <p className="text-xs text-muted-foreground">Updated July 2023</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Read Guide</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Optimizing Sales Efficiency</CardTitle>
                      <CardDescription>
                        How to improve your magic number, CAC payback period, and other sales efficiency metrics.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <BookOpen className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">14 min read</p>
                          <p className="text-xs text-muted-foreground">Updated August 2023</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Read Guide</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="case-studies" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>How Company X Achieved 150% NDR</CardTitle>
                      <CardDescription>
                        A case study on how a B2B SaaS company improved their net dollar retention from 110% to 150%.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <Lightbulb className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">Case Study</p>
                          <p className="text-xs text-muted-foreground">8 min read</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Read Case Study</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Scaling from $10M to $100M ARR</CardTitle>
                      <CardDescription>
                        How a vertical SaaS company maintained 80%+ growth while improving efficiency metrics.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <Lightbulb className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">Case Study</p>
                          <p className="text-xs text-muted-foreground">12 min read</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Read Case Study</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Transitioning to Product-Led Growth</CardTitle>
                      <CardDescription>
                        How a sales-led SaaS company successfully implemented a PLG motion to accelerate growth.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <Lightbulb className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">Case Study</p>
                          <p className="text-xs text-muted-foreground">10 min read</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Read Case Study</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Achieving Rule of 40 at Scale</CardTitle>
                      <CardDescription>
                        How a $200M+ ARR company balanced growth and profitability to achieve a 70+ Rule of 40 score.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-muted p-2">
                          <Lightbulb className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm">Case Study</p>
                          <p className="text-xs text-muted-foreground">9 min read</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Read Case Study</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
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
