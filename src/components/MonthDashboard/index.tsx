import { useState, useEffect } from "react";
import BarChart from "../Graphics/BarChart";
import { useApi } from "../../hooks/useApi";
import Income from "../../interfaces/income";
import { Expense } from "../../interfaces/expense";
import { TransactionFilter } from "../../interfaces/transactionFilterYear";
import { toast } from "react-toastify";
import InputComponent from "../Commons/InputComponent";

export default function Dashboard() {
  const api = new useApi();
  const [isSelectedMonth, setIsSelectedMonth] = useState(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartData, setCharData] = useState<TransactionFilter[]>([]);

  const months = [
    { label: "Janeiro", value: 1 },
    { label: "Fevereiro", value: 2 },
    { label: "Março", value: 3 },
    { label: "Abril", value: 4 },
    { label: "Maio", value: 5 },
    { label: "Junho", value: 6 },
    { label: "Julho", value: 7 },
    { label: "Agosto", value: 8 },
    { label: "Setembro", value: 9 },
    { label: "Outubro", value: 10 },
    { label: "Novembro", value: 11 },
    { label: "Dezembro", value: 12 },
  ];

  const searchForMonthlyData = async () => {
    try {
      const response = await api.getMonthData(isSelectedMonth, selectedYear);
      if (!response) {
        console.error("resposta indefinida.");
        return;
      }

      const { incomes, expenses } = response;
      const incomeTransactions: TransactionFilter[] = incomes.map(
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

      const expenseTransactions: TransactionFilter[] = expenses.map(
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

      setCharData([...incomeTransactions, ...expenseTransactions]);
    } catch (error) {
      toast.error("Erro ao buscar dados mensais. Tente novamente.", {
        autoClose: 2000,
      });
      throw error;
    }
  };

  useEffect(() => {
    if (isSelectedMonth && selectedYear) {
      searchForMonthlyData();
    }
  }, [isSelectedMonth, selectedYear]);

  return (
    <div>
      <label>
        Mês:
        <select
          value={isSelectedMonth}
          onChange={(e) => setIsSelectedMonth(Number(e.target.value))}
        >
          <option value="">Selecione o mês</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </label>

      <InputComponent
        label="Selecione o ano"
        type="number"
        name="year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        min={2000}
        max={new Date().getFullYear()}
      />

      {chartData.length > 0 ? (
        <>
          <BarChart
            transactions={chartData}
            title="Gráfico Mensal de Receitas e Despesas"
          />

          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Data</th>
                <th>Tipo</th>
                <th>Montante</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.description}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.type}</td>
                  <td>
                    {transaction.type === "Despesa" ? "-" : ""}
                    {transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Sem dados disponíveis para o gráfico e tabela</p>
      )}
    </div>
  );
}
