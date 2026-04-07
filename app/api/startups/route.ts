// app/api/startups/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const industry = searchParams.get('industry')
  const stage = searchParams.get('stage')
  const location = searchParams.get('location')
  
  const supabase = createClient()
  
  let query = supabase
    .from('startups')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  
  if (industry && industry !== 'All') query = query.eq('industry', industry)
  if (stage && stage !== 'All') query = query.eq('stage', stage)
  if (location && location !== 'All') query = query.eq('location', location)
  
  const { data, error } = await query
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  
  // Create slug
  const slug = body.startup_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 7);

  const { data, error } = await supabase
    .from('startups')
    .insert({
      ...body,
      user_id: user.id,
      slug,
      status: 'active', // Startups are active by default for now
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
