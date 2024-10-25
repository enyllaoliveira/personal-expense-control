import ExpenseLineChart from "../../components/MockDataPierAndLineChart/ExpenseLineChart";
import { doughnutDataToExpense } from "../../components/Forms/ExpensePierChatMock";
import {
  stackedBarData,
  stackedOptions,
} from "../../components/MockDataPierAndLineChart/CreditCardControl";
import RevenueLineChart from "../../components/MockDataPierAndLineChart/RevenueLineChart";
import { doughnutDataToRevenue } from "../../components/MockDataPierAndLineChart/RevenuePierChat";
import RootLayout from "../../layout";
import { Bar, Doughnut } from "react-chartjs-2";

export default function Dashboard() {
  return (
    <RootLayout>
      <div className="flex flex-col overflow-auto mx-auto my-12 sm:my-4">
        <div className="flex sm:flex-col justify-between mx-auto gap-36 sm:gap-1">
          <div className="flex sm:flex-col items-center">
            <div className="w-full sm:w-full md:w-1/2">
              {" "}
              <ExpenseLineChart />
            </div>
            <div
              className="w-full sm:w-full md:w-1/2 justify-center items-center flex"
              style={{ position: "relative", height: "400px", width: "100%" }}
            >
              <Doughnut data={doughnutDataToExpense} />
            </div>
          </div>
          <div className="flex sm:flex-col items-center">
            <div className="w-full sm:w-full md:w-1/2 justify-center items-center flex">
              <RevenueLineChart />
            </div>

            <div
              className="w-full sm:w-full md:w-1/2 justify-center items-center flex"
              style={{ position: "relative", height: "400px", width: "100%" }}
            >
              <Doughnut data={doughnutDataToRevenue} />
            </div>
          </div>
        </div>

        <div className="mx-auto w-full">
          <Bar data={stackedBarData} options={stackedOptions} />
        </div>
      </div>
    </RootLayout>
  );
}
