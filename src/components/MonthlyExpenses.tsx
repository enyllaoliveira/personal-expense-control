import { monthlyData } from "../data/monthlyData";
import { Expense } from "../interfaces";
import TableRow from "./TableRow";

export default function MonthlyExpenses() {
  return (
    <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
          <th className="py-3 px-6 text-left"> Mês</th>
          <th className="py-3 px-6 text-left"> Gastos</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {monthlyData.map((expense: Expense, index: number) => (
          <TableRow key={index} expense={expense} />
        ))}
      </tbody>
    </table>
  );
}
