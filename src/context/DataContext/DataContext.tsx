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
import { Expense } from "../../interfaces";

import { formatDate } from "../../utils/FormattedValues";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface DataProviderProps {
  children: ReactNode;
}

interface IncomeUpdate {
  amount?: string;
  description?: string;
  date?: string;
}

interface ExpenseUpdateProps {
  valor?: string;
  descricao?: string;
  data_pagamento?: string;
  categoria_id?: string;
}

interface FormValues {
  id: string;
  userId: number | undefined;
  value: string;
  description: string;
  receipt_date: string;
}
interface formValueToExpenses {
  id: string;
  userId: number | undefined;
  value: string;
  description: string;
  payment_data: string;
  categoria_id: string;
  newCategorie: string;
}
interface Categoria {
  id: number;
  nome: string;
  tipo: string;
  descricao_extra?: boolean;
}

const DataContext = createContext<{
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleDelete: (id: string) => void;
  startEditing: (income: Income) => void;
  handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  incomes: Income[];
  formatIncomesForChart: (incomes: Income[]) => DoughnutChartData;
  formData: FormValues;
  editingIncome: Income | null;
  handleGetIncomes: (user: string | number) => void;
  expenses: Expense[];
  handleChangeExpenses: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  startEditingExpenses: (expense: Expense) => void;
  handleAddExpense: (categoria_id?: string) => Promise<void>;
  handleEditExpense: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteExpense: (id: string) => void;
  editingExpense: Expense | null;
  formDataExpenses: formValueToExpenses;

  handleGetExpense: (user: string | number) => void;
  formatIncomesForChartToExpense: (expense: Expense[]) => DoughnutChartData;
  fetchCategories: () => void;
  categorias: Categoria[];
  handleAddCategory: (e: React.FormEvent) => void;
  notify: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
  setFormData: Dispatch<SetStateAction<FormValues>>;
  setFormDataExpenses: Dispatch<SetStateAction<formValueToExpenses>>;
  isEditingIncome: boolean;
  setIsEditingIncome: Dispatch<SetStateAction<boolean>>;
  isDeleteIncome: boolean;
  setIsDeleteIncome: Dispatch<SetStateAction<boolean>>;
  isDeleteExpense: boolean;
  setIsDeleteExpense: Dispatch<SetStateAction<boolean>>;
  isEditingExpense: boolean;
  setIsEditingExpense: Dispatch<SetStateAction<boolean>>;
  selectedIncome: Income | null;
  setSelectedIncome: Dispatch<SetStateAction<Income | null>>;
  selectedExpense: Expense | null;
  setSelectedExpense: Dispatch<SetStateAction<Expense | null>>;
} | null>(null);

export function DataProvider({ children }: DataProviderProps) {
  const api = new useApi();
  const userContext = AuthContext();
  const user = userContext?.user;
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [isEditingExpense, setIsEditingExpense] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isDeleteIncome, setIsDeleteIncome] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDeleteExpense, setIsDeleteExpense] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    userId: user?.id,
    value: "",
    description: "",
    receipt_date: formatDate(new Date()),
  });
  const [formDataExpenses, setFormDataExpenses] = useState({
    userId: user?.id,
    id: "",
    value: "",
    description: "",
    payment_data: formatDate(new Date()),
    categoria_id: "",
    newCategorie: "",
  });
  const notify = {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [user]);

  const fetchCategories = async () => {
    if (!user?.id) {
      console.error("ID do usuário não encontrado.");
      return;
    }
    try {
      const response = await api.getCategoriesByID(user?.id);
      const categoriasData: Categoria[] = response?.data || [];
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      setCategorias([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formDataExpenses.newCategorie.trim()) {
      console.error("O nome da nova categoria é obrigatório.");
      return;
    }
    if (!user?.id) {
      console.error("ID do usuário não encontrado.");
      return;
    }

    try {
      const novaCategoria = await api.createCategory({
        nome: formDataExpenses.newCategorie,
        tipo: "despesa",
        descricao_extra: false,
        id: user?.id,
      });
      toast.success(`Categoria de despesa ${novaCategoria} criada.`, {
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

  const handleGetExpense = async () => {
    try {
      const response = await api.getExpensesById(String(user?.id));
      if (response?.status === 200) {
        const despesas = response.data || [];
        setExpenses(despesas);
      } else if (response?.status === 404) {
        toast.error("Nenhuma despesa encontrada.", { autoClose: 2000 });
        setExpenses([]);
      }
    } catch (error) {
      console.error("Error ao carregar despesas:", error);
      throw error;
    }
  };

  useEffect(() => {
    handleGetExpense();
    handleGetIncomes();
  }, [user]);
  useEffect(() => {
    if (user?.id) {
      setFormDataExpenses((formDataExpenses) => ({
        ...formDataExpenses,
        userId: user.id,
      }));
      handleGetExpense();
    }
  }, [user]);
  useEffect(() => {
    if (user?.id) {
      setFormDataExpenses((prev) => ({ ...prev, userId: user.id }));
      handleGetIncomes();
      handleGetExpense();
    } else {
      setExpenses([]);
      setIncomes([]);
    }
  }, [user]);

  const isFormValidToExpense = () => {
    return (
      formDataExpenses.value.trim() !== "" &&
      formDataExpenses.description.trim() !== "" &&
      formDataExpenses.payment_data.trim() !== "" &&
      formDataExpenses.categoria_id.trim() !== ""
    );
  };

  const handleAddExpense = async (categoria_id?: string) => {
    if (!isFormValidToExpense()) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    try {
      let finalCategoriaId = categoria_id || formDataExpenses.categoria_id;
      if (!user?.id) {
        console.error("ID do usuário não encontrado.");
        return;
      }
      if (formDataExpenses.newCategorie.trim()) {
        toast.info("Criando nova categoria...", {
          autoClose: 2000,
        });
        console.log("Criando nova categoria...");
        const categoriaResponse = await api.createCategory({
          nome: formDataExpenses.newCategorie,
          tipo: "despesa",
          descricao_extra: false,
          id: user.id,
        });

        finalCategoriaId = String(categoriaResponse.id);
        await fetchCategories();
      }

      const response = await api.createExpense({
        usuario_id: String(user?.id),
        valor: formDataExpenses.value,
        descricao: formDataExpenses.description,
        data_pagamento: formDataExpenses.payment_data,
        categoria_id: finalCategoriaId,
      });

      if (response?.status === 201) {
        toast.success(`Despesa ${response?.data?.descricao} criada.`, {
          autoClose: 2000,
        });
        setExpenses((expenses) => [...expenses, response.data]);
        setFormDataExpenses({
          id: "",
          userId: user?.id,
          value: "",
          description: "",
          payment_data: formatDate(new Date()),
          categoria_id: "",
          newCategorie: "",
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
    }
  };

  const handleEditExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFields: ExpenseUpdateProps = {};

    if (formDataExpenses.value !== undefined && formDataExpenses.value !== "") {
      updatedFields.valor = formDataExpenses.value.toString();
    }
    if (formDataExpenses.description) {
      updatedFields.descricao = formDataExpenses.description.toString();
    }
    if (formDataExpenses.payment_data) {
      updatedFields.data_pagamento = formDataExpenses.payment_data;
    }
    if (formDataExpenses.categoria_id) {
      updatedFields.categoria_id = formDataExpenses.categoria_id;
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
        console.log("Despesa editada");
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
        console.log("Despesa excluída com sucesso");
        toast.success("Despesa excluída.", { autoClose: 2000 });
        setIsDeleteExpense(false);
        await handleGetExpense();
      }
    } catch (error) {
      console.error("Error ao excluir despesa", error);
    }
  };

  const formatIncomesForChartToExpense = (
    expenses: Expense[]
  ): DoughnutChartData => {
    const groupedExpenses: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      const { valor, descricao } = expense;
      const value = typeof valor === "string" ? parseFloat(valor) : valor ?? 0;

      const descricaoValida = descricao ?? "Descrição Indisponível";

      if (groupedExpenses[descricaoValida]) {
        groupedExpenses[descricaoValida] += value;
      } else {
        groupedExpenses[descricaoValida] = value;
      }
    });

    return {
      labels: Object.keys(groupedExpenses),
      datasets: [
        {
          label: "Distribuição de Despesas",
          data: Object.values(groupedExpenses),
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userId) {
      console.error("ID do usuário é obrigatório.");
      return;
    }

    try {
      const response = await api.createIncome({
        userId: String(formData.userId),
        amount: formData.value,
        description: formData.description,
        receipt_date: formData.receipt_date,
      });

      if (response?.status === 201) {
        toast.success(`Receita ${formData.description} criada.`, {
          autoClose: 2000,
        });
        console.log("Receita adicionada com sucesso");
        setFormData({
          id: "",
          userId: formData.userId,
          value: "",
          description: "",
          receipt_date: "",
        });
        await handleGetIncomes();
      }
    } catch (error) {
      toast.error("Erro ao adicionar receita. Tente novamente mais tarde.", {
        autoClose: 2000,
      });
      console.error("Error ao enviar receita:", error);
      throw error;
    }
  };

  const handleGetIncomes = async () => {
    try {
      const response = await api.getIncomesById(String(user?.id));
      if (response?.status === 200) {
        const receitas = response.data || [];
        console.log("Receitas carregadas:", receitas);
        setIncomes(receitas);
      } else if (response?.status === 404) {
        toast.error("Nenhuma receita encontrada.", { autoClose: 2000 });
        console.error("Nenhuma receita encontrada.");
        setIncomes([]);
      }
    } catch (error) {
      if (user) {
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

  useEffect(() => {
    if (user?.id) {
      setFormData((incomes) => ({
        ...incomes,
        userId: user.id,
      }));
    }
    console.log("testeee", user);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeExpenses = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormDataExpenses((expenses) => ({ ...expenses, [name]: value }));
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.deleteIncome(id);
      if (response?.status === 200) {
        setIncomes((prevIncomes) =>
          prevIncomes.filter((incomes) => String(incomes.id) !== id)
        );

        toast.success("Receita excluída.", { autoClose: 2000 });
        setIsDeleteIncome(false);

        console.log("Receita excluída com sucesso");
        await handleGetIncomes();
      }
    } catch (error) {
      toast.error("Erro ao excluir receita.", { autoClose: 2000 });
      console.error("Error ao excluir receita:", error);
    }
  };

  const startEditing = (income: Income) => {
    setEditingIncome(income);

    const formattedDate = income.created_at
      ? new Date(income.created_at).toISOString().split("T")[0]
      : "";

    setFormData({
      id: String(income.id),
      userId: user?.id,
      value: income.amount.toString(),
      description: income.description,
      receipt_date: formattedDate,
    });
  };

  const startEditingExpenses = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFields: IncomeUpdate = {};

    if (formData.value) updatedFields.amount = formData.value.toString();
    if (formData.description) updatedFields.description = formData.description;
    if (formData.receipt_date) updatedFields.date = formData.receipt_date;

    try {
      const response = await api.editIncome(
        formData.id.toString(),
        updatedFields
      );

      if (response?.status === 200) {
        toast.success(`Receita editada.`, {
          autoClose: 2000,
        });
        console.log("Receita atualizada com sucesso.", response);
        await handleGetIncomes();
        setIsEditingIncome(false);
      }
    } catch (error) {
      console.error(error);
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
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };
  return (
    <DataContext.Provider
      value={{
        handleChange,
        handleSubmit,
        handleDelete,
        startEditing,
        handleUpdate,
        handleGetIncomes,
        incomes,
        formatIncomesForChart,
        formData,
        editingIncome,
        notify,
        formDataExpenses,
        expenses,
        handleChangeExpenses,
        startEditingExpenses,
        handleAddExpense,
        handleEditExpense,
        handleDeleteExpense,
        editingExpense,
        handleGetExpense,
        categorias,
        handleAddCategory,
        formatIncomesForChartToExpense,
        fetchCategories,
        setFormData,
        setFormDataExpenses,
        setIsEditingIncome,
        isEditingIncome,
        isEditingExpense,
        setIsEditingExpense,
        selectedIncome,
        setSelectedIncome,
        isDeleteIncome,
        setIsDeleteIncome,
        selectedExpense,
        setSelectedExpense,
        isDeleteExpense,
        setIsDeleteExpense,
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
