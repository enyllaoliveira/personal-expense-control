import { formatCurrency, formatDate } from "../../utils/FormattedValues";
import { useDataInformation } from "../../context/DataContext/DataContext";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import DoughnutChartComponent from "../ExpensePierChat";
import Button from "../Commons/Button";
export default function ExpensesForm() {
  const {
    expenses,
    handleChangeExpenses,
    handleDeleteExpense,
    handleAddExpense,
    handleEditExpense,
    startEditingExpenses,
    formDataExpenses,
    editingExpense,
    handleGetExpense,
    categorias,
    formatIncomesForChartToExpense,
    fetchCategories,
  } = useDataInformation();
  const userContext = AuthContext();
  const user = userContext?.user;
  useEffect(() => {
    handleGetExpense(String(user?.id));
  }, [user]);
  useEffect(() => {
    console.log("Categorias atualizadas", categorias);
  }, [categorias]);

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <main className="flex gap-4 sm:flex-col px-4">
      {expenses.length > 0 ? (
        <div className="w-[700px] sm:px-4 sm:w-full">
          <DoughnutChartComponent
            data={formatIncomesForChartToExpense(expenses)}
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
              handleAddExpense();
            }
          }}
        >
          <div className="mb-4 text-white">
            <label htmlFor="value" className="block text-sm font-medium ">
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
            <label htmlFor="description" className="block text-sm font-medium ">
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
            <label htmlFor="receipt_date" className="block text-sm font-medium">
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
            {/* <option value="outros">Outros</option>{" "} */}
          </select>
          {formDataExpenses.categoria_id === "outros" ? (
            <Button variant="primary" type="submit" className="w-full">
              {editingExpense ? "Atualizar Despesa" : "Salvar Despesa"}
            </Button>
          ) : (
            <Button variant="primary" type="submit" className="w-full">
              {editingExpense ? "Atualizar Despesa" : "Salvar Despesa"}
            </Button>
          )}
          {formDataExpenses.categoria_id === "18" && (
            <div className="mb-4">
              <label
                htmlFor="newCategorie"
                className="block text-sm font-medium text-white"
              >
                Nova Categoria:
              </label>
              <input
                type="text"
                name="newCategorie"
                value={formDataExpenses.newCategorie}
                onChange={handleChangeExpenses}
                required
                className="mt-1 block w-full border p-2 text-black"
                placeholder="Digite o nome da nova categoria"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Criar nova categoria e salvar despesa
                </button>
                {editingExpense && <button> Cancelar </button>}
              </div>
            </div>
          )}
        </form>
        <div>
          <h2 className="text-xl font-bold mb-4">Suas Despesas</h2>
          {expenses.length === 0 ? (
            <p>Nenhuma despesa encontrada.</p>
          ) : (
            <ul>
              {expenses.length === 0 ? (
                <p>Nenhuma despesa encontrada.</p>
              ) : (
                <ul>
                  {expenses.map((expense) => {
                    const categoria = categorias.find(
                      (c) => c.id === Number(expense.categoria_id)
                    );

                    return (
                      <li key={expense.id} style={{ marginBottom: "16px" }}>
                        <button onClick={() => startEditingExpenses(expense)}>
                          Editar
                        </button>
                        <button onClick={() => handleDeleteExpense(expense.id)}>
                          Apagar
                        </button>

                        <div>
                          <strong>Valor:</strong>{" "}
                          {formatCurrency(expense.valor ?? 0)} <br />
                          <strong>Descrição:</strong>
                          {expense.descricao || "Descrição indisponível"} <br />
                          <strong>Data de pagamento:</strong>
                          {formatDate(expense.data_pagamento)} <br />
                          <strong>Categoria:</strong>
                          {categoria?.nome || "Categoria não encontrada"}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
