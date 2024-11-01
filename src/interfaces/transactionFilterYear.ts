export interface TransactionFilter {
  id?: number | string;
  userId?: string;
  amount: number;
  description?: string;
  date: string;
  type: "Receita" | "Despesa";
}
