import Elysia from "elysia";
import { config } from "dotenv";
import cors from "@elysiajs/cors";

config(); // Carrega as variáveis de ambiente

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