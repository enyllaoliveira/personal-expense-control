"use client";
import Button from "../../../Commons/Button";
import Modal from "../..";
import { useDataInformation } from "../../../../context/DataContext/DataContext";
import Income from "../../../../interfaces/income";

export default function DeleteIncomesModal({
  isOpen,
  onClose,
  income,
}: {
  isOpen: boolean;
  onClose: () => void;
  income: Income;
}) {
  const { handleDeleteIncome } = useDataInformation();
  const descriptionAction = income?.description
    ? `A receita <strong>${income.description} </strong> será excluída de todos os dashboards e não poderá ser utilizada.`
    : "A receita será excluída de todos os dashboards e não poderá ser utilizada.";
  return (
    <Modal
      className="w-[400px] sm:w-9/10 text-primary-gray-900"
      isOpen={isOpen}
      onClose={onClose}
      subtitle="A receita será excluída."
      descriptionAction={descriptionAction}
      status="warning"
    >
      <div className="flex justify-between pt-8 gap-4">
        <Button variant="tertiary" onClick={onClose} className="w-[290px]">
          {" "}
          Cancelar{" "}
        </Button>
        <Button
          onClick={() => handleDeleteIncome(String(income.id))}
          variant="primary"
          className="bg-primary-700 w-[290px]"
        >
          {" "}
          Confirmar{" "}
        </Button>
      </div>
    </Modal>
  );
}
