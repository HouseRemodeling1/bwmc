// app/investors/profile/page.tsx
import { InvestorProfileForm } from "@/components/investors/InvestorProfileForm"
import { Badge } from "@/components/ui/badge"

export default function InvestorProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <div className="bg-slate-900 py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 -mr-48 -mt-48" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 py-1 px-4 font-black uppercase tracking-widest">Investor Portal</Badge>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Create Your <br /><span className="text-primary">Investment Profile</span></h1>
          <p className="text-slate-400 text-lg font-medium">Define your investment thesis and criteria to see the most relevant deals in the UAE ecosystem.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <InvestorProfileForm />
      </div>
    </div>
  )
}
