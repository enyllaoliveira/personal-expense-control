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
    categorias,
    formatIncomesForChartToExpense,
    fetchCategories,
  } = useDataInformation();
  const userContext = AuthContext();
  const user = userContext?.user;
  const [isListExpenseModalOpen, setIsListExpenseOModalpen] = useState(false);
  const handleOpenListModalExpense = () => setIsListExpenseOModalpen(true);

  useEffect(() => {
    handleGetExpense(String(user?.id));
  }, [user, categorias]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const despesasComuns = expenses.filter(
    (despesa) => despesa.tipo_pagamento === "comum"
  );
  return (
    <main className="flex gap-4 sm:flex-col px-4">
      {despesasComuns.length > 0 ? (
        <div className="w-[700px] sm:px-4 sm:w-full">
          <DoughnutChartComponent
            data={formatIncomesForChartToExpense(despesasComuns)}
          />
        </div>
      ) : (
        <p>Nenhuma despesa disponível para exibir no gráfico.</p>
      )}
      <div className="w-1/3 ml-auto sm:w-full ">
        <h2 className="text-xl font-bold mb-4">
          {editingExpense ? "Editar Despesa" : "Adicionar Despesa"}
        </h2>
        <form
          className="text-start "
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
              htmlFor="value"
              className="block text-normal font-semibold text-primary-gray-600"
            >
              Valor:
            </label>
            <input
              type="number"
              name="value"
              value={formDataExpenses.value}
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
              Data de Recebimento:
            </label>
            <input
              type="date"
              name="payment_data"
              value={formDataExpenses.payment_data}
              onChange={handleChangeExpenses}
              required
              className="mt-1 block w-full border rounded-md p-2 text-black"
            />
          </div>

          <select
            name="categoria_id"
            value={formDataExpenses.categoria_id}
            className="w-full border p-2 mb-4 text-primary-gray-800 rounded-md font-semibold"
            onChange={handleChangeExpenses}
          >
            <option value="">Selecione uma opção</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
          {formDataExpenses.categoria_id === "outros" ? (
            <Button variant="primary" type="submit" className="w-full">
              Adicionar Despesa{" "}
            </Button>
          ) : (
            <Button variant="primary" type="submit" className="w-full">
              Adicionar Despesa{" "}
            </Button>
          )}
          {formDataExpenses.categoria_id === "18" && (
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
          <Button
            variant="secondary"
            className="ml-auto mt-2"
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
