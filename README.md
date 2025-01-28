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
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [API Endpoints](#-api-endpoints)
- [Validações](#-validações)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Autor](#-autor)

## 💡 Sobre
API REST desenvolvida para gerenciar formulários de contato da Contabilidade Hohl. O sistema oferece uma solução completa para coleta, armazenamento e notificação de formulários, com foco em segurança, validação e eficiência.

## ✨ Funcionalidades

### Segurança
- ✅ Autenticação via API Key
- ✅ CORS configurado
- ✅ Rotas protegidas
- ✅ Rate Limiting com:
  - Limite de 100 requisições por minuto
  - Detecção inteligente de IP
  - Headers informativos
  - Limpeza automática de cache

### Validação
- ✅ Validação de dados com TypeBox
- ✅ Mensagens de erro personalizadas
- ✅ Validação de formato de email e telefone

### Dados
- ✅ Persistência no Supabase
- ✅ Tratamento de erros robusto
- ✅ Logs detalhados

### Notificações
- ✅ Email automático para cliente
- ✅ Email de notificação para administrador
- ✅ Templates personalizados
- ✅ Envio paralelo de emails para aumentar a performance

### Monitoramento
- ✅ Health check
- ✅ Status dos serviços
- ✅ Métricas de performance

## 🛠 Stack Utilizada

### Core
- [Bun.js](https://bun.sh/) - Runtime JavaScript de alta performance
- [Elysia.js](https://elysiajs.com/) - Framework web minimalista e tipado
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem
- [TypeBox](https://github.com/sinclairzx81/typebox) - Sistema de validação JSON Schema

### Banco de Dados
- [Supabase](https://supabase.com/) - Plataforma de banco de dados PostgreSQL

### Email
- [Nodemailer](https://nodemailer.com/) - Módulo para envio de emails

## 📁 Estrutura do Projeto
```
src/
├── controllers/    # Controladores da aplicação
├── http/          # Configuração do servidor
├── middleware/    # Middlewares (auth, etc)
├── types/         # Definições de tipos
├── utils/         # Utilitários
└── validators/    # Validação de dados
```

## 🚀 Instalação

```bash
# Clone o projeto
git clone https://github.com/ER1CK122/back-end-hohl.git

# Entre no diretório
cd back-end-hohl

# Instale as dependências
bun install

# Configure as variáveis de ambiente
cp .env.example .env
```

## ⚙️ Configuração

```env
# Supabase - Configurações do banco de dados
SUPABASE_URL="https://vveciefndmmumrjrmcjx.supabase.co"
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2ZWNpZWZuZG1tdW1yanJtY2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MzExNDgsImV4cCI6MjA1MzUwNzE0OH0.OQN-uArON1WdfCTg0oWKJFXBuKtb5nXDvbjfBJnYCw8

# Email - Configurações SMTP
EMAIL_USER=e24741662@gmail.com
EMAIL_PASSWORD=fpsevfuuohqqnlqh

# API - Configurações do servidor
PORT=3333
NODE_ENV=development
```

## 📚 API Endpoints

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
  }
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

# Response 400 (Erro de Validação)
{
  "error": "Dados inválidos",
  "details": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}

# Response 401
{
  "error": "API Key não fornecida"
}
```

### Rate Limit Headers
```http
# Response Headers
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1679944800000
Retry-After: 30 # (quando próximo do limite)
```

### Erros de Rate Limit
```http
# Response 429 (Too Many Requests)
{
  "error": "Too many requests",
  "message": "Por favor, aguarde antes de fazer mais requisições",
  "retryAfter": 30
}
```

## ✅ Validações

### Campos Obrigatórios
- **name**: Nome do cliente
  - Mínimo: 3 caracteres
  - Máximo: 100 caracteres
  
- **email**: Email válido
  - Formato: usuario@dominio.com
  
- **phone**: Telefone
  - Formato: (99) 99999-9999
  
- **mensage**: Mensagem
  - Mínimo: 10 caracteres
  - Máximo: 1000 caracteres

## ❌ Tratamento de Erros

- **400**: Erro de validação dos dados
- **401**: API Key inválida ou não fornecida
- **429**: Limite de requisições excedido
- **500**: Erro interno do servidor

## 👤 Autor

### Erick Nunes
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/erck-nunes/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ER1CK122)

---

<div align="center">
Desenvolvido com 💙 por Erick Nunes
</div>
