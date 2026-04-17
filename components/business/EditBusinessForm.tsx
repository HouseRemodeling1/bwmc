'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { INDUSTRIES, UAE_LOCATIONS } from '@/lib/constants'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Business } from '@/types/business'

export function EditBusinessForm({ business }: { business: Business }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    business_name: business.business_name || '',
    industry: business.industry || '',
    location: business.location || '',
    asking_price: business.asking_price?.toString() || '',
    annual_revenue: business.annual_revenue?.toString() || '',
    annual_profit: business.annual_profit?.toString() || '',
    employees_count: business.employees_count?.toString() || '',
    established_year: business.established_year?.toString() || '',
    description: business.description || '',
    reason_for_sale: business.reason_for_sale || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/businesses/${business.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          asking_price: Number(form.asking_price) || 0,
          annual_revenue: Number(form.annual_revenue) || undefined,
          annual_profit: Number(form.annual_profit) || undefined,
          employees_count: Number(form.employees_count) || undefined,
          established_year: Number(form.established_year) || undefined,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Update failed')
      }

      router.push(`/business/${business.slug}`)
      router.refresh()
    } catch (error: any) {
      alert(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-7 h-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-black">1</span>
          Basic Information
        </h2>
        <div className="space-y-5">
          <div>
            <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Business Name</Label>
            <Input
              name="business_name"
              value={form.business_name}
              onChange={handleChange}
              className="h-12 rounded-xl"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Industry</Label>
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Location</Label>
              <select
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {UAE_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Financials */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-7 h-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-black">2</span>
          Financial Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Asking Price (AED)</Label>
            <Input name="asking_price" type="number" value={form.asking_price} onChange={handleChange} className="h-12 rounded-xl" required />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Annual Revenue (AED)</Label>
            <Input name="annual_revenue" type="number" value={form.annual_revenue} onChange={handleChange} className="h-12 rounded-xl" />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Annual Profit (AED)</Label>
            <Input name="annual_profit" type="number" value={form.annual_profit} onChange={handleChange} className="h-12 rounded-xl" />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Number of Employees</Label>
            <Input name="employees_count" type="number" value={form.employees_count} onChange={handleChange} className="h-12 rounded-xl" />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Year Established</Label>
            <Input name="established_year" type="number" value={form.established_year} onChange={handleChange} placeholder="e.g. 2018" className="h-12 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-7 h-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-black">3</span>
          Description
        </h2>
        <div className="space-y-5">
          <div>
            <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Business Description</Label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
              required
            />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-700 mb-1.5 block">Reason for Sale</Label>
            <textarea
              name="reason_for_sale"
              value={form.reason_for_sale}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
              placeholder="e.g. Relocating, Retirement..."
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Link href={`/business/${business.slug}`}>
          <Button type="button" variant="ghost" className="gap-2 text-slate-500">
            <ArrowLeft className="w-4 h-4" /> Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-white font-black px-10 h-13 rounded-xl gap-2 shadow-lg shadow-primary/20"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Changes
        </Button>
      </div>
    </form>
  )
}
