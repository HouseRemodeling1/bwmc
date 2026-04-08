-- BWMC Demo Data Seed Script
-- To use: Copy and paste this into your Supabase SQL Editor and Click "Run"
-- IMPORTANT: Replace 'YOUR_USER_ID_HERE' with your actual Supabase User ID from the Auth -> Users table.

-- 1. Identify User (Automatically finds the first user if none specified)
DO $$
DECLARE
    target_user_id UUID;
BEGIN
    -- OPTIONAL: If you want to use a SPECIFIC user, uncomment the line below and paste the ID
    -- target_user_id := 'your-uuid-here';

    -- Fallback: Use the first user found in the system
    IF target_user_id IS NULL THEN
        SELECT id INTO target_user_id FROM auth.users LIMIT 1;
    END IF;

    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'No users found in auth.users table. Please sign up on the website first.';
    END IF;

    -- 2. Add Demo Business Listing (Marketplace)
    INSERT INTO businesses_for_sale (
        user_id,
        business_name,
        industry,
        sub_industry,
        location,
        asking_price,
        annual_revenue,
        annual_profit,
        established_year,
        employees_count,
        business_type,
        description,
        reason_for_sale,
        listing_type,
        status,
        verified,
        slug
    ) VALUES (
        target_user_id,
        'Evergreen Coffee House Chain',
        'Food & Beverage',
        'Specialty Coffee',
        'Dubai',
        1500000.00,
        2400000.00,
        450000.00,
        2018,
        12,
        'LLC',
        'A well-established specialty coffee chain with 3 high-footfall locations in prime Dubai areas. Includes full kitchen equipment, trained staff, and established supplier relationships.',
        'Owner relocating abroad',
        'premium',
        'active',
        true,
        ARRAY['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop'], -- Modern Coffee Shop Image
        'evergreen-coffee-house-chain'
    );

    -- 3. Add Demo Startup
    INSERT INTO startups (
        user_id,
        startup_name,
        tagline,
        industry,
        stage,
        location,
        founded_year,
        team_size,
        pitch_summary,
        problem_statement,
        solution,
        funding_ask,
        funding_raised,
        current_valuation,
        equity_offered,
        status,
        slug
    ) VALUES (
        target_user_id,
        'FinFlow AI',
        'The Future of Automated Corporate FinTech',
        'Financial Technology',
        'seed',
        'Abu Dhabi',
        2023,
        8,
        'Next-generation AI platform that automates VAT filing and financial forecasting for UAE SMEs.',
        'SMEs spend over 40 hours a month manually reconciling accounts and fearing VAT non-compliance.',
        'An AI-native dashboard that integrates directly with UAE banks to provide real-time tax readiness and intelligent cash flow predictions.',
        2500000.00,
        500000.00,
        12000000.00,
        10.00,
        'active',
        'finflow-ai'
    );

    -- 4. Add Demo Investor
    INSERT INTO investors (
        user_id,
        investor_name,
        investor_type,
        bio,
        focus_industries,
        preferred_stages,
        geographic_focus,
        ticket_size_min,
        ticket_size_max,
        total_investments,
        location,
        subscription_tier
    ) VALUES (
        target_user_id,
        'Global Horizon Ventures',
        'vc_firm',
        'A leading boutique venture capital firm focused on scaling high-growth Middle Eastern startups in FinTech, Logistics, and SaaS.',
        ARRAY['Financial Technology', 'Logistics', 'SaaS', 'E-commerce'],
        ARRAY['pre_seed', 'seed', 'series_a'],
        ARRAY['uae', 'gcc', 'mena'],
        500000.00,
        5000000.00,
        15,
        'Dubai, DIFC',
        'pro'
    );

    RAISE NOTICE 'Demo data successfully added and linked to user %', target_user_id;
END $$;
