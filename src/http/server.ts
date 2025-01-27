import Elysia from "elysia";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cors from "@elysiajs/cors";

config(); // Carrega as variáveis de ambiente

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export { supabase };

const app = new Elysia()
  .use(cors())
  .get('/home', ()=> {
    return {
      data: "Bora trabalhar!!!"
    }
  })
  .listen(3333, () => {
    console.log("Está rodando...");
  });