import { AuthContext } from "../../context/AuthContext/AuthContext";
import Button from "../../components/Commons/Button";
import InputComponent from "../../components/Commons/InputComponent";
import RegisterAndLoginForm from "../../components/Commons/RegiterAndLoginForm";

export default function Login() {
  const userContext = AuthContext();

  if (!userContext) {
    return <div>Contexto de usuário não encontrado!ss</div>;
  }
  const { handleLogin, email, password, setEmail, setPassword } = userContext;

  return (
    <RegisterAndLoginForm
      title="Área de login"
      subtitle="Bem-vindo de volta! Preencha os dados para acessar seu painel"
      onSubmit={handleLogin}
      footerText="Ainda não tem uma conta?"
      footerLink="Clique aqui para fazer o seu cadastro"
      footerHref="/registro"
    >
      <InputComponent
        label="Digite o seu e-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputComponent
        label="Digite a sua senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="************"
      />
      <Button variant="primary" type="submit">
        Acessar
      </Button>
    </RegisterAndLoginForm>
  );
}
