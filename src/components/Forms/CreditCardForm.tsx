import { useState } from "react";
import { formatDate } from "../../utils/FormattedValues";
import { useDataInformation } from "../../context/DataContext/DataContext";
import Button from "../Commons/Button";
import DoughnutChartComponent from "./ExpensePierChatMock";

const CartaoCreditoForm = () => {
  const {
    handleAddExpense,
    categorias,
    expenses,
    formatIncomesForChartToExpense,
  } = useDataInformation();

  const [formDataExpenses, setFormDataExpenses] = useState({
    id: "",
    userId: undefined,
    value: "",
    description: "",
    payment_data: formatDate(new Date()),
    categoria_id: "",
    newCategorie: "",
    tipo_pagamento: "cartao_credito",
    numero_parcelas: 1,
    isRecurrent: false,
  });

  const despesasCartao = expenses.filter(
    (despesa) => despesa.tipo_pagamento === "cartao_credito"
  );

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formDataExpenses.categoria_id) {
      console.error("Selecione uma categoria válida.");
      return;
    }
    handleAddExpense(formDataExpenses);
  };

  return (
    <main className="flex gap-4 sm:flex-col px-4">
      <div className="w-[700px] sm:px-4 sm:w-full">
        {despesasCartao.length > 0 ? (
          <DoughnutChartComponent
            data={formatIncomesForChartToExpense(despesasCartao)}
          />
        ) : (
          <p>Nenhuma despesa disponível para exibir no gráfico.</p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="text-start ml-auto"
        id="expense-credit-card-form"
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
            htmlFor="payment_data"
            className="block text-normal font-semibold text-primary-gray-600"
          >
            Data de pagamento:
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

        <label>Categoria:</label>
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

        <div className="mb-4">
          <label>Número de Parcelas:</label>
          <input
            type="number"
            name="numero_parcelas"
            value={formDataExpenses.numero_parcelas}
            min={1}
            onChange={handleChangeExpenses}
            required
            className="text-black"
          />
        </div>

        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              name="isRecurrent"
              checked={formDataExpenses.isRecurrent}
              className="text-black"
              onChange={(e) =>
                setFormDataExpenses((prev) => ({
                  ...prev,
                  isRecurrent: e.target.checked,
                }))
              }
            />
            Despesa recorrente?
          </label>
        </div>

        <Button variant="primary" type="submit" className="w-full">
          Salvar Despesa do Cartão
        </Button>
      </form>
    </main>
  );
};

export default CartaoCreditoForm;
