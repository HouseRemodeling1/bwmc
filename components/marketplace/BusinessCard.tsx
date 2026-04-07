// components/marketplace/BusinessCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, TrendingUp, Users, CheckCircle } from 'lucide-react'
import { Business } from '@/types/business'

interface BusinessCardProps {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return 'N/A'
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Link href={`/marketplace/${business.slug}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm shadow-md hover:-translate-y-1">
        <div className="relative h-48 w-full">
          <Image
            src={business.images?.[0] || '/placeholder-business.jpg'}
            alt={business.business_name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {business.listing_type !== 'free' && (
              <Badge className="bg-primary/90 backdrop-blur-md border-none text-white font-medium uppercase text-[10px] tracking-wider">
                {business.listing_type}
              </Badge>
            )}
          </div>
          {business.verified && (
            <Badge variant="secondary" className="absolute top-2 left-2 bg-green-500/90 backdrop-blur-md border-none text-white flex gap-1 items-center">
              <CheckCircle className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>
        
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
              {business.business_name}
            </h3>
          </div>
          
          <Badge variant="outline" className="mb-4 bg-slate-50 border-slate-200 text-slate-600 font-normal">
            {business.industry}
          </Badge>
          
          <div className="space-y-2.5 mb-5">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="w-4 h-4 text-primary/70" />
              <span>{business.location}{business.emirates ? `, ${business.emirates}` : ''}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <TrendingUp className="w-4 h-4 text-green-500/70" />
              <span>{formatCurrency(business.annual_revenue)} annual revenue</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Users className="w-4 h-4 text-blue-500/70" />
              <span>{business.employees_count || 0} employees</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Asking Price</p>
              <p className="text-xl font-black text-primary">
                {formatCurrency(business.asking_price)}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
