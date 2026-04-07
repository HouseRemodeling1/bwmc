// components/startups/StartupCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Rocket, Target, Users, ShieldCheck } from 'lucide-react'
import { Startup } from '@/types/startup'

interface StartupCardProps {
  startup: Startup
}

export function StartupCard({ startup }: StartupCardProps) {
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return 'N/A'
    if (amount >= 1000000) return `AED ${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `AED ${(amount / 1000).toFixed(0)}K`
    return `AED ${amount}`
  }

  const getStageLabel = (stage: string) => {
    return stage.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <Link href={`/startups/${startup.slug}`}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-none bg-white shadow-lg hover:-translate-y-2 rounded-3xl">
        <div className="relative h-40 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-500/30 opacity-60 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {startup.logo_url ? (
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-xl">
                <Image
                  src={startup.logo_url}
                  alt={startup.startup_name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Rocket className="w-8 h-8" />
              </div>
            )}
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2">
            {startup.verified_badge && (
               <Badge className="bg-green-500/90 backdrop-blur-md border-none text-white px-2 py-0.5 flex gap-1 items-center shadow-lg">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </Badge>
            )}
            {startup.listing_type === 'premium' && (
              <Badge className="bg-primary/90 backdrop-blur-md border-none text-white px-2 py-0.5 shadow-lg">
                Premium
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="font-black text-xl text-slate-800 mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {startup.startup_name}
            </h3>
            <p className="text-slate-500 text-sm line-clamp-1 italic">{startup.tagline}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-bold text-[10px] uppercase tracking-wider">
              {startup.industry}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-bold text-[10px] uppercase tracking-wider">
              {getStageLabel(startup.stage)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Ask</p>
              <p className="text-sm font-black text-slate-800">{formatCurrency(startup.funding_ask)}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Raised</p>
              <p className="text-sm font-black text-green-600">{formatCurrency(startup.funding_raised || 0)}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Target className="w-3.5 h-3.5 text-primary" />
              <span>{startup.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span>{startup.team_size || 0} Team</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
