import { formatCurrency, formatDate } from "../../utils/FormattedValues";
import { useDataRevenueInformation } from "../../context/ExpensesContext/ExpenseContext";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import DoughnutChartComponent from "../ExpensePierChat";
export default function RevenueForm() {
  const {
    expenses,
    handleChange,
    handleDeleteExpense,
    handleAddExpense,
    handleEditExpense,
    startEditing,
    formData,
    editingExpense,
    handleGetExpense,
    categorias,
    formatIncomesForChart,
  } = useDataRevenueInformation();
  const userContext = AuthContext();
  const user = userContext?.user;
  useEffect(() => {
    handleGetExpense(String(user?.id));
  }, [user]);
  return (
    <main className="flex gap-4">
      {expenses.length > 0 ? (
        <div className="w-1/3">
          <DoughnutChartComponent data={formatIncomesForChart(expenses)} />
        </div>
      ) : (
        <p>Nenhuma despesa disponível para exibir no gráfico.</p>
      )}
      <div className="w-1/3 ml-auto">
        <h2 className="text-xl font-bold mb-4">
          {editingExpense ? "Editar Despesa" : "Adicionar Despesa"}
        </h2>
        <form
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
          <div className="mb-4">
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-700"
            >
              Valor:
            </label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              className="mt-1 block w-full border p-2"
              placeholder="Insira o valor"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border p-2"
              placeholder="Descrição da despesa"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="receipt_date"
              className="block text-sm font-medium text-gray-700"
            >
              Data de Recebimento:
            </label>
            <input
              type="date"
              name="payment_data"
              value={formData.payment_data}
              onChange={handleChange}
              required
              className="mt-1 block w-full border p-2"
            />
          </div>

          <select
            name="categoria_id"
            value={formData.categoria_id}
            className="w-full border p-2 mb-4"
            onChange={handleChange}
          >
            <option value="">Selecione uma opção</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
          {formData.categoria_id === "18" ? (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hidden"
            >
              {editingExpense ? "Atualizar Despesa" : "Salvar Despesa"}
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {editingExpense ? "Atualizar Despesa" : "Salvar Despesa"}
            </button>
          )}
          {formData.categoria_id === "18" && (
            <div className="mb-4">
              <label
                htmlFor="newCategorie"
                className="block text-sm font-medium text-gray-700"
              >
                Nova Categoria:
              </label>
              <input
                type="text"
                name="newCategorie"
                value={formData.newCategorie}
                onChange={handleChange}
                required
                className="mt-1 block w-full border p-2"
                placeholder="Digite o nome da nova categoria"
              />
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Criar nova categoria e salvar despesa
              </button>
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
                        <button onClick={() => startEditing(expense)}>
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
