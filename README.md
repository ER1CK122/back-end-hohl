# 📬 API de Formulários - Contabilidade Hohl

<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Elysia](https://img.shields.io/badge/Elysia-0B0B0B?style=for-the-badge&logo=elysia&logoColor=white)

</div>

## 📑 Índice
- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Stack Utilizada](#-stack-utilizada)
- [Rodando Localmente](#-rodando-localmente)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Documentação da API](#-documentação-da-api)
- [Autor](#-autor)

## 💡 Sobre

API REST desenvolvida para gerenciar formulários de contato da Contabilidade Hohl. O sistema oferece uma solução completa para coleta, armazenamento e notificação de formulários, com foco em segurança e eficiência.

## 🎯 Funcionalidades

### Segurança
- ✅ Autenticação via API Key
- ✅ CORS configurado
- ✅ Rotas protegidas

### Dados
- ✅ Persistência automática no Supabase
- ✅ Validação de dados
- ✅ Histórico de submissões

### Notificações
- ✅ Email automático para cliente
- ✅ Email de notificação para administrador
- ✅ Templates personalizados

### Monitoramento
- ✅ Health check
- ✅ Status dos serviços
- ✅ Métricas de performance

## 🛠 Stack Utilizada

### Core
- [Bun.js](https://bun.sh/) - Runtime JavaScript de alta performance
- [Elysia.js](https://elysiajs.com/) - Framework web minimalista e tipado
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem

### Banco de Dados
- [Supabase](https://supabase.com/) - Plataforma de banco de dados PostgreSQL

### Email
- [Nodemailer](https://nodemailer.com/) - Módulo para envio de emails

## 🚀 Rodando Localmente

```bash
# Clone o projeto
git clone https://github.com/ER1CK122/back-end-hohl.git

# Entre no diretório
cd back-end-hohl

# Instale as dependências
bun install

# Copie o arquivo de ambiente
cp .env.example .env

# Inicie o servidor
bun run dev
```

## 🔐 Variáveis de Ambiente

```env
# Supabase - Configurações do banco de dados
SUPABASE_URL="sua_url_supabase"
SUPABASE_KEY="sua_chave_supabase"

# Email - Configurações SMTP
EMAIL_USER="seu_email"
EMAIL_PASSWORD="sua_senha_app"

# API - Configurações do servidor
PORT=3333
NODE_ENV=development
```

## 📚 Documentação da API

### Health Check
```http
GET /health
Content-Type: application/json

# Response 200
{
  "status": "healthy",
  "timestamp": "2024-03-14T12:00:00.000Z",
  "services": {
    "database": "online",
    "email": "online"
  },
  "version": "1.0.0"
}
```

### Enviar Formulário
```http
POST /api/forms
Content-Type: application/json
x-api-key: 7b86595c-6c4a-48b6-a407-edf2a15bdf63

# Request Body
{
  "name": "Usuario Teste",
  "email": "usuTeste@gmail.com",
  "phone": "(11) 99999-9999",
  "mensage": "Gostaria de mais informações sobre os serviços."
}

# Response 200
{
  "success": "Formulário enviado com sucesso!"
}

# Response 401
{
  "error": "API Key não fornecida"
}
```

## 🔄 Scripts Disponíveis

```bash
# Desenvolvimento com hot-reload
bun run dev

# Build para produção
bun run build

# Iniciar em produção
bun run start

# Rodar testes
bun run test
```

## 👤 Autor

### Erick Nunes
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/erck-nunes/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ER1CK122)

---

<div align="center">
Desenvolvido com 💙 por Erick Nunes
</div>
