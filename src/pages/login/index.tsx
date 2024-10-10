import { FormEvent, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

export function Login() {
  const api = new useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await api.login(userData);
      if (response?.status === 200) {
        console.log("Usuário logado com sucesso:", response);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Erro ao logar usuário:", err);
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <h1 className="h-9 text-lg font-medium text-black"> Área de login</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2 gap-4"
      >
        <label className="flex flex-col items-start">
          {" "}
          Digite o seu nome
          <input
            placeholder="Digite o seu e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-2 h-8 border-gray-400 text-gray-400 w-full"
          />
        </label>
        <label className="flex flex-col items-start">
          {" "}
          Digite o seu nome
          <input
            placeholder="************"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-2 h-8 border-gray-400 text-gray-400 w-full"
          />
        </label>
        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
        >
          {" "}
          Acessar{" "}
        </button>
        <p>
          {" "}
          Aindan não tem uma conta?{" "}
          <a href="/registro" className="underline ">
            {" "}
            Clique aqui para fazer o seu cadastro
          </a>
        </p>
      </form>
    </div>
  );
}
