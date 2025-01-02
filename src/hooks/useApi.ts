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
      const response = await api.post(`/api/users/register`, userData);
      return response;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw error;
    }
  }

  public async login(userData: { email: string; password: string }) {
    try {
      const response = await api.post(`/api/users/login`, userData);
      return response;
    } catch (error) {
      console.error("Erro ao logar usuário:", error);
      throw error;
    }
  }

  public async logout(): Promise<AxiosResponse> {
    try {
      const response = await api.post("/api/users/logout", {});
      return response;
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      throw error;
    }
  }

  public async getIncomesById(userId: string | number) {
    try {
      const response = await api.get(`/api/incomes?userId=${userId}`);
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
      const response = await api.post(`/api/incomes`, incomesData);
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
      const response = await api.put(`/api/incomes/${id}`, updateData);
      return response;
    } catch (error) {
      console.error("Erro ao editar lançamento:", error);
      throw error;
    }
  }

  public async deleteIncome(id: string) {
    try {
      const response = await api.delete(`/api/incomes/${id}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getExpensesById(id: string | number) {
    try {
      const response = await api.get(`/api/expenses?userId=${id}`);
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
      const response = await api.post(`/api/expenses`, expensesData);
      return response;
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
      throw error;
    }
  }

  public async editExpenses(id: string, updateData: Partial<Expense>) {
    try {
      const response = await api.put(`/api/expenses/${id}`, updateData);
      return response;
    } catch (error) {
      console.error("Erro ao editar despesa:", error);
      throw error;
    }
  }

  public async deleteExpenses(id: string) {
    try {
      const response = await api.delete(`/api/expenses/${id}`);
      return response;
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      throw error;
    }
  }

  public async getYearData(year: number) {
    try {
      const response = await api.get(`/api/graphics/year`, {
        params: { year },
      });
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
      const response = await api.get(`/api/graphics/month`, {
        params: { month, year },
      });
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
      const response = await api.get(`/api/categories`);
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
      const response = await api.post(`/api/categories`, categoriesData);
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
        `/api/categories/${categoriesData.id}`,
        categoriesData
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw error;
    }
  }

  public async deleteCategories(id: string) {
    try {
      const response = await api.delete(`/api/categories/${id}`);
      return response;
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      throw error;
    }
  }
}
