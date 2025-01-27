import Elysia from "elysia";
import { config } from "dotenv";
import cors from "@elysiajs/cors";
import { createClient } from "@supabase/supabase-js";
import { handleFormSubmission } from "../controllers/formController";

config(); // Carrega as variáveis de ambiente

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export { supabase };

const app = new Elysia()
  .use(cors())
  .post('/forms', handleFormSubmission)
  .listen(3333, () => {
    console.log("Está rodando...");
  });