# Ignite - Call

Ignite Call, uma aplicação que permite os usuários compartilharem suas agendas, conectadas diretamente com o Google Agenda, permitindo terceiros, a agendarem compromissos em suas horários disponível previamente escolhidos pelo usuário.

# Preview

![Preview](./ignitecallpreview.gif)

## Funcionalidades

- **Cadastro de usuário:** Primeiro você cadastra o usuário, para em seguido conectar a sua Agenda Google.
- **Selecionar disponibilidade:** Seleciona os dias da semana que estará disponível, junto ao horário de cada dia disponível.
- **Agendar compromisso:** Ao escolher o horário disponível, pode agendar um Google Meet.

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema junto ao [Docker](https://docs.docker.com/desktop/install/windows-install/).

## Como Usar

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/rcnald/ignite-call.git
   # ou
   gh repo clone rcnald/ignite-call
   ```

2. **Entre no diretório do projeto:**
   ```bash
   cd ignite-call
   ```

3. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

4. **Execute o banco de dados:**
   - Execute o PostgreSQL via Docker:
     ```bash
     docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
     ```
   - Rode as migrações do Prisma:
     ```bash
     npx prisma migrate dev
     ```

5. **Crie um projeto na Google Cloud:**
   - Acesse: [Google Cloud Console](https://console.cloud.google.com/welcome?organizationId=0).
   - Crie um novo projeto e selecione-o.
   - No dashboard, vá em 'API & Serviços' > 'Credenciais'.
   - Crie uma nova credencial do tipo 'ID do cliente OAuth 2.0'.
   - Preencha as informações obrigatórias e adicione o domínio `http://localhost:3000` no campo de 'Domínios Autorizados'.
   - Publique o aplicativo.
   - Volte em 'Criar Credencial' e selecione 'Aplicativo Web' como tipo de aplicação.
   - Adicione as URLs abaixo para
   - as origens autorizadas de JavaScript: 
     - `http://localhost:3000`
   - as URL autorizadas de redirecionamento:
     - `http://localhost:3000/api/auth/callback/google`
   - Após isso, você terá acesso ao **Client ID** e **Client Secret**.

6. **Gere o secret OAuth:**
   ```bash
   npx auth secret
   ```

7. **Crie e configure o arquivo `.env`:**
   - Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`.
   - Adicione as seguintes variáveis de ambiente:
     ```plaintext
     GOOGLE_CLIENT_ID=<seu_client_id>
     GOOGLE_CLIENT_SECRET=<seu_client_secret>
     ```
   - Adicione as URLs para conectar com o banco de dados:
     ```plaintext
     DATABASE_URL="postgresql://postgres:docker@localhost:5432/ignitecall"
     DATABASE_DIRECT_URL="postgresql://postgres:docker@localhost:5432/ignitecall"
     ```

8. **Inicie o projeto:**
   ```bash
   npm run dev
   ```
   - O projeto será iniciado na porta [http://localhost:3000](http://localhost:3000) (se disponível).

---

## Principais tecnologias usadas
Tecnologias e bibliotecas utilizadas para a construção do projeto. 

- [dayjs](https://day.js.org/)
- [tanstack/react-query](https://tanstack.com/query/latest)
- [next-auth](https://next-auth.js.org/)
- [googleapis](https://developers.google.com/apis-explorer)
- [prisma](https://www.prisma.io/)
- [ignite-design-system](https://github.com/rcnald/ignite-design-system)
- [react](https://react.dev/)
- [typescript](https://www.typescriptlang.org/)
- [axios](https://axios-http.com/)
- [zod](https://zod.dev/)
- [nuqs](https://github.com/47ng/nuqs)
- [env-nextjs](https://github.com/t3-oss/t3-env)