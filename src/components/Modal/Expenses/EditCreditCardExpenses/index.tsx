"use client";
import Modal from "../..";
import { formatCurrency, formatDate } from "../../../../utils/FormattedValues";
import { useDataInformation } from "../../../../context/DataContext/DataContext";
import DeleteExpensesModal from "../DeleteExpenses";
import { Expense } from "../../../../interfaces/expense";
import Button from "../../../Commons/Button";
import { useEffect, useRef } from "react";
import InputComponent from "../../../Commons/InputComponent";
import TextArea from "../../../Commons/TextArea";
import SelectComponente from "../../../Commons/SelectComponenet";
import FormComponente from "../../../Commons/FormComponent";

export default function EditCrediCardExpensesModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
    expenses,
    formDataExpenses,
    handleChangeExpenses,
    setFormDataExpenses,
    handleEditExpense,
    categories,
    startEditingExpenses,
    isEditingExpense,
    setIsEditingExpense,
    selectedExpense,
    setSelectedExpense,
    isDeleteExpense,
    setIsDeleteExpense,
    groupExpensesByDescription,
  } = useDataInformation();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsEditingExpense(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenDeleteModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDeleteExpense(true);
  };

  const handleCloseModal = () => {
    setFormDataExpenses({
      id: "",
      userId: undefined,
      amount: "",
      description: "",
      payment_date: "",
      category_id: "",
      newCategorie: "",
      payment_type: "",
      installment_count: 1,
      is_recurrent: false,
    });
    onClose();
  };

  const handleOpenEditExpenseModal = (expense: Expense) => {
    const formattedPaymentDate = expense.payment_date
      ? new Date(expense.payment_date).toISOString().split("T")[0]
      : "";

    setFormDataExpenses({
      id: String(expense.id),
      userId:
        typeof expense.userId === "string"
          ? parseInt(expense.userId)
          : expense.userId,
      description: expense.description || "",
      amount: expense.amount ? expense.amount.toString() : "0",
      payment_date: formattedPaymentDate,
      category_id: String(expense.category_id || ""),
      newCategorie: "",
      payment_type: expense.payment_type || "",
      installment_count: expense.installment_count || 1,
      is_recurrent: expense.is_recurrent || false,
    });

    startEditingExpenses(expense);
    setIsEditingExpense(true);
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleCloseModal}
      titleHeader="Sua lista de despesas "
      description="Edite e exclua as suas despesas"
      className={
        isEditingExpense && !isDeleteExpense
          ? "w-[1000px] sm:w-9/10 max-h-[80vh] overflow-y-auto"
          : "w-[400px] max-h-[80vh] overflow-y-auto"
      }
    >
      <div className="mt-4" ref={modalRef}>
        <h2 className="text-xl font-bold mb-4 text-black">Suas Despesas</h2>
        <div className="flex sm:flex-col justify-between gap-4  text-primary-gray-900">
          {expenses.length === 0 ? (
            <p>Nenhuma despesa encontrada.</p>
          ) : (
            <ul className=" border-black mx-auto">
              {expenses.filter(
                (expense) => expense.payment_type === "cartao_credito"
              ).length === 0 ? (
                <p>Nenhuma despesa encontrada.</p>
              ) : (
                <ul>
                  {groupExpensesByDescription(
                    expenses.filter(
                      (expense) => expense.payment_type === "cartao_credito"
                    )
                  ).map((expense) => {
                    return (
                      <li
                        className="flex justify-between gap-5 border rounded-md px-2 py-1 "
                        key={expense.id}
                        style={{ marginBottom: "16px" }}
                      >
                        <div className="text-primary-gray-800">
                          <div className="flex">
                            <p className="text-start flex w-32 sm:w-28">
                              Valor:
                            </p>{" "}
                            {formatCurrency(expense.amount ?? 0)}
                          </div>
                          <div className="flex">
                            <p className="text-start flex w-32 sm:w-28">
                              Descrição:
                            </p>
                            <p className="text-start truncate w-32 sm:w-28">
                              {expense.description || "Descrição indisponível"}{" "}
                            </p>
                          </div>
                          <div className="flex">
                            <p className="text-start flex w-32 sm:w-28">
                              Pagamento:
                            </p>
                            {formatDate(expense.payment_date || new Date())}
                          </div>
                        </div>
                        <div className="flex my-auto gap-3">
                          <button
                            onClick={() => handleOpenEditExpenseModal(expense)}
                          >
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
                            </svg>{" "}
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(expense)}
                          >
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
                            </svg>{" "}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </ul>
          )}

          {!isDeleteExpense && isEditingExpense && (
            <>
              <div className="h-auto w-px bg-gray-400 mx-4 self-stretch" />

              <FormComponente
                id="expense-edit-form"
                onSubmit={handleEditExpense}
                className="w-1/2 ml-auto sm:w-full h-full"
              >
                <InputComponent
                  label="Valor"
                  type="number"
                  name="amount"
                  value={formDataExpenses.amount}
                  onChange={handleChangeExpenses}
                  required
                  placeholder="Insira o valor"
                />
                <TextArea
                  label="Descrição"
                  name="description"
                  value={formDataExpenses.description}
                  onChange={handleChangeExpenses}
                  required
                  placeholder="Descrição da despesa"
                />
                <InputComponent
                  label="Data de pagamento"
                  type="date"
                  name="payment_date"
                  value={formDataExpenses.payment_date}
                  onChange={handleChangeExpenses}
                  required
                />
                <SelectComponente
                  label=" Selecione a categoria"
                  name="category_id"
                  value={formDataExpenses.category_id}
                  onChange={handleChangeExpenses}
                  options={categories
                    .filter((category) => category.type === "despesa")
                    .map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                />

                <div className="flex sm:flex-col justify-between gap-12 2xl:gap-6">
                  <div className="flex gap-4 sm:gap-1 mb-4 h-8 sm:h-6">
                    <InputComponent
                      label="Número de Parcelas"
                      className="flex whitespace-nowrap w-auto h-8 gap-2  items-center"
                      type="number"
                      name="installment_count"
                      value={formDataExpenses.installment_count}
                      min={1}
                      onChange={handleChangeExpenses}
                      required
                    />
                  </div>

                  <InputComponent
                    label="Despesa recorrente?"
                    className="flex whitespace-nowrap w-auto 2xl:w-fit h-8 gap-2 items-center"
                    type="checkbox"
                    name="is_recurrent"
                    checked={formDataExpenses.is_recurrent}
                    onChange={(e) =>
                      setFormDataExpenses((prev) => ({
                        ...prev,
                        is_recurrent: e.target.checked,
                      }))
                    }
                  />
                </div>
                {formDataExpenses.category_id === "18" && (
                  <>
                    <InputComponent
                      label="Nova Categoria"
                      type="text"
                      name="newCategorie"
                      value={formDataExpenses.newCategorie}
                      onChange={handleChangeExpenses}
                      required
                      placeholder="Digite o nome da nova categoria"
                    />
                    <div className="flex justify-between mx-auto">
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full mt-2"
                      >
                        Criar nova categoria e atualizar despesa
                      </Button>
                    </div>
                  </>
                )}
                <div className="flex justify-between gap-4 h-12">
                  {formDataExpenses.category_id !== "18" && (
                    <Button variant="primary" type="submit" className="w-full">
                      Editar despesa{" "}
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditingExpense(false)}
                    className="w-full"
                  >
                    {" "}
                    Cancelar edição
                  </Button>
                </div>
              </FormComponente>
            </>
          )}
        </div>
      </div>
      {isDeleteExpense && selectedExpense && (
        <DeleteExpensesModal
          isOpen={isDeleteExpense}
          expense={selectedExpense}
          onClose={() => setIsDeleteExpense(false)}
        />
      )}
    </Modal>
  );
}
