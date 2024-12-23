import api from "../services/api";
import Income from "../interfaces/income";
import { AxiosResponse } from "axios";
import { Expense } from "../interfaces/expense";
export class useApi {
  public async register(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        userData
      );
      return response;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw error;
    }
  }

  public async login(userData: { email: string; password: string }) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        userData
      );
      return response;
    } catch (error) {
      console.error("Erro ao logar usuário:", error);
      throw error;
    }
  }

  public async logout(): Promise<AxiosResponse> {
    try {
      const response = await api.post(
        "/users/logout",
        {},
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      throw error;
    }
  }

  public async getIncomesById(userId: string | number) {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/incomes?userId=${userId}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
      throw error;
    }
  }

  public async createIncome(incomesData: {
    userId: string;
    amount: string;
    description: string;
    receipt_date: string;
    isRecurrent: boolean;
  }) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/incomes`,
        incomesData,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
      throw error;
    }
  }

  public async editIncome(
    id: string,
    updateData: Partial<Income>
  ): Promise<AxiosResponse<unknown>> {
    try {
      const response = await api.put(
        `${import.meta.env.VITE_API_URL}/incomes/${id}`,
        updateData,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao editar lançamento:", error);
      throw error;
    }
  }

  public async deleteIncome(id: string) {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/incomes/${id}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getExpensesById(id: string | number) {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/expenses?userId=${id}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
      throw error;
    }
  }

  public async createExpense(
    expensesData: {
      amount: string;
      description: string;
      payment_date: string;
      user_id: string;
      category_id: string | number;
      newCategory?: string;
      payment_type?: string;
      installment_count?: number;
      is_recurrent?: boolean;
    }[]
  ) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/expenses`,
        expensesData,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
      throw error;
    }
  }

  public async editExpenses(id: string, updateData: Partial<Expense>) {
    try {
      const response = await api.put(
        `${import.meta.env.VITE_API_URL}/expenses/${id}`,
        updateData,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao editar despesa:", error);
      throw error;
    }
  }

  public async deleteExpenses(id: string) {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/expenses/${id}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      throw error;
    }
  }

  public async getYearData(year: number) {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/graphics/year`,
        {
          params: { year },
          withCredentials: true,
        }
      );
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Dados ausentes ou no formato incorreto");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getMonthData(month: number, year: number) {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/graphics/month`,
        {
          params: { month, year },
          withCredentials: true,
        }
      );
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Dados ausentes ou no formato incorreto");
      }
    } catch (error) {
      console.error("Erro ao buscar dados mensais:", error);
      throw error;
    }
  }

  public async getCategories() {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/categories`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw error;
    }
  }

  public async createCategory(categoriesData: {
    name: string;
    type: string;
    extra_description: boolean;
    id: string | number;
  }) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/categories`,
        categoriesData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  }

  public async editCategories(categoriesData: {
    id: string;
    name: string;
    type: string;
    extra_description: boolean;
  }) {
    try {
      const response = await api.put(
        `${import.meta.env.VITE_API_URL}/categories/${categoriesData.id}`,
        categoriesData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw error;
    }
  }

  public async deleteCategories(id: string) {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/categories/${id}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      throw error;
    }
  }
}
