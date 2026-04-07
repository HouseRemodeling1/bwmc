// app/api/connections/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  const { startup_id, message } = body

  // Check if investor exists
  const { data: investor } = await supabase
    .from('investors')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!investor) {
    return NextResponse.json({ error: 'No investor profile found' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('connections')
    .insert({
      investor_id: investor.id,
      startup_id,
      message,
      status: 'pending'
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
