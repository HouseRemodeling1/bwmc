// types/startup.ts

export type StartupStage = 'idea' | 'mvp' | 'pre_revenue' | 'revenue' | 'growth' | 'scaling';
export type StartupStatus = 'draft' | 'active' | 'paused' | 'funded';

export interface Founder {
  name: string;
  role: string;
  linkedin?: string;
  bio?: string;
  image?: string;
}

export interface Startup {
  id: string;
  user_id: string;
  startup_name: string;
  tagline?: string;
  logo_url?: string;
  website_url?: string;
  industry: string;
  sub_industry?: string;
  stage: StartupStage;
  location: string;
  founded_year?: number;
  team_size?: number;
  founders: Founder[];
  key_team?: any;
  pitch_deck_url?: string;
  pitch_video_url?: string;
  demo_url?: string;
  pitch_summary: string;
  problem_statement: string;
  solution: string;
  unique_value_prop?: string;
  business_model?: string;
  revenue_model?: string;
  target_market?: string;
  market_size?: string;
  traction?: {
    users?: number;
    revenue?: number;
    growth_rate?: number;
    key_metrics?: Record<string, any>;
  };
  customers?: string[];
  partnerships?: string[];
  achievements?: string[];
  funding_ask: number;
  funding_raised?: number;
  current_valuation?: number;
  equity_offered?: number;
  use_of_funds?: string;
  monthly_burn?: number;
  runway_months?: number;
  competitors?: string[];
  competitive_advantage?: string;
  business_plan_url?: string;
  financial_projections_url?: string;
  listing_type: 'free' | 'verified' | 'premium';
  status: StartupStatus;
  views_count: number;
  connection_count: number;
  saved_count: number;
  verified_badge: boolean;
  featured_until?: string;
  verified_by?: string;
  slug: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface StartupConnection {
  id: string;
  startup_id: string;
  investor_id: string;
  message?: string;
  interest_level?: 'exploring' | 'interested' | 'very_interested';
  proposed_investment?: number;
  status: 'pending' | 'accepted' | 'declined' | 'meeting_scheduled';
  meeting_scheduled: boolean;
  meeting_date?: string;
  notes?: string;
  startup_notified: boolean;
  investor_notified: boolean;
  created_at: string;
  updated_at: string;
}
