import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./App.css";
import ExpenseLineChart from "./components/ExpenseLineChart";
import { doughnutDataToExpense } from "./components/ExpensePierChat";
import { stackedBarData, stackedOptions } from "./components/CreditCardControl";
import RevenueLineChart from "./components/RevenueLineChart";
import { doughnutDataToRevenue } from "./components/RevenuePierChat";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mx-auto">
      <div className="flex items-center">
        <div className="w-full md:w-1/2 p-4">
          <ExpenseLineChart />
        </div>

        <div
          className="w-full md:w-1/2 p-4"
          style={{ position: "relative", height: "400px", width: "100%" }}
        >
          <Doughnut data={doughnutDataToExpense} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full md:w-1/2 p-4">
          <RevenueLineChart />
        </div>

        <div
          className="w-full md:w-1/2 p-4"
          style={{ position: "relative", height: "400px", width: "100%" }}
        >
          <Doughnut data={doughnutDataToRevenue} />
        </div>
    
      </div>
      </div>
      
     
      <div className="mx-auto w-full">
        <Bar data={stackedBarData} options={stackedOptions} />;
      </div>
    </div>
  );
}

export default App;
