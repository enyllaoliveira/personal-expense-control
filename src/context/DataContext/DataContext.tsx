import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  ChangeEvent,
} from "react";

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
interface FormValues {
  userId: string | number | undefined;
  value: string;
  description: string;
  receipt_date: string;
}
interface formValueToExpenses {
  userId: string | number | undefined;
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
  const [formData, setFormData] = useState({
    userId: user?.id,
    value: "",
    description: "",
    receipt_date: formatDate(new Date()),
  });
  const [formDataExpenses, setFormDataExpenses] = useState({
    userId: user?.id,
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
  const isFormValid = () => {
    return (
      formData.value.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.receipt_date.trim() !== ""
    );
  };

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

      console.log("Nova categoria criada:", novaCategoria);
      // depois do teste, remover

      await fetchCategories();

      setFormDataExpenses((prev) => ({
        ...prev,
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
        // console.warn("Nenhuma despesa encontrada.");
        setExpenses([]);
      }
    } catch (error) {
      console.error("Error ao carregar despesas:", error);
      throw error;
    }
  };

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

      console.log("Enviando despesa com categoria ID:", finalCategoriaId);
      // depois dos testes, remover

      const response = await api.createExpense({
        usuario_id: String(user?.id),
        valor: formDataExpenses.value,
        descricao: formDataExpenses.description,
        data_pagamento: formDataExpenses.payment_data,
        categoria_id: finalCategoriaId,
      });

      if (response?.status === 201) {
        toast.success("Despesa criada.", { autoClose: 2000 });
        console.log("Despesa criada com sucesso:", response.data);
        setExpenses((expenses) => [...expenses, response.data]);
        setFormDataExpenses({
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
    if (!editingExpense) return;

    if (!isFormValidToExpense()) {
      console.error("Todos os campos são obrigatórios");
      return;
    }
    try {
      const response = await api.editExpenses(editingExpense.id.toString(), {
        valor: formDataExpenses.value,
        descricao: formDataExpenses.description,
        data_pagamento: formDataExpenses.payment_data,
        categoria_id: formDataExpenses.categoria_id,
        atualizado_em: new Date().toISOString(),
      });

      if (response?.status === 200) {
        console.log("Despesa editada");
        toast.success("Despesa editada.", { autoClose: 2000 });

        await handleGetExpense();
      }
    } catch (error) {
      console.error("Error ao editar despesa", error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await api.deleteExpenses(id);
      if (response?.status === 200) {
        console.log("Despesa excluída com sucesso");
        toast.success("Despesa excluída.", { autoClose: 2000 });

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
      toast.error("Erro ao carregar receita. Tente novamente mais tarde.", {
        autoClose: 2000,
      });

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        toast.success("Receita excluída.", { autoClose: 2000 });
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
      userId: user?.id,
      value: income.amount.toString(),
      description: income.description,
      receipt_date: formattedDate,
    });
  };

  const startEditingExpenses = (expense: Expense) => {
    const formattedDate = expense.data_pagamento
      ? new Date(expense.data_pagamento).toISOString().split("T")[0]
      : "";

    setEditingExpense(expense);
    setFormDataExpenses({
      userId: user?.id,
      value: expense.valor ?? "",
      description: expense.descricao ?? "",
      payment_data: formattedDate,
      categoria_id: expense.categoria_id?.toString() ?? "",
      newCategorie: "",
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingIncome) return;

    if (!isFormValid()) {
      toast.error("Todos os campos são obrigatórios.", { autoClose: 2000 });
      console.error("Todos os campos são obrigatórios");
      return;
    }

    try {
      const response = await api.editIncome(editingIncome.id.toString(), {
        amount: formData.value,
        description: formData.description,
        receipt_date: formData.receipt_date,
      });

      if (response?.status === 200) {
        toast.success("Receita editada.", { autoClose: 2000 });
        console.log("Receita editada com sucesso");
        setEditingIncome(null);
        await handleGetIncomes();
        setEditingIncome(null);
        setFormData({
          userId: user?.id,
          value: "",
          description: "",
          receipt_date: "",
        });
      }
    } catch (err) {
      toast.error("Erro ao atualizar receita.", { autoClose: 2000 });
      console.log("Erro ao atualizar os dados", err);
      throw err;
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
