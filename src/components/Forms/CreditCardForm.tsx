import { Bar } from "react-chartjs-2";
import { stackedBarData, stackedOptions } from "../CreditCardControl";
import { useState } from "react";
export default function CreditCardForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherOption, setOtherOption] = useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleOtherOptiopnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherOption(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <form id="income-form" className="w-1/2">
        <div className="flex gap-8">
          <div className="flex flex-col">
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
              id="expense-category"
              value={selectedOption}
              onChange={handleOptionChange}
              className="w-full border p-2 mb-4"
            >
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="lazer">Lazer</option>
              <option value="compras_online">Compras online</option>
              <option value="outro">Outro</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Salvar
            </button>
          </div>
          {selectedOption === "outro" && (
            <div>
              <label htmlFor="other-category" className="text-start flex mb-1">
                Especifique a categoria:
              </label>
              <input
                type="text"
                id="other-category"
                value={otherOption}
                onChange={handleOtherOptiopnChange}
                className="w-full border p-2 mb-4"
                placeholder="Digite sua categoria"
              />
            </div>
          )}
        </div>
      </form>
      <Bar data={stackedBarData} options={stackedOptions} />
    </div>
  );
}
