import { useDataInformation } from "../../context/DataContext/DataContext";
import DoughnutChartComponent from "../MockDataPierAndLineChart/ExpensePierChat";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useEffect, useState } from "react";
import Button from "../Commons/Button";
import EditIncomeModal from "../Modal/Incomes/EditIncomes/index";

export default function IncomeForm() {
  const {
    setFormDataIncome,
    incomes,
    handleChangeIncome,
    handleAddIncome,
    formDataIncome,
    formatIncomesForChart,
    handleGetIncomes,
  } = useDataInformation();
  const userContext = AuthContext();
  const user = userContext?.user;
  const [isListIncomeModalOpen, setIsListIncomeOModalpen] = useState(false);

  const handleOpenListModalIncome = () => setIsListIncomeOModalpen(true);

  useEffect(() => {
    if (user?.id) handleGetIncomes(user?.id);
  }, [user]);

  return (
    <main className="flex gap-4 sm:flex-col px-4">
      {incomes.length > 0 ? (
        <div className="w-[700px] sm:px-4 sm:w-full">
          <DoughnutChartComponent data={formatIncomesForChart(incomes)} />
        </div>
      ) : (
        <p className="text-center mx-auto my-auto">
          Adicione uma despesa para criar seu gráfico.
        </p>
      )}

      <div className="w-1/3 ml-auto sm:w-full ">
        <h2 className="text-xl font-bold mb-4">Adicionar Receita</h2>
        <form
          id="income-form"
          className="text-start mb-6"
          onSubmit={handleAddIncome}
        >
          <div className="mb-4 text-primary-gray-600">
            <label
              htmlFor="value"
              className="block text-normal font-semibold text-primary-gray-600"
            >
              Valor:
            </label>
            <input
              type="number"
              name="amount"
              value={formDataIncome.amount}
              onChange={handleChangeIncome}
              required
              className="mt-1 block w-full border rounded-md p-2 text-black"
              placeholder="Insira o valor"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-normal font-semibold text-primary-gray-600"
            >
              Descrição:
            </label>
            <textarea
              name="description"
              value={formDataIncome.description}
              onChange={handleChangeIncome}
              required
              className="mt-1 block w-full border rounded p-2 text-black"
              placeholder="Descrição da receita"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="receipt_date"
              className="block text-normal font-semibold text-primary-gray-600"
            >
              Data de Recebimento:
            </label>
            <input
              type="date"
              name="receipt_date"
              value={formDataIncome.receipt_date || ""}
              onChange={handleChangeIncome}
              required
              className="mt-1 block w-full border rounded p-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="flex gap-2 h-8 text-start items-center sm:justify-start whitespace-nowrap">
              Receita Recorrente?
              <input
                type="checkbox"
                name="isRecurrent"
                className="text-black my-auto size-4 sm:size-3"
                checked={formDataIncome.isRecurrent}
                onChange={(e) =>
                  setFormDataIncome((income) => ({
                    ...income,
                    isRecurrent: e.target.checked,
                  }))
                }
              />
            </label>
          </div>
          <Button variant="primary" type="submit" className="w-full">
            Adicionar Receita
          </Button>

          <Button
            variant="secondary"
            className="ml-auto mt-2 sm:mt-4"
            onClick={handleOpenListModalIncome}
            type="button"
          >
            {" "}
            Gerenciar receitas
          </Button>
        </form>
      </div>

      {isListIncomeModalOpen && (
        <EditIncomeModal onClose={() => setIsListIncomeOModalpen(false)} />
      )}
    </main>
  );
}
