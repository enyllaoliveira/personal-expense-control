import { useState } from "react";
import ExpensesForm from "../../components/Forms/ExpensesForm";
import IncomeForm from "../../components/Forms/IncomesForm";
import CreditCardForm from "../../components/Forms/CreditCardForm";
import Button from "../../components/Commons/Button";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Dashboard from "../../components/YearDashboard";

export default function MeuPainel() {
  const userContext = AuthContext();

  const [activeTab, setActiveTab] = useState("dashboard");
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "receitas":
        return <IncomeForm />;
      case "despesas":
        return <ExpensesForm />;
      case "cartao":
        return <CreditCardForm />;
      default:
        return null;
    }
  };
  const logout = userContext?.logout;

  return (
    <main className="w-full  text-white font-semibold sm:font-extralight">
      <div className="border-b flex justify-between mt-16 sm:mt-4 ">
        <nav className="flex gap-24 sm:gap-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-12 sm:px-2 py-2 ${
              activeTab === "dashboard"
                ? "border-b-2 border-primary-orange-100 bg-slate-200 text-black rounded-t-sm sm:font-medium font-bold px-20"
                : ""
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("receitas")}
            className={`px-24 sm:px-2 py-2 ${
              activeTab === "receitas"
                ? "border-b-2 border-primary-orange-100 bg-slate-200 text-black rounded-t-sm sm:font-medium font-bold px-20"
                : ""
            }`}
          >
            Receitas
          </button>
          <button
            onClick={() => setActiveTab("despesas")}
            className={`px-12 sm:px-2 py-2 ${
              activeTab === "despesas"
                ? "border-b-2 border-primary-orange-100 bg-slate-200 text-black rounded-t-sm sm:font-medium font-bold px-20"
                : ""
            }`}
          >
            Despesas
          </button>
          <button
            onClick={() => setActiveTab("cartao")}
            className={`px-12 sm:px-2 py-2 whitespace-normal ${
              activeTab === "cartao"
                ? "border-b-2 border-primary-orange-100 bg-slate-200 text-black rounded-t-sm sm:font-medium font-bold px-20"
                : ""
            }`}
          >
            Cartão de Crédito
          </button>
        </nav>
        <Button
          variant="secondary"
          className="px-4 sm:px-2 py-2 sm:hidden mb-1"
          onClick={logout}
        >
          {" "}
          Sair do sistema{" "}
        </Button>
      </div>

      <div className="mt-4">{renderContent()}</div>
    </main>
  );
}
