export default interface Income {
  id: number;
  userId: string;
  amount: string;
  description: string;
  date: string;
  created_at: string;
  isRecurrent?: boolean | undefined;
}
