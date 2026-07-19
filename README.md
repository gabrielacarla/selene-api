<div align="center">

# ☾ Selene API

Backend de uma API REST para acompanhamento do ciclo menstrual.

Desenvolvido com **Node.js**, **TypeScript**, **Express** e **Prisma ORM**.

☾────────────────────────────────────────────────────────────☽

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

# ☾ Sobre

Selene API é o backend de uma aplicação voltada para o acompanhamento do ciclo menstrual.

O projeto permite que usuários criem uma conta, registrem seus ciclos, adicionem sintomas e consultem essas informações de forma segura através de autenticação JWT.

Além das funcionalidades principais, a API também conta com documentação Swagger e testes automatizados utilizando Vitest e Supertest.

---

# ☾ Funcionalidades

- Autenticação com JWT
- Cadastro de usuários
- Login
- CRUD de ciclos menstruais
- CRUD de sintomas
- Validação de dados com Zod
- Documentação Swagger
- Testes automatizados

---

# ☾ Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Zod
- Swagger
- Vitest
- Supertest

---

# ☾ Estrutura

```bash
selene-api
│
├── prisma
│   ├── migrations
│   └── schema.prisma
│
├── src
│   ├── controllers
│   ├── docs
│   ├── lib
│   ├── middlewares
│   ├── routes
│   ├── services
│   ├── types
│   ├── utils
│   ├── validations
│   ├── app.ts
│   └── server.ts
│
├── tests
│   ├── auth.test.ts
│   ├── cycle.test.ts
│   ├── symptom.test.ts
│   └── setup.ts
│
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── prisma.config.ts
├── tsconfig.json
├── tsconfig.test.json
├── vitest.config.ts
└── README.md
```

---

# ☾ Instalação

Clone o projeto

```bash
git clone https://github.com/gabrielacarla/selene-api.git
```

Entre na pasta

```bash
cd selene-api
```

Instale as dependências

```bash
npm install
```

Configure o arquivo `.env`

```env
DATABASE_URL="..."

JWT_SECRET="..."
```

Execute as migrations

```bash
npx prisma migrate dev
```

Inicie a aplicação

```bash
npm run dev
```

**Observação:** Em algumas configurações do PostgreSQL no Windows, `localhost` pode não funcionar corretamente na `DATABASE_URL`. Se ocorrer erro de conexão, substitua `localhost` por `127.0.0.1`.

---

# ☾ Testes

Para executar todos os testes:

```bash
npm run test
```

A aplicação possui testes automatizados para:

- Autenticação
- Ciclos
- Sintomas
- Autorização
- Casos de erro

---

# ☾ Documentação

Após iniciar o servidor, a documentação pode ser acessada em:

```text
http://localhost:3000/api-docs
```

---

# ☾ Banco de dados

O projeto utiliza PostgreSQL com Prisma ORM.

Durante os testes é utilizado um banco separado (`selene_test`) para evitar alterações no banco principal.

---

# ☾ Próximas melhorias

- Recuperação de senha
- Refresh Token
- Perfil do usuário
- Paginação
- Filtros de busca
- Deploy da API

---

<div align="center">

☾────────────────────────────────────────────────────────────☽

Desenvolvido por **Gabriela Carla**

</div>