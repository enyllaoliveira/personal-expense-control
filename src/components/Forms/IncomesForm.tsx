import { useDataInformation } from "../../context/DataContext/DataContext";
import DoughnutChartComponent from "../MockDataPierAndLineChart/ExpenseAndIncomesPierChat";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useEffect, useState } from "react";
import Button from "../Commons/Button";
import EditIncomeModal from "../Modal/Incomes/EditIncomes/index";
import { Transaction } from "../../interfaces/transaction";
import InputComponent from "../Commons/InputComponent";
import TextArea from "../Commons/TextArea";
// import ChartComponent from "../Graphics/LineChart";

export default function IncomeForm() {
  const {
    setFormDataIncome,
    incomes,
    handleChangeIncome,
    handleAddIncome,
    formDataIncome,
    formatIncomesForChart,
    handleGetIncomes,
    addTransaction,
    // filterTransactions,
  } = useDataInformation();

  const userContext = AuthContext();
  const user = userContext?.user;

  const [isListIncomeModalOpen, setIsListIncomeModalOpen] = useState(false);

  const handleOpenListModalIncome = () => setIsListIncomeModalOpen(true);

  useEffect(() => {
    if (user?.id) handleGetIncomes(user.id);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction: Transaction = {
      amount: parseFloat(formDataIncome.amount),
      date: formDataIncome.receipt_date,
      type: "income",
    };

    addTransaction(newTransaction);

    await handleAddIncome(formDataIncome);

    setFormDataIncome((prev) => ({
      ...prev,
      id: "",
      amount: "",
      description: "",
      receipt_date: "",
      isRecurrent: false,
    }));
  };
  return (
    <main className="flex flex-col gap-4 sm:flex-col px-4 my-8">
      <div className="flex sm:flex-col">
        {incomes.length > 0 ? (
          <div className="w-[700px] sm:px-4 sm:w-full">
            <DoughnutChartComponent data={formatIncomesForChart(incomes)} />
          </div>
        ) : (
          <p className="text-center mx-auto my-auto">
            Adicione uma receita para criar seu gráfico.
          </p>
        )}

        <div className="w-1/3 ml-auto sm:w-full ">
          <h2 className="text-xl font-bold mb-4">Adicionar Receita</h2>
          <form
            id="income-form"
            className="text-start mb-6"
            onSubmit={handleSubmit}
          >
            <InputComponent
              label=" Valor"
              type="number"
              name="amount"
              value={formDataIncome.amount}
              onChange={handleChangeIncome}
              required
              placeholder="Insira o valor"
            />

            <TextArea
              label="Descrição"
              name="description"
              value={formDataIncome.description}
              onChange={handleChangeIncome}
              required
              placeholder="Descrição da receita"
            />

            <InputComponent
              label="Data de Recebimento"
              type="date"
              name="receipt_date"
              value={formDataIncome.receipt_date || ""}
              onChange={handleChangeIncome}
              required
            />

            <InputComponent
              label=" Receita Recorrente?"
              className="flex whitespace-nowrap w-20 h-10 gap-2 items-center"
              type="checkbox"
              name="isRecurrent"
              checked={formDataIncome.isRecurrent}
              onChange={(e) =>
                setFormDataIncome((income) => ({
                  ...income,
                  isRecurrent: e.target.checked,
                }))
              }
            />
            <Button variant="primary" type="submit" className="w-full">
              Adicionar Receita
            </Button>
            {incomes.length > 0 && (
              <Button
                variant="secondary"
                className="ml-auto mt-2 sm:mt-4"
                onClick={handleOpenListModalIncome}
                type="button"
              >
                Gerenciar receitas
              </Button>
            )}
          </form>
        </div>

        {isListIncomeModalOpen && (
          <EditIncomeModal onClose={() => setIsListIncomeModalOpen(false)} />
        )}
      </div>

      {/* <ChartComponent
        transactions={filterTransactions("income")}
        title="Receitas mensais"
        type="bar"
      /> */}
    </main>
  );
}
