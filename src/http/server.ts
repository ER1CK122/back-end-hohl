import Elysia from "elysia";
import { config } from "dotenv";
import cors from "@elysiajs/cors";
import { createClient } from "@supabase/supabase-js";
import { handleFormSubmission } from "../controllers/formController";
import { authenticationApiKey } from "../middleware/authenticationApiKey";

config(); // Carrega as variáveis de ambiente

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export { supabase };

const app = new Elysia()
  .use(cors())
  .use(authenticationApiKey)
  .get('/', () => ({ status: 'ok' }))
  .post('/forms', handleFormSubmission)
  .listen(process.env.PORT || 3333, () => {
    console.log("Está rodando...");
  });