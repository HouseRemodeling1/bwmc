'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, CheckCircle2, Loader2, Settings } from 'lucide-react'

export function OwnerControls({ businessId, slug }: { businessId: string; slug: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const router = useRouter()

  const markAsSold = async () => {
    setLoading('sold')
    try {
      await fetch(`/api/businesses/${businessId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'sold' }),
      })
      router.refresh()
    } catch {
      alert('Failed. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const deleteListing = async () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    setLoading('delete')
    try {
      const res = await fetch(`/api/businesses/${businessId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      router.push('/marketplace/my-listings')
    } catch {
      alert('Failed to delete. Please try again.')
    } finally {
      setLoading(null)
      setConfirming(false)
    }
  }

  return (
    <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-4 h-4 text-amber-600" />
        <p className="text-xs font-black text-amber-700 uppercase tracking-widest">Owner Controls</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href={`/marketplace/${slug}/edit`}>
          <Button size="sm" className="bg-slate-800 hover:bg-slate-700 text-white gap-2 rounded-lg">
            <Edit className="w-4 h-4" /> Edit Listing
          </Button>
        </Link>

        <Button
          size="sm"
          variant="outline"
          className="border-green-300 text-green-700 hover:bg-green-50 gap-2 rounded-lg"
          onClick={markAsSold}
          disabled={loading === 'sold'}
        >
          {loading === 'sold' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          Mark as Sold
        </Button>

        <Link href="/marketplace/my-listings">
          <Button size="sm" variant="outline" className="border-slate-200 text-slate-600 hover:border-primary hover:text-primary gap-2 rounded-lg">
            My Listings
          </Button>
        </Link>

        <Button
          size="sm"
          variant="outline"
          className={`gap-2 rounded-lg transition-all ${
            confirming
              ? 'bg-red-50 border-red-400 text-red-700'
              : 'border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600'
          }`}
          onClick={deleteListing}
          disabled={loading === 'delete'}
        >
          {loading === 'delete' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {confirming ? 'Confirm Delete?' : 'Delete Listing'}
        </Button>
      </div>
    </div>
  )
}
