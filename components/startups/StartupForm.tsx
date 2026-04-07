// components/startups/StartupForm.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { INDUSTRIES, UAE_LOCATIONS, STARTUP_STAGES } from "@/lib/constants"
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Plus, X, Rocket, ShieldCheck } from "lucide-react"
import FileUpload from "@/components/FileUpload"
import { useRouter } from "next/navigation"

const startupSchema = z.object({
  startup_name: z.string().min(2, "Startup name is required"),
  tagline: z.string().min(10, "Tagline should be descriptive"),
  industry: z.string().min(1, "Select industry"),
  stage: z.string().min(1, "Select stage"),
  location: z.string().min(1, "Select location"),
  pitch_summary: z.string().min(50, "At least 50 characters required"),
  problem_statement: z.string().min(50, "At least 50 characters required"),
  solution: z.string().min(50, "At least 50 characters required"),
  funding_ask: z.string().min(1, "Funding ask is required"),
  equity_offered: z.string().optional(),
  logo_url: z.string().optional(),
})

type StartupFormValues = z.infer<typeof startupSchema>

export function StartupForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [founders, setFounders] = useState([{ name: "", role: "", linkedin: "" }])
  const router = useRouter()
  
  const form = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      location: "Dubai",
    }
  })

  const addFounder = () => setFounders([...founders, { name: "", role: "", linkedin: "" }])
  const removeFounder = (idx: number) => setFounders(founders.filter((_, i) => i !== idx))

  const nextStep = async () => {
    const fields = step === 1 
      ? ["startup_name", "tagline", "industry", "stage", "location"] 
      : step === 2 
      ? ["pitch_summary", "problem_statement", "solution"]
      : ["funding_ask"]
    
    const isValid = await form.trigger(fields as any)
    if (isValid) setStep(prev => prev + 1)
  }

  const prevStep = () => setStep(prev => prev - 1)

  const onSubmit = async (values: StartupFormValues) => {
    setLoading(true)
    try {
      const cleanNum = (val?: string) => {
        if (!val) return undefined;
        const cleaned = val.replace(/[^0-9.]/g, '');
        return cleaned ? Number(cleaned) : undefined;
      }

      const res = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          funding_ask: cleanNum(values.funding_ask),
          equity_offered: cleanNum(values.equity_offered),
          founders,
        }),
      })
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${res.status}`);
      }
      
      const data = await res.json()
      router.push(`/startups/${data.slug}?success=true`)
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="flex justify-between items-center mb-16 px-6 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${
            step >= i ? "bg-primary text-white shadow-xl shadow-primary/30 scale-110" : "bg-white text-slate-300 border border-slate-100"
          }`}>
            {step > i ? <CheckCircle2 className="w-7 h-7" /> : i}
          </div>
        ))}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {step === 1 && (
          <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-6">
            <CardContent className="pt-8 space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Basic Profile</h2>
                <p className="text-slate-500 font-medium">Start with the essentials of your venture.</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/3">
                  <FileUpload 
                    label="Startup Logo" 
                    onUpload={(url) => form.setValue("logo_url", url)} 
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Startup Name</Label>
                    <Input {...form.register("startup_name")} placeholder="e.g. HealthTech AI" className="rounded-2xl h-14 border-slate-100 focus:ring-primary/10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tagline</Label>
                    <Input {...form.register("tagline")} placeholder="The future of healthcare diagnostics..." className="rounded-2xl h-14 border-slate-100 focus:ring-primary/10" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Industry</Label>
                  <select {...form.register("industry")} className="w-full h-14 rounded-2xl border-none bg-slate-50 px-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/10">
                    <option value="">Select Industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Stage</Label>
                  <select {...form.register("stage")} className="w-full h-14 rounded-2xl border-none bg-slate-50 px-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/10">
                    <option value="">Select Stage</option>
                    {STARTUP_STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Location</Label>
                  <select {...form.register("location")} className="w-full h-14 rounded-2xl border-none bg-slate-50 px-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/10">
                    {UAE_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-6">
            <CardContent className="pt-8 space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">The Pitch</h2>
                <p className="text-slate-500 font-medium">Define the core problem and your unique solution.</p>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">One Sentence Summary</Label>
                <textarea 
                  {...form.register("pitch_summary")} 
                  rows={2}
                  className="w-full rounded-[2rem] border-none bg-slate-50 p-6 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="How would you explain your startup to an investor in 20 seconds?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">The Problem</Label>
                  <textarea 
                    {...form.register("problem_statement")} 
                    rows={4}
                    className="w-full rounded-[2rem] border-none bg-slate-50 p-6 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none"
                    placeholder="What specific pain point are you solving?"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">The Solution</Label>
                  <textarea 
                    {...form.register("solution")} 
                    rows={4}
                    className="w-full rounded-[2rem] border-none bg-slate-50 p-6 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none"
                    placeholder="How does your product/service solve the problem beautifully?"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-6">
            <CardContent className="pt-8 space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">The Team</h2>
                <p className="text-slate-500 font-medium">Who are the visionary minds behind this startup?</p>
              </div>

              <div className="space-y-6">
                {founders.map((founder, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-[2rem] relative group border border-transparent hover:border-primary/10 transition-colors">
                    {founders.length > 1 && (
                      <button onClick={() => removeFounder(i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500">
                        <X className="w-5 h-5" />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</Label>
                        <Input 
                          value={founder.name} 
                          onChange={(e) => {
                            const newFounders = [...founders]
                            newFounders[i].name = e.target.value
                            setFounders(newFounders)
                          }}
                          className="h-12 rounded-xl bg-white border-none shadow-sm font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</Label>
                        <Input 
                          value={founder.role} 
                          onChange={(e) => {
                            const newFounders = [...founders]
                            newFounders[i].role = e.target.value
                            setFounders(newFounders)
                          }}
                          placeholder="e.g. CEO & Founder"
                          className="h-12 rounded-xl bg-white border-none shadow-sm font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LinkedIn URL</Label>
                        <Input 
                          value={founder.linkedin} 
                          onChange={(e) => {
                            const newFounders = [...founders]
                            newFounders[i].linkedin = e.target.value
                            setFounders(newFounders)
                          }}
                          className="h-12 rounded-xl bg-white border-none shadow-sm font-bold font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addFounder} className="w-full h-16 rounded-[1.5rem] border-dashed border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all font-bold">
                  <Plus className="mr-2 h-5 w-5" /> Add Founder
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-6">
            <CardContent className="pt-8 space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Traction & Numbers</h2>
                <p className="text-slate-500 font-medium">Show the growth and performance of your business.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-3">
                    <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Target Ask (AED)</Label>
                    <Input type="number" {...form.register("funding_ask")} placeholder="1,000,000" className="h-14 rounded-2xl bg-slate-50 border-none font-black text-slate-800" />
                 </div>
                 <div className="space-y-3">
                    <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Equity Offered (%)</Label>
                    <Input type="number" {...form.register("equity_offered")} placeholder="10" className="h-14 rounded-2xl bg-slate-50 border-none font-black text-slate-800" />
                 </div>
              </div>
              
              <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100">
                 <p className="text-sm font-black text-blue-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" /> Quick Metrics (Optional)
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                    <Input placeholder="Current Users" className="h-12 rounded-xl border-none shadow-sm" />
                    <Input placeholder="Monthly Revenue" className="h-12 rounded-xl border-none shadow-sm" />
                 </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-6">
            <CardContent className="pt-8 space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Upload Documents</h2>
                <p className="text-slate-500 font-medium">Provide materials for investor review (NDA required).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <FileUpload label="Pitch Deck (PDF)" onUpload={() => {}} />
                 <FileUpload label="Financial Projections" onUpload={() => {}} />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 6 && (
          <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-6">
            <CardContent className="pt-8 space-y-8 text-center">
              <div className="mb-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Ready to Impact?</h2>
                <p className="text-slate-500 max-w-md mx-auto font-medium">
                  Your profile is complete. Once published, you'll be able to see who's viewing your startup and manage investor connections.
                </p>
              </div>

              <div className="bg-slate-900 rounded-[2rem] p-10 text-white text-left">
                 <h4 className="font-black text-primary mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Verification Options
                 </h4>
                 <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                       <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                       <p className="text-sm font-medium">Verified badges increase connection rates by 3.5x.</p>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                       <p className="text-sm font-medium">Premium startups get featured on our monthly investor digest.</p>
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between items-center py-6">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={prevStep} className="text-slate-500 font-black hover:bg-slate-100 rounded-2xl px-10 h-16 transition-all">
              <ArrowLeft className="mr-3 h-5 w-5" /> Back
            </Button>
          ) : <div />}
          
          {step < 6 ? (
            <Button type="button" onClick={nextStep} className="bg-slate-900 hover:bg-slate-950 text-white font-black rounded-[1.5rem] px-12 h-16 shadow-2xl shadow-slate-300 transition-all hover:scale-105 active:scale-95">
              Next Step <ArrowRight className="ml-3 h-5 w-5 text-primary" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white font-black text-xl rounded-[1.5rem] px-16 h-20 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Publish Startup Profile"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

function BarChart3({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}
