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
import { formatDate } from "../../utils/FormattedValues";

interface DataProviderProps {
  children: ReactNode;
}
interface FormValues {
  userId: string | number | undefined;
  value: string;
  description: string;
  receipt_date: string;
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
} | null>(null);

export function DataProvider({ children }: DataProviderProps) {
  const api = new useApi();
  const userContext = AuthContext();
  const user = userContext?.user;
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [formData, setFormData] = useState({
    userId: user?.id,
    value: "",
    description: "",
    receipt_date: formatDate(new Date()),
  });

  const isFormValid = () => {
    return (
      formData.value.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.receipt_date.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      console.error("Todos os campos são obrigatórios");
      return;
    }

    try {
      const response = await api.sendIncomes({
        userId: String(user?.id),
        amount: formData.value,
        description: formData.description,
        receipt_date: formData.receipt_date,
      });
      if (response?.status === 201) {
        console.log("Receita adicionada com sucesso");
        setFormData({
          userId: user?.id,
          value: "",
          description: "",
          receipt_date: "",
        });
        await handleGetIncomes();
      }
    } catch (error) {
      console.error("Error ao enviar receita:", error);
    }
  };

  const handleGetIncomes = async () => {
    try {
      const response = await api.getIncomesById(String(user?.id));
      if (response?.status === 200) {
        setIncomes(response.data);
      }
    } catch (error) {
      console.error("Error ao carregar receitas:", error);
    }
  };

  useEffect(() => {
    handleGetIncomes();
  }, [user, editingIncome]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.deleteIncome(id);
      if (response?.status === 200) {
        console.log("Receita excluída com sucesso");
        await handleGetIncomes();
      }
    } catch (error) {
      console.error("Error ao excluir receita:", error);
    }
  };

  const startEditing = (income: Income) => {
    setEditingIncome(income);
    setFormData({
      userId: user?.id,
      value: income.amount.toString(),
      description: income.description,
      receipt_date: income.receipt_date,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingIncome) return;

    if (!isFormValid()) {
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
      console.log("Erro ao atualizar os dados", err);
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
        incomes,
        formatIncomesForChart,
        formData,
        editingIncome,
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
