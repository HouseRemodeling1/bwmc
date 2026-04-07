// components/investors/InvestorProfileForm.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { INDUSTRIES, INVESTOR_TYPES, UAE_LOCATIONS } from "@/lib/constants"
import { Loader2, CheckCircle, Linkedin, Globe, MapPin, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"

const investorSchema = z.object({
  investor_name: z.string().min(2, "Name or Firm Name is required"),
  investor_type: z.string().min(1, "Select investor type"),
  bio: z.string().min(50, "Please provide a brief bio"),
  linkedin_url: z.string().url("Valid LinkedIn URL required").optional().or(z.literal("")),
  website_url: z.string().url("Valid Website URL required").optional().or(z.literal("")),
  location: z.string().min(1, "Select location"),
  ticket_size_min: z.string().optional(),
  ticket_size_max: z.string().optional(),
})

type InvestorFormValues = z.infer<typeof investorSchema>

export function InvestorProfileForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm<InvestorFormValues>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      location: "Dubai",
    }
  })

  const onSubmit = async (values: InvestorFormValues) => {
    setLoading(true)
    try {
      const cleanNum = (val?: string) => {
        if (!val) return undefined;
        const cleaned = val.replace(/[^0-9.]/g, '');
        return cleaned ? Number(cleaned) : undefined;
      }

      const res = await fetch("/api/investors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ticket_size_min: cleanNum(values.ticket_size_min),
          ticket_size_max: cleanNum(values.ticket_size_max),
          focus_industries: ["Technology"], // Default for now
          preferred_stages: ["seed"], // Default for now
        }),
      })
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${res.status}`);
      }
      
      router.push("/investors/dashboard?onboarding=success")
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Error saving profile.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-8">
          <CardContent className="pt-8 space-y-10">
             <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/3">
                   <div className="aspect-square bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group hover:border-primary/30 transition-colors cursor-pointer">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Briefcase className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">Upload Logo</span>
                   </div>
                </div>
                
                <div className="w-full md:w-2/3 space-y-6">
                   <div className="space-y-2">
                      <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Investor/Firm Name</Label>
                      <Input {...form.register("investor_name")} className="h-14 rounded-2xl bg-slate-50 border-none font-bold text-slate-800" placeholder="e.g. Blue Horizon Ventures" />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Investor Type</Label>
                        <select {...form.register("investor_type")} className="w-full h-14 bg-slate-50 rounded-2xl border-none px-4 font-bold text-slate-700 outline-none">
                           <option value="">Select Type</option>
                           {INVESTOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Primary Office Location</Label>
                        <select {...form.register("location")} className="w-full h-14 bg-slate-50 rounded-2xl border-none px-4 font-bold text-slate-700 outline-none">
                           {UAE_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                   </div>
                </div>
             </div>

             <div className="space-y-3">
                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Professional Bio</Label>
                <textarea 
                  {...form.register("bio")} 
                  rows={4}
                  className="w-full rounded-[2rem] border-none bg-slate-50 p-6 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none"
                  placeholder="Describe your investment thesis and experience..."
                />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                   <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Social Links</Label>
                   <div className="space-y-3">
                      <div className="relative">
                        <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <Input {...form.register("linkedin_url")} className="pl-12 h-12 rounded-xl bg-slate-50 border-none text-xs" placeholder="LinkedIn Profile" />
                      </div>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <Input {...form.register("website_url")} className="pl-12 h-12 rounded-xl bg-slate-50 border-none text-xs" placeholder="Website / Portfolio URL" />
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                   <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Ticket Size Range (AED)</Label>
                   <div className="grid grid-cols-2 gap-4">
                      <Input type="number" {...form.register("ticket_size_min")} placeholder="Min" className="h-12 rounded-xl bg-slate-50 border-none" />
                      <Input type="number" {...form.register("ticket_size_max")} placeholder="Max" className="h-12 rounded-xl bg-slate-50 border-none" />
                   </div>
                </div>
             </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white">
           <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                 <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                 <p className="font-black">Ready to Start?</p>
                 <p className="text-slate-400 text-xs font-bold">You can update your industries and stages later.</p>
              </div>
           </div>
           
           <Button 
            type="submit" 
            disabled={loading}
            className="rounded-2xl h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20"
           >
              {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Complete My Profile"}
           </Button>
        </div>
      </form>
    </div>
  )
}
