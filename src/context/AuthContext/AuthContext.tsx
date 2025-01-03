import {
  createContext,
  useState,
  useContext,
  FormEvent,
  ReactNode,
  useEffect,
} from "react";

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

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    const response = await api.register(userData);
    if (response?.status === 201) {
      notify.success(
        "Usuário registrado. Faça seu login para acessar o painel!"
      );
      navigate("/login");
    }
  };
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const response = await api.login(userData);
      if (response?.status === 200 && response.data.token) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
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
      await api.logout();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      toast.error("Erro ao deslogar. Tente novamente mais tarde.", {
        autoClose: 2000,
      });
      throw error;
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
