export default interface Income {
  id: string;
  userId: number | string;
  amount: string;
  description: string;
  receipt_date: string;
  isRecurrent: boolean;
  date?: string;
  created_at?: string;
}
