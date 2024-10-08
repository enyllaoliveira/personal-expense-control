import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const doughnutDataToRevenue = {
  labels: ["Emprego 1", "Emprego 1", "Lazer", "Educação", "Saúde", "Outros"],
  datasets: [
    {
      label: "Distribuição de Despesas",
      data: [500, 300, 200, 100, 80, 400],
      backgroundColor: [
        "rgba(0, 123, 255, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(75, 175, 235, 0.5)",
        "rgba(102, 178, 255, 0.5)",
        "rgba(153, 204, 255, 0.5)",
        "rgba(0, 102, 204, 0.5)",
      ],
      borderColor: [
        "rgba(0, 123, 255, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(102, 178, 255, 1)",
        "rgba(153, 204, 255, 1)",
        "rgba(0, 102, 204, 1)",
      ],
    },
  ],
};

export default function DoughnutChartComponent() {
  return <Doughnut data={doughnutDataToRevenue} />;
}
