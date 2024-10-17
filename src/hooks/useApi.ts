import api from "../services/api";
import Income from "../interfaces/income";
import { AxiosResponse } from "axios";
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
      console.log("Usuário registrado com sucesso:", response.status);
      return response;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  }

  public async login(userData: { email: string; password: string }) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/login`,
        userData,
        { withCredentials: true }
      );

      console.log("Usuário logado com sucesso:", response);
      return response;
    } catch (error) {
      console.error("Erro ao logar usuário:", error);
      throw error;
    }
  }

  public async getIncomesById(userId: string | number) {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/receitas?userId=${userId}`
      );

      console.log("Lista de lançamentos", response);
      return response;
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
    }
  }

  public async sendIncomes(incomesData: {
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

      console.log("Lançamento adicionado com sucesso:", response.status);
      return response;
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
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

      console.log("Lançamento editado com sucesso:", response.status);
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

      console.log("Lançamento excluído com sucesso:", response);
      return response;
    } catch (error) {
      console.error("Erro ao editar lançamento:", error);
      throw error;
    }
  }
}
