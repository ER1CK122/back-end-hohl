import { describe, expect, it } from 'bun:test';
import { createRateLimit } from '../../middleware/rateLimit';
import { Elysia } from 'elysia';

describe('Rate Limit Middleware', () => {
  const config = {
    max: 2,        // Limite baixo para testar facilmente
    windowMs: 1000 // 1 segundo
  };

  const app = new Elysia()
    .get('/test', () => 'ok')
    .use(createRateLimit(config));

  it('deve permitir requisições dentro do limite', async () => {
    const response1 = await app.handle(
      new Request('http://localhost/test', {
        headers: { 'x-forwarded-for': '127.0.0.1' }
      })
    );
    expect(response1.status).toBe(200);

    const response2 = await app.handle(
      new Request('http://localhost/test', {
        headers: { 'x-forwarded-for': '127.0.0.1' }
      })
    );
    expect(response2.status).toBe(200);
  });

  it('deve bloquear requisições que excedem o limite', async () => {
    const ip = '127.0.0.2';
    const makeRequest = () => app.handle(
      new Request('http://localhost/test', {
        headers: { 'x-forwarded-for': ip }
      })
    );

    // Faz as requisições iniciais
    await makeRequest();
    await makeRequest();

    // Pequeno delay para garantir que as requisições sejam processadas
    await new Promise(resolve => setTimeout(resolve, 100));

    // A terceira requisição deve ser bloqueada
    const response = await makeRequest();

    expect(response.status).toBe(429);
    const data = await response.json();
    expect(data.error).toBe('Too many requests');
  });

  it('deve resetar o contador após a janela de tempo', async () => {
    const request = new Request('http://localhost/test', {
      headers: { 'x-forwarded-for': '127.0.0.3' }
    });

    // Faz 2 requisições
    await app.handle(request);
    await app.handle(request);

    // Espera a janela de tempo passar
    await new Promise(resolve => setTimeout(resolve, 1100));

    // Deve permitir nova requisição
    const response = await app.handle(request);
    expect(response.status).toBe(200);
  });
}); 