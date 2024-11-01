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
      } else {
        console.error(
          "Erro: Estrutura de dados inesperada na resposta da API."
        );
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
    <div className="px-4 flex flex-col gap-12 my-12">
      <label className="flex gap-4 text-center justify-center h-8 items-center">
        Selecione o ano:{" "}
        <input
          type="number"
          value={isSelectedYear}
          onChange={(e) => setIsSelectedYear(parseInt(e.target.value))}
          min="2000"
          max={new Date().getFullYear()}
          className="text-black w-20 px-1 h-8 rounded "
        />
      </label>
      <div className="my-auto flex items-center justify-center h-screen mt-0">
        {dadosGrafico.length > 0 ? (
          <BarChart
            transactions={dadosGrafico}
            title="Gráfico Anual de Receitas e Despesas"
            textColor="#ffffff"
            titleColor="#ffffff"
          />
        ) : (
          <p>Sem dados disponíveis para o gráfico</p>
        )}
      </div>
    </div>
  );
}
