# Personal expenses control

Este repositório contém a implementação do front-end para o aplicativo de controle de despesas pessoais, com objetivo de ajudar pessoas que têm dificuldade em controlar suas finanças.


## Funcionalidades

Suas principais funcionalidades são voltadas à(ao):

- Cadastro, login e logout de usuário; 
- Registro de despesas, divididas em despesas comuns e despesas no cartão de crédito: adição, edição e exclusão de despesas com detalhes como valor (parcelado, recorrente ou integral), categoria e data de vencimento; 
- Registro de receitas: adição, edição e exclusão de receitas com detalhes como valor (recorrente ou receita comum), categoria e data de recebimento;
- Visualização de gastos: interface para visualizar e analisar os gastos registrados, separados como gastos em cartão de crédito e gastos comuns;
- Visualização de ganhos: iterface para visualizar e analisar os ganhos do usuário; e
- Relatórios: Geração de relatórios que auxiliam na compreensão dos hábitos financeiros.

## Stack utilizada

React.js, Chartjs e TailwindCSS;

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
```

## Aprendizados

Gosto da área financeira e isso com certeza ajudou a tornar este projeto um desafio empolgante. Ser/dar suporte aos usuários que não sabem para aonde vão seus recursos financeiros é gratificante. O projeto foi feito com foco na experiência de usuário, com uma interface amigável e componentes reutilizáveis para o registro e visualização de despesas e receitas. Todavia, ele foi cheio de aprendizados e desafios técnicos. 

Um dos destaques foi a utilização de Chart.js para a criação de gráficos interativos, que permitiram visualizar as despesas e receitas de forma clara e intuitiva. Os gráficos foram configurados para exibir dados como gastos mensais, categorias mais utilizadas e comparativos entre receitas e despesas. 

Outro exemplo foi o uso do Context API para gerenciamento e organização de estados globais. Apesar de já estar familiarizada com Context API, é sempre bom utilizá-lo para que o código fique mais performático. Outro detalhe foi o processo de autenticação, cuja utilização de tokens JWT foi fundamental para assegurar o acesso e manipulação dos dados financeiros com segurança.


Por fim, a integração entre frontend e backend e seus desafios práticos.

## Roadmap

- criação do dashboard inicial - ok 
- criação telas de registro e login - ok
- conectar front ao back - ok
- autenticação do usuário - axios e usercontext para gerenciamento do estado do usuário usando cors para conectar o front ao back + token para autenticar - ok
- persistencia de autenticação do usuário, por meio do armazenamento do token JWT no localStorage ou cookies - ok
- context API para despesas e receitas no frontend, facilitando o gerenciamento do estado em toda a aplicação - ok
- criar formulários e interfaces para gerenciar os dados do cartão de crédito no frontend e conectar isso às rotas do backend - ok
- criar a interface para o usuário inserir, visualizar e gerenciar despesas e receitas. Conectar isso com as rotas do backend - ok
- formatar para real - ok
- trabalhar com regex para trabalhar com vírgula (valor financeiro) - ok

backlog:
- Deploy: Preparar o frontend e o backend para deploy (ex: frontend no Vercel/Netlify e backend no Heroku ou servidor VPS).
- Testes: Realizar testes manuais ou automatizados para garantir que todas as rotas, tanto do frontend quanto do backend, estejam funcionando corretamente.
- melhorar e inserir mais filtragem no front
- inserir tabelas de expectativas/realidade de orçamento com alerta de limite ultrapassado
