import { useState, useEffect } from "react";
import BarChart from "../Graphics/BarChart";
import { useApi } from "../../hooks/useApi";
import Income from "../../interfaces/income";
import { Expense } from "../../interfaces/expense";
import { TransactionFilter } from "../../interfaces/transactionFilterYear";
import InputComponent from "../Commons/InputComponent";
import Button from "../Commons/Button";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export default function YearDashboard() {
  const userContext = AuthContext();

  const logout = userContext?.logout;

  const api = new useApi();
  const [isSelectedYear, setIsSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [dadosGrafico, setDadosGrafico] = useState<TransactionFilter[]>([]);

  const searchAnnualChart = async () => {
    try {
      const response = await api.getYearData(isSelectedYear);
      if (response && response.incomes && response.expenses) {
        const incomeTransactions: TransactionFilter[] =
          response.incomes.flatMap((income: Income) => {
            const transactions = [];
            const date = new Date(income.date || new Date());
            const endOfYear = new Date(isSelectedYear, 11, 31);

            if (income.isRecurrent) {
              while (
                date.getFullYear() === isSelectedYear &&
                date <= endOfYear
              ) {
                transactions.push({
                  id: income.id,
                  userId: income.userId,
                  amount:
                    typeof income.amount === "string"
                      ? parseFloat(income.amount)
                      : income.amount,
                  description: income.description,
                  date: date.toISOString().split("T")[0],
                  type: "Receita",
                });
                date.setMonth(date.getMonth() + 1);
              }
            } else {
              transactions.push({
                id: income.id,
                userId: income.userId,
                amount:
                  typeof income.amount === "string"
                    ? parseFloat(income.amount)
                    : income.amount,
                description: income.description,
                date: income.date || "",
                type: "Receita",
              });
            }

            return transactions;
          });

        const expenseTransactions: TransactionFilter[] =
          response.expenses.flatMap((expense: Expense) => {
            const transactions = [];
            const date = new Date(expense.payment_date || new Date());
            const endOfYear = new Date(isSelectedYear, 11, 31);

            if (expense.is_recurrent) {
              while (
                date.getFullYear() === isSelectedYear &&
                date <= endOfYear
              ) {
                transactions.push({
                  id: expense.id,
                  userId: expense.userId,
                  amount:
                    typeof expense.amount === "string"
                      ? parseFloat(expense.amount)
                      : expense.amount,
                  description: expense.description,
                  date: date.toISOString().split("T")[0],
                  type: "Despesa",
                });
                date.setMonth(date.getMonth() + 1);
              }
            } else {
              transactions.push({
                id: expense.id,
                userId: expense.userId,
                amount:
                  typeof expense.amount === "string"
                    ? parseFloat(expense.amount)
                    : expense.amount,
                description: expense.description,
                date: expense.payment_date || "",
                type: "Despesa",
              });
            }

            return transactions;
          });

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
    <div className="px-4 flex flex-col gap-28 my-12">
      <div className="bg-slate-200 max-w-[500px] mx-auto px-8 py-2 rounded-2xl">
        <InputComponent
          label="Selecione o ano:"
          className="flex gap-2 whitespace-nowrap justify-center text-center items-center"
          type="number"
          name="year"
          value={isSelectedYear}
          onChange={(e) => setIsSelectedYear(parseInt(e.target.value))}
          min={2000}
          max={new Date().getFullYear()}
        />
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

      <Button
        variant="secondary"
        className="px-4 sm:px-2 md:px-6 tablet:px-6 lg:px-8 py-2 sm:block hidden whitespace-nowrap mt-auto"
        onClick={logout}
      >
        Sair do sistema
      </Button>
    </div>
  );
}
