import { formatCurrency, formatDate } from "../../utils/FormattedValues";
import { useDataInformation } from "../../context/DataContext/DataContext";
import DoughnutChartComponent from "../ExpensePierChat";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useEffect } from "react";
import Button from "../Commons/Button";
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
    handleGetIncomes,
  } = useDataInformation();
  const userContext = AuthContext();
  const user = userContext?.user;
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
        <h2 className="text-xl font-bold mb-4">
          {editingIncome ? "Editar Receita" : "Adicionar Receita"}
        </h2>
        <form
          id="income-form"
          className="text-start"
          onSubmit={editingIncome ? handleUpdate : handleSubmit}
        >
          <div className="mb-4 text-white">
            <label htmlFor="value" className="block text-sm font-medium ">
              Valor:
            </label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md p-2 text-black"
              placeholder="Insira o valor"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Descrição:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded p-2 text-black"
              placeholder="Descrição da receita"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="receipt_date" className="block text-sm font-medium">
              Data de Recebimento:
            </label>
            <input
              type="date"
              name="receipt_date"
              value={formData.receipt_date || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded p-2 text-black"
            />
          </div>
          <div className="flex justify-between mx-auto gap-4">
            <Button variant="primary" type="submit" className="w-full">
              {editingIncome ? "Atualizar Receita" : "Salvar Receita"}
            </Button>
            {editingIncome && (
              <Button variant="secondary" className="w-full">
                {" "}
                Cancelar{" "}
              </Button>
            )}
          </div>
        </form>

        <div>
          <h2 className="text-xl font-bold mb-4">Suas Receitas</h2>
          {incomes.length === 0 ? (
            <p>Nenhuma receita adicionada.</p>
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
