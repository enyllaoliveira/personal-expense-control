import { useState } from "react";
import ExpanseForm from "../../components/Forms/ExpenseForm";
import RevenueForm from "../../components/Forms/RevenueForm";
import CreditCardForm from "../../components/Forms/CreditCardForm";
import Button from "../../components/Commons/Button";

export default function MeuPainel() {
  const [activeTab, setActiveTab] = useState("receitas");

  const renderContent = () => {
    switch (activeTab) {
      case "receitas":
        return <ExpanseForm />;
      case "despesas":
        return <RevenueForm />;
      case "cartao":
        return <CreditCardForm />;
      default:
        return null;
    }
  };

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
        >
          {" "}
          Sair do sistema{" "}
        </Button>
      </div>

      <div className="mt-4">{renderContent()}</div>
    </main>
  );
}
