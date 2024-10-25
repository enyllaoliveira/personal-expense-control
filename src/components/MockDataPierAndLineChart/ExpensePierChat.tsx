import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DoughnutChartData } from "../../interfaces/doughnutChartData";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChartComponent({
  data,
}: {
  data: DoughnutChartData;
}) {
  return <Doughnut data={data} />;
}
