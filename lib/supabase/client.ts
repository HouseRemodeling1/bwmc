// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const hasSupabaseBrowserEnv =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const createClient = () => {
  if (!hasSupabaseBrowserEnv) {
    return null
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
