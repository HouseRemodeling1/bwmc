// types/business.ts

export type ListingType = 'free' | 'featured' | 'premium';
export type ListingStatus = 'pending' | 'active' | 'sold' | 'expired' | 'rejected';
export type Visibility = 'public' | 'private' | 'draft';

export interface Business {
  id: string;
  user_id: string;
  business_name: string;
  industry: string;
  sub_industry?: string;
  location: string;
  emirates?: string;
  asking_price: number;
  annual_revenue?: number;
  annual_profit?: number;
  ebitda?: number;
  established_year?: number;
  employees_count?: number;
  business_type?: string;
  license_type?: string;
  description: string;
  reason_for_sale?: string;
  assets_included?: string[];
  liabilities?: string;
  listing_type: ListingType;
  status: ListingStatus;
  visibility: Visibility;
  views_count: number;
  inquiry_count: number;
  saved_count: number;
  images: string[];
  documents?: string[];
  video_url?: string;
  verified: boolean;
  verified_by?: string;
  verified_at?: string;
  verification_notes?: string;
  featured_until?: string;
  boost_ends_at?: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  expires_at?: string;
}

export interface BusinessInquiry {
  id: string;
  business_id: string;
  buyer_user_id?: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  buyer_company?: string;
  message: string;
  inquiry_type?: 'general' | 'financing' | 'viewing' | 'offer';
  proposed_price?: number;
  status: 'new' | 'replied' | 'in_discussion' | 'closed';
  seller_notified: boolean;
  created_at: string;
}
