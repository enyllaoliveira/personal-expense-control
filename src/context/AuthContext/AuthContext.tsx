import {
  createContext,
  useState,
  useContext,
  FormEvent,
  ReactNode,
} from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

interface User {
  name: string;
  id: number;
  email: string;
}

const UserContext = createContext<{
  user: User | null;
  name: string;
  email: string;
  password: string;
  handleLogin: (e: FormEvent) => void;
  handleRegister: (e: FormEvent) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
} | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const api = new useApi();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    console.log("Enviando dados de registro:", userData);
    try {
      const response = await api.register(userData);
      if (response?.status === 201) {
        console.log("Usuário registrado:", response);
        navigate("/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Erro de Axios:", err.response?.data || err.message);
      } else {
        console.error("Erro desconhecido:", err);
      }
    }
  };
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const response = await api.login(userData);
      if (response?.status === 200) {
        setUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Erro ao logar usuário:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        name,
        user,
        email,
        password,
        handleLogin,
        handleRegister,
        setEmail,
        setPassword,
        setName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
