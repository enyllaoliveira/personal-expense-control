# Personal expenses control

Sistema de controle de despesas e receitas pessoais, com objetivo de ajudar pessoas que têm dificuldade em controlar suas finanças.

## Funcionalidades

Suas principais funcionalidades são voltadas à(aos):

- Cadastro, login e logout de usuário;
- Registro de despesas, divididas em despesas comuns e despesas no cartão de crédito: adição, edição e exclusão de despesas com detalhes como valor (parcelado, recorrente ou integral), categoria e data de vencimento;
- Registro de receitas: adição, edição e exclusão de receitas com detalhes como valor (recorrente ou receita comum), categoria e data de recebimento;
- Visualização de gastos: interface para visualizar e analisar os gastos registrados, separados como gastos em cartão de crédito e gastos comuns;
- Visualização de ganhos: iterface para visualizar e analisar os ganhos do usuário; e
- Relatórios: Geração de relatórios que auxiliam na compreensão dos hábitos financeiros.

## Stack utilizada

**Front-end:** React.js e TailwindCSS;

**Back-end:** Node.js e Express.js; e

**Banco de dados:** MongoDB.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/enyllaoliveira/personal-expense-control.git
```

Entre no diretório do projeto

```bash
  cd personal-expense-control
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start

## Aprendizados

Gosto da área financeira e isso com certeza ajudou a tornar este projeto um desafio empolgante. Ser/dar suporte aos usuários que não sabem para aonde vão seus recursos financeiros é gratificante. Todavia, ele foi cheio de aprendizados e desafios técnicos.

Um exemplo foi o reforço do uso do Context API para gerenciamento de estados globais. Outro detalhe foi o processo de autenticação, cuja utilização de tokens JWT foi fundamental para assegurar o acesso e manipulação dos dados financeiros com segurança.

Trabalhar com PostgreSQL trouxe maior compreensão a respeito da modelagem relacional e manipulação de dados complexos, além da prática em criar e configurar tabelas para usuários, transações (de receitas e de despesas) e categorias de despesas.

Por fim, a integração entre frontend e backend e seus desafios práticos.


## Roadmap

- criação do dashboard inicial - ok 
- criação telas de registro e login - ok
- criação das rotas de usuário - ok
- conectar ao banco de dados - back
- conectar front ao back - ok
- autenticação do usuário - axios e usercontext para gerenciamento do estado do - usuário usando cors para conectar o front ao back + token para autenticar - ok
- persistencia de autenticação do usuário, por meio do armazenamento do token JWT no localStorage ou cookies - ok
- context API para despesas e receitas no frontend, facilitando o gerenciamento do estado em toda a aplicação - ok
- criar formulários e interfaces para gerenciar os dados do cartão de crédito no frontend e conectar isso às rotas do backend - ok
- criar a interface para o usuário inserir, visualizar e gerenciar despesas e receitas. Conectar isso com as rotas do backend - ok
- formatar para real - ok
- trabalhar com regex para trabalhar com vírgula (valor financeiro) - ok
- criar rotas para adicionar, editar, listar e deletar valores de cartão de crédito - ok
- criar rotas para adicionar, listar, editar e deletar despesas e receitas - ok
- Filtros e visualizações: Criar filtros para que o usuário visualize despesas e receitas por categoria, período, etc - ok
- Segurança JWT: Garantir que todas as rotas protegidas do backend exijam autenticação usando JWT - ok

backlog:
- Deploy: Preparar o frontend e o backend para deploy (ex: frontend no Vercel/Netlify e backend no Heroku ou servidor VPS).
- Testes: Realizar testes manuais ou automatizados para garantir que todas as rotas, tanto do frontend quanto do backend, estejam funcionando corretamente.
- melhorar filtragem
- criar tabelas de alerta de limite ultrapassado
