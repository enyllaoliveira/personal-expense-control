import { FormEvent, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

export function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = new useApi();
  const navigate = useNavigate();
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
        navigate("/login");
      }
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      {/* <link href="/">
        <h1 className="h-9 text-lg font-medium text-white"> Área de login</h1>
      </link> */}

      <form
        onSubmit={handleRegister}
        className="w-full max-w-xl flex flex-col px-2"
      >
        <input
          placeholder="Digite o seu nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Digsssite o seu e-mail"
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
          Registrar
        </button>
      </form>
    </div>
  );
}
