import { useState } from "react";
import { formatDate } from "../../utils/FormattedValues";
import { useDataInformation } from "../../context/DataContext/DataContext";
import Button from "../Commons/Button";
import DoughnutChartComponent from "../Graphics/PierChart";
import EditCrediCardExpensesModal from "../Modal/Expenses/EditCreditCardExpenses";
import { Transaction } from "../../interfaces/transaction";
import { toast } from "react-toastify";
import InputComponent from "../Commons/InputComponent";
import SelectComponente from "../Commons/SelectComponenet";
import FormComponente from "../Commons/FormComponent";
// import ChartComponent from "../Graphics/LineChart";

const CreditForm = () => {
  const {
    handleAddExpense,
    categories,
    expenses,
    formatIncomesForChartToExpense,
    groupExpensesByDescriptionToGraphics,
    addTransaction,
    // filterTransactions,
    formDataExpenses,
    setFormDataExpenses,
  } = useDataInformation();

  const [isListExpenseModalOpen, setIsListExpenseModalOpen] = useState(false);

  const handleOpenListModalExpense = () => setIsListExpenseModalOpen(true);

  const handleChangeExpenses = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormDataExpenses((expense) => ({
      ...expense,
      [name]: name === "installment_count" ? parseInt(value) : value,
    }));
  };

  const expensesCard = groupExpensesByDescriptionToGraphics(
    expenses.filter((expense) => expense.payment_type === "cartao_credito")
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormDataExpenses((expense) => ({
      ...expense,
      payment_type: "cartao_credito",
    }));
    if (!formDataExpenses.category_id) {
      toast.error("Selecione uma categoria válida.", {
        autoClose: 2000,
      });
      return;
    }

    const newTransaction: Transaction = {
      amount: parseFloat(formDataExpenses.amount),
      date: formDataExpenses.payment_date,
      type: "credit",
    };

    addTransaction(newTransaction);
    handleAddExpense(formDataExpenses);

    setFormDataExpenses({
      id: "",
      userId: undefined,
      amount: "",
      description: "",
      payment_date: formatDate(new Date()),
      category_id: "",
      newCategorie: "",
      payment_type: "cartao_credito",
      installment_count: 1,
      is_recurrent: false,
    });
  };

  return (
    <main className="flex flex-col gap-4 sm:flex-col px-4 my-8 overflow-y-visible">
      <div className="flex sm:flex-col">
        <div className="w-[700px] sm:px-4 sm:w-full max-h-[600px]">
          {expensesCard.length > 0 ? (
            <DoughnutChartComponent
              data={formatIncomesForChartToExpense(expensesCard)}
            />
          ) : (
            <p className="text-center mx-auto ">
              Adicione uma despesa para criar seu gráfico.
            </p>
          )}
        </div>

        <FormComponente
          className="w-1/3 ml-auto sm:w-full h-full"
          onSubmit={handleSubmit}
          title="Adicionar Despesa"
          id="expense-credit-card-form"
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

          <InputComponent
            label="Descrição"
            type="text"
            name="description"
            value={formDataExpenses.description}
            onChange={handleChangeExpenses}
            required
            placeholder="Descrição da despesa"
          />

          <InputComponent
            label=" Data de Pagamento"
            type="date"
            name="payment_date"
            value={formDataExpenses.payment_date}
            onChange={handleChangeExpenses}
            required
          />

          <SelectComponente
            label="Categoria"
            name="category_id"
            value={formDataExpenses.category_id}
            onChange={handleChangeExpenses}
            required
            options={categories
              .filter((category) => category.type === "cartao")
              .map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            placeholder="Selecione uma opção"
          />

          <div className="flex sm:flex-col justify-between gap-12">
            <div className="flex gap-4 sm:gap-1 mb-4 h-8 sm:h-6">
              <InputComponent
                className="flex whitespace-nowrap h-8 gap-2 items-center"
                label="Número de Parcelas"
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
              className="flex whitespace-nowrap h-8 gap-2 items-center"
              type="checkbox"
              name="is_recurrent"
              checked={formDataExpenses.is_recurrent}
              onChange={(e) =>
                setFormDataExpenses((expense) => ({
                  ...expense,
                  is_recurrent: e.target.checked,
                }))
              }
            />
          </div>

          <Button variant="primary" type="submit" className="w-full">
            Adicionar Despesa do Cartão
          </Button>
          {expensesCard.length > 0 && (
            <Button
              variant="secondary"
              className="ml-auto mt-2 sm:mt-4"
              onClick={handleOpenListModalExpense}
              type="button"
            >
              {" "}
              Gerenciar despesas
            </Button>
          )}
        </FormComponente>
      </div>
      {/* <ChartComponent
        transactions={filterTransactions("credit")}
        title="Gastos mensais com cartão de crédito"
        type="bar"
      /> */}
      {isListExpenseModalOpen && (
        <EditCrediCardExpensesModal
          onClose={() => setIsListExpenseModalOpen(false)}
        />
      )}
    </main>
  );
};

export default CreditForm;
