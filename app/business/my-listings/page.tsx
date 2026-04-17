// app/business/my-listings/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeleteListingButton } from '@/components/business/DeleteListingButton'
import { Plus, Eye, Edit, Building2, TrendingUp, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  sold: 'bg-blue-100 text-blue-700 border-blue-200',
  draft: 'bg-slate-100 text-slate-600 border-slate-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
}

export default async function MyListingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/business/my-listings')
  }

  const { data: listings } = await supabase
    .from('businesses_for_sale')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const totalViews = listings?.reduce((sum, l) => sum + (l.views_count || 0), 0) || 0
  const activeCount = listings?.filter(l => l.status === 'active').length || 0

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#1d4ed8/15%,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/business" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Buy/Sell Business
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-widest">Seller Portal</p>
              <h1 className="text-4xl font-black tracking-tight">My Listings</h1>
              <p className="text-slate-400 mt-2 text-sm">{user.email}</p>
            </div>
            <Link href="/business/sell">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold gap-2 px-6 h-12 rounded-xl shadow-lg shadow-primary/30">
                <Plus className="w-4 h-4" /> New Listing
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-3xl font-black">{listings?.length || 0}</p>
              <p className="text-slate-400 text-xs mt-1 font-medium">Total Listings</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-3xl font-black text-emerald-400">{activeCount}</p>
              <p className="text-slate-400 text-xs mt-1 font-medium">Active</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-3xl font-black text-blue-400">{totalViews}</p>
              <p className="text-slate-400 text-xs mt-1 font-medium">Total Views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {listings && listings.length > 0 ? (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                  {listing.images?.[0] ? (
                    <img src={listing.images[0]} alt={listing.business_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-bold text-slate-800 text-lg leading-tight">{listing.business_name}</h2>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${statusColors[listing.status] || statusColors.draft}`}>
                      {listing.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">{listing.industry} · {listing.location}</p>
                  <div className="flex items-center gap-5 mt-2.5 text-sm">
                    <span className="font-black text-primary">
                      AED {listing.asking_price?.toLocaleString()}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {listing.views_count || 0} views
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {listing.inquiry_count || 0} inquiries
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/business/${listing.slug}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-slate-600 border-slate-200 hover:border-primary hover:text-primary rounded-lg">
                      <Eye className="w-4 h-4" /> View
                    </Button>
                  </Link>
                  <Link href={`/business/${listing.slug}/edit`}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-lg">
                      <Edit className="w-4 h-4" /> Edit
                    </Button>
                  </Link>
                  <DeleteListingButton id={listing.id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-28 bg-white rounded-3xl border border-dashed border-slate-200">
            <Building2 className="w-16 h-16 text-slate-200 mx-auto mb-5" />
            <h3 className="text-2xl font-black text-slate-700 mb-2">No listings yet</h3>
            <p className="text-slate-400 mb-8">Create your first listing to start attracting buyers from across the UAE.</p>
            <Link href="/business/sell">
              <Button className="bg-primary text-white font-bold gap-2 px-8 h-12 rounded-xl shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4" /> Create a Listing
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
