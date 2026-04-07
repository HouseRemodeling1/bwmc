// app/api/inquiries/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Inquiries can be made by guest users too, but we prefer authenticated for trust
  const body = await request.json()
  const { business_id, name, email, phone, message } = body

  const { data, error } = await supabase
    .from('business_inquiries')
    .insert({
      business_id,
      buyer_id: user?.id || null, // Optional if guest
      buyer_name: name,
      buyer_email: email,
      buyer_phone: phone,
      message,
      status: 'new'
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  // Ideally send an email notification here to the seller
  
  return NextResponse.json(data)
}
