// app/api/businesses/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const industry = searchParams.get('industry')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const location = searchParams.get('location')
  
  const supabase = await createClient()
  
  let query = supabase
    .from('businesses_for_sale')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  
  if (industry && industry !== 'All') query = query.eq('industry', industry)
  if (minPrice) query = query.gte('asking_price', parseInt(minPrice))
  if (maxPrice) query = query.lte('asking_price', parseInt(maxPrice))
  if (location && location !== 'All') query = query.eq('location', location)
  
  const { data, error } = await query
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  
  // Generate slug from industry and location to hide business name
  const slugBase = `${body.industry || 'business'}-${body.location || 'uae'}`;
  const slug = slugBase
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 7);

  const { data, error } = await supabase
    .from('businesses_for_sale')
    .insert({
      ...body,
      user_id: user.id,
      slug,
      status: 'active', // Go live immediately
      visibility: 'public',
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
