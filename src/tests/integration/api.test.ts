import { describe, expect, it, beforeAll, afterAll } from 'bun:test';
import { app } from '../../http/server';
import { cleanupDatabase } from '../setup';

describe('API Integration Tests', () => {
  const API_KEY = '7b86595c-6c4a-48b6-a407-edf2a15bdf63';
  let server: any;

  beforeAll(async () => {
    await cleanupDatabase();
    server = app.listen(3334);
  });

  afterAll(async () => {
    server.stop();
    await cleanupDatabase();
  });

  describe('Rotas Públicas', () => {
    it('deve retornar health check', async () => {
      const response = await fetch('http://localhost:3334/public/health');
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('status');
    });

    it('deve retornar métricas', async () => {
      const response = await fetch('http://localhost:3334/public/metrics');
      expect(response.status).toBe(200);
    });

    it('deve acessar documentação swagger', async () => {
      const response = await fetch('http://localhost:3334/swagger');
      expect(response.status).toBe(200);
    });
  });

  describe('Rotas Protegidas', () => {
    it('deve rejeitar requisição sem API key', async () => {
      const response = await fetch('http://localhost:3334/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Teste Integração",
          email: "teste@email.com",
          phone: "(11) 99999-9999",
          mensage: "Mensagem de teste"
        })
      });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    it('deve aceitar formulário válido', async () => {
      const response = await fetch('http://localhost:3334/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          name: "Teste Integração",
          email: "teste@email.com",
          phone: "(11) 99999-9999",
          mensage: "Mensagem de teste de integração"
        })
      });

      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success');
      expect(data).toHaveProperty('cacheKey');
    });

    it('deve respeitar rate limit', async () => {
      const makeRequest = () => fetch('http://localhost:3334/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          name: "Teste Rate Limit",
          email: "teste@email.com",
          phone: "(11) 99999-9999",
          mensage: "Teste de rate limit"
        })
      });

      // Faz 101 requisições (1 além do limite)
      const requests = Array(101).fill(null).map(() => makeRequest());
      const responses = await Promise.all(requests);

      // Deve ter pelo menos uma resposta 429
      const hasRateLimit = responses.some(r => r.status === 429);
      expect(hasRateLimit).toBe(true);
    });

    it('deve permitir consultar formulário no cache', async () => {
      // Primeiro envia um formulário
      const submitResponse = await fetch('http://localhost:3334/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          name: "Teste Cache",
          email: "cache@test.com",
          phone: "(11) 99999-9999",
          mensage: "Teste de cache"
        })
      });

      const { cacheKey } = await submitResponse.json();
      expect(submitResponse.status).toBe(200);

      // Depois consulta o cache
      const cacheResponse = await fetch(`http://localhost:3334/api/forms/${cacheKey}`, {
        headers: {
          'x-api-key': API_KEY
        }
      });

      const cachedData = await cacheResponse.json();
      expect(cacheResponse.status).toBe(200);
      expect(cachedData).toHaveProperty('formData');
      expect(cachedData.formData.email).toBe('cache@test.com');
    });

    it('deve retornar 404 para cache não encontrado', async () => {
      const response = await fetch('http://localhost:3334/api/forms/invalid-key', {
        headers: {
          'x-api-key': API_KEY
        }
      });

      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });
  });
}); 