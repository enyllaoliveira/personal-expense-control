import {
  createContext,
  useState,
  useContext,
  FormEvent,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  logout: () => void;
  handleRegister: (e: FormEvent) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
  notify: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
} | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const api = new useApi();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notify = {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await api.register(userData);
      if (response?.status === 201) {
        console.log("Usuário registrado:", response);
        notify.success(
          "Usuário registrado. Faça seu login para acessar o painel!"
        );
        navigate("/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // analisar melhor essa tratativa de erro
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
        setUser(response.data.user);
        navigate("/meu-painel");
      }
    } catch (error) {
      toast.error("Erro ao realizar login. Tente novamente mais tarde.", {
        autoClose: 2000,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await api.logout();

      if (response.status === 200) {
        localStorage.removeItem("userId");
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao deslogar. Tente novamente mais tarde.", {
          autoClose: 2000,
        });
      } else {
        toast.error("Erro ao deslogar. Tente novamente mais tarde.", {
          autoClose: 2000,
        });
        throw error;
      }
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
        logout,
        notify,
      }}
    >
      {children}
      <ToastContainer />
    </UserContext.Provider>
  );
}

export function AuthContext() {
  return useContext(UserContext);
}
