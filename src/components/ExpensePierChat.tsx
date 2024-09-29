import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const doughnutDataToExpense = {
  labels: ['Alimentação', 'Transporte', 'Lazer', 'Educação', 'Saúde', 'Outros'],
  datasets: [
    {
      label: 'Distribuição de Despesas',
      data: [500, 300, 200, 100, 80, 400],  
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
    },
  ],
};

export default function DoughnutChartComponent() {
  return (
      <Doughnut data={doughnutDataToExpense} />
  );
}