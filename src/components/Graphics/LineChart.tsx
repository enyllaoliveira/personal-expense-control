import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface Transaction {
  amount: number;
  date: string;
}

interface LineChartProps {
  transactions: Transaction[];
  title: string;
  color?: string;
}

type ChartDataType = ChartData<"line", number[], string>;

const groupByMonth = (transactions: Transaction[]) => {
  const monthlyTotals: { [key: string]: number } = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (monthlyTotals[month]) {
      monthlyTotals[month] += transaction.amount;
    } else {
      monthlyTotals[month] = transaction.amount;
    }
  });

  const months = Object.keys(monthlyTotals);
  const totals = Object.values(monthlyTotals);

  return { months, totals };
};

const LineChart = ({
  transactions,
  title,
  color = "rgba(75, 192, 192, 1)",
}: LineChartProps) => {
  const [chartData, setChartData] = useState<ChartDataType | null>(null);

  useEffect(() => {
    const { months, totals } = groupByMonth(transactions);
    setChartData({
      labels: months,
      datasets: [
        {
          label: title,
          data: totals,
          borderColor: color,
          backgroundColor: `${color}33`,
          tension: 0.4,
        },
      ],
    });
  }, [transactions, title, color]);

  if (!chartData) return <p>Carregando gráfico...</p>;

  return <Line data={chartData} />;
};

export default LineChart;
