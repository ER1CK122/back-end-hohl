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

### Cache
- ✅ Cache em memória para formulários recentes
- ✅ Expiração automática após 5 minutos
- ✅ Acesso rápido via chave única
- ✅ Organização com prefixos

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
- ✅ Métricas Prometheus
- ✅ Tempo de resposta
- ✅ Taxa de sucesso/erro
- ✅ Monitoramento de rate limit
- ✅ Documentação Swagger/OpenAPI
- ✅ Interface interativa
- ✅ Documentação automática
- ✅ Schemas TypeScript

### Testes
- ✅ Testes unitários para validação
- ✅ Cobertura de casos de erro
- ✅ Testes agrupados por campo
- ✅ Validação de campos obrigatórios

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

### Cache
- Cache em memória
- TTL (Time To Live)
- Prefixos para organização
- Limpeza automática

### Testes
- Bun Test Runner
- Testes unitários
- Assertions
- Grupos de teste

### Monitoramento
- [Pino](https://getpino.io/) - Logger performático
- [Prom-client](https://github.com/siimon/prom-client) - Cliente Prometheus
- Métricas em tempo real
- Formato Prometheus

### Documentação
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - Interface interativa
- OpenAPI 3.0
- Documentação automática via TypeScript

## 📁 Estrutura do Projeto
```
src/
├── controllers/    # Controladores da aplicação
│   └── index.ts  # Barrel file para controllers
├── http/          # Configuração do servidor
├── middleware/    # Middlewares (auth, etc)
│   └── index.ts  # Barrel file para middlewares
├── types/         # Definições de tipos
│   └── index.ts  # Barrel file para types
├── utils/         # Utilitários
│   └── index.ts  # Barrel file para utils
└── validators/    # Validação de dados
    └── index.ts  # Barrel file para validators
```

### Organização do Código
- Utilização de barrel files (index.ts) para melhor organização dos imports
- Agrupamento de exportações relacionadas
- Redução da complexidade de imports
- Manutenção simplificada

Exemplo de uso:
```typescript
// Antes
import { logger } from '../utils/logger';
import { metrics } from '../utils/metrics';
import { sendEmail } from '../utils/emailService';

// Depois - usando barrel files
import { logger, metrics, sendEmail } from '../utils';
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

### Consultar Formulário em Cache
```http
GET /api/forms/:cacheKey
Content-Type: application/json
x-api-key: sua_api_key

# Response 200
{
  "formData": {
    "name": "Usuario Teste",
    "email": "teste@email.com",
    "phone": "(11) 99999-9999",
    "mensage": "Mensagem teste"
  },
  "submittedAt": "2024-03-14T12:00:00.000Z"
}

# Response 404
{
  "error": "Formulário não encontrado no cache"
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
  "success": "Formulário enviado com sucesso!",
  "cacheKey": "form:email@teste.com:1234567890"
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

### Métricas
```http
GET /metrics
Content-Type: text/plain

# Response 200
# HELP form_submissions_total Total de formulários submetidos
form_submissions_total{status="success"} 42
form_submissions_total{status="error"} 5

# HELP response_time_seconds Tempo de resposta em segundos
response_time_seconds_bucket{route="/api/forms",le="0.1"} 100
response_time_seconds_bucket{route="/api/forms",le="0.5"} 150

# HELP rate_limit_hits_total Número de vezes que o rate limit foi atingido
rate_limit_hits_total{ip="127.0.0.1"} 3
```

### Documentação
```http
# Interface Swagger
GET /swagger

# Especificação OpenAPI
GET /swagger/json
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

## Scripts Disponíveis

```bash
# Rodar testes
bun test

# Rodar testes com watch mode
bun test --watch

# Rodar testes com coverage
bun test --coverage
```

## 📊 Métricas Disponíveis

### Formulários
- **form_submissions_total**: Total de formulários enviados
  - Labels: status (success/error)

### Performance
- **response_time_seconds**: Tempo de resposta das rotas
  - Labels: route
  - Buckets: 0.1s, 0.5s, 1s, 2s, 5s

### Rate Limit
- **rate_limit_hits_total**: Contagem de hits no rate limit
  - Labels: ip

## Contribuição

1. Faça fork do projeto
2. Crie sua feature branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 👤 Autor

### Erick Nunes
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/erck-nunes/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ER1CK122)

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

<div align="center">
Desenvolvido com 💙 por Erick Nunes
</div>
