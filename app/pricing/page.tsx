// app/pricing/page.tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ShieldCheck, Zap, Rocket, Star, Globe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | BWMC",
  description:
    "Transparent pricing for Buy/Sell Business listings and Startup Platform plans. Choose the best plan for your growth in the UAE.",
  alternates: {
    canonical: "https://www.bwmc.ae/pricing",
  },
}

export default function PricingPage() {
  const businessPlans = [
    {
      name: "Free",
      price: "0",
      duration: "30 Days",
      features: ["3 Photos", "Standard Placement", "Basic Analytics"],
      icon: <Globe className="w-6 h-6 text-slate-400" />,
      buttonText: "List Free",
      href: "/business/sell",
      popular: false,
      comingSoon: false
    },
    {
      name: "Featured",
      price: "500",
      duration: "90 Days",
      features: ["Unlimited Photos", "Top of Category", "Verified Badge", "Detailed Analytics"],
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      buttonText: "Go Featured",
      href: "/contact",
      popular: true,
      comingSoon: true
    },
    {
      name: "Premium",
      price: "1,500",
      duration: "180 Days",
      features: ["Top + Homepage", "Verified Badge", "Advanced Leads", "Buyer Email Blast"],
      icon: <Star className="w-6 h-6 text-primary" />,
      buttonText: "Go Premium",
      href: "/contact",
      popular: false,
      comingSoon: true
    }
  ]

  const startupPlans = [
    {
      name: "Free",
      price: "0",
      features: ["Basic Profile", "Public Listing"],
      icon: <Rocket className="w-5 h-5 text-slate-400" />,
      href: "/startups",
      comingSoon: false
    },
    {
      name: "Verified",
      price: "1,000",
      features: ["Enhanced Profile", "Pitch Deck Upload", "Verified Badge", "Basic Analytics"],
      icon: <ShieldCheck className="w-5 h-5 text-green-500" />,
      popular: true,
      href: "/contact",
      comingSoon: true
    },
    {
      name: "Premium",
      price: "2,500",
      features: ["Full Profile", "Pitch Deck + Video", "30 Days Featured", "5 Investor Intros"],
      icon: <Star className="w-5 h-5 text-primary" />,
      href: "/contact",
      comingSoon: true
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero */}
      <div className="bg-[#1A2B4C] text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Badge className="mb-4 bg-yellow-400/20 text-yellow-300 border-yellow-400/30 py-1 px-4 font-black">TRANSPARENT PRICING</Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Choose the Best Plan <br /> <span className="text-yellow-400">for Your Growth</span>
          </h1>
          <p className="text-slate-300 text-lg font-medium max-w-xl mx-auto">Whether you are selling a business, raising capital, or looking for deals — we have a plan for you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 space-y-24">
        {/* Buy/Sell Business Plans */}
        <section>
          <div className="text-center mb-12 pt-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Buy/Sell Business</h2>
            <p className="text-slate-500 font-semibold">One-time payments for listing visibility</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessPlans.map((plan) => (
              <Card key={plan.name} className={`border-none shadow-2xl rounded-[3rem] overflow-hidden relative ${plan.popular ? "ring-2 ring-primary scale-105" : ""} ${plan.comingSoon ? "opacity-80" : ""}`}>
                {/* Coming Soon overlay badge */}
                {plan.comingSoon && (
                  <div className="absolute top-4 right-4 z-10 bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    🚀 Coming Soon
                  </div>
                )}
                {plan.popular && (
                  <div className="bg-primary text-white text-center py-2 text-xs font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      {plan.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-slate-800">AED {plan.price}</p>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{plan.duration}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-800 mb-6">{plan.name}</h3>
                  
                  <ul className="space-y-4 mb-10">
                    {plan.features.map(f => (
                      <li key={f} className="flex gap-3 text-sm font-bold text-slate-600">
                        <Check className="w-5 h-5 text-green-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  
                  {plan.comingSoon ? (
                    <div className="w-full h-14 rounded-2xl font-black text-lg bg-slate-100 text-slate-400 flex items-center justify-center gap-2 cursor-not-allowed select-none border border-dashed border-slate-300">
                      <span>🔒</span> Coming Soon
                    </div>
                  ) : (
                    <Link href={plan.href}>
                      <Button className="w-full h-14 rounded-2xl font-black text-lg bg-slate-900 text-white hover:bg-slate-950">
                        {plan.buttonText}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Startup Platform Plans */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-800 mb-2">Startup Platform</h2>
            <p className="text-slate-500 font-bold">Empower your venture and attract investors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {startupPlans.map((plan) => (
              <Card key={plan.name} className={`border-none shadow-xl rounded-[2.5rem] bg-white relative ${plan.comingSoon ? 'opacity-80' : ''}`}>
                {plan.comingSoon && (
                  <div className="absolute top-3 right-3 z-10 bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    🚀 Coming Soon
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                      {plan.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-xl">{plan.name}</h3>
                      <p className="text-primary font-black">AED {plan.price}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex gap-2 text-xs font-bold text-slate-500">
                        <Check className="w-4 h-4 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  
                  {plan.comingSoon ? (
                    <div className="w-full h-12 rounded-2xl font-bold text-sm bg-slate-100 text-slate-400 flex items-center justify-center gap-2 cursor-not-allowed select-none border border-dashed border-slate-300">
                      <span>🔒</span> Coming Soon
                    </div>
                  ) : (
                    <Link href={plan.href}>
                      <Button variant="outline" className={`w-full rounded-2xl h-12 font-bold ${plan.popular ? 'border-primary text-primary' : 'border-slate-200 text-slate-500'}`}>
                        Select {plan.name}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
