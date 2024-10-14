import Elysia from "elysia";
import cors from "@elysiajs/cors";

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