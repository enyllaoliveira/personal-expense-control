"use client";
import Modal from "../..";
import { formatCurrency, formatDate } from "../../../../utils/FormattedValues";
import { useDataInformation } from "../../../../context/DataContext/DataContext";
import DeleteIncomesModal from "../DeleteIncomes";
import Income from "../../../../interfaces/income";
import Button from "../../../Commons/Button";

export default function EdiIncomesModal({ onClose }: { onClose: () => void }) {
  const {
    incomes,
    handleUpdateIncome,
    formDataIncome,
    handleChangeIncome,
    setFormDataIncome,
    isEditingIncome,
    setIsEditingIncome,
    selectedIncome,
    setSelectedIncome,
    isDeleteIncome,
    setIsDeleteIncome,
  } = useDataInformation();

  const handleOpenDeleteModal = (income: Income) => {
    setSelectedIncome(income);
    setIsDeleteIncome(true);
  };

  const handleCloseModal = () => {
    setFormDataIncome({
      id: "",
      userId: undefined,
      amount: "",
      description: "",
      receipt_date: "",
      isRecurrent: false,
    });
    onClose();
  };

  const handleOpenEditModal = (income: Income) => {
    const incomeDate = income.date || income.created_at;

    const formattedDate = new Date(incomeDate).toISOString().split("T")[0];

    setFormDataIncome({
      id: String(income.id),
      userId:
        typeof income.userId === "string"
          ? parseInt(income.userId)
          : income.userId,
      amount: income.amount.toString(),
      description: income.description,
      receipt_date: formattedDate,
      isRecurrent: income.isRecurrent || false,
    });

    setIsEditingIncome(true);
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleCloseModal}
      titleHeader="Sua lista de receitas "
      description="Edite e exclua as suas receitas"
      className={
        isEditingIncome && !isDeleteIncome
          ? "w-[1000px] sm:w-9/10"
          : "w-[400px]"
      }
    >
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4 text-black">Suas Receitas</h2>
        <div className="flex sm:flex-col justify-between text-primary-gray-900">
          {incomes.length === 0 ? (
            <p>Nenhuma receita adicionada.</p>
          ) : (
            <ul className="flex flex-col gap-2 mx-auto">
              {incomes.map((income) => (
                <div
                  key={income.id}
                  className="border rounded-md border-primary-gray-700 px-2 py-1 text-primary-900"
                >
                  <div className="flex justify-between gap-4">
                    <li className="text-primary-gray-800">
                      <div className="flex text-start">
                        <p className="w-32">Valor:</p>{" "}
                        {formatCurrency(income.amount)}{" "}
                      </div>
                      <div className="flex text-start">
                        <p className="w-32">Descrição:</p>
                        <p className="text-start truncate w-32">
                          {" "}
                          {income.description}
                        </p>
                      </div>
                      <div className="flex text-start">
                        <p className="w-32">Recebimento:</p>{" "}
                        {formatDate(income.created_at)}{" "}
                      </div>
                    </li>
                    <div className="flex my-auto gap-3">
                      <button onClick={() => handleOpenEditModal(income)}>
                        {!isEditingIncome ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.9999 8.33326L11.6666 4.99993M2.08325 17.9166L4.90356 17.6032C5.24813 17.5649 5.42042 17.5458 5.58146 17.4937C5.72433 17.4474 5.86029 17.3821 5.98566 17.2994C6.12696 17.2062 6.24954 17.0836 6.49469 16.8385L17.4999 5.83326C18.4204 4.91279 18.4204 3.4204 17.4999 2.49993C16.5795 1.57945 15.0871 1.57945 14.1666 2.49992L3.16136 13.5052C2.91621 13.7503 2.79363 13.8729 2.70045 14.0142C2.61778 14.1396 2.55243 14.2755 2.50618 14.4184C2.45325 14.5794 2.43491 14.7517 2.39662 15.0963L2.08325 17.9166Z"
                              stroke="black"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.9999 8.33326L11.6666 4.99993M2.08325 17.9166L4.90356 17.6032C5.24813 17.5649 5.42042 17.5458 5.58146 17.4937C5.72433 17.4474 5.86029 17.3821 5.98566 17.2994C6.12696 17.2062 6.24954 17.0836 6.49469 16.8385L17.4999 5.83326C18.4204 4.91279 18.4204 3.4204 17.4999 2.49993C16.5795 1.57945 15.0871 1.57945 14.1666 2.49992L3.16136 13.5052C2.91621 13.7503 2.79363 13.8729 2.70045 14.0142C2.61778 14.1396 2.55243 14.2755 2.50618 14.4184C2.45405 14.5794 2.43491 14.7517 2.39662 15.0963L2.08325 17.9166Z"
                              stroke="black"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                      <button onClick={() => handleOpenDeleteModal(income)}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3333 4.99984V4.33317C13.3333 3.39975 13.3333 2.93304 13.1517 2.57652C12.9919 2.26292 12.7369 2.00795 12.4233 1.84816C12.0668 1.6665 11.6001 1.6665 10.6667 1.6665H9.33333C8.39991 1.6665 7.9332 1.6665 7.57668 1.84816C7.26308 2.00795 7.00811 2.26292 6.84832 2.57652C6.66667 2.93304 6.66667 3.39975 6.66667 4.33317V4.99984M8.33333 9.58317V13.7498M11.6667 9.58317V13.7498M2.5 4.99984H17.5M15.8333 4.99984V14.3332C15.8333 15.7333 15.8333 16.4334 15.5608 16.9681C15.3212 17.4386 14.9387 17.821 14.4683 18.0607C13.9335 18.3332 13.2335 18.3332 11.8333 18.3332H8.16667C6.76654 18.3332 6.06647 18.3332 5.53169 18.0607C5.06129 17.821 4.67883 17.4386 4.43915 16.9681C4.16667 16.4334 4.16667 15.7333 4.16667 14.3332V4.99984"
                            className="stroke-gray-900"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
          {!isDeleteIncome && isEditingIncome && (
            <>
              <div className="h-auto w-px bg-gray-400 mx-4 self-stretch" />
              <form
                id="income-form"
                className="text-start w-1/2"
                onSubmit={handleUpdateIncome}
              >
                <div className="mb-4 text-primary-gray-900">
                  <label
                    htmlFor="value"
                    className="block text-normal font-semibold text-primary-gray-900"
                  >
                    Valor:
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formDataIncome.amount || ""}
                    onChange={handleChangeIncome}
                    required
                    className="mt-1 block w-full border rounded-md p-2 text-primary-gray-900"
                    placeholder="Insira o valor"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-normal font-semibold text-primary-gray-900"
                  >
                    Descrição:
                  </label>
                  <textarea
                    name="description"
                    value={formDataIncome.description || ""}
                    onChange={handleChangeIncome}
                    required
                    className="mt-1 block w-full border rounded p-2 text-primary-gray-900"
                    placeholder="Descrição da receita"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="receipt_date"
                    className="block text-normal font-semibold text-primary-gray-900"
                  >
                    Data de Recebimento:
                  </label>
                  <input
                    type="date"
                    name="receipt_date"
                    value={formDataIncome.receipt_date || ""}
                    onChange={handleChangeIncome}
                    required
                    className="mt-1 block w-full border rounded p-2 text-primary-gray-900"
                  />
                </div>
                <div className="flex  justify-between gap-4">
                  <Button variant="primary" type="submit" className="w-full">
                    Editar receita
                  </Button>
                  <Button
                    onClick={() => setIsEditingIncome(false)}
                    variant="secondary"
                    className="w-full"
                  >
                    {" "}
                    Cancelar edição
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {isDeleteIncome && selectedIncome && (
        <DeleteIncomesModal
          isOpen={isDeleteIncome}
          income={selectedIncome}
          onClose={() => setIsDeleteIncome(false)}
        />
      )}
    </Modal>
  );
}
