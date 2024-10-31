export interface Transaction {
  amount: number;
  date: string;
  type: "income" | "expense" | "credit";
  isRecurrent?: boolean;
  recurrenceCount?: number;
}
