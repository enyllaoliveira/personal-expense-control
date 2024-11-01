import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "../AuthContext/AuthContext";
import Income from "../../interfaces/income";
import { DoughnutChartData } from "../../interfaces/doughnutChartData";
import { Expense } from "../../interfaces/expense";
import { formatDate } from "../../utils/FormattedValues";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Transaction } from "../../interfaces/transaction";

interface DataProviderProps {
  children: ReactNode;
}

interface IncomeUpdate {
  amount?: string;
  description?: string;
  date?: string;
  isRecurrent?: boolean;
}

interface ExpenseUpdateProps {
  amount?: string;
  description?: string;
  payment_type?: string;
  category_id?: string;
  is_recurrent?: boolean;
  installment_count?: number;
}

interface Categories {
  id: number;
  name: string;
  type: string;
  extra_description?: boolean;
  userId: number;
}

const DataContext = createContext<{
  handleAddIncome: (incomeData: Income) => Promise<void>;
  handleGetIncomes: (user: string | number) => void;
  handleChangeIncome: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDeleteIncome: (id: string) => void;
  startEditingIncome: (income: Income) => void;
  handleUpdateIncome: (e: React.FormEvent<HTMLFormElement>) => void;
  formatIncomesForChart: (incomes: Income[]) => DoughnutChartData;
  setFormDataIncome: Dispatch<SetStateAction<Income>>;
  setIsEditingIncome: Dispatch<SetStateAction<boolean>>;
  setIsDeleteIncome: Dispatch<SetStateAction<boolean>>;
  setSelectedIncome: Dispatch<SetStateAction<Income | null>>;
  handleGetExpense: (user: string | number) => void;
  handleAddCategory: (e: React.FormEvent) => void;
  handleAddExpense: (expenseData: Expense) => Promise<void>;
  handleChangeExpenses: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  startEditingExpenses: (expense: Expense) => void;
  handleEditExpense: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteExpense: (id: string) => void;
  formatIncomesForChartToExpense: (expense: Expense[]) => DoughnutChartData;
  setFormDataExpenses: Dispatch<SetStateAction<Expense>>;
  setIsDeleteExpense: Dispatch<SetStateAction<boolean>>;
  setIsEditingExpense: Dispatch<SetStateAction<boolean>>;
  setSelectedExpense: Dispatch<SetStateAction<Expense | null>>;
  groupExpensesByDescription: (expenses: Expense[]) => Expense[];
  groupExpensesByDescriptionToGraphics: (expenses: Expense[]) => Expense[];
  fetchCategories: () => void;
  addTransaction: (transaction: Transaction) => void;
  filterTransactions: (type: "income" | "expense" | "credit") => Transaction[];
  incomes: Income[];
  formDataIncome: Income;
  editingIncome: Income | null;
  isEditingIncome: boolean;
  isDeleteIncome: boolean;
  selectedIncome: Income | null;
  expenses: Expense[];
  editingExpense: Expense | null;
  formDataExpenses: Expense;
  isDeleteExpense: boolean;
  isEditingExpense: boolean;
  selectedExpense: Expense | null;
  categories: Categories[];
  transactions: Transaction[];
  notify: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
} | null>(null);

export function DataProvider({ children }: DataProviderProps) {
  const navigate = useNavigate();
  const api = new useApi();
  const userContext = AuthContext();
  const user = userContext?.user;
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isDeleteIncome, setIsDeleteIncome] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isEditingExpense, setIsEditingExpense] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDeleteExpense, setIsDeleteExpense] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const filterTransactions = (type: "income" | "expense" | "credit") =>
    transactions.filter((transaction) => transaction.type === type);

  const [formDataIncome, setFormDataIncome] = useState<Income>({
    id: "",
    userId: user?.id || 0,
    amount: "",
    description: "",
    receipt_date: formatDate(new Date()),
    isRecurrent: false,
  });

  const [formDataExpenses, setFormDataExpenses] = useState({
    userId: user?.id,
    id: "",
    amount: "",
    description: "",
    payment_date: formatDate(new Date()),
    category_id: "",
    newCategorie: "",
    payment_type: "comum",
    installment_count: 1,
    is_recurrent: false,
  });

  const notify = {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
  };

  useEffect(() => {
    if (user) {
      handleGetExpense();
      handleGetIncomes();
      fetchCategories();
    } else {
      setExpenses([]);
      setIncomes([]);
    }
  }, [user]);

  const handleGetExpense = async () => {
    try {
      const response = await api.getExpensesById(String(user?.id));
      if (response?.status === 200) {
        const allExpenses = response.data || [];
        setExpenses(allExpenses);
      } else if (response?.status === 404) {
        toast.error("Nenhuma despesa encontrada.", { autoClose: 2000 });
        setExpenses([]);
      }
    } catch (error) {
      console.error("Error ao carregar despesas:", error);
      throw error;
    }
  };

  const isFormValidToExpense = () => {
    return (
      formDataExpenses.amount.trim() !== "" &&
      formDataExpenses.description.trim() !== "" &&
      formDataExpenses.payment_date.trim() !== "" &&
      formDataExpenses.category_id.trim() !== ""
    );
  };

  const handleAddExpense = async (expenseData: Expense) => {
    if (!isFormValidToExpense()) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    const {
      amount,
      description,
      payment_date,
      category_id,
      payment_type,
      installment_count,
      is_recurrent,
    } = expenseData;

    if (is_recurrent && installment_count > 1) {
      toast.error(
        "Uma despesa não pode ser parcelada e recorrente ao mesmo tempo.",
        {
          autoClose: 3000,
        }
      );
      return;
    }

    try {
      const finalCategoryId = category_id;
      if (!user?.id) {
        toast.error("Usuário não autenticado.");
        navigate("/login");
        return;
      }
      const expenses = [];
      const initialDate = new Date(payment_date);

      if (installment_count && installment_count > 1) {
        for (let i = 0; i < installment_count; i++) {
          const dateInstallment = new Date(initialDate);
          dateInstallment.setMonth(dateInstallment.getMonth() + i);

          expenses.push({
            description: description,
            amount: (parseFloat(amount) / installment_count).toFixed(2),
            payment_date: dateInstallment.toISOString().split("T")[0],
            category_id: finalCategoryId,

            user_id: String(user.id),
            payment_type: payment_type || "comum",
            installment_count: installment_count,
            current_installment: i + 1,
          });
        }
      } else if (is_recurrent) {
        for (let i = 0; i < 12; i++) {
          const recurringDate = new Date(initialDate);
          recurringDate.setMonth(recurringDate.getMonth() + i);

          expenses.push({
            user_id: String(user.id),
            amount: amount,
            description: description,
            payment_date: recurringDate.toISOString().split("T")[0],
            category_id: finalCategoryId,
            payment_type: payment_type || "comum",
            installment_count: 12,
            current_installment: i + 1,
          });
        }
      } else {
        expenses.push({
          user_id: String(user.id),
          amount: amount,
          description: description,
          payment_date: payment_date,
          category_id: finalCategoryId,
          payment_type: payment_type || "comum",
          installment_count: 1,
          current_installment: 1,
        });
      }
      const response = await api.createExpense(expenses);

      if (response?.status === 201) {
        setExpenses((prevExpenses) => [...prevExpenses, ...response.data]);
        toast.success("Despesa criada com sucesso.", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Erro ao adicionar despesa.", { autoClose: 2000 });
      console.error("Erro:", error);
    }
  };

  const handleEditExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFields: ExpenseUpdateProps = {};

    if (formDataExpenses.is_recurrent && formDataExpenses.installment_count) {
      toast.error(
        "A despesa não pode ser recorrente e parcelada ao mesmo tempo."
      );
      return;
    }

    if (
      formDataExpenses.amount !== undefined &&
      formDataExpenses.amount !== ""
    ) {
      updatedFields.amount = formDataExpenses.amount.toString();
    }
    if (formDataExpenses.description) {
      updatedFields.description = formDataExpenses.description.toString();
    }
    if (formDataExpenses.payment_date) {
      updatedFields.payment_type = formDataExpenses.payment_date;
    }
    if (formDataExpenses.category_id) {
      updatedFields.category_id = formDataExpenses.category_id;
    }
    if (formDataExpenses.is_recurrent !== undefined) {
      updatedFields.is_recurrent = formDataExpenses.is_recurrent;
    }

    if (formDataExpenses.installment_count !== undefined) {
      updatedFields.installment_count = formDataExpenses.installment_count;
    }

    try {
      if (!editingExpense) {
        return;
      }

      const response = await api.editExpenses(
        editingExpense.id.toString(),
        updatedFields
      );

      if (response?.status === 200) {
        toast.success("Despesa editada.", { autoClose: 2000 });
        await handleGetExpense();
        setIsEditingExpense(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await api.deleteExpenses(id);
      if (response?.status === 200) {
        toast.success("Despesa excluída.", { autoClose: 2000 });
        setIsDeleteExpense(false);
        await handleGetExpense();
      }
    } catch (error) {
      console.error("Error ao excluir despesa", error);
    }
  };

  const groupExpensesByDescription = (expenses: Expense[]): Expense[] => {
    const groupedExpenses = new Map<string, Expense>();

    expenses.forEach((expense) => {
      const key = expense.description.split(" - Parcela")[0];

      if (!groupedExpenses.has(key)) {
        groupedExpenses.set(key, { ...expense });
      }
    });

    return Array.from(groupedExpenses.values());
  };

  const groupExpensesByDescriptionToGraphics = (expenses: Expense[]) => {
    const groupedExpenses = new Map<string, Expense>();

    expenses.forEach((expense) => {
      const baseDescription = (expense.description || "")
        .split(" - Parcela")[0]
        .trim();

      if (groupedExpenses.has(baseDescription)) {
        const existingExpense = groupedExpenses.get(baseDescription);

        if (existingExpense) {
          const existingAmount = parseFloat(
            String(existingExpense.amount) || "0"
          );
          const currentValue = parseFloat(String(expense.amount) || "0");

          groupedExpenses.set(baseDescription, {
            ...existingExpense,
            amount: (existingAmount + currentValue).toFixed(2),
          });
        }
      } else {
        groupedExpenses.set(baseDescription, {
          ...expense,
          description: baseDescription,
        });
      }
    });

    return Array.from(groupedExpenses.values());
  };

  const handleChangeExpenses = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormDataExpenses((expenses) => ({
      ...expenses,
      [name]:
        name === "installment_count"
          ? parseInt(value)
          : name === "payment_date"
          ? new Date(value).toISOString().split("T")[0]
          : value,
    }));
  };
  const startEditingExpenses = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const formatIncomesForChartToExpense = (
    expenses: Expense[]
  ): DoughnutChartData => {
    const groupedExpenses: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      const { amount, description } = expense;
      const value =
        typeof amount === "string" ? parseFloat(amount) : amount ?? 0;

      const validDescription = description ?? "Descrição Indisponível";

      if (groupedExpenses[validDescription]) {
        groupedExpenses[validDescription] += value;
      } else {
        groupedExpenses[validDescription] = value;
      }
    });

    return {
      labels: Object.keys(groupedExpenses),
      datasets: [
        {
          label: "Distribuição de Despesas",
          data: Object.values(groupedExpenses),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 120, 140, 0.6)",
            "rgba(235, 99, 132, 0.6)",
            "rgba(255, 99, 150, 0.6)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 80, 150, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(255, 120, 140, 1)",
            "rgba(255, 80, 120, 1)",
            "rgba(235, 99, 132, 1)",
            "rgba(255, 99, 150, 1)",
            "rgba(255, 80, 150, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const handleAddIncome = async (incomeData: Income) => {
    try {
      const response = await api.createIncome({
        userId: String(incomeData.userId),
        amount: incomeData.amount,
        description: incomeData.description,
        receipt_date: incomeData.receipt_date,
        isRecurrent: incomeData.isRecurrent,
      });

      if (response?.status === 201) {
        toast.success(`Receita ${incomeData.description} criada.`, {
          autoClose: 2000,
        });

        setFormDataIncome((prev) => ({
          ...prev,
          amount: "",
          description: "",
          receipt_date: "",
          isRecurrent: false,
        }));

        await handleGetIncomes();
      }
    } catch (error) {
      toast.error("Erro ao adicionar receita. Tente novamente mais tarde.", {
        autoClose: 2000,
      });
      console.error("Erro ao enviar receita:", error);
    }
  };

  const handleGetIncomes = async () => {
    try {
      const response = await api.getIncomesById(String(user?.id));
      if (response?.status === 200) {
        const receitas = response.data || [];
        setIncomes(receitas);
      } else if (response?.status === 404) {
        toast.error("Nenhuma receita encontrada.", { autoClose: 2000 });
        console.error("Nenhuma receita encontrada.");
        setIncomes([]);
      }
    } catch (error) {
      if (!user) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.error("Erro ao carregar receita. Tente novamente mais tarde.", {
          autoClose: 2000,
        });
      } else {
        throw error;
      }
      console.error("Erro ao carregar receitas:", error);
    }
  };

  const handleChangeIncome = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormDataIncome((income) => ({
      ...income,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeleteIncome = async (id: string) => {
    try {
      const response = await api.deleteIncome(id);
      if (response?.status === 200) {
        setIncomes((prevIncomes) =>
          prevIncomes.filter((incomes) => String(incomes.id) !== id)
        );

        toast.success("Receita excluída.", { autoClose: 2000 });
        setIsDeleteIncome(false);
        await handleGetIncomes();
      }
    } catch (error) {
      toast.error("Erro ao excluir receita.", { autoClose: 2000 });
      throw error;
    }
  };

  const startEditingIncome = (income: Income) => {
    setEditingIncome(income);

    const formattedDate = income.created_at
      ? new Date(income.created_at).toISOString().split("T")[0]
      : "";

    setFormDataIncome({
      id: String(income.id),
      userId: user?.id || 0, // Garantir valor numérico
      amount: income.amount.toString(),
      description: income.description,
      receipt_date: formattedDate,
      isRecurrent: income.isRecurrent || false,
    });
  };

  const handleUpdateIncome = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFields: IncomeUpdate = {};

    if (formDataIncome.amount)
      updatedFields.amount = formDataIncome.amount.toString();
    if (formDataIncome.description)
      updatedFields.description = formDataIncome.description;
    if (formDataIncome.receipt_date)
      updatedFields.date = formDataIncome.receipt_date;
    if (formDataIncome.isRecurrent !== undefined)
      updatedFields.isRecurrent = formDataIncome.isRecurrent;

    try {
      const response = await api.editIncome(
        formDataIncome.id.toString(),
        updatedFields
      );

      if (response?.status === 200) {
        toast.success(`Receita editada.`, {
          autoClose: 2000,
        });
        await handleGetIncomes();
        setIsEditingIncome(false);
      }
    } catch (error) {
      console.error("Erro ao editar receita:", error);
    }
  };

  const formatIncomesForChart = (incomes: Income[]): DoughnutChartData => {
    const groupedIncomes: { [key: string]: number } = {};

    incomes.forEach((income) => {
      const { description, amount } = income;
      const value = typeof amount === "string" ? parseFloat(amount) : amount;

      if (groupedIncomes[description]) {
        groupedIncomes[description] += value;
      } else {
        groupedIncomes[description] = value;
      }
    });

    return {
      labels: Object.keys(groupedIncomes),
      datasets: [
        {
          label: "Distribuição de Receitas",
          data: Object.values(groupedIncomes),
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(95, 192, 192, 0.6)",
            "rgba(65, 182, 182, 0.6)",
            "rgba(75, 172, 172, 0.6)",
            "rgba(75, 192, 182, 0.6)",
            "rgba(85, 202, 202, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 182, 1)",

            "rgba(65, 182, 182, 1)",

            "rgba(75, 172, 172, 1)",
            "rgba(95, 192, 192, 1)",
            "rgba(85, 202, 202, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const fetchCategories = async () => {
    if (!user?.id) {
      toast.error("Usuário não autenticado.");
      navigate("/login");
      return;
    }
    try {
      const response = await api.getCategories();
      const categoriesData: Categories[] = response?.data || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      setCategories([]);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formDataExpenses.newCategorie.trim()) {
      console.error("O nome da nova categoria é obrigatório.");
      return;
    }
    if (!user?.id) {
      toast.error("Usuário não autenticado.");
      navigate("/login");
      return;
    }

    try {
      const newCategory = await api.createCategory({
        name: formDataExpenses.newCategorie,
        type: "despesa",
        extra_description: false,
        id: user?.id,
      });
      toast.success(`Categoria de despesa ${newCategory} criada.`, {
        autoClose: 2000,
      });

      await fetchCategories();

      setFormDataExpenses((expenses) => ({
        ...expenses,
        newCategorie: "",
      }));
    } catch (error) {
      toast.error("Erro ao criar categoria.", { autoClose: 2000 });

      console.error("Erro ao criar categoria:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        handleChangeIncome,
        handleAddIncome,
        handleDeleteIncome,
        startEditingIncome,
        handleUpdateIncome,
        handleGetIncomes,
        formatIncomesForChart,
        handleChangeExpenses,
        startEditingExpenses,
        handleAddExpense,
        handleEditExpense,
        handleDeleteExpense,
        handleGetExpense,
        handleAddCategory,
        formatIncomesForChartToExpense,
        fetchCategories,
        setFormDataIncome,
        setFormDataExpenses,
        setIsEditingIncome,
        setIsEditingExpense,
        setSelectedIncome,
        setIsDeleteIncome,
        setSelectedExpense,
        setIsDeleteExpense,
        groupExpensesByDescription,
        groupExpensesByDescriptionToGraphics,
        addTransaction,
        filterTransactions,
        transactions,
        incomes,
        formDataIncome,
        editingIncome,
        notify,
        formDataExpenses,
        expenses,
        editingExpense,
        categories,
        isEditingIncome,
        isEditingExpense,
        selectedIncome,
        isDeleteIncome,
        selectedExpense,
        isDeleteExpense,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export function useDataInformation() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataInformation must be used within a DataProvider");
  }
  return context;
}
