"use client";
import Button from "../../../Commons/Button";
import Modal from "../..";
import { useDataInformation } from "../../../../context/DataContext/DataContext";
import { Expense } from "../../../../interfaces/expense";

export default function DeleteExpensesModal({
  isOpen,
  onClose,
  expense,
}: {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense;
}) {
  const { handleDeleteExpense } = useDataInformation();
  const descriptionAction = expense?.description
    ? `A despesa <strong>${expense.description} </strong> será excluída de todos os dashboards e não poderá ser utilizada.`
    : "A despesa será excluída de todos os dashboards e não poderá ser utilizada.";
  return (
    <Modal
      className="w-[400px] sm:w-9/10 max-h-[80vh] overflow-y-auto"
      isOpen={isOpen}
      onClose={onClose}
      subtitle="A despesa será excluída "
      descriptionAction={descriptionAction}
      status="warning"
    >
      <div className="flex justify-between pt-8 gap-4">
        <Button variant="tertiary" onClick={onClose} className="w-full">
          {" "}
          Cancelar{" "}
        </Button>
        <Button
          onClick={() => handleDeleteExpense(String(expense.id))}
          variant="primary"
          className="w-full"
        >
          {" "}
          Confirmar{" "}
        </Button>
      </div>
    </Modal>
  );
}
