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

```text
src
├── controllers
├── middlewares
├── routes
├── services
├── validations
├── utils
├── lib
├── app.ts
└── server.ts

tests
├── auth.test.ts
├── cycle.test.ts
├── symptom.test.ts
└── setup.ts
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