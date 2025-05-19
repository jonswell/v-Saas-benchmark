"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

// Update the form to include more metrics from the PDF

interface CompanyInputFormProps {
  initialData: {
    arrScale: string
    arrGrowth: number
    netRetention: number
    fcfMargin: number
    magicNumber: number
    arrPerFte: number
    salesMarketingPercent: number
    rdPercent: number
    gaPercent: number
    // Add new fields
    grossMargin: number
    burnMultiple: number
    newLogoPercent: number
    expansionPercent: number
    churnRate: number
    runway: number
    targetCustomer: string
    growthMotion: string
  }
  onDataUpdate: (data: any) => void
}

export default function CompanyInputForm({ initialData, onDataUpdate }: CompanyInputFormProps) {
  const [formData, setFormData] = useState(initialData)

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onDataUpdate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="arr-scale">ARR Scale</Label>
        <Select value={formData.arrScale} onValueChange={(value) => handleChange("arrScale", value)}>
          <SelectTrigger id="arr-scale">
            <SelectValue placeholder="Select ARR Scale" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<$10M">&lt;$10M</SelectItem>
            <SelectItem value="$10M-$25M">$10M-$25M</SelectItem>
            <SelectItem value="$25M-$50M">$25M-$50M</SelectItem>
            <SelectItem value="$50M-$100M">$50M-$100M</SelectItem>
            <SelectItem value="$100M-$200M">$100M-$200M</SelectItem>
            <SelectItem value="$200M+">$200M+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="target-customer">Target Customer</Label>
        <Select value={formData.targetCustomer} onValueChange={(value) => handleChange("targetCustomer", value)}>
          <SelectTrigger id="target-customer">
            <SelectValue placeholder="Select Target Customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SMB to Mid-Market">SMB to Mid-Market</SelectItem>
            <SelectItem value="Mid-Market to Enterprise">Mid-Market to Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="growth-motion">Primary Growth Motion</Label>
        <Select value={formData.growthMotion} onValueChange={(value) => handleChange("growthMotion", value)}>
          <SelectTrigger id="growth-motion">
            <SelectValue placeholder="Select Growth Motion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sales-led Growth">Sales-led Growth</SelectItem>
            <SelectItem value="Product-led Growth">Product-led Growth</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="arr-growth">YoY ARR Growth (%)</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="arr-growth"
            min={0}
            max={200}
            step={1}
            value={[formData.arrGrowth]}
            onValueChange={(value) => handleChange("arrGrowth", value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={formData.arrGrowth}
            onChange={(e) => handleChange("arrGrowth", Number(e.target.value))}
            className="w-16"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="net-retention">Net $ Retention (%)</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="net-retention"
            min={50}
            max={150}
            step={1}
            value={[formData.netRetention]}
            onValueChange={(value) => handleChange("netRetention", value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={formData.netRetention}
            onChange={(e) => handleChange("netRetention", Number(e.target.value))}
            className="w-16"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gross-margin">Gross Margin (%)</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="gross-margin"
            min={40}
            max={90}
            step={1}
            value={[formData.grossMargin]}
            onValueChange={(value) => handleChange("grossMargin", value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={formData.grossMargin}
            onChange={(e) => handleChange("grossMargin", Number(e.target.value))}
            className="w-16"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fcf-margin">FCF Margin (%)</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="fcf-margin"
            min={-100}
            max={50}
            step={1}
            value={[formData.fcfMargin]}
            onValueChange={(value) => handleChange("fcfMargin", value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={formData.fcfMargin}
            onChange={(e) => handleChange("fcfMargin", Number(e.target.value))}
            className="w-16"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="magic-number">Net Magic Number</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="magic-number"
            min={0}
            max={3}
            step={0.1}
            value={[formData.magicNumber]}
            onValueChange={(value) => handleChange("magicNumber", value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={formData.magicNumber}
            onChange={(e) => handleChange("magicNumber", Number(e.target.value))}
            className="w-16"
            step={0.1}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="burn-multiple">Burn Multiple</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="burn-multiple"
            min={0}
            max={5}
            step={0.1}
            value={[formData.burnMultiple]}
            onValueChange={(value) => handleChange("burnMultiple", value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={formData.burnMultiple}
            onChange={(e) => handleChange("burnMultiple", Number(e.target.value))}
            className="w-16"
            step={0.1}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="arr-per-fte">ARR per FTE ($K)</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="arr-per-fte"
            min={50000}
            max={350000}
            step={5000}
            value={[formData.arrPerFte]}
            onValueChange={(value) => handleChange("arrPerFte", value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={formData.arrPerFte / 1000}
            onChange={(e) => handleChange("arrPerFte", Number(e.target.value) * 1000)}
            className="w-16"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="runway">Runway (months)</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="runway"
            min={3}
            max={48}
            step={1}
            value={[formData.runway]}
            onValueChange={(value) => handleChange("runway", value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={formData.runway}
            onChange={(e) => handleChange("runway", Number(e.target.value))}
            className="w-16"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>ARR Funnel Composition (%)</Label>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">New Logo</span>
              <span className="text-sm">{formData.newLogoPercent}%</span>
            </div>
            <Slider
              min={10}
              max={90}
              step={1}
              value={[formData.newLogoPercent]}
              onValueChange={(value) => {
                const newValue = value[0]
                handleChange("newLogoPercent", newValue)
                handleChange("expansionPercent", 100 - newValue)
              }}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Expansion</span>
              <span className="text-sm">{formData.expansionPercent}%</span>
            </div>
            <Slider
              min={10}
              max={90}
              step={1}
              value={[formData.expansionPercent]}
              onValueChange={(value) => {
                const newValue = value[0]
                handleChange("expansionPercent", newValue)
                handleChange("newLogoPercent", 100 - newValue)
              }}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Churn Rate</span>
              <span className="text-sm">{formData.churnRate}%</span>
            </div>
            <Slider
              min={0}
              max={30}
              step={1}
              value={[formData.churnRate]}
              onValueChange={(value) => handleChange("churnRate", value[0])}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Spend Distribution (%)</Label>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Sales & Marketing</span>
              <span className="text-sm">{formData.salesMarketingPercent}%</span>
            </div>
            <Slider
              min={10}
              max={80}
              step={1}
              value={[formData.salesMarketingPercent]}
              onValueChange={(value) => {
                const newValue = value[0]
                const remaining = 100 - newValue - formData.gaPercent
                handleChange("salesMarketingPercent", newValue)
                handleChange("rdPercent", remaining)
              }}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">R&D</span>
              <span className="text-sm">{formData.rdPercent}%</span>
            </div>
            <Slider
              min={10}
              max={80}
              step={1}
              value={[formData.rdPercent]}
              onValueChange={(value) => {
                const newValue = value[0]
                const remaining = 100 - newValue - formData.gaPercent
                handleChange("rdPercent", newValue)
                handleChange("salesMarketingPercent", remaining)
              }}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">G&A</span>
              <span className="text-sm">{formData.gaPercent}%</span>
            </div>
            <Slider
              min={5}
              max={30}
              step={1}
              value={[formData.gaPercent]}
              onValueChange={(value) => {
                const newValue = value[0]
                const remaining = 100 - newValue - formData.rdPercent
                handleChange("gaPercent", newValue)
                handleChange("salesMarketingPercent", remaining)
              }}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Update Results
      </Button>
    </form>
  )
}
