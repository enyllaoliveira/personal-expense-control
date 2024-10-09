import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <link href="/">
        <h1 className="h-9 text-lg font-medium text-white"> Área de login</h1>
      </link>

      <form
        // onSubmit={handleSubmit}
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
