import { formatCurrency, formatDate } from "../../utils/FormattedValues";
import { useDataInformation } from "../../context/DataContext/DataContext";

import DoughnutChartComponent from "../ExpensePierChat";
export default function IncomeForm() {
  const {
    incomes,
    handleChange,
    handleDelete,
    handleSubmit,
    handleUpdate,
    startEditing,
    formData,
    formatIncomesForChart,
    editingIncome,
  } = useDataInformation();

  return (
    <main className="flex gap-4">
      {incomes.length > 0 ? (
        <div className="w-1/3">
          <DoughnutChartComponent data={formatIncomesForChart(incomes)} />
        </div>
      ) : (
        <p>Nenhuma receita disponível para exibir no gráfico.</p>
      )}

      <div className="w-1/3 ml-auto">
        <h2 className="text-xl font-bold mb-4">
          {editingIncome ? "Editar Receita" : "Adicionar Receita"}
        </h2>
        <form onSubmit={editingIncome ? handleUpdate : handleSubmit}>
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
              placeholder="Descrição da receita"
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
              name="receipt_date"
              value={formData.receipt_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full border p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {editingIncome ? "Atualizar Receita" : "Salvar Receita"}
          </button>
        </form>

        <div>
          <h2 className="text-xl font-bold mb-4">Suas Receitas</h2>
          {incomes.length === 0 ? (
            <p>Nenhuma receita encontrada.</p>
          ) : (
            <ul>
              {incomes.map((income) => (
                <div key={income.id}>
                  <button onClick={() => startEditing(income)}>Editar</button>
                  <button onClick={() => handleDelete(String(income.id))}>
                    Apagar
                  </button>
                  <li>
                    <strong>Valor:</strong> {formatCurrency(income.amount)}{" "}
                    <br />
                    <strong>Descrição:</strong> {income.description} <br />
                    <strong>Data de Recebimento:</strong>{" "}
                    {formatDate(income.created_at)} <br />
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
