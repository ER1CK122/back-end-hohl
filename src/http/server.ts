import Elysia from "elysia";
import { config } from "dotenv";
import cors from "@elysiajs/cors";
import { createClient } from "@supabase/supabase-js";
import { checkServices } from "../utils/healthCheck";
import { handleFormSubmission } from "../controllers/formController";
import { authenticationApiKey } from "../middleware/authenticationApiKey";
import { createRateLimit } from '../middleware/rateLimit';

config(); // Carrega as variáveis de ambiente

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export { supabase };

// Cria uma instância base do Elysia
const app = new Elysia();

// Adiciona CORS globalmente
app.use(cors());

// Configuração do rate limit: 100 requisições por minuto
const rateLimit = createRateLimit({
  max: 100,
  windowMs: 60 * 1000 // 1 minuto
});

// Rota pública de healthcheck
app.get('/health', async ({ set }) => {
  const health = await checkServices();
  
  if (health.status === 'unhealthy') {
    set.status = 503;
  }
  
  return health;
});

// Grupo de rotas protegidas
const protectedRoutes = new Elysia()
  .use(authenticationApiKey)
  .use(rateLimit)  // Adiciona rate limit
  .post('/forms', handleFormSubmission);

// Adiciona as rotas protegidas sob o prefixo /api
app.group('/api', app => app.use(protectedRoutes));

// Inicia o servidor
app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 3333}`);
});