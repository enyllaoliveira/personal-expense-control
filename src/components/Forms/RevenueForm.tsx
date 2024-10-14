import { useState } from "react";

export default function RevenueForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherOption, setOtherOption] = useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleOtherOptiopnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherOption(e.target.value);
  };

  return (
    <div className="w-1/2 ml-auto mt-8">
      <form id="expense-form">
        <label htmlFor="expense-date" className="text-start flex mb-1">
          Data do lançamento:
        </label>
        <input
          type="date"
          id="expense-date"
          className="w-full border p-2 mb-4"
        />

        <label htmlFor="expense-value" className="text-start flex mb-1">
          Valor:
        </label>
        <input
          type="number"
          id="expense-value"
          className="w-full border p-2 mb-4"
        />

        <label htmlFor="expense-category" className="text-start flex mb-1">
          Categoria:
        </label>
        <select
          id="income-category"
          className="w-full border p-2 mb-4"
          onChange={handleOptionChange}
        >
          <option value="alimentacao">Alimentação</option>
          <option value="transporte">Transporte</option>
          <option value="aluguel">Aluguel</option>
          <option value="agua-e-luz">Água e luz</option>
          <option value="lazer">Lazer</option>
          <option value="saude">Saúde</option>

          <option value="educacao">Educação</option>

          <option value="outro">Outro</option>
        </select>
        {selectedOption === "outro" && (
          <div className="mt-4">
            <label htmlFor="other-category" className="text-start flex mb-1">
              Especifique a categoria:
            </label>
            <input
              type="text"
              id="other-category"
              value={otherOption}
              onChange={handleOtherOptiopnChange}
              className="w-full border p-2"
              placeholder="Digite sua categoria"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
