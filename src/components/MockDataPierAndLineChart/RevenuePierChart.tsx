import { ChartData } from "chart.js";

export const doughnutDataToRevenue: ChartData<"doughnut", number[], unknown> = {
  labels: [
    "Aluguel",
    "Alimentação",
    "Transporte",
    "Plano de saúde",
    "Educação",
    "Lazer",
  ],
  datasets: [
    {
      label: "Distribuição das Despesas",
      data: [500, 300, 200, 100, 80, 400],
      backgroundColor: [
        "rgba(255, 80, 110, 0.6)",
        "rgba(255, 180, 190, 0.6)",
        "rgba(240, 50, 80, 0.6)",
        "rgba(255, 130, 160, 0.6)",
        "rgba(200, 30, 60, 0.6)",
        "rgba(255, 210, 220, 0.6)",
      ],
      borderColor: [
        "rgba(255, 80, 110, 1)",
        "rgba(255, 180, 190, 1)",
        "rgba(240, 50, 80, 1)",
        "rgba(255, 130, 160, 1)",
        "rgba(200, 30, 60, 1)",
        "rgba(255, 210, 220, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
