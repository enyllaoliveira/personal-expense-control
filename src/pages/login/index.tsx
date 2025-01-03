import { AuthContext } from "../../context/AuthContext/AuthContext";
import Button from "../../components/Commons/Button";
import InputComponent from "../../components/Commons/InputComponent";
import FormComponente from "../../components/Commons/FormComponent";

export default function Login() {
  const userContext = AuthContext();

  if (!userContext) {
    return <div>Contexto de usuário não encontrado!ss</div>;
  }
  const { handleLogin, email, password, setEmail, setPassword } = userContext;

  return (
    <FormComponente
      title="Área de login"
      subtitle="Bem-vindo de volta! Preencha os dados para acessar seu painel"
      onSubmit={handleLogin}
      footerText="Ainda não tem uma conta?"
      footerLink="Clique aqui para fazer o seu cadastro"
      footerHref="/registro"
      className="flex items-center mt-48 sm:mt-20 tablet:mt-60"
    >
      <InputComponent
        label="Digite o seu e-mail"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputComponent
        label="Digite a sua senha"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="************"
        required
      />
      <Button variant="primary" type="submit">
        Acessar
      </Button>
    </FormComponente>
  );
}
