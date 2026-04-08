// app/startups/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Rocket, 
  MapPin, 
  Users, 
  Target, 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  Linkedin,
  Video,
  FileText,
  DollarSign,
  TrendingUp,
  PieChart,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { Startup } from '@/types/startup'

export default async function StartupDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: startup, error } = await supabase
    .from('startups')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error || !startup) {
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

  const getStageLabel = (stage: string) => {
    return stage.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-slate-900 pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center p-6 border border-white/10 shrink-0">
               {startup.logo_url ? (
                 <Image src={startup.logo_url} alt={startup.startup_name} fill className="object-contain p-4" />
               ) : (
                 <Rocket className="w-16 h-16 text-primary" />
               )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[10px] font-black tracking-widest">
                  {startup.industry}
                </Badge>
                <Badge variant="outline" className="text-white border-white/20 uppercase text-[10px] font-black tracking-widest">
                  {getStageLabel(startup.stage)}
                </Badge>
                {startup.verified_badge && (
                   <Badge className="bg-green-500 text-white border-none py-1.5 flex gap-1.5 items-center">
                    <ShieldCheck className="w-4 h-4" /> Verified
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">{startup.startup_name}</h1>
              <p className="text-slate-400 text-xl font-medium mb-6 italic max-w-2xl">"{startup.tagline}"</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> <span className="text-sm font-bold">{startup.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" /> 
                  <a href={startup.website_url} target="_blank" className="text-sm font-bold hover:text-white transition-colors">Visit Website</a>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> <span className="text-sm font-bold">Est. {startup.founded_year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
             <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-slate-200/50 p-1.5 rounded-2xl mb-10 w-full md:w-auto h-auto grid grid-cols-2 md:inline-flex">
                  <TabsTrigger value="overview" className="rounded-xl px-8 py-3 font-black text-xs uppercase tracking-widest">Overview</TabsTrigger>
                  <TabsTrigger value="team" className="rounded-xl px-8 py-3 font-black text-xs uppercase tracking-widest">Team</TabsTrigger>
                  <TabsTrigger value="traction" className="rounded-xl px-8 py-3 font-black text-xs uppercase tracking-widest">Traction</TabsTrigger>
                  <TabsTrigger value="financials" className="rounded-xl px-8 py-3 font-black text-xs uppercase tracking-widest">Investment</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-10">
                  <section>
                    <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary" /> The Mission
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h4 className="font-black text-primary uppercase text-xs tracking-widest mb-4">The Problem</h4>
                        <p className="text-slate-600 leading-relaxed font-medium">{startup.problem_statement}</p>
                      </div>
                      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h4 className="font-black text-blue-600 uppercase text-xs tracking-widest mb-4">The Solution</h4>
                        <p className="text-slate-600 leading-relaxed font-medium">{startup.solution}</p>
                      </div>
                    </div>
                  </section>

                  <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl opacity-50 rounded-full -mr-32 -mt-32" />
                    <h2 className="text-2xl font-black mb-6 relative z-10 flex items-center gap-2">
                      <Video className="w-6 h-6 text-primary" /> Pitch Deck & Demo
                    </h2>
                    <div className="aspect-video bg-slate-800 rounded-3xl overflow-hidden relative z-10 flex items-center justify-center border border-white/10 group cursor-pointer">
                      {startup.pitch_video_url ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                             <TrendingUp className="w-8 h-8 rotate-90" />
                          </div>
                          <p className="font-black">Watch Video Pitch</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <FileText className="w-16 h-16 text-slate-700 mb-4" />
                          <p className="font-bold text-slate-500">Sign NDA to view Pitch Deck</p>
                        </div>
                      )}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="team">
                  <h2 className="text-2xl font-black text-slate-800 mb-8">Founding Team</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {startup.founders?.map((founder: any, idx: number) => (
                       <Card key={idx} className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
                         <CardContent className="p-8">
                            <div className="flex items-center gap-6 mb-4">
                               <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden relative shrink-0">
                                 {founder.image ? <Image src={founder.image} alt={founder.name} fill className="object-cover" /> : <Users className="w-10 h-10 m-5 text-slate-300" />}
                               </div>
                               <div>
                                 <h4 className="font-black text-slate-800 text-lg">{founder.name}</h4>
                                 <p className="text-primary font-bold text-sm">{founder.role}</p>
                                 <a href={founder.linkedin} target="_blank" className="text-blue-500 hover:text-blue-700 mt-2 block">
                                   <Linkedin className="w-4 h-4" />
                                 </a>
                               </div>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">{founder.bio}</p>
                         </CardContent>
                       </Card>
                     ))}
                  </div>
                </TabsContent>

                <TabsContent value="traction">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                      <h4 className="font-black text-slate-800 mb-8 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" /> Traction Metrics
                      </h4>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center py-4 border-b border-slate-50">
                          <span className="text-slate-400 font-bold text-sm uppercase">Monthly Revenue</span>
                          <span className="text-xl font-black text-slate-800">{formatCurrency(startup.traction?.revenue)}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-slate-50">
                          <span className="text-slate-400 font-bold text-sm uppercase">User Base</span>
                          <span className="text-xl font-black text-slate-800">{startup.traction?.users?.toLocaleString() || "0"}</span>
                        </div>
                        <div className="flex justify-between items-center py-4">
                          <span className="text-slate-400 font-bold text-sm uppercase">Growth Rate</span>
                          <span className="text-xl font-black text-green-500">{startup.traction?.growth_rate || "0"}% MoM</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                      <h4 className="font-black text-slate-800 mb-8 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" /> Key Achievements
                      </h4>
                      <ul className="space-y-4">
                        {startup.achievements?.map((ach: string, i: number) => (
                           <li key={i} className="flex gap-3 text-slate-600 font-medium">
                             <CheckCircle className="w-5 h-5 text-primary shrink-0" /> {ach}
                           </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financials">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     <div className="bg-slate-900 rounded-3xl p-8 text-white">
                       <DollarSign className="w-8 h-8 text-primary mb-4" />
                       <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Target Raise</p>
                       <p className="text-2xl font-black">{formatCurrency(startup.funding_ask)}</p>
                     </div>
                     <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                       <PieChart className="w-8 h-8 text-blue-500 mb-4" />
                       <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Equity Offered</p>
                       <p className="text-2xl font-black text-slate-800">{startup.equity_offered || "0"}%</p>
                     </div>
                     <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                       <BarChart3 className="w-8 h-8 text-orange-500 mb-4" />
                       <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Valuation</p>
                       <p className="text-2xl font-black text-slate-800">{formatCurrency(startup.current_valuation)}</p>
                     </div>
                   </div>

                   <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                      <h2 className="text-2xl font-black text-slate-800 mb-6">Use of Funds</h2>
                      <p className="text-slate-600 leading-relaxed font-medium mb-8">
                        {startup.use_of_funds || "The startup has not specified a detailed breakdown of fund usage."}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-4 bg-slate-50 rounded-2xl">
                          <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Monthly Burn</p>
                          <p className="font-black text-slate-800">{formatCurrency(startup.monthly_burn)}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl">
                          <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Runway</p>
                          <p className="font-black text-slate-800">{startup.runway_months || "0"} Months</p>
                        </div>
                      </div>
                   </section>
                </TabsContent>
             </Tabs>
          </div>

          {/* Right Column: Connection Sidebar */}
          <div className="space-y-8">
             <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white sticky top-24">
                <CardContent className="p-10">
                   <div className="text-center mb-10">
                      <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-4">Investment Status</p>
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                           <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-primary" strokeDasharray="364.4" strokeDashoffset={364.4 * (1 - (startup.funding_raised / startup.funding_ask))} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                           <span className="text-2xl font-black text-slate-800">{Math.round((startup.funding_raised / startup.funding_ask) * 100)}%</span>
                        </div>
                      </div>
                      <p className="font-bold text-slate-500">{formatCurrency(startup.funding_raised)} raised of {formatCurrency(startup.funding_ask)}</p>
                   </div>

                   <div className="space-y-4 mb-10">
                      <Button className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20">
                        Request Access
                      </Button>
                      <Button variant="outline" className="w-full h-16 rounded-[1.5rem] border-slate-200 text-slate-700 font-black text-lg hover:bg-slate-50">
                        Save to Portfolio
                      </Button>
                   </div>

                   <div className="space-y-4">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Investor Perks</p>
                      <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl">
                         <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                         <p className="text-xs font-bold text-slate-600">Priority access to series A round.</p>
                      </div>
                      <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl">
                         <Users className="w-6 h-6 text-blue-500 shrink-0" />
                         <p className="text-xs font-bold text-slate-600">Board seat for major investors.</p>
                      </div>
                   </div>
                </CardContent>
             </Card>

             <div className="p-10 bg-slate-100 rounded-[2.5rem] border border-slate-200/50">
                <h4 className="font-black text-slate-800 mb-4">Questions?</h4>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">Our investment advisory team can help you with deal analysis and due diligence.</p>
                <Button className="w-full bg-slate-800 text-white rounded-xl font-bold">Contact Representative</Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckCircle({ className }: { className?: string }) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
