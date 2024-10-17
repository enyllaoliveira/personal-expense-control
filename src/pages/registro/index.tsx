import { AuthContext } from "../../context/AuthContext/AuthContext";

export default function Registro() {
  const userContext = AuthContext();

  if (!userContext) {
    return <div>Contexto de usuário não encontrado!</div>;
  }
  const {
    handleRegister,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
  } = userContext;

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <h1 className="h-9 text-lg font-medium text-black"> Área de registro</h1>

      <form
        onSubmit={handleRegister}
        className="w-full max-w-xl flex flex-col px-2 gap-4"
      >
        <label className="flex flex-col items-start">
          {" "}
          Digite o seu nome
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md px-2 h-8 border-gray-400 text-gray-400 w-full"
          />
        </label>
        <label className="flex flex-col items-start">
          {" "}
          Digite o seu e-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-2 h-8 border-gray-400 text-gray-400 w-full"
          />
        </label>

        <label className="flex flex-col items-start">
          {" "}
          Digite a sua senha
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
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white "
        >
          Registrar
        </button>
        <p>
          {" "}
          Já tem uma conta?{" "}
          <a href="/login" className="underline ">
            {" "}
            Clique aqui para fazer o seu login
          </a>
        </p>
      </form>
    </div>
  );
}
