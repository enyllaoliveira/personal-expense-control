import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DoughnutChartData } from "../../interfaces/doughnutChartData";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: DoughnutChartData;
}

const DoughnutChartComponent: React.FC<DoughnutChartProps> = ({ data }) => {
  return <Doughnut data={data} />;
};

export default DoughnutChartComponent;
