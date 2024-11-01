export interface Expense {
  id: string;
  userId: number | undefined;
  amount: string;
  description: string;
  payment_date: string;
  category_id: string;
  newCategorie: string;
  payment_type: string;
  installment_count: number;
  is_recurrent: boolean;
  created_at?: string;
  updated_at?: string;
}
