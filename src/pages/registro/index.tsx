import { AuthContext } from "../../context/AuthContext/AuthContext";
import Button from "../../components/Commons/Button";
import InputComponent from "../../components/Commons/InputComponent";
import RegisterAndLoginForm from "../../components/Commons/RegiterAndLoginForm";
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
    <RegisterAndLoginForm
      title="Área de registro"
      subtitle="Digite os dados abaixo para se cadastrar"
      onSubmit={handleRegister}
      footerText="Já tem uma conta?"
      footerLink="Clique aqui para fazer o seu login"
      footerHref="/login"
    >
      <InputComponent
        label="Digite o seu nome"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        Registrar
      </Button>
    </RegisterAndLoginForm>
  );
}
