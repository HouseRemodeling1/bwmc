// app/marketplace/page.tsx — redirect to /business
import { redirect } from 'next/navigation'

export default function MarketplaceRedirect() {
  redirect('/business')
}
