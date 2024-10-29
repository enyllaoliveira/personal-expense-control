import { useDataInformation } from "../../context/DataContext/DataContext";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import DoughnutChartComponent from "../MockDataPierAndLineChart/ExpensePierChat";
import Button from "../Commons/Button";
import EditExpensesModal from "../Modal/Expenses/EditExpenses";
export default function ExpensesForm() {
  const {
    expenses,
    handleChangeExpenses,
    handleAddExpense,
    handleEditExpense,
    formDataExpenses,
    editingExpense,
    handleGetExpense,
    categories,
    formatIncomesForChartToExpense,
    fetchCategories,
    setFormDataExpenses,
    groupExpensesByDescriptionToGraphics,
  } = useDataInformation();
  const userContext = AuthContext();
  const user = userContext?.user;
  const [isListExpenseModalOpen, setIsListExpenseOModalpen] = useState(false);
  const handleOpenListModalExpense = () => setIsListExpenseOModalpen(true);

  useEffect(() => {
    handleGetExpense(String(user?.id));
  }, [user, categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const commonExpenses = groupExpensesByDescriptionToGraphics(
    expenses.filter((expense) => expense.payment_type === "comum")
  );
  return (
    <main className="flex gap-4 sm:flex-col px-4">
      {commonExpenses.length > 0 ? (
        <div className="w-[700px] sm:px-4 sm:w-full">
          <DoughnutChartComponent
            data={formatIncomesForChartToExpense(commonExpenses)}
          />
        </div>
      ) : (
        <p>Nenhuma despesa disponível para exibir no gráfico.</p>
      )}
      <div className="w-1/3 ml-auto sm:w-full ">
        <h2 className="text-xl font-bold mb-4">Adicionar Despesa</h2>
        <form
          className="text-start mb-6"
          id="expense-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (editingExpense) {
              handleEditExpense(e);
            } else {
              handleAddExpense(formDataExpenses);
            }
          }}
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
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-normal font-semibold text-primary-gray-600"
            >
              Descrição:
            </label>
            <textarea
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
              htmlFor="receipt_date"
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

          <select
            name="category_id"
            value={formDataExpenses.category_id}
            className="w-full border p-2 mb-4 text-primary-gray-800 rounded-md font-semibold"
            onChange={handleChangeExpenses}
          >
            <option value="">Selecione uma opção</option>
            {categories
              .filter((category) => category.type === "despesa")
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          {formDataExpenses.category_id === "18" && (
            <div className="my-2 flex flex-col gap-2">
              <label
                htmlFor="newCategorie"
                className="block text-normal font-semibold text-primary-gray-600"
              >
                Nova Categoria:
              </label>
              <input
                type="text"
                name="newCategorie"
                value={formDataExpenses.newCategorie}
                onChange={handleChangeExpenses}
                required
                className="mt-1 block w-full border p-2 text-black rounded-md "
                placeholder="Digite o nome da nova categoria"
              />
              <Button variant="secondary" type="submit" className="w-full">
                Criar nova categoria e salvar despesa
              </Button>
            </div>
          )}
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

            <div className="mb-4">
              <label className="flex gap-2 h-8 text-start justify-center items-center sm:justify-start whitespace-nowrap">
                Despesa recorrente?
                <input
                  type="checkbox"
                  name="is_recurrent"
                  checked={formDataExpenses.is_recurrent}
                  className="text-black my-auto size-4 sm:size-3"
                  onChange={(e) =>
                    setFormDataExpenses((prev) => ({
                      ...prev,
                      is_recurrent: e.target.checked,
                    }))
                  }
                />
              </label>
            </div>
          </div>
          {formDataExpenses.category_id === "outros" ? (
            <Button variant="primary" type="submit" className="w-full">
              Adicionar Despessa{" "}
            </Button>
          ) : (
            <Button variant="primary" type="submit" className="w-full">
              Adicionar Despesa{" "}
            </Button>
          )}
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
      {isListExpenseModalOpen && (
        <EditExpensesModal onClose={() => setIsListExpenseOModalpen(false)} />
      )}
    </main>
  );
}
