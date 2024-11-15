import { useDataInformation } from "../../context/DataContext/DataContext";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import DoughnutChartComponent from "../MockDataPierAndLineChart/ExpenseAndIncomesPierChat";
import Button from "../Commons/Button";
import EditExpensesModal from "../Modal/Expenses/EditExpenses";
import { Transaction } from "../../interfaces/transaction";
import { toast } from "react-toastify";
import InputComponent from "../Commons/InputComponent";
import TextArea from "../Commons/TextArea";
import SelectComponente from "../Commons/SelectComponenet";
import FormComponente from "../Commons/FormComponent";
// import BarChart from "../Graphics/BarChart";

export default function ExpensesForm() {
  const {
    expenses,
    handleChangeExpenses,
    handleAddExpense,
    handleEditExpense,
    formDataExpenses,
    editingExpense,
    handleGetExpense,
    categories,
    formatIncomesForChartToExpense,
    fetchCategories,
    setFormDataExpenses,
    groupExpensesByDescriptionToGraphics,
    addTransaction,
    // filterTransactions,
  } = useDataInformation();

  const userContext = AuthContext();
  const user = userContext?.user;
  const [isListExpenseModalOpen, setIsListExpenseModalOpen] = useState(false);

  const handleOpenListModalExpense = () => setIsListExpenseModalOpen(true);

  useEffect(() => {
    if (user) {
      handleGetExpense(String(user.id));
    }
  }, [user, categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const commonExpenses = groupExpensesByDescriptionToGraphics(
    expenses.filter((expense) => expense.payment_type === "comum")
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formDataExpenses.category_id) {
      toast.error("Selecione uma categoria válida.", {
        autoClose: 2000,
      });
      return;
    }

    const newTransaction: Transaction = {
      amount: parseFloat(formDataExpenses.amount),
      date: formDataExpenses.payment_date as string,
      type: "expense",
    };

    addTransaction(newTransaction);

    if (editingExpense) {
      handleEditExpense(e);
    } else {
      handleAddExpense(formDataExpenses);
    }
  };

  return (
    <main className="flex flex-col gap-4 sm:flex-col px-4 my-8">
      <div className="flex sm:flex-col">
        {commonExpenses.length > 0 ? (
          <div className="w-[700px] md:w-[400px] sm:px-4 sm:w-full max-h-[600px]">
            <DoughnutChartComponent
              data={formatIncomesForChartToExpense(commonExpenses)}
            />
          </div>
        ) : (
          <p className="text-center mx-auto my-auto">
            Adicione uma receita para criar seu gráfico.
          </p>
        )}
        <FormComponente
          className="w-1/3 md:w-2/3 ml-auto sm:w-full h-full mt-12"
          onSubmit={handleSubmit}
          id="expense-comun-form"
          title="Adicionar Despesas"
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
            label="Data de Pagamento"
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
            options={categories
              .filter((category) => category.type === "despesa")
              .map((category) => ({
                value: category.id,
                label: category.name,
              }))}
          />
          {formDataExpenses.category_id === "18" && (
            <InputComponent
              label=" Nova Categoria"
              type="text"
              name="newCategorie"
              value={formDataExpenses.newCategorie}
              onChange={handleChangeExpenses}
              required
              placeholder="Digite o nome da nova categoria"
            />
          )}
          <div className="flex md:flex-col sm:flex-col tablet:flex-col lg:flex-col justify-between gap-12 sm:gap-3 md:gap-1 2xl:gap-4 tablet:gap-1 lg:gap-1">
            {" "}
            <InputComponent
              className="flex whitespace-nowrap h-8 gap-2 items-center sm:gap-1 mb-4 sm:h-6"
              label="Número de Parcelas"
              type="number"
              name="installment_count"
              value={formDataExpenses.installment_count}
              min={1}
              onChange={handleChangeExpenses}
              required
            />
            <InputComponent
              label="Despesa recorrente?"
              className="flex whitespace-nowrap w-auto 2xl:w-fit h-8 gap-2 items-center"
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
          {formDataExpenses.category_id === "18" ? (
            <Button
              variant="secondary"
              type="submit"
              className="w-full mt-0 md:mt-4"
            >
              Criar nova categoria e salvar despesa
            </Button>
          ) : (
            <Button
              variant="primary"
              type="submit"
              className="w-full mt-0 md:mt-4"
            >
              Adicionar Despesass{" "}
            </Button>
          )}
          {commonExpenses.length > 0 && (
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
        {isListExpenseModalOpen && (
          <EditExpensesModal onClose={() => setIsListExpenseModalOpen(false)} />
        )}
      </div>
      {/* <BarChart
        transactions={filterTransactions("expense")}
        title="Gastos mensais"
      /> */}
    </main>
  );
}
