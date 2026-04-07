// app/investors/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StartupCard } from '@/components/startups/StartupCard'
import { 
  LayoutDashboard, 
  Heart, 
  MessageCircle, 
  Settings, 
  Zap, 
  Plus, 
  Search,
  Users,
  BarChart3,
  TrendingUp,
  FileText
} from 'lucide-react'
import Link from 'next/link'

export default async function InvestorDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/api/auth/signin')
  }

  // Fetch investor profile
  const { data: investor } = await supabase
    .from('investors')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!investor) {
    redirect('/investors/profile')
  }

  // Fetch saved startups
  const { data: savedStartups } = await supabase
    .from('saved_startups')
    .select('*, startups(*)')
    .eq('investor_id', investor.id)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
           <Link href="/" className="font-black text-2xl text-slate-900 tracking-tighter">BWMC <span className="text-primary">PRO</span></Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link href="/investors/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary rounded-xl font-bold transition-all">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/startups" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold transition-all">
            <Search className="w-5 h-5" /> Browse Deals
          </Link>
          <Link href="/investors/connections" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold transition-all">
            <MessageCircle className="w-5 h-5" /> Connections
          </Link>
          <Link href="/investors/saved" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold transition-all">
            <Heart className="w-5 h-5" /> Saved Startups
          </Link>
        </nav>

        <div className="p-8 border-t border-slate-100">
           <div className="bg-slate-900 rounded-2xl p-4 text-white">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Current Plan</p>
              <div className="flex justify-between items-center mb-4">
                 <p className="font-bold text-sm">Free Tier</p>
                 <Badge className="bg-primary/20 text-primary border-none text-[8px] uppercase">Trial</Badge>
              </div>
              <Button size="sm" className="w-full bg-primary text-white text-[10px] h-8 rounded-lg font-black uppercase">Upgrade to Pro</Button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
           <div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back, {investor.investor_name}</h1>
              <p className="text-slate-500 font-medium">Here's your deal flow overview for today.</p>
           </div>
           <div className="flex gap-4">
              <Link href="/investors/profile">
                <Button variant="outline" className="rounded-xl font-bold border-slate-200">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Button>
              </Link>
              <Link href="/startups">
                <Button className="rounded-xl font-black bg-primary">
                  <Plus className="w-4 h-4 mr-2" /> Find New Deals
                </Button>
              </Link>
           </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6">
                 <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                    <BarChart3 className="w-5 h-5" />
                 </div>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Deals Viewed</p>
                 <p className="text-2xl font-black text-slate-800">{investor.startups_viewed || 0}</p>
              </CardContent>
           </Card>
           <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6">
                 <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                    <Zap className="w-5 h-5" />
                 </div>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Connections</p>
                 <p className="text-2xl font-black text-slate-800">{investor.connections_made || 0}</p>
              </CardContent>
           </Card>
           <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Heart className="w-5 h-5" />
                 </div>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Saved Deals</p>
                 <p className="text-2xl font-black text-slate-800">{savedStartups?.length || 0}</p>
              </CardContent>
           </Card>
           <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6">
                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 mb-4">
                    <TrendingUp className="w-5 h-5" />
                 </div>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Avg. Ticket Size</p>
                 <p className="text-2xl font-black text-slate-800">AED 250K</p>
              </CardContent>
           </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Primary Deal Flow */}
           <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-black text-slate-800">Your Saved Startups</h2>
                 <Link href="/investors/saved" className="text-primary font-bold text-sm hover:underline">View All →</Link>
              </div>

              {savedStartups && savedStartups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedStartups.slice(0, 4).map((item: any) => (
                    <StartupCard key={item.id} startup={item.startups} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] border border-dashed border-slate-200 p-16 text-center">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-slate-300" />
                   </div>
                   <h3 className="text-lg font-bold text-slate-800 mb-2">No saved startups yet</h3>
                   <p className="text-slate-500 mb-6 text-sm">Start browsing the marketplace to build your portfolio.</p>
                   <Link href="/startups">
                      <Button className="rounded-xl font-bold bg-slate-900">Explore Startups</Button>
                   </Link>
                </div>
              )}
           </div>

           {/* Right Sidebar: Activity & Insights */}
           <div className="space-y-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                 <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" /> Active Discussions
                 </h3>
                 <div className="space-y-6">
                    <div className="flex gap-4 p-4 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer">
                       <div className="w-10 h-10 rounded-full bg-slate-200" />
                       <div>
                          <p className="font-black text-sm text-slate-800">SolarGrid MENA</p>
                          <p className="text-xs font-medium text-slate-400">Meeting scheduled for Thursday</p>
                       </div>
                    </div>
                    <div className="flex gap-4 p-4 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer">
                       <div className="w-10 h-10 rounded-full bg-slate-200" />
                       <div>
                          <p className="font-black text-sm text-slate-800">HealthPal AI</p>
                          <p className="text-xs font-medium text-slate-400">New pitch deck uploaded</p>
                       </div>
                    </div>
                 </div>
                 <Button variant="ghost" className="w-full mt-6 text-slate-400 font-bold hover:text-primary">View All Inboxes</Button>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />
                 <h4 className="font-black text-xl mb-4 text-primary relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Pro Insights
                 </h4>
                 <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed font-medium">
                    Upgrade to BWMC Pro for professional due diligence reports and automated deal matching.
                 </p>
                 <Link href="/pricing">
                   <Button className="w-full h-12 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-black relative z-10">
                     UPGRADE NOW
                   </Button>
                 </Link>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}
