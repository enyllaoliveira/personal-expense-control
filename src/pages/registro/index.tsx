import Button from "../../components/Commons/Button";
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
    <div className="flex w-full h-screen items-center justify-center flex-col mx-auto text-primary-gray-900 gap-4">
      <div className="gap-1 flex flex-col">
        <h1 className="text-lg font-extrabold"> Área de registro</h1>
        <h2 className="text-base font-medium">
          {" "}
          Digite os dados abaixo para se cadastrar
        </h2>
      </div>

      <form
        onSubmit={handleRegister}
        className="w-full max-w-xl flex flex-col px-2 gap-4 font-semibold  "
      >
        <label className="flex flex-col items-start gap-1">
          {" "}
          Digite o seu nome
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md px-2 h-10 border-gray-400 w-full text-primary-gray-800"
          />
        </label>
        <label className="flex flex-col items-start gap-1">
          {" "}
          Digite o seu e-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-2 h-10 border-gray-400 w-full text-primary-gray-800"
          />
        </label>

        <label className="flex flex-col items-start gap-1">
          {" "}
          Digite a sua senha
          <input
            placeholder="************"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-2 h-10 border-gray-400 w-full text-primary-800"
          />
        </label>
        <Button variant="primary" type="submit">
          Registrar
        </Button>
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
