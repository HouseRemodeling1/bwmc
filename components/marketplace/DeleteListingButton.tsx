'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'

export function DeleteListingButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/businesses/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      router.push('/marketplace/my-listings')
      router.refresh()
    } catch {
      alert('Failed to delete listing. Please try again.')
      setConfirming(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
      className={`gap-1.5 border-slate-200 transition-all ${
        confirming
          ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
          : 'text-slate-600 hover:border-red-300 hover:text-red-600'
      }`}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      {confirming ? 'Confirm?' : 'Delete'}
    </Button>
  )
}
