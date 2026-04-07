// types/investor.ts

export type InvestorType = 'angel' | 'vc_firm' | 'corporate_vc' | 'family_office' | 'syndicate';

export interface PortfolioCompany {
  name: string;
  industry: string;
  stage: string;
  outcome?: string;
}

export interface Investor {
  id: string;
  user_id: string;
  investor_name: string;
  investor_type: InvestorType;
  logo_url?: string;
  bio?: string;
  focus_industries: string[];
  preferred_stages: string[];
  geographic_focus?: string[];
  ticket_size_min?: number;
  ticket_size_max?: number;
  portfolio_companies?: PortfolioCompany[];
  total_investments?: number;
  notable_exits?: string[];
  location?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  subscription_tier: 'free' | 'pro' | 'enterprise';
  subscription_status: string;
  subscription_until?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  startups_viewed: number;
  connections_made: number;
  created_at: string;
  updated_at: string;
}
