import { useState } from "react";

export default function ExpanseForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherOption, setOtherOption] = useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleOtherOptiopnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherOption(e.target.value);
  };
  return (
    <div className="w-1/2 ml-auto">
      <form id="income-form">
        <label htmlFor="income-date" className="block">
          Data:
        </label>
        <input
          type="date"
          id="income-date"
          className="w-full border p-2 mb-4"
        />

        <label htmlFor="income-value" className="block">
          Valor:
        </label>
        <input
          type="number"
          id="income-value"
          className="w-full border p-2 mb-4"
        />

        <label htmlFor="income-category" className="block">
          Categoria:
        </label>
        <select
          id="income-category"
          className="w-full border p-2 mb-4"
          onChange={handleOptionChange}
        >
          <option value="salario">Salário</option>
          <option value="freelance">Freelance</option>
          <option value="renda-passiva">Aplicações financeiras</option>
          <option value="pensao">Pensão</option>
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
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
