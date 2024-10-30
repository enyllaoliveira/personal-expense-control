import { useState } from "react";
import { formatDate } from "../../utils/FormattedValues";
import { useDataInformation } from "../../context/DataContext/DataContext";
import Button from "../Commons/Button";
import DoughnutChartComponent from "../Graphics/PierChart";
import EditCrediCardExpensesModal from "../Modal/Expenses/EditCreditCardExpenses";
import LineChart from "../Graphics/LineChart";
import { Transaction } from "../../interfaces/transaction";

const CreditForm = () => {
  const {
    handleAddExpense,
    categories,
    expenses,
    formatIncomesForChartToExpense,
    groupExpensesByDescriptionToGraphics,
    addTransaction,
    filterTransactions,
  } = useDataInformation();

  const [isListExpenseModalOpen, setIsListExpenseModalOpen] = useState(false);

  const handleOpenListModalExpense = () => setIsListExpenseModalOpen(true);

  const [formDataExpenses, setFormDataExpenses] = useState({
    id: "",
    userId: undefined,
    amount: "",
    description: "",
    payment_date: formatDate(new Date()),
    category_id: "",
    newCategorie: "",
    payment_type: "cartao_credito",
    installment_count: 1,
    is_recurrent: false,
  });

  const handleChangeExpenses = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormDataExpenses((expense) => ({
      ...expense,
      [name]: value,
    }));
  };

  const expensesCard = groupExpensesByDescriptionToGraphics(
    expenses.filter((expense) => expense.payment_type === "cartao_credito")
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formDataExpenses.category_id) {
      console.error("Selecione uma categoria válida.");
      return;
    }

    const newTransaction: Transaction = {
      amount: parseFloat(formDataExpenses.amount),
      date: formDataExpenses.payment_date,
      type: "credit",
    };

    addTransaction(newTransaction);
    handleAddExpense(formDataExpenses);

    setFormDataExpenses({
      id: "",
      userId: undefined,
      amount: "",
      description: "",
      payment_date: formatDate(new Date()),
      category_id: "",
      newCategorie: "",
      payment_type: "cartao_credito",
      installment_count: 1,
      is_recurrent: false,
    });
  };
  return (
    <main className="flex flex-col gap-4 sm:flex-col px-4 my-8 overflow-y-visible">
      <div className="flex">
        <div className="w-[700px] sm:px-4 sm:w-full">
          {expensesCard.length > 0 ? (
            <DoughnutChartComponent
              data={formatIncomesForChartToExpense(expensesCard)}
            />
          ) : (
            <p>Nenhuma despesa disponível para exibir no gráfico.</p>
          )}
        </div>
        <div className="w-1/3 ml-auto sm:w-full ">
          <h2 className="text-xl font-bold mb-4">Adicionar Despesa</h2>

          <form
            onSubmit={handleSubmit}
            className="text-start mb-6"
            id="expense-credit-card-form"
          >
            <div className="mb-4 text-white">
              <label
                htmlFor="amount"
                className="block text-normal font-semibold text-primary-gray-600"
              >
                Valor:
              </label>
              <input
                type="number"
                name="amount"
                value={formDataExpenses.amount}
                onChange={handleChangeExpenses}
                required
                className="mt-1 block w-full border rounded-md p-2 text-black"
                placeholder="Insira o valor"
              />
            </div>

            <div className="mb-4 text-white">
              <label
                htmlFor="description"
                className="block text-normal font-semibold text-primary-gray-600"
              >
                Descrição:
              </label>
              <input
                type="text"
                name="description"
                value={formDataExpenses.description}
                onChange={handleChangeExpenses}
                required
                className="mt-1 block w-full border rounded-md p-2 text-black"
                placeholder="Descrição da despesa"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="payment_date"
                className="block text-normal font-semibold text-primary-gray-600"
              >
                Data de Pagamento:
              </label>
              <input
                type="date"
                name="payment_date"
                value={formDataExpenses.payment_date}
                onChange={handleChangeExpenses}
                required
                className="mt-1 block w-full border rounded-md p-2 text-black"
              />
            </div>

            <label>Categoria:</label>
            <select
              name="category_id"
              value={formDataExpenses.category_id}
              className="w-full border p-2 mb-4 text-primary-gray-800 rounded-md font-semibold"
              onChange={handleChangeExpenses}
            >
              <option value="">Selecione uma opção</option>
              {categories
                .filter((category) => category.type === "cartao")
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <div className="flex sm:flex-col justify-between mx-auto">
              <div className="flex gap-4 sm:gap-1 mb-4 h-8 sm:h-6">
                <label className="flex text-start justify-center items-center whitespace-nowrap">
                  Número de Parcelas:
                </label>
                <input
                  type="number"
                  name="installment_count"
                  value={formDataExpenses.installment_count}
                  min={1}
                  onChange={handleChangeExpenses}
                  required
                  className="text-black rounded-md w-16 sm:w-12 pl-2"
                />
              </div>

              <div className="mb-4 ">
                <label className="flex gap-2 h-8 text-start justify-center items-center sm:justify-start whitespace-nowrap">
                  Despesa recorrente?
                  <input
                    type="checkbox"
                    name="is_recurrent"
                    checked={formDataExpenses.is_recurrent}
                    className="text-black my-auto size-4 sm:size-3"
                    onChange={(e) =>
                      setFormDataExpenses((expense) => ({
                        ...expense,
                        is_recurrent: e.target.checked,
                      }))
                    }
                  />
                </label>
              </div>
            </div>

            <Button variant="primary" type="submit" className="w-full">
              Adicionar Despesa do Cartão
            </Button>
            <Button
              variant="secondary"
              className="ml-auto mt-2 sm:mt-4"
              onClick={handleOpenListModalExpense}
              type="button"
            >
              {" "}
              Gerenciar despesas
            </Button>
          </form>
        </div>
      </div>
      <LineChart
        transactions={filterTransactions("credit")}
        title="Gastos mensais com cartão de crédito"
      />
      {isListExpenseModalOpen && (
        <EditCrediCardExpensesModal
          onClose={() => setIsListExpenseModalOpen(false)}
        />
      )}
    </main>
  );
};

export default CreditForm;
