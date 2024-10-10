import api from "../services/api";

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
        userData
      );

      console.log("Usuário logado com sucesso:", response.status);
      return response;
    } catch (error) {
      console.error("Erro ao logar usuário:", error);
    }
  }
}
