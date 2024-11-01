import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { TransactionFilter } from "../../interfaces/transactionFilterYear";

interface BarChartProps {
  transactions: TransactionFilter[];
  title: string;
  colorIncomes?: string;
  colorExpenses?: string;
  titleColor?: string;
  textColor?: string;
}

const BarChart = ({
  transactions,
  title,
  colorIncomes = "rgba(75, 192, 192, 0.6)",
  colorExpenses = "rgba(255, 99, 132, 0.6)",
  titleColor = "#333",
  textColor = "#666",
}: BarChartProps) => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);

  useEffect(() => {
    const incomeData = Array(12).fill(0);
    const expenseData = Array(12).fill(0);

    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).getMonth();
      if (transaction.type === "Receita") {
        incomeData[month] += transaction.amount;
      } else {
        expenseData[month] += transaction.amount;
      }
    });

    setChartData({
      labels: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      datasets: [
        {
          label: "Receitas",
          data: incomeData,
          backgroundColor: colorIncomes,
          borderColor: colorIncomes,
          borderWidth: 1,
        },
        {
          label: "Despesas",
          data: expenseData,
          backgroundColor: colorExpenses,
          borderColor: colorExpenses,
          borderWidth: 1,
        },
      ],
    });
  }, [transactions]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        color: titleColor,
        font: { size: 18 },
      },
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor,
        },
      },
    },
  };

  if (!chartData)
    return (
      <p className="font-semibold text-center my-auto">Carregando gráfico...</p>
    );

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
