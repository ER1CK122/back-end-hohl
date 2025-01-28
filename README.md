# API de Gerenciamento de Formulários - Contabilidade Hohl

<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
[![Railway](https://img.shields.io/badge/Railway-%23000000.svg?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)

</div>

## 📋 Sumário
- [Descrição](#-descrição)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Deploy](#-deploy)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 📝 Descrição

API REST desenvolvida com Elysia.js e TypeScript para gerenciamento eficiente de formulários de contato. Integrada com Supabase para persistência de dados e sistema de notificações por email.

## ✨ Funcionalidades

- ✅ Autenticação via API Key
- ✅ Validação de dados de entrada
- ✅ Persistência no Supabase
- ✅ Notificações por email automáticas
- ✅ Rate limiting
- ✅ Logs estruturados
- ✅ Healthcheck endpoint

## 🚀 Tecnologias

- **Runtime:** [Bun.js](https://bun.sh/)
- **Framework:** [Elysia.js](https://elysiajs.com/)
- **Banco de Dados:** [Supabase](https://supabase.com/)
- **Email:** [Nodemailer](https://nodemailer.com/)
- **Deploy:** [Railway](https://railway.app/)

## 🏗 Arquitetura

```
src/
├── controllers/     # Controladores da aplicação
├── middleware/      # Middlewares (auth, rate limit)
├── types/          # Definições de tipos TypeScript
├── utils/          # Utilitários (email, logger)
└── http/           # Configuração do servidor e rotas
```

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/ER1CK122/back-end-hohl.git

# Entre no diretório
cd back-end-hohl

# Instale as dependências
bun install

# Configure as variáveis de ambiente
cp .env.example .env
```

## ⚙️ Variáveis de Ambiente

```env
# Supabase
SUPABASE_URL="sua_url_supabase"
SUPABASE_KEY="sua_chave_supabase"

# Email
EMAIL_USER="seu_email"
EMAIL_PASSWORD="sua_senha_app"

# API
PORT=3333
```

## 🔨 Uso

```bash
# Desenvolvimento
bun run dev

# Build
bun run build

# Produção
bun run start
```

## 📡 API Endpoints

### Health Check
```http
GET /health

Response:
{
  "status": "ok"
}
```

### Enviar Formulário
```http
POST /api/forms

Header:
x-api-key: sua_api_key

Body:
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "mensage": "string"
}
```

## 🚢 Deploy

O projeto está configurado para deploy automático no Railway.app através do arquivo `railway.toml`.

```toml
[build]
builder = "nixpacks"
buildCommand = "bun run build"

[deploy]
startCommand = "bun run start"
healthcheckPath = "/"
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Erick Nunes**
- LinkedIn: [@Erck-Nunes](https://www.linkedin.com/in/erck-nunes/)
- Github: [@ER1CK122](https://github.com/ER1CK122)

## 🙏 Agradecimentos

- [Elysia.js](https://elysiajs.com/) pela excelente documentação
- [Supabase](https://supabase.com/) pelo serviço incrível
- [Railway](https://railway.app/) pela plataforma de deploy

---

<div align="center">
Feito com ❤️ por Erick Nunes
</div>
