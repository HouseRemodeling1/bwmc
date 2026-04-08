// app/marketplace/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  Share2, 
  MessageSquare,
  ArrowLeft,
  Briefcase,
  FileText,
  ShieldCheck
} from 'lucide-react'
import Link from 'next/link'
import { Business } from '@/types/business'

export default async function BusinessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: business, error } = await supabase
    .from('businesses_for_sale')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error || !business) {
    notFound()
  }

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return 'N/A'
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header / Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/marketplace" className="text-slate-500 hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-slate-500">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button variant="outline" size="sm" className="text-slate-500">
              Save Listing
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Placeholder */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
              <Image 
                src={business.images?.[0] || '/placeholder-business.jpg'} 
                alt={business.business_name}
                fill
                className="object-cover"
              />
              <div className="absolute top-6 left-6 flex gap-3">
                {business.verified && (
                  <Badge className="bg-green-500 text-white border-none px-4 py-1 flex gap-1.5 items-center backdrop-blur-md shadow-lg">
                    <ShieldCheck className="w-4 h-4" /> Verified Listing
                  </Badge>
                )}
                {business.listing_type === 'premium' && (
                  <Badge className="bg-primary text-white border-none px-4 py-1 shadow-lg">Premium</Badge>
                )}
              </div>
            </div>

            {/* Title Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-0.5 font-semibold">
                  {business.industry}
                </Badge>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4" /> {business.location}, {business.emirates}
                </div>
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{business.business_name}</h1>
              <p className="text-slate-500 text-lg leading-relaxed">{business.description.substring(0, 300)}...</p>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6">
                <TabsTrigger value="overview" className="rounded-lg font-bold px-6">Overview</TabsTrigger>
                <TabsTrigger value="financials" className="rounded-lg font-bold px-6">Financials</TabsTrigger>
                <TabsTrigger value="details" className="rounded-lg font-bold px-6">Business Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Description</h3>
                  <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {business.description}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Reason for Sale</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {business.reason_for_sale || "The owner has not provided a specific reason for sale."}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="financials">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                          <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Annual Revenue</p>
                          <p className="text-2xl font-black text-slate-800">{formatCurrency(business.annual_revenue)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Annual Profit</p>
                          <p className="text-2xl font-black text-slate-800">{formatCurrency(business.annual_profit)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Established</p>
                    <p className="font-bold text-slate-800">{business.established_year || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Employees</p>
                    <p className="font-bold text-slate-800">{business.employees_count || "0"}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Business Type</p>
                    <p className="font-bold text-slate-800">{business.business_type || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">License</p>
                    <p className="font-bold text-slate-800">{business.license_type || "N/A"}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden sticky top-8">
              <CardContent className="p-8">
                <div className="mb-6">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Asking Price</p>
                  <p className="text-4xl font-black text-primary">{formatCurrency(business.asking_price)}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">Verified by BWMC</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">Asset-sale listing</span>
                  </div>
                </div>

                <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-lg shadow-primary/20 mb-4">
                  <MessageSquare className="mr-2 h-5 w-5" /> Contact Seller
                </Button>
                
                <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  Secure Inquiry System with NDA
                </p>
              </CardContent>
            </Card>

            <div className="p-8 bg-slate-900 rounded-3xl text-white">
              <h4 className="font-black text-xl mb-4 text-primary">Investor Network</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Connect with professional business brokers at BWMC to help you with DD and valuation.
              </p>
              <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 rounded-xl h-12 font-bold">
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
