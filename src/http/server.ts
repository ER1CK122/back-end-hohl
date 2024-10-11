import Elysia from "elysia";

const app = new Elysia()
  .get('/', () => {
    return "Inicio do Projeto";
  });

app.listen('3333');
console.log('Em execução...');