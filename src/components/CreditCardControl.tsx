export const stackedBarData = {
  labels: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  datasets: [
    {
      label: "Cartão de crédito",
      data: [400, 500, 600, 700, 800, 900, 400, 500, 600, 700, 800, 900],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(65, 105, 225, 1)  ",
    },
  ],
};

export const stackedOptions = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
};
