import React from "react";
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
        "rgba(0, 123, 255, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(75, 175, 235, 0.5)",
      ],
      borderColor: [
        "rgba(0, 123, 255, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
      ],
    },
  ],
};

export default function DoughnutChartComponent() {
  return <Doughnut data={doughnutDataToIncome} />;
}
