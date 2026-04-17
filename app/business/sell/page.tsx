import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { BusinessForm } from "@/components/business/BusinessForm"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Zap, Globe } from "lucide-react"

export default async function SellBusinessPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?next=/business/sell")
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header Section */}
      <div className="bg-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 py-1 px-4">Get Listed Today</Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            List Your Business <br /> <span className="text-primary">to Thousands of Buyers</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our platform connects you with verified local and international investors looking to acquire businesses in the UAE.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form Container */}
          <div className="lg:col-span-3">
            <BusinessForm />
          </div>

          {/* Side Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="font-black text-slate-800 mb-6 text-lg">Why sell with BWMC?</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Secure & Discreet</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Your business identity stays private until an NDA is signed.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex-shrink-0 flex items-center justify-center text-orange-600">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Fast Listing</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Complete your profile in 5 minutes and go live after review.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Global Reach</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Reach investors across the UAE, GCC, and Europe.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />
              <h4 className="font-black text-xl mb-4 text-sky-400 relative z-10">Need Valuation?</h4>
              <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed">
                Not sure how much to ask? Our consultants can provide a professional valuation of your business.
              </p>
              <button className="w-full py-3 bg-white text-slate-900 hover:bg-slate-100 transition-colors rounded-xl font-bold text-sm relative z-10">
                Contact Advisory Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
