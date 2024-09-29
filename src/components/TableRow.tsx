import React from "react";
import { Expense } from "../interfaces";

interface TableRowProps {
  expense: Expense;
}
export default function TableRow({ expense }: TableRowProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <span className="font-medium">{expense.month}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <span>R$ {expense.amount.toFixed(2)} oi</span>
      </td>
    </tr>
  );
}
