import Button from "../../components/Commons/Button";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export default function Login() {
  const userContext = AuthContext();

  if (!userContext) {
    return <div>Contexto de usuário não encontrado!ss</div>;
  }
  const { handleLogin, email, password, setEmail, setPassword } = userContext;

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col mx-auto text-primary-gray-900 gap-4">
      <div className="gap-1 flex flex-col">
        <h1 className="text-lg font-extrabold"> Área de login</h1>
        <h2 className="text-base font-medium">
          Bem-vindo de volta! Preencha os dados para acessar seu painel
        </h2>
      </div>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-xl flex flex-col px-2 gap-4 font-semibold  "
      >
        <label className="flex flex-col items-start gap-1">
          {" "}
          Digite o seu e-mail
          <input
            placeholder="Digite o seu e-mail"
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
            className="border rounded-md px-2 h-10 border-gray-400 w-full text-primary-gray-800"
          />
        </label>
        <Button variant="primary" type="submit">
          {" "}
          Acessar{" "}
        </Button>
        <p>
          {" "}
          Ainda não tem uma conta?{" "}
          <a href="/registro" className="underline ">
            {" "}
            Clique aqui para fazer o seu cadastro
          </a>
        </p>
      </form>
    </div>
  );
}
