// types/index.ts

export * from './business';
export * from './startup';
export * from './investor';

export interface Transaction {
  id: string;
  user_id?: string;
  type: string;
  plan_name?: string;
  description?: string;
  amount: number;
  currency: string;
  reference_type?: 'business' | 'startup' | 'investor_subscription';
  reference_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method?: string;
  gateway?: 'stripe' | 'checkout_com';
  gateway_transaction_id?: string;
  gateway_customer_id?: string;
  metadata?: any;
  created_at: string;
  completed_at?: string;
}
