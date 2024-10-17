import ExpenseLineChart from "../../components/ExpenseLineChart";
import { doughnutDataToExpense } from "../../components/Forms/ExpensePierChatMock";
import {
  stackedBarData,
  stackedOptions,
} from "../../components/CreditCardControl";
import RevenueLineChart from "../../components/RevenueLineChart";
import { doughnutDataToRevenue } from "../../components/RevenuePierChat";
import RootLayout from "../../layout";
import { Bar, Doughnut } from "react-chartjs-2";

export default function Dashboard() {
  return (
    <div>
      <RootLayout>
        <div className="flex flex-col">
          <div className="flex justify-between mx-auto">
            <div className="flex items-center">
              <div className="w-full md:w-1/2 p-2">
                <ExpenseLineChart />
              </div>

              <div
                className="w-full md:w-1/2 p-2"
                style={{ position: "relative", height: "400px", width: "100%" }}
              >
                <Doughnut data={doughnutDataToExpense} />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full md:w-1/2 p-2">
                <RevenueLineChart />
              </div>

              <div
                className="w-full md:w-1/2 p-2"
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
    </div>
  );
}
