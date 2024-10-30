export interface Transaction {
  amount: number;
  date: string;
  type: "income" | "expense" | "credit";
}
