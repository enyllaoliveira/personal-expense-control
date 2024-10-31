import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

interface Transaction {
  amount: number;
  date: string;
}

interface BarChartProps {
  transactions: Transaction[];
  title: string;
  color?: string;
  titleColor?: string;
  textColor?: string;
}

type ChartDataType = ChartData<"bar", number[], string>;

const groupByMonth = (transactions: Transaction[]) => {
  const monthlyTotals: { [key: string]: number } = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", { month: "short" });
    monthlyTotals[month] += transaction.amount;
  });

  return {
    months: Object.keys(monthlyTotals),
    totals: Object.values(monthlyTotals),
  };
};

const BarChart = ({
  transactions,
  title,
  color = "#ffffff",
  titleColor = "#ffffff",
  textColor = "#000000",
}: BarChartProps) => {
  const [chartData, setChartData] = useState<ChartDataType | null>(null);

  useEffect(() => {
    const { months, totals } = groupByMonth(transactions);
    setChartData({
      labels: months,
      datasets: [
        {
          label: title,
          data: totals,
          backgroundColor: `${color}99`,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    });
  }, [transactions, title, color]);

  if (!chartData)
    return (
      <p className="text-white font-semibold text-center">
        Carregando gráfico...
      </p>
    );

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        color: titleColor,
        font: {
          size: 18,
        },
      },
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        type: "category",
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

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
