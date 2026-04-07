// app/startups/list-your-startup/page.tsx
import { StartupForm } from "@/components/startups/StartupForm"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Rocket, Landmark } from "lucide-react"

export default function ListYourStartupPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Dynamic Header */}
      <div className="bg-slate-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 py-1 px-4 font-black tracking-widest uppercase">FOUNDER PORTAL</Badge>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            Take Your Startup <br /> <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">to the Global Stage</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Join the most elite network of founders and investors in the MENA region. Fundraise faster, smarter, and with complete transparency.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Form Area */}
          <div className="lg:col-span-3">
            <StartupForm />
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
               <h3 className="font-black text-slate-900 mb-8 text-xl">The Network Effect</h3>
               
               <div className="space-y-10">
                  <div className="flex gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary group hover:scale-110 transition-transform">
                        <Rocket className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-black text-slate-800 text-sm mb-1 uppercase tracking-wider">Fast-Track</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-bold">Skip the cold emails. Get direct access to angel investors.</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 group hover:scale-110 transition-transform">
                        <Landmark className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-black text-slate-800 text-sm mb-1 uppercase tracking-wider">DD Support</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-bold">Comprehensive data room support for smooth due diligence.</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-green-100 flex-shrink-0 flex items-center justify-center text-green-600 group hover:scale-110 transition-transform">
                        <ShieldCheck className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-black text-slate-800 text-sm mb-1 uppercase tracking-wider">Verified Only</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-bold">We only feature startups that have passed our 5-point verification.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/10 blur-3xl rounded-full -mb-20 -mr-20 group-hover:bg-primary/20 transition-all" />
               <h4 className="font-black text-2xl mb-6 text-primary relative z-10">Investor Pro?</h4>
               <p className="text-slate-400 text-sm mb-8 relative z-10 font-bold leading-relaxed">
                 Looking to manage multiple startups or an accelerator batch?
               </p>
               <button className="w-full py-4 bg-white text-slate-900 hover:bg-slate-100 transition-colors rounded-2xl font-black text-sm relative z-10 shadow-lg">
                 Learn more
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
