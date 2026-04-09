// app/marketplace/[slug]/edit/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { EditBusinessForm } from '@/components/marketplace/EditBusinessForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EditListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/marketplace/${slug}/edit`)
  }

  const { data: business, error } = await supabase
    .from('businesses_for_sale')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !business) notFound()

  // Only the owner can edit
  if (business.user_id !== user.id) {
    redirect(`/marketplace/${slug}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Page Header */}
      <div className="bg-slate-900 text-white pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/marketplace/${slug}`}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Listing
          </Link>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Editing</p>
          <h1 className="text-3xl font-black tracking-tight">{business.business_name}</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10">
        <EditBusinessForm business={business} />
      </div>
    </div>
  )
}
