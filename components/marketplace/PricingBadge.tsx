// components/marketplace/PricingBadge.tsx
import { Badge } from "@/components/ui/badge"
import { ListingType } from "@/types/business"
import { Star, Zap, Shield } from "lucide-react"

interface PricingBadgeProps {
  type: ListingType
}

export function PricingBadge({ type }: PricingBadgeProps) {
  if (type === 'premium') {
    return (
      <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-none shadow-sm flex gap-1 items-center px-3">
        <Star className="w-3 h-3 fill-white" /> Premium
      </Badge>
    )
  }
  
  if (type === 'featured') {
    return (
      <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-none shadow-sm flex gap-1 items-center px-3">
        <Zap className="w-3 h-3 fill-white" /> Featured
      </Badge>
    )
  }
  
  return (
    <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 px-3">
      Free
    </Badge>
  )
}
