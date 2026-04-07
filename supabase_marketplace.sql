-- BWMC Dual Platform Schema: Business Marketplace + Startup matching
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- BUSINESS MARKETPLACE TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS businesses_for_sale (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  business_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100) NOT NULL,
  sub_industry VARCHAR(100),
  location VARCHAR(100) NOT NULL, -- Dubai, Abu Dhabi, Sharjah, etc.
  emirates VARCHAR(50), -- specific emirate
  
  -- Financial Info
  asking_price DECIMAL(15,2) NOT NULL,
  annual_revenue DECIMAL(15,2),
  annual_profit DECIMAL(15,2),
  ebitda DECIMAL(15,2),
  
  -- Business Details
  established_year INTEGER,
  employees_count INTEGER,
  business_type VARCHAR(50), -- sole_proprietorship, llc, freezone, etc.
  license_type VARCHAR(100),
  description TEXT NOT NULL,
  reason_for_sale TEXT,
  assets_included TEXT[], -- ['inventory', 'equipment', 'real_estate', 'ip', 'customer_db']
  liabilities TEXT,
  
  -- Listing Management
  listing_type VARCHAR(20) DEFAULT 'free', -- free, featured, premium
  status VARCHAR(20) DEFAULT 'pending', -- pending, active, sold, expired, rejected
  visibility VARCHAR(20) DEFAULT 'public', -- public, private, draft
  
  -- Engagement Metrics
  views_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0,
  saved_count INTEGER DEFAULT 0,
  
  -- Media
  images TEXT[], -- Array of Supabase Storage URLs
  documents TEXT[], -- Financial docs, licenses (private)
  video_url TEXT,
  
  -- Verification
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP,
  verification_notes TEXT,
  
  -- Premium Features
  featured_until TIMESTAMP,
  boost_ends_at TIMESTAMP,
  
  -- SEO
  slug VARCHAR(255) UNIQUE,
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP,
  expires_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses_for_sale(status);
CREATE INDEX IF NOT EXISTS idx_businesses_industry ON businesses_for_sale(industry);
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses_for_sale(location);
CREATE INDEX IF NOT EXISTS idx_businesses_price ON businesses_for_sale(asking_price);
CREATE INDEX IF NOT EXISTS idx_businesses_featured ON businesses_for_sale(featured_until) WHERE featured_until > NOW();

-- =====================================================
-- STARTUP-INVESTOR PLATFORM TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS startups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  startup_name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  logo_url TEXT,
  website_url TEXT,
  
  -- Classification
  industry VARCHAR(100) NOT NULL,
  sub_industry VARCHAR(100),
  stage VARCHAR(50) NOT NULL, -- idea, mvp, pre_revenue, revenue, growth, scaling
  location VARCHAR(100) NOT NULL,
  founded_year INTEGER,
  
  -- Team
  team_size INTEGER,
  founders JSONB, -- [{name, role, linkedin, bio, image}]
  key_team JSONB,
  
  -- Pitch Content
  pitch_deck_url TEXT,
  pitch_video_url TEXT,
  demo_url TEXT,
  pitch_summary TEXT NOT NULL, -- 2-3 sentences
  problem_statement TEXT NOT NULL,
  solution TEXT NOT NULL,
  unique_value_prop TEXT,
  
  -- Business Model
  business_model TEXT,
  revenue_model VARCHAR(100), -- saas, marketplace, ecommerce, etc.
  target_market TEXT,
  market_size TEXT,
  
  -- Traction
  traction JSONB, -- {users: 1000, revenue: 50000, growth_rate: 20, key_metrics: {}}
  customers TEXT[],
  partnerships TEXT[],
  achievements TEXT[],
  
  -- Financial
  funding_ask DECIMAL(15,2) NOT NULL,
  funding_raised DECIMAL(15,2) DEFAULT 0,
  current_valuation DECIMAL(15,2),
  equity_offered DECIMAL(5,2),
  use_of_funds TEXT,
  monthly_burn DECIMAL(12,2),
  runway_months INTEGER,
  
  -- Competitive Analysis
  competitors TEXT[],
  competitive_advantage TEXT,
  
  -- Documents
  business_plan_url TEXT,
  financial_projections_url TEXT,
  
  -- Listing Management
  listing_type VARCHAR(20) DEFAULT 'free', -- free, verified, premium
  status VARCHAR(20) DEFAULT 'active', -- draft, active, paused, funded
  
  -- Engagement
  views_count INTEGER DEFAULT 0,
  connection_count INTEGER DEFAULT 0,
  saved_count INTEGER DEFAULT 0,
  
  -- Premium Features
  verified_badge BOOLEAN DEFAULT false,
  featured_until TIMESTAMP,
  verified_by UUID REFERENCES auth.users(id),
  
  -- SEO
  slug VARCHAR(255) UNIQUE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Profile
  investor_name VARCHAR(255) NOT NULL,
  investor_type VARCHAR(50) NOT NULL, -- angel, vc_firm, corporate_vc, family_office, syndicate
  logo_url TEXT,
  bio TEXT,
  
  -- Investment Preferences
  focus_industries TEXT[] NOT NULL,
  preferred_stages TEXT[] NOT NULL, -- seed, pre_seed, series_a, growth
  geographic_focus TEXT[], -- uae, gcc, mena, global
  
  -- Ticket Size
  ticket_size_min DECIMAL(15,2),
  ticket_size_max DECIMAL(15,2),
  
  -- Experience
  portfolio_companies JSONB, -- [{name, industry, stage, outcome}]
  total_investments INTEGER,
  notable_exits TEXT[],
  
  -- Contact
  location VARCHAR(100),
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  
  -- Subscription
  subscription_tier VARCHAR(20) DEFAULT 'free', -- free, pro, enterprise
  subscription_status VARCHAR(20) DEFAULT 'active',
  subscription_until TIMESTAMP,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  
  -- Engagement
  startups_viewed INTEGER DEFAULT 0,
  connections_made INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_startups_stage ON startups(stage);
CREATE INDEX IF NOT EXISTS idx_startups_industry ON startups(industry);
CREATE INDEX IF NOT EXISTS idx_startups_status ON startups(status);
CREATE INDEX IF NOT EXISTS idx_investors_type ON investors(investor_type);

-- =====================================================
-- CONNECTION & INQUIRY TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS business_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses_for_sale(id) ON DELETE CASCADE,
  
  -- Buyer Info
  buyer_user_id UUID REFERENCES auth.users(id), -- if logged in
  buyer_name VARCHAR(255) NOT NULL,
  buyer_email VARCHAR(255) NOT NULL,
  buyer_phone VARCHAR(50),
  buyer_company VARCHAR(255),
  
  -- Inquiry Details
  message TEXT NOT NULL,
  inquiry_type VARCHAR(50), -- general, financing, viewing, offer
  proposed_price DECIMAL(15,2),
  
  -- Status
  status VARCHAR(20) DEFAULT 'new', -- new, replied, in_discussion, closed
  
  -- Privacy
  seller_notified BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS startup_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES investors(id) ON DELETE CASCADE,
  
  -- Connection Details
  message TEXT,
  interest_level VARCHAR(20), -- exploring, interested, very_interested
  proposed_investment DECIMAL(15,2),
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, declined, meeting_scheduled
  
  -- Follow-up
  meeting_scheduled BOOLEAN DEFAULT false,
  meeting_date TIMESTAMP,
  notes TEXT,
  
  -- Privacy
  startup_notified BOOLEAN DEFAULT false,
  investor_notified BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_business ON business_inquiries(business_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON business_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_connections_startup ON startup_connections(startup_id);
CREATE INDEX IF NOT EXISTS idx_connections_investor ON startup_connections(investor_id);
CREATE INDEX IF NOT EXISTS idx_connections_status ON startup_connections(status);

-- =====================================================
-- PAYMENTS & TRANSACTIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Transaction Details
  type VARCHAR(50) NOT NULL, -- business_featured, startup_verified, investor_pro_monthly
  plan_name VARCHAR(100),
  description TEXT,
  
  -- Pricing
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'AED',
  
  -- Reference
  reference_type VARCHAR(50), -- business, startup, investor_subscription
  reference_id UUID,
  
  -- Payment Gateway
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed, refunded
  payment_method VARCHAR(50), -- card, bank_transfer, wallet
  gateway VARCHAR(50), -- stripe, checkout_com
  gateway_transaction_id VARCHAR(255),
  gateway_customer_id VARCHAR(255),
  
  -- Metadata
  metadata JSONB,
  
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- =====================================================
-- SAVED/BOOKMARKS
-- =====================================================

CREATE TABLE IF NOT EXISTS saved_businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses_for_sale(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, business_id)
);

CREATE TABLE IF NOT EXISTS saved_startups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID REFERENCES investors(id) ON DELETE CASCADE,
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  notes TEXT,
  rating INTEGER, -- 1-5 stars
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(investor_id, startup_id)
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE businesses_for_sale ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_startups ENABLE ROW LEVEL SECURITY;

-- Business Listings: Public can view active, owners can CRUD their own
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view active businesses') THEN
    CREATE POLICY "Public can view active businesses"
      ON businesses_for_sale FOR SELECT
      USING (status = 'active' AND visibility = 'public');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert their own businesses') THEN
    CREATE POLICY "Users can insert their own businesses"
      ON businesses_for_sale FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own businesses') THEN
    CREATE POLICY "Users can update their own businesses"
      ON businesses_for_sale FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete their own businesses') THEN
    CREATE POLICY "Users can delete their own businesses"
      ON businesses_for_sale FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Startups: Similar pattern
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view active startups') THEN
    CREATE POLICY "Public can view active startups"
      ON startups FOR SELECT
      USING (status = 'active');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their startups') THEN
    CREATE POLICY "Users can manage their startups"
      ON startups FOR ALL
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Investors: Own profile management
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Investors can view other investors') THEN
    CREATE POLICY "Investors can view other investors"
      ON investors FOR SELECT
      USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their investor profile') THEN
    CREATE POLICY "Users can manage their investor profile"
      ON investors FOR ALL
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Inquiries: Buyers can insert, sellers can view
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can submit inquiries') THEN
    CREATE POLICY "Anyone can submit inquiries"
      ON business_inquiries FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Business owners can view inquiries') THEN
    CREATE POLICY "Business owners can view inquiries"
      ON business_inquiries FOR SELECT
      USING (
        business_id IN (
          SELECT id FROM businesses_for_sale WHERE user_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Connections: Investors can create, startups can view
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Investors can create connections') THEN
    CREATE POLICY "Investors can create connections"
      ON startup_connections FOR INSERT
      WITH CHECK (
        investor_id IN (SELECT id FROM investors WHERE user_id = auth.uid())
      );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Startups can view their connections') THEN
    CREATE POLICY "Startups can view their connections"
      ON startup_connections FOR SELECT
      USING (
        startup_id IN (SELECT id FROM startups WHERE user_id = auth.uid())
        OR investor_id IN (SELECT id FROM investors WHERE user_id = auth.uid())
      );
  END IF;
END $$;

-- Transactions: Users can view their own
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their transactions') THEN
    CREATE POLICY "Users can view their transactions"
      ON transactions FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Saved items: Users manage their own
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage their saved businesses') THEN
    CREATE POLICY "Users manage their saved businesses"
      ON saved_businesses FOR ALL
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Investors manage their saved startups') THEN
    CREATE POLICY "Investors manage their saved startups"
      ON saved_startups FOR ALL
      USING (
        investor_id IN (SELECT id FROM investors WHERE user_id = auth.uid())
      );
  END IF;
END $$;
