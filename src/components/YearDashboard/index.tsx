import { useState, useEffect } from "react";
import BarChart from "../Graphics/BarChart";
import { useApi } from "../../hooks/useApi";
import Income from "../../interfaces/income";
import { Expense } from "../../interfaces/expense";
import { TransactionFilter } from "../../interfaces/transactionFilterYear";

export default function YearDashboard() {
  const api = new useApi();
  const [isSelectedYear, setIsSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [dadosGrafico, setDadosGrafico] = useState<TransactionFilter[]>([]);

  const searchAnnualChart = async () => {
    try {
      const response = await api.getYearData(isSelectedYear);
      if (response && response.incomes && response.expenses) {
        const incomeTransactions: TransactionFilter[] = response.incomes.map(
          (income: Income) => ({
            id: income.id,
            userId: income.userId,
            amount:
              typeof income.amount === "string"
                ? parseFloat(income.amount)
                : income.amount,
            description: income.description,
            date: income.date,
            type: "Receita",
          })
        );

        const expenseTransactions: TransactionFilter[] = response.expenses.map(
          (expense: Expense) => ({
            id: expense.id,
            userId: expense.userId,
            amount:
              typeof expense.amount === "string"
                ? parseFloat(expense.amount)
                : expense.amount,
            description: expense.description,
            date: expense.payment_date || "",
            type: "Despesa",
          })
        );

        setDadosGrafico([...incomeTransactions, ...expenseTransactions]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSelectedYear) {
      searchAnnualChart();
    }
  }, [isSelectedYear]);

  return (
    <div className="px-4 flex flex-col gap-4 my-12">
      <div className="bg-slate-200 max-w-[500px] mx-auto px-8 py-2 rounded-2xl">
        <label className="flex gap-4 text-center justify-center h-8 items-center">
          Selecione o ano:{" "}
          <input
            type="number"
            value={isSelectedYear}
            onChange={(e) => setIsSelectedYear(parseInt(e.target.value))}
            min="2000"
            max={new Date().getFullYear()}
            className="text-black w-20 px-2 h-8 border border-slate-400 bg-slate-200 rounded-lg"
          />
        </label>
      </div>

      {dadosGrafico.length > 0 ? (
        <BarChart
          transactions={dadosGrafico}
          title="Gráfico anual de receitas e despesas"
          textColor="#201F1B"
          titleColor="#201F1B"
        />
      ) : (
        <p>Sem dados disponíveis para o gráfico</p>
      )}
    </div>
  );
}
