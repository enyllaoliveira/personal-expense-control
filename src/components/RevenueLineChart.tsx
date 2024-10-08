import { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueLineChart() {
  const chartRef = useRef<ChartJS | null>(null);

  const data = {
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
        type: "bar" as const,
        label: "Despesas",
        data: [
          1200, 1900, 3000, 500, 2000, 1800, 2200, 1500, 2500, 2100, 2300, 2400,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(65, 105, 225, 1)",
        borderWidth: 1,
      },
      {
        type: "line" as const,
        label: "Evolução Receitas",
        data: [
          1000, 1700, 2800, 400, 1800, 1600, 2100, 1400, 2300, 2000, 2200, 2300,
        ],
        borderColor: "#4169E1",
        backgroundColor: "rgba(135, 206, 235, 1)",
        pointBackgroundColor: "#4169E1",
        pointBorderColor: "#fff",
        pointRadius: 5,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar" | "line">) {
            const value = context.raw as number;
            return `R$ ${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (tickValue: string | number) => {
            if (typeof tickValue === "number") {
              return `R$ ${tickValue}`;
            }
            return tickValue;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "400px", width: "100%" }}>
      <Chart ref={chartRef} type="bar" data={data} options={options} />
    </div>
  );
}
