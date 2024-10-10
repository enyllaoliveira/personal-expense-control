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
      {/* <link href="/">
        <h1 className="h-9 text-lg font-medium text-white"> Área de login</h1>
      </link> */}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2"
      >
        <input
          placeholder="Digite o seu e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="************"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
        >
          {" "}
          Acessar{" "}
        </button>
      </form>
    </div>
  );
}
