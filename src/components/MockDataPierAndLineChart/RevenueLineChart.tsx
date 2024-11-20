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
  LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartDataset } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

interface RevenueLineChartProps {
  data?: {
    labels: string[];
    datasets: ChartDataset<"bar" | "line">[];
  };
}

const defaultData = {
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
      label: "Receitas",
      data: [
        1200, 1900, 3000, 500, 2000, 1800, 2200, 1500, 2500, 2100, 2300, 2400,
      ],
      backgroundColor: "rgba(55, 172, 182, 0.6)",
      borderColor: "rgba(105, 212, 202, 0.6)",
      borderWidth: 1,
    },
    {
      type: "line" as const,
      label: "Evolução Receitas",
      data: [
        1000, 1700, 2800, 400, 1800, 1600, 2100, 1400, 2300, 2000, 2200, 2300,
      ],
      borderColor: "rgba(75, 192, 192, 0.6)",
      backgroundColor: "rgba(135, 206, 235, 1)",
      pointBackgroundColor: "rgba(75, 192, 192, 0.6)",
      pointBorderColor: "#fff",
      pointRadius: 0,
      fill: false,
      tension: 0.1,
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

export default function RevenueLineChart({
  data = defaultData,
}: RevenueLineChartProps) {
  const chartRef = useRef<ChartJS | null>(null);

  return (
    <div style={{ position: "relative", height: "400px", width: "100%" }}>
      <Chart ref={chartRef} type="bar" data={data} options={options} />
    </div>
  );
}
