import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default ChartJS;
