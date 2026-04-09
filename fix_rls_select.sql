-- Run this in your Supabase SQL Editor

-- 1. Allow business owners to view their own businesses (including pending/draft ones)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own businesses') THEN
    CREATE POLICY "Users can view their own businesses"
      ON businesses_for_sale FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- 2. Allow startup founders to view their own startups (including pending/draft ones)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own startups') THEN
    CREATE POLICY "Users can view their own startups"
      ON startups FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
END $$;
