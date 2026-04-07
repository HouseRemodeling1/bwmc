// components/marketplace/BusinessForm.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { INDUSTRIES, UAE_LOCATIONS, BUSINESS_TYPES } from "@/lib/constants"
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import FileUpload from "@/components/FileUpload"
import { useRouter } from "next/navigation"

const businessSchema = z.object({
  business_name: z.string().min(3, "Business name must be at least 3 characters"),
  industry: z.string().min(1, "Please select an industry"),
  location: z.string().min(1, "Please select a location"),
  asking_price: z.string().min(1, "Price is required"),
  annual_revenue: z.string().optional(),
  annual_profit: z.string().optional(),
  description: z.string().min(50, "Please provide at least 50 characters of description"),
  reason_for_sale: z.string().optional(),
  employees_count: z.string().optional(),
  established_year: z.string().optional(),
  images: z.array(z.string()).default([]),
})

type BusinessFormValues = z.infer<typeof businessSchema>

export function BusinessForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      images: [],
    }
  })

  const nextStep = async () => {
    const fields = step === 1 
      ? ["business_name", "industry", "location"] 
      : step === 2 
      ? ["asking_price", "annual_revenue", "annual_profit"]
      : ["description"]
    
    const isValid = await form.trigger(fields as any)
    if (isValid) setStep(prev => prev + 1)
  }

  const prevStep = () => setStep(prev => prev - 1)

  const onSubmit = async (values: BusinessFormValues) => {
    setLoading(true)
    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          asking_price: Number(values.asking_price),
          annual_revenue: values.annual_revenue ? Number(values.annual_revenue) : undefined,
          annual_profit: values.annual_profit ? Number(values.annual_profit) : undefined,
          employees_count: values.employees_count ? Number(values.employees_count) : undefined,
          established_year: values.established_year ? Number(values.established_year) : undefined,
        }),
      })
      
      if (!res.ok) throw new Error("Failed to create listing")
      
      const data = await res.json()
      router.push(`/marketplace/${data.slug}?success=true`)
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-12 px-4 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
            step >= i ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-white text-slate-300 border border-slate-100"
          }`}>
            {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
          </div>
        ))}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 && (
          <Card className="border-none shadow-xl bg-white rounded-3xl p-4">
            <CardContent className="pt-6 space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-800 mb-1 tracking-tight">Basic Information</h2>
                <p className="text-slate-500">Tell us what business you are selling.</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Business Name</Label>
                <Input {...form.register("business_name")} placeholder="e.g. Modern Cafe in Downtown Dubai" className="rounded-xl h-12" />
                {form.formState.errors.business_name && <p className="text-red-500 text-xs font-bold">{form.formState.errors.business_name.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Industry</Label>
                  <select {...form.register("industry")} className="w-full h-12 rounded-xl border border-slate-200 bg-white px-3 focus:ring-2 focus:ring-primary/20 transition-all">
                    <option value="">Select Industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  {form.formState.errors.industry && <p className="text-red-500 text-xs font-bold">{form.formState.errors.industry.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Location</Label>
                  <select {...form.register("location")} className="w-full h-12 rounded-xl border border-slate-200 bg-white px-3 focus:ring-2 focus:ring-primary/20 transition-all">
                    <option value="">Select Location</option>
                    {UAE_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {form.formState.errors.location && <p className="text-red-500 text-xs font-bold">{form.formState.errors.location.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-none shadow-xl bg-white rounded-3xl p-4">
            <CardContent className="pt-6 space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-800 mb-1 tracking-tight">Financial Details</h2>
                <p className="text-slate-500">How much is your business worth and its performance?</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Asking Price (AED)</Label>
                <Input type="number" {...form.register("asking_price")} placeholder="500,000" className="rounded-xl h-12" />
                {form.formState.errors.asking_price && <p className="text-red-500 text-xs font-bold">{form.formState.errors.asking_price.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Annual Revenue (AED)</Label>
                  <Input type="number" {...form.register("annual_revenue")} placeholder="1,200,000" className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Annual Profit (AED)</Label>
                  <Input type="number" {...form.register("annual_profit")} placeholder="250,000" className="rounded-xl h-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-none shadow-xl bg-white rounded-3xl p-4">
            <CardContent className="pt-6 space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-800 mb-1 tracking-tight">Business Description</h2>
                <p className="text-slate-500">Provide details about what includes and why you are selling.</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Description</Label>
                <textarea 
                  {...form.register("description")} 
                  rows={6}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Describe your business operations, assets, and value proposition..."
                />
                {form.formState.errors.description && <p className="text-red-500 text-xs font-bold">{form.formState.errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Reason for Sale</Label>
                <textarea 
                  {...form.register("reason_for_sale")} 
                  rows={3}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="e.g. Relocating, Retirement, New Project..."
                />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="border-none shadow-xl bg-white rounded-3xl p-4">
            <CardContent className="pt-6 space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-800 mb-1 tracking-tight">Media & Images</h2>
                <p className="text-slate-500">Upload photos of your business (at least 1).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUpload 
                  label="Primary Business Photo" 
                  onUpload={(url) => {
                    const current = form.getValues("images")
                    form.setValue("images", [url, ...current.slice(1)])
                  }} 
                />
                <FileUpload 
                  label="Interior Photo" 
                  onUpload={(url) => {
                    const current = form.getValues("images")
                    form.setValue("images", [...current, url])
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card className="border-none shadow-xl bg-white rounded-3xl p-4">
            <CardContent className="pt-6 space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-800 mb-1 tracking-tight">Review & Choose Plan</h2>
                <p className="text-slate-500">Select a listing plan that fits your needs.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border-2 border-slate-100 rounded-2xl p-6 text-center hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-black text-slate-800 mb-1">Standard</h3>
                  <p className="text-slate-400 text-sm mb-4 italic">Free for 30 days</p>
                  <ul className="text-xs text-slate-600 space-y-2 mb-6 text-left list-disc pl-4">
                    <li>3 Photos included</li>
                    <li>Standard placement</li>
                    <li>Basic Analytics</li>
                  </ul>
                  <Button variant="outline" className="w-full rounded-xl border-primary text-primary font-bold">Current Choice</Button>
                </div>
                
                <div className="border-2 border-primary/20 bg-primary/5 rounded-2xl p-6 text-center hover:border-primary transition-all cursor-pointer relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Popular</div>
                  <h3 className="font-black text-slate-800 mb-1">Featured</h3>
                  <p className="text-primary text-sm mb-4 font-bold">AED 500 / 90 days</p>
                  <ul className="text-xs text-slate-600 space-y-2 mb-6 text-left list-disc pl-4">
                    <li>Unlimited Photos</li>
                    <li>Top of Category placement</li>
                    <li>Verified Badge</li>
                    <li>Detailed Lead Analytics</li>
                  </ul>
                  <Button className="w-full rounded-xl bg-primary text-white font-bold">Select Plan</Button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-xs text-slate-500 leading-relaxed">
                  By clicking "Publish Listing", you agree to our Terms of Service and acknowledge that your business listing will be reviewed by BWMC admin before appearing public.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between items-center px-2 py-4">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={prevStep} className="text-slate-500 font-bold hover:bg-slate-100 rounded-xl px-6 h-12">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          ) : <div />}
          
          {step < 5 ? (
            <Button type="button" onClick={nextStep} className="bg-slate-900 hover:bg-slate-950 text-white font-bold rounded-xl px-8 h-12 shadow-lg shadow-slate-200">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white font-black text-lg rounded-xl px-12 h-14 shadow-xl shadow-primary/20"
            >
              {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Publish Listing"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
