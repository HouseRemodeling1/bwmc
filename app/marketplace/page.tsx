// app/marketplace/page.tsx
"use client"

import { useState, useEffect } from "react"
import { BusinessCard } from "@/components/marketplace/BusinessCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { INDUSTRIES, UAE_LOCATIONS } from "@/lib/constants"
import { Business } from "@/types/business"
import { createClient } from "@/lib/supabase/client"
import { Search, Filter, SlidersHorizontal, Plus, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function MarketplacePage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [user, setUser] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchBusinesses()
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchBusinesses = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedIndustry !== "All") params.append("industry", selectedIndustry)
      if (selectedLocation !== "All") params.append("location", selectedLocation)
      
      const res = await fetch(`/api/businesses?${params.toString()}`)
      const data = await res.json()
      setBusinesses(data)
    } catch (error) {
      console.error("Failed to fetch businesses:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredBusinesses = businesses.filter(b => 
    b.industry.toLowerCase().includes(search.toLowerCase()) ||
    b.location.toLowerCase().includes(search.toLowerCase()) ||
    b.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 py-1 px-4">Business Marketplace</Badge>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Buy and Sell Businesses in the UAE
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            The UAE's most trusted marketplace for business acquisition. Connect with verified sellers across all industries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user && (
              <Link href="/marketplace/my-listings">
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-8 h-12 rounded-full font-bold">
                  <LayoutDashboard className="mr-2 h-5 w-5" /> My Listings
                </Button>
              </Link>
            )}
            <Link href="/marketplace/sell">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-full font-bold shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-5 w-5" /> Sell Your Business
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" /> Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Industry</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                  >
                    <option value="All">All Industries</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Location</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="All">All Locations</option>
                    {UAE_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <Button 
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold"
                  onClick={fetchBusinesses}
                >
                  Apply Filters
                </Button>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl border border-primary/10">
              <h4 className="font-bold text-slate-800 mb-2">Want to sell fast?</h4>
              <p className="text-sm text-slate-600 mb-4">Promote your business to reach over 10,000 potential buyers in the UAE.</p>
              <Link href="/pricing">
                <Button size="sm" variant="link" className="p-0 text-primary font-bold">Learn about Premium Listings →</Button>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search businesses..." 
                  className="pl-10 h-11 bg-white border-slate-200 shadow-sm rounded-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Showing {filteredBusinesses.length} results</span>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filteredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBusinesses.map(business => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <div className="flex justify-center mb-4 text-slate-300">
                  <Search className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No businesses found</h3>
                <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
                <Button 
                  variant="link" 
                  className="mt-4 text-primary font-bold"
                  onClick={() => {
                    setSelectedIndustry("All")
                    setSelectedLocation("All")
                    setSearch("")
                    fetchBusinesses()
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
