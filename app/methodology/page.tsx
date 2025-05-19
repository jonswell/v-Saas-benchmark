export default function Methodology() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">SaaS Benchmarking Tool</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </a>
            <a href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </a>
            <a href="/methodology" className="text-sm font-medium text-primary transition-colors">
              Methodology
            </a>
            <a href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Methodology</h1>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Overview & Data Sources</h2>
              <p>
                This analysis summarizes quarterly operating and financial data from 92 B2B SaaS companies. All views
                are aggregated or anonymized to protect the data privacy of individual companies.
              </p>
              <p>
                Using this proprietary dataset, we answer key questions on how these companies scale quickly and
                efficiently and explore what we believe to be early indicators and drivers of long-term success.
              </p>
              <p>
                Unless otherwise indicated, references to "SaaS companies" only reflect trends observed with the
                companies included in the dataset.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">The Companies Included</h2>
              <p>
                This study summarizes quarterly operating and financial data from 92 B2B SaaS companies. All ICONIQ
                Growth portfolio companies were included where data was available, and select public companies were
                included based on IPO performance criteria.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">By Sector</h3>
                  <ul className="mt-2 space-y-1">
                    <li>Infrastructure & Security: 24%</li>
                    <li>Back Office & Operations: 18%</li>
                    <li>Vertical SaaS: 18%</li>
                    <li>Collaboration & Workflow: 14%</li>
                    <li>Sales & Marketing: 11%</li>
                    <li>Data & Analytics: 10%</li>
                    <li>Enterprise Fintech: 5%</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">By Target Customer</h3>
                  <ul className="mt-2 space-y-1">
                    <li>Mid-Market to Enterprise: 75%</li>
                    <li>SMB to Mid-Market: 25%</li>
                  </ul>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">By Sales Motion</h3>
                  <ul className="mt-2 space-y-1">
                    <li>Hybrid: 51%</li>
                    <li>Inside Sales: 36%</li>
                    <li>Field Sales: 13%</li>
                    <li>Product-Led-Growth: 17% of companies have a significant PLG motion</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">By Location</h3>
                  <ul className="mt-2 space-y-1">
                    <li>Bay Area: 42%</li>
                    <li>North East: 26%</li>
                    <li>Other US: 26%</li>
                    <li>Non-US: 5%</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">The Analysis</h2>
              <p>
                Company performance against growth and efficiency metrics is highly dependent on scale. To compare
                performance across all companies in the dataset, we correct for company scale by visualizing data in the
                following ways:
              </p>
              <div className="space-y-2">
                <h3 className="font-medium">By Quarter after reaching a certain scale</h3>
                <p>
                  Many views in this study show average, median, and/or top quartile performance against a KPI by the
                  fiscal quarter after each company hit a certain scale, often $10M ARR.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">By ARR Scale</h3>
                <p>
                  Data is grouped by ARR ranges: &lt;$10M, $10M-$25M, $25M-$50M, $50M-$100M, $100M-$200M, $200M to IPO,
                  and Post-IPO.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">By Year Surrounding IPO</h3>
                <p>
                  Data is grouped by fiscal year relative to IPO: 1 year before IPO (FY-1), year of IPO (FY-0), and 1
                  year after IPO (FY+1).
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Resilience Framework</h2>
              <p>
                For context on how companies have performed against key metrics through recent market turbulence, we've
                identified a subset of B2B SaaS companies as particularly "resilient" based on an overall health score.
              </p>
              <p>
                "Resilient companies" are companies that achieved a top quartile health score based on performance
                against the following metrics between FY 2021 and year-to-date FY 2022:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Health Scale</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Weight in Health Score</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Healthy</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Less Healthy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm">Topline attainment</td>
                      <td className="px-4 py-2 text-sm">30%</td>
                      <td className="px-4 py-2 text-sm">&gt;90%</td>
                      <td className="px-4 py-2 text-sm">&lt;80%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Net new ARR</td>
                      <td className="px-4 py-2 text-sm">30%</td>
                      <td className="px-4 py-2 text-sm">&gt;40%</td>
                      <td className="px-4 py-2 text-sm">&lt;20%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">YoY ARR growth</td>
                      <td className="px-4 py-2 text-sm">15%</td>
                      <td className="px-4 py-2 text-sm">&gt;75%</td>
                      <td className="px-4 py-2 text-sm">&lt;30%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Runway</td>
                      <td className="px-4 py-2 text-sm">12.5%</td>
                      <td className="px-4 py-2 text-sm">&gt;2 years</td>
                      <td className="px-4 py-2 text-sm">&lt;1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Bottomline attainment</td>
                      <td className="px-4 py-2 text-sm">12.5%</td>
                      <td className="px-4 py-2 text-sm">&gt;90%</td>
                      <td className="px-4 py-2 text-sm">&lt;80%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2023 SaaS Benchmarking Tool. All rights reserved. Based on ICONIQ Growth research.
          </p>
          <div className="flex gap-4">
            <a href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </a>
            <a href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
