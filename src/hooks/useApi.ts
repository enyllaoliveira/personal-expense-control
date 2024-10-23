import api from "../services/api";
import Income from "../interfaces/income";
import { AxiosResponse } from "axios";
import { Expense } from "../interfaces";
export class useApi {
  public async register(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/register`,
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
        `${import.meta.env.VITE_API_URL}/login`,
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
      const response = await api.post("/logout", {}, { withCredentials: true });
      return response;
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      throw error;
    }
  }

  public async getIncomesById(userId: string | number) {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/receitas?userId=${userId}`,
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
  }) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/receitas`,
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
        `${import.meta.env.VITE_API_URL}/receitas/${id}`,
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
        `${import.meta.env.VITE_API_URL}/receitas/${id}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao editar lançamento:", error);
      throw error;
    }
  }

  public async getExpensesById(id: string | number) {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/despesas?userId=${id}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
      throw error;
    }
  }

  public async createExpense(expensesData: {
    valor: string;
    descricao: string;
    data_pagamento: string;
    usuario_id: string;
    categoria_id: string | number;
    novaCategoria?: string;
  }) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/despesas`,
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
        `${import.meta.env.VITE_API_URL}/despesas/${id}`,
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
        `${import.meta.env.VITE_API_URL}/despesas/${id}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      throw error;
    }
  }

  public async getCategoriesByID(userId: string | number) {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/categorias?userId=${userId}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw error;
    }
  }

  public async getCategories(): Promise<
    { id: number; nome: string; tipo: string }[]
  > {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/categorias`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw error;
    }
  }

  public async createCategory(categoriesData: {
    nome: string;
    tipo: string;
    descricao_extra: boolean;
    id: string | number;
  }) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/categorias`,
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
    nome: string;
    tipo: string;
    descricao_extra: boolean;
  }) {
    try {
      const response = await api.put(
        `${import.meta.env.VITE_API_URL}/categorias/${categoriesData.id}`,
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
        `${import.meta.env.VITE_API_URL}/categorias/${id}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      throw error;
    }
  }
}
