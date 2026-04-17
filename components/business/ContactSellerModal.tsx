"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare, Loader2, CheckCircle } from "lucide-react"

interface ContactSellerModalProps {
  businessId: string;
  businessTitle: string;
}

export function ContactSellerModal({ businessId, businessTitle }: ContactSellerModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id: businessId,
          ...form
        })
      })
      
      if (!res.ok) throw new Error("Failed to send inquiry")
      
      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setForm({ name: "", email: "", phone: "", message: "" })
      }, 3000)
    } catch (error) {
      alert("Failed to send inquiry. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-lg shadow-primary/20 mb-4">
          <MessageSquare className="mr-2 h-5 w-5" /> Contact Seller
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white p-6 rounded-3xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-800">Contact Seller</DialogTitle>
          <DialogDescription className="text-slate-500">
            Send an inquiry about <span className="font-bold text-slate-700">{businessTitle}</span>. Your details will be sent securely.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Inquiry Sent!</h3>
            <p className="text-slate-500 text-sm">The seller will review your message and get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-slate-700">Full Name</Label>
              <Input 
                id="name" 
                required 
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="h-12 rounded-xl border-slate-200" 
                placeholder="John Doe" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="h-12 rounded-xl border-slate-200" 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-bold text-slate-700">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  required 
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  className="h-12 rounded-xl border-slate-200" 
                  placeholder="+971 50 123 4567" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-bold text-slate-700">Message</Label>
              <textarea 
                id="message" 
                required 
                rows={4}
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                placeholder="I'm interested in learning more about this business..." 
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <MessageSquare className="w-5 h-5 mr-2" />}
              Send Inquiry
            </Button>
            
            <p className="text-xs text-center text-slate-400 mt-4">
              By sending an inquiry, you agree to sign an NDA if requested by the seller.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
