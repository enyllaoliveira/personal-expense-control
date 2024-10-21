import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface Categoria {
  id: number;
  nome: string;
  tipo: string;
  descricao_extra?: boolean;
}

interface formValues {
  userId: string | number | undefined;
  value: string;
  description: string;
  payment_data: string;
  categoria_id: string;
  newCategorie: string;
}
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "../AuthContext/AuthContext";
import { Expense } from "../../interfaces";
import { formatDate } from "../../utils/FormattedValues";
import { DoughnutChartData } from "../../interfaces/doughnutChartData";

interface DataRevenueProviderProps {
  children: ReactNode;
}
const DataContext = createContext<{
  expenses: Expense[];
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  startEditing: (expense: Expense) => void;
  handleAddExpense: (categoria_id?: string) => Promise<void>;
  handleEditExpense: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteExpense: (id: string) => void;
  editingExpense: Expense | null;
  formData: formValues;
  handleGetExpense: (user: string | number) => void;
  formatIncomesForChart: (expense: Expense[]) => DoughnutChartData;

  categorias: Categoria[];
  handleAddCategory: (e: React.FormEvent) => void;
} | null>(null);

export function DataRevenueProvider({ children }: DataRevenueProviderProps) {
  const api = new useApi();
  const userContext = AuthContext();
  const user = userContext?.user;
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [formData, setFormData] = useState({
    userId: user?.id,
    value: "",
    description: "",
    payment_data: formatDate(new Date()),
    categoria_id: "",
    newCategorie: "",
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response: Categoria[] = await api.getCategories();
        setCategorias(response);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.newCategorie.trim()) {
      console.error("O nome da nova categoria é obrigatório.");
      return;
    }

    try {
      const categoriaResponse = await api.createCategory({
        nome: formData.newCategorie,
        tipo: "despesa",
        descricao_extra: false,
      });

      const novaCategoria = categoriaResponse.data;

      console.log("Nova categoria criada:", novaCategoria);

      setCategorias((categoria) => [...categoria, novaCategoria]);

      await handleAddExpense(novaCategoria.id);
    } catch (error) {
      console.error("Erro ao criar categoria e despesa:", error);
    }
  };

  const handleGetExpense = async () => {
    try {
      const response = await api.getExpensesById(String(user?.id));
      if (response?.status === 200) {
        setExpenses(response.data || []);
      }
    } catch (error) {
      console.error("Error ao carregar despesas:", error);
    }
  };

  useEffect(() => {
    if (user?.id) handleGetExpense();
  }, [user]);

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      userId: user?.id,
    }));
  }, [user]);

  const isFormValid = () => {
    return (
      formData.value.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.payment_data.trim() !== "" &&
      formData.categoria_id.trim() !== ""
    );
  };

  const startEditing = (expense: Expense) => {
    const formattedDate = expense.data_pagamento
      ? new Date(expense.data_pagamento).toISOString().split("T")[0]
      : "";

    setEditingExpense(expense);
    setFormData({
      userId: user?.id,
      value: expense.valor ?? "",
      description: expense.descricao ?? "",
      payment_data: formattedDate,
      categoria_id: expense.categoria_id?.toString() ?? "",
      newCategorie: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExpense = async (categoria_id?: string) => {
    if (!isFormValid()) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await api.createExpense({
        usuario_id: String(user?.id),
        valor: formData.value,
        descricao: formData.description,
        data_pagamento: formData.payment_data,
        categoria_id: categoria_id || formData.categoria_id,
      });

      if (response?.status === 201) {
        console.log("Despesa criada com sucesso:", response.data);
        setExpenses((expenses) => [...expenses, response.data]);
        setFormData({
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

    if (!isFormValid()) {
      console.error("Todos os campos são obrigatórios");
      return;
    }
    try {
      const response = await api.editExpenses(editingExpense.id.toString(), {
        valor: formData.value,
        descricao: formData.description,
        data_pagamento: formData.payment_data,
        categoria_id: formData.categoria_id,
        atualizado_em: new Date().toISOString(),
      });

      if (response?.status === 200) {
        console.log("Despesa editada");
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
        await handleGetExpense();
      }
    } catch (error) {
      console.error("Error ao excluir despesa", error);
    }
  };

  const formatIncomesForChart = (expenses: Expense[]): DoughnutChartData => {
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

  return (
    <DataContext.Provider
      value={{
        expenses,
        handleChange,
        startEditing,
        handleAddExpense,
        handleEditExpense,
        handleDeleteExpense,
        editingExpense,
        formData,
        handleGetExpense,
        categorias,
        handleAddCategory,
        formatIncomesForChart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataRevenueInformation() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      "useDataInformation must be used within a DataRevenueProvider"
    );
  }
  return context;
}
