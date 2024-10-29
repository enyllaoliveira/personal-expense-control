export interface Expense {
  id: string;
  userId: string;
  description: string;
  amount: string;
  payment_date?: string;
  category_id?: string;
  created_at?: string;
  updated_at?: string;
  new_category?: string;
  payment_type?: string | undefined;
  installment_count?: number | undefined;
  is_recurrent?: boolean | undefined;
}
