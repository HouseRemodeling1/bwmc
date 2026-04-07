// app/startups/page.tsx
"use client"

import { useState, useEffect } from "react"
import { StartupCard } from "@/components/startups/StartupCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { INDUSTRIES, UAE_LOCATIONS, STARTUP_STAGES } from "@/lib/constants"
import { Startup } from "@/types/startup"
import { Search, Rocket, Filter, BarChart3, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function StartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedStage, setSelectedStage] = useState("All")

  useEffect(() => {
    fetchStartups()
  }, [])

  const fetchStartups = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedIndustry !== "All") params.append("industry", selectedIndustry)
      if (selectedStage !== "All") params.append("stage", selectedStage)
      
      const res = await fetch(`/api/startups?${params.toString()}`)
      const data = await res.json()
      setStartups(data)
    } catch (error) {
      console.error("Failed to fetch startups:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStartups = startups.filter(s => 
    s.startup_name.toLowerCase().includes(search.toLowerCase()) ||
    s.tagline?.toLowerCase().includes(search.toLowerCase()) ||
    s.pitch_summary?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dynamic Background Hero */}
      <div className="relative bg-slate-900 overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-left lg:w-1/2">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 py-1 px-4 font-black">STARTUP PORTAL</Badge>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                Discover the Next <br /> <span className="text-primary">UAE Unicorns</span>
              </h1>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-xl">
                Connect with high-potential startups across the UAE and GCC. Expert-vetted deals, transparent metrics, and direct founder access.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/startups/list-your-startup">
                  <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 font-black h-14 shadow-xl shadow-primary/20">
                    Submit Your Startup <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/investors/profile">
                  <Button size="lg" variant="outline" className="rounded-full border-slate-700 text-white hover:bg-slate-800 px-8 h-14 font-black">
                    Join as Investor
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/3 w-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <h4 className="font-black text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> Current Activity
              </h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    <span>Active Listings</span>
                    <span className="text-primary">84</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[70%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    <span>Funding Target</span>
                    <span className="text-primary">AED 120M</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[45%]" />
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-400">+12 Investors today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" /> Filter Deals
              </h3>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry</label>
                  <select 
                    className="w-full h-12 bg-slate-50 border-none rounded-2xl px-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                  >
                    <option value="All">All Sectors</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage</label>
                  <select 
                    className="w-full h-12 bg-slate-50 border-none rounded-2xl px-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                  >
                    <option value="All">All Stages</option>
                    {STARTUP_STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>

                <Button 
                  onClick={fetchStartups}
                  className="w-full h-12 bg-slate-900 hover:bg-slate-950 text-white font-black rounded-2xl shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5"
                >
                  Refresh Feed
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 text-white">
              <Rocket className="w-10 h-10 mb-4 opacity-80" />
              <h4 className="font-black text-xl mb-2">Accelerator?</h4>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                Connect your batch to our investor network. Automated reporting & bulk management.
              </p>
              <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 border-none text-white font-bold rounded-xl h-10">
                Partner with us
              </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-[450px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Search by name, industry or tagline..." 
                  className="pl-12 h-14 bg-white border-none shadow-sm rounded-2xl font-medium text-slate-700 placeholder:text-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                 <Badge variant="outline" className="rounded-full bg-white border-slate-200 px-4 py-1.5 font-bold text-slate-500 shadow-sm">
                   Most Viewed
                 </Badge>
                 <Badge variant="outline" className="rounded-full bg-white border-slate-200 px-4 py-1.5 font-bold text-slate-500 shadow-sm">
                   Recently Funded
                 </Badge>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-80 bg-slate-200 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : filteredStartups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredStartups.map(startup => (
                  <StartupCard key={startup.id} startup={startup} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-300">
                <div className="flex justify-center mb-6">
                   <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                     <Search className="w-10 h-10" />
                   </div>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">No matching deals</h3>
                <p className="text-slate-500 max-w-sm mx-auto">No startups match your current filters. Try broadening your criteria or search term.</p>
                <Button 
                   variant="link" 
                   className="mt-6 text-primary font-black text-lg"
                   onClick={() => {
                     setSelectedIndustry("All")
                     setSelectedStage("All")
                     setSearch("")
                     fetchStartups()
                   }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
