import Elysia from "elysia";
import { config } from "dotenv";
import cors from "@elysiajs/cors";
import { createClient } from "@supabase/supabase-js";

// Imports agrupados por barrel files
import { logger, metrics, swaggerConfig, checkServices } from '../utils';
import { createRateLimit, authenticationApiKey } from '../middleware';
import { handleFormSubmission, getFormFromCache } from '../controllers';

config(); // Carrega as variáveis de ambiente

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export { supabase };

// TODO: Criar arquivos separados para cada rota
// TODO: Ajustar envio de emails para um usuario de teste usando o nodemailer.createTestAccount()
// TODO: Ajustar o envio de emails para o usuario de teste
// TODO: Verificar se com o nodemailer o projeto é válido para ir ao ar, ou utilizar outros produtos como resend.com
// TODO: Melhorar o metodo de autenticação com o JWT e tentar utilizar cookie no back-end
// TODO: Refatorar o codigo de cada arquivo separado para ter uma melhor organização
// TODO: Restruturar as pastas do projeto
// TODO: Trocar o Dotenv por env.ts que utiliza o zod para validar as variaveis de ambiente
// TODO: Melhorar os retornos das rotas para o front-end
// TODO: Melhorar o HelthCheck do servidor
// TODO: Refatorar todos o loggers feitos com o pino
// TODO: Verificar se é necessario Cache para esse projeto
// TODO: Verificar os testes unitários
// TODO: Refatorar todos os middlewares
// TODO: Refatorar os controllers
// TODO: Verificar se é possivel deixar o projeto mais simples

// Cria uma instância base do Elysia
export const app = new Elysia()
  .use(cors())
  .use(swaggerConfig);

// Rotas públicas
const publicRoutes = new Elysia()
  .get('/health', async ({ set }: { set: { status: number } }) => {
    const health = await checkServices();
    
    if (health.status === 'unhealthy') {
      logger.error({ health }, 'Serviços unhealthy');
      set.status = 503;
    } else {
      logger.info({ health }, 'Serviços healthy');
    }
    
    return health;
  }, {
    detail: {
      tags: ['health'],
      description: 'Verifica o status dos serviços',
      responses: {
        200: { description: 'Todos os serviços estão funcionando' },
        503: { description: 'Um ou mais serviços estão indisponíveis' }
      }
    }
  })
  .get('/metrics', async () => {
    return await metrics.getMetrics();
  }, {
    detail: {
      tags: ['metrics'],
      description: 'Retorna métricas da aplicação'
    }
  });

// Adiciona as rotas públicas
app.group('/public', app => app.use(publicRoutes));

// Grupo de rotas protegidas
const protectedRoutes = new Elysia()
  .use(authenticationApiKey)
  .use(createRateLimit({
    max: process.env.NODE_ENV === 'test' ? 5 : 100, // Limite menor para testes
    windowMs: 1000 // 1 segundo para testes
  }))
  .post('/forms', handleFormSubmission, {
    detail: {
      tags: ['forms'],
      description: 'Envia um novo formulário',
      responses: {
        200: { description: 'Formulário enviado com sucesso' },
        400: { description: 'Dados inválidos' },
        401: { description: 'API Key não fornecida' },
        429: { description: 'Rate limit excedido' }
      }
    }
  })
  .get('/forms/:cacheKey', getFormFromCache, {
    detail: {
      tags: ['forms'],
      description: 'Recupera um formulário do cache',
      responses: {
        200: { description: 'Formulário encontrado' },
        404: { description: 'Formulário não encontrado' }
      }
    }
  });

// Adiciona as rotas protegidas sob o prefixo /api
app.group('/api', app => app.use(protectedRoutes));

// Log na inicialização
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3333, () => {
    logger.info({
      port: process.env.PORT || 3333,
      env: process.env.NODE_ENV
    }, '🚀 Servidor iniciado');
  });
}