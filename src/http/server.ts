import Elysia from "elysia";
import { config } from "dotenv";
import cors from "@elysiajs/cors";
import { createClient } from "@supabase/supabase-js";
import { handleFormSubmission } from "../controllers/formController";
import { authenticationApiKey } from "../middleware/authenticationApiKey";

config(); // Carrega as variáveis de ambiente

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export { supabase };

// Cria uma nova instância do Elysia sem autenticação para o healthcheck
const app = new Elysia()
  .use(cors())
  // Rota raiz simples sem nenhuma lógica
  .get('/', () => 'OK')
  // Aplica autenticação apenas para as rotas que precisam
  .group('/api', app => app
    .use(authenticationApiKey)
    .post('/forms', handleFormSubmission)
  )
  .listen(process.env.PORT || 3333, () => {
    console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 3333}`);
  });