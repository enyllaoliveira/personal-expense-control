import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const doughnutDataToIncome = {
  labels: ["Salário", "Freelas", "Aplicações financeiras"],
  datasets: [
    {
      label: "Distribuição das Receitas",
      data: [500, 300, 200],
      backgroundColor: [
        "rgba(75, 192, 192, 0.6)",
        "rgba(95, 202, 192, 0.6)",
        "rgba(45, 162, 172, 0.6)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(95, 202, 192, 1)",
        "rgba(45, 162, 172, 1)",
      ],
    },
  ],
};

export default function DoughnutChartComponent() {
  return <Doughnut data={doughnutDataToIncome} />;
}
