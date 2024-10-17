import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const doughnutDataToExpense = {
  labels: ["Alimentação", "Transporte", "Lazer", "Educação", "Saúde", "Outros"],
  datasets: [
    {
      label: "Distribuição de Despesas",
      data: [500, 300, 200, 100, 80, 400],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 102, 102, 0.2)",
        "rgba(255, 178, 178, 0.2)",
        "rgba(255, 76, 76, 0.2)",
        "rgba(255, 140, 140, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 102, 102, 1)",
        "rgba(255, 178, 178, 1)",
        "rgba(255, 76, 76, 1)",
        "rgba(255, 140, 140, 1)",
      ],
    },
  ],
};

export default function DoughnutChartComponent() {
  return <Doughnut data={doughnutDataToExpense} />;
}
