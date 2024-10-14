import { useState } from "react";
import ExpanseForm from "../../components/Forms/ExpenseForm";
import RevenueForm from "../../components/Forms/RevenueForm";
import CreditCardForm from "../../components/Forms/CreditCardForm";

export default function MeuPainel() {
  const [activeTab, setActiveTab] = useState("dashboard");

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
    <div className="w-full">
      <div className="border-b flex justify-between mt-16">
        <nav className="flex space-x-4 gap-24">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-12 py-2 ${
              activeTab === "dashboard" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("receitas")}
            className={`px-12 py-2 ${
              activeTab === "receitas" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Receitas
          </button>
          <button
            onClick={() => setActiveTab("despesas")}
            className={`px-12 py-2 ${
              activeTab === "despesas" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Despesas
          </button>
          <button
            onClick={() => setActiveTab("cartao")}
            className={`px-12 py-2 ${
              activeTab === "cartao" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Cartão de Crédito
          </button>
        </nav>
        <button className="px-4 py-2"> Sair do sistema </button>
      </div>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
